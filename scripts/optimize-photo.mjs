/**
 * Builds the hero portrait from public/profile.(png|jpg|jpeg):
 *  - removes a plain light background (flood fill from the top/left/right edges, soft feathered matte)
 *  - writes transparent WebPs at 800px and 400px wide to public/profile-800.webp / profile-400.webp
 *
 * Run after replacing the photo:  npm run photo
 * Outputs are committed, so CI does not need to run this.
 */
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const pub = resolve(import.meta.dirname, '../public')
const src = ['profile.png', 'profile.jpg', 'profile.jpeg'].map((f) => resolve(pub, f)).find(existsSync)
if (!src) throw new Error('No public/profile.png|jpg|jpeg found')

const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: w, height: h } = info
const px = (i) => [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]]

// Background colour = average of the two top corners.
const c1 = px(2 * w + 2)
const c2 = px(2 * w + w - 3)
const bg = c1.map((v, k) => (v + c2[k]) / 2)
const dist = (i) => {
  const [r, g, b] = px(i)
  return Math.hypot(r - bg[0], g - bg[1], b - bg[2])
}

// If the photo doesn't have a plain light background, keep it as-is (no cutout).
const plainLight = Math.min(...bg) > 200 && Math.hypot(...c1.map((v, k) => v - c2[k])) < 20

const alpha = new Uint8Array(w * h).fill(255)
if (plainLight) {
  const FILL = 42 // max colour distance treated as background
  const R = 4 // flood only through background at least this thick, so it can't leak through thin gaps
  const SOLID = 150 // clearly foreground (hair, beard, jacket, tie)
  const bgLike = new Uint8Array(w * h)
  for (let i = 0; i < w * h; i++) bgLike[i] = dist(i) <= FILL ? 1 : 0

  // A pixel may only be background if it can "see" the left, right or top edge without crossing
  // solid foreground. This keeps a white shirt framed by lapels from being treated as backdrop.
  const solid = new Uint8Array(w * h)
  for (let i = 0; i < w * h; i++) solid[i] = dist(i) > SOLID ? 1 : 0
  const visible = new Uint8Array(w * h)
  const colBlocked = new Uint8Array(w)
  for (let y = 0; y < h; y++) {
    const fromLeft = new Uint8Array(w)
    let blocked = 0
    for (let x = 0; x < w; x++) {
      if (solid[y * w + x]) blocked = 1
      fromLeft[x] = blocked
    }
    blocked = 0
    for (let x = w - 1; x >= 0; x--) {
      const i = y * w + x
      if (solid[i]) blocked = 1
      if (solid[i]) colBlocked[x] = 1
      visible[i] = !fromLeft[x] || !blocked || !colBlocked[x] ? 1 : 0
    }
  }
  for (let i = 0; i < w * h; i++) if (!visible[i]) bgLike[i] = 0

  // core = background pixels whose whole (2R+1)² neighbourhood is background (separable erosion).
  const rowOk = new Uint8Array(w * h)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let ok = 1
      for (let d = -R; d <= R && ok; d++) {
        const xx = x + d
        if (xx >= 0 && xx < w && !bgLike[y * w + xx]) ok = 0
      }
      rowOk[y * w + x] = ok
    }
  const core = new Uint8Array(w * h)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let ok = 1
      for (let d = -R; d <= R && ok; d++) {
        const yy = y + d
        if (yy >= 0 && yy < h && !rowOk[yy * w + x]) ok = 0
      }
      core[y * w + x] = ok
    }

  const seen = new Uint8Array(w * h)
  const stack = []
  // Seed from top, left and right edges only; the bottom edge is clothing.
  for (let x = 0; x < w; x++) stack.push(x)
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1)
  while (stack.length) {
    const i = stack.pop()
    if (seen[i]) continue
    seen[i] = 1
    if (!core[i]) continue
    alpha[i] = 0
    const x = i % w
    if (x > 0) stack.push(i - 1)
    if (x < w - 1) stack.push(i + 1)
    if (i >= w) stack.push(i - w)
    if (i < w * (h - 1)) stack.push(i + w)
  }
  // Grow back out to the real edge, but only R+1 pixels, so gaps stay sealed.
  for (let step = 0; step <= R; step++) {
    const grow = []
    for (let i = 0; i < w * h; i++) {
      if (alpha[i] === 0 || !bgLike[i]) continue
      const x = i % w
      if (
        (x > 0 && alpha[i - 1] === 0) ||
        (x < w - 1 && alpha[i + 1] === 0) ||
        (i >= w && alpha[i - w] === 0) ||
        (i < w * (h - 1) && alpha[i + w] === 0)
      )
        grow.push(i)
    }
    for (const i of grow) alpha[i] = 0
  }
  // Soften the edge: pixels bordering the background fade by how close they are to it.
  const edge = new Uint8Array(alpha)
  for (let i = 0; i < w * h; i++) {
    if (alpha[i] === 0) continue
    const x = i % w
    const nearBg =
      (x > 0 && alpha[i - 1] === 0) ||
      (x < w - 1 && alpha[i + 1] === 0) ||
      (i >= w && alpha[i - w] === 0) ||
      (i < w * (h - 1) && alpha[i + w] === 0)
    if (nearBg) edge[i] = Math.round(255 * Math.min(1, Math.max(0, (dist(i) - FILL) / 70)))
  }
  alpha.set(edge)
}

const matte = await sharp(Buffer.from(alpha), { raw: { width: w, height: h, channels: 1 } })
  .blur(0.6)
  .extractChannel(0) // keep it single-channel (sharp would otherwise emit sRGB)
  .raw()
  .toBuffer()

const rgba = sharp(data, { raw: { width: w, height: h, channels: 3 } }).joinChannel(matte, {
  raw: { width: w, height: h, channels: 1 },
})
const full = await rgba.png().toBuffer()

for (const size of [800, 400]) {
  const out = resolve(pub, `profile-${size}.webp`)
  const res = await sharp(full)
    .resize({ width: size, withoutEnlargement: false })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(out)
  console.log(`${out}  ${res.width}x${res.height}  ${(res.size / 1024).toFixed(1)} KB`)
}
console.log(plainLight ? 'Background removed.' : 'Background kept (not a plain light colour).')
