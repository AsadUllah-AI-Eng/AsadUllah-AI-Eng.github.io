/**
 * All site copy lives here. Edit text, links and lists in this file;
 * components read from it and never hard-code content.
 */

export type ProjectIcon = 'portal' | 'voice' | 'face' | 'leaf' | 'workflow' | 'medical' | 'message' | 'cake'

export interface Project {
  title: string
  /** Short label shown above the title, e.g. "Final Year Project". */
  kicker?: string
  description: string
  tech: string[]
  /** Repo link. Leave out for private projects; the card then shows "Private repository". */
  github?: string
  icon: ProjectIcon
  /**
   * Card size: 'flagship' = full-width highlighted card with highlights list,
   * 'wide' = full-width card with image beside text, default = half-width card.
   */
  size?: 'flagship' | 'wide'
  /** Status badge, e.g. "Private · In development, launching soon". */
  status?: string
  /** Short bullet points (shown on flagship cards). */
  highlights?: string[]
  /**
   * Optional screenshot. Drop a file in /public/projects and set e.g. '/projects/nova.png'.
   * When empty, a styled gradient placeholder with the icon is shown.
   */
  image?: string
}

export interface OtherBuild {
  title: string
  tech: string[]
  github: string
  icon: ProjectIcon
}

export interface Job {
  role: string
  company: string
  location: string
  period: string
  points: string[]
}

export interface SkillGroup {
  title: string
  items: string[]
}

export const site = {
  name: 'Asad Ullah',
  initials: 'AU',
  role: 'AI Engineer',
  location: 'Lahore, Pakistan',
  url: 'https://asadullah-ai-eng.github.io',
  resume: '/Asad_Ullah_Resume.pdf',
}

/** Hero portrait. Regenerate the WebPs with `npm run photo` after replacing public/profile.*. */
export const portrait = {
  src: '/profile-800.webp',
  srcSet: '/profile-400.webp 400w, /profile-800.webp 800w',
  width: 800,
  height: 1046,
  alt: 'Asad Ullah',
}

export const links = {
  email: 'asadch4462@gmail.com',
  /** Used for every general GitHub link (navbar, hero, contact, footer). */
  github: 'https://github.com/AsadUllah-AI-Eng?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/asad-ullah-436a9322a/',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  eyebrow: 'AI Engineer · Full-Stack · Lahore',
  title: 'Asad Ullah',
  tagline: 'AI Engineer & Full-Stack Developer · LLM Agents, Automation & Web Applications',
  intro: 'I build AI-powered applications, secure web software and automations that businesses actually use.',
  primaryCta: 'View Projects',
  secondaryCta: 'Download CV',
}

export const about = {
  heading: 'AI engineering, shipped as real software',
  paragraphs: [
    'I build LLM-powered agents, computer-vision apps and business automations. Besides AI/ML work, I build production web applications end to end (Next.js, TypeScript, PostgreSQL, Laravel), including role-based portals, dashboards and integrations.',
    'I also run IT for a multi-branch retail company, so I’m used to real production problems, not just notebooks and demos. I hold a BS in Artificial Intelligence from Hazara University (2021–2025) and I’m now doing an MS in Applied AI & Data Analytics at the University of Lahore (2026–2027).',
  ],
  education: [
    { degree: 'MS, Applied AI & Data Analytics', school: 'University of Lahore', period: '2026–2027' },
    { degree: 'BS, Artificial Intelligence', school: 'Hazara University', period: '2021–2025' },
  ],
}

export const projects: Project[] = [
  {
    title: 'MNBEC Portal: Consultant & Client Management Platform',
    kicker: 'Full-Stack Platform',
    size: 'flagship',
    status: 'Private · In development, launching soon',
    description:
      'A secure web platform with three role-based portals (Admin, Consultant, Client) for a consulting business. It takes consultants from application through onboarding, training and a knowledge test to qualification, receives qualified client leads from the CRM through a signed webhook, and lets admins build and launch client projects with assigned teams.',
    highlights: [
      '2FA on every staff and consultant account, role-based access and database-level row security, so a consultant sees only assigned projects',
      'CRM integration via HMAC-signed webhooks with duplicate and incomplete-lead handling',
      'Step-by-step onboarding: policies, NDA, training video, reading and a one-attempt knowledge test, each unlocking the next',
      'Automatic Google Workspace account creation for qualified consultants',
      'CI pipeline with lint, type checks, unit/integration/E2E tests (Vitest, Playwright), dependency audit and secret scanning',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Better Auth', 'Redis', 'Tailwind CSS', 'Docker', 'Playwright'],
    icon: 'portal',
    image: '',
  },
  {
    title: 'NOVA: Multi-Agent Voice Assistant',
    kicker: 'Agentic AI',
    size: 'wide',
    description:
      'A voice-first assistant where a main n8n agent routes requests to Gmail, Google Calendar, Google Contacts and LinkedIn sub-agents, plus live web search. Risky actions like sending email or deleting contacts are blocked at the workflow level until the user confirms, and it supports barge-in interruption.',
    tech: ['Next.js', 'TypeScript', 'n8n', 'Groq (Llama)', 'Gemini', 'ElevenLabs'],
    github: 'https://github.com/AsadUllah-AI-Eng/NOVA-multi-agent-assistant',
    icon: 'voice',
    image: '',
  },
  {
    title: 'Smart Attendance System: Face Recognition',
    kicker: 'Final Year Project',
    description:
      'Recognises students from a live webcam and marks attendance with confidence scores, wrapped in a full web app with CSV export, email notifications and a Railway deployment.',
    tech: ['Python', 'Flask', 'OpenCV', 'dlib', 'SQLAlchemy'],
    github: 'https://github.com/AsadUllah-AI-Eng/Smart_Attandance',
    icon: 'face',
    image: '',
  },
  {
    title: 'SmartFarm: Crop & Fertilizer Recommender',
    kicker: 'Applied ML',
    description:
      'Compared 10 classifiers across 22 crops: Random Forest hit 99.3% accuracy and the fertilizer model (KNN) 96.8%, served through Flask.',
    tech: ['Python', 'scikit-learn', 'Flask'],
    github: 'https://github.com/AsadUllah-AI-Eng/SmartFarm-Recommendation',
    icon: 'leaf',
    image: '',
  },
  {
    title: 'AI Automation Agents (n8n)',
    kicker: 'Automation',
    description:
      'An LLM email responder that classifies Gmail and drafts replies, and a chat-based inventory agent on Airtable.',
    tech: ['n8n', 'Gemini', 'Gmail', 'Airtable'],
    github: 'https://github.com/AsadUllah-AI-Eng/n8n-workflows',
    icon: 'workflow',
    image: '',
  },
  {
    title: 'Medical AI Models',
    kicker: 'Deep Learning',
    description:
      'Disease prediction and medical image classification: a diabetes model at 97% accuracy on 100k records, plus CNN / transfer learning for X-rays and skin lesions.',
    tech: ['TensorFlow/Keras', 'scikit-learn'],
    github: 'https://github.com/AsadUllah-AI-Eng/AI-ML-Intern-tasks',
    icon: 'medical',
    image: '',
  },
]

export const otherBuilds: OtherBuild[] = [
  {
    title: 'WhatsApp Bulk Messenger',
    tech: ['Flask', 'Selenium', 'Windows installer'],
    github: 'https://github.com/AsadUllah-AI-Eng/whatsapp-bulk-messanger',
    icon: 'message',
  },
  {
    title: 'Bakers 3D Cake Designer',
    tech: ['Next.js', 'React Three Fiber'],
    github: 'https://github.com/AsadUllah-AI-Eng/Bakers-3D-Cake-Designer',
    icon: 'cake',
  },
]

export const experience: Job[] = [
  {
    role: 'Web & Automation Developer',
    company: 'MNBEC',
    location: 'Lahore',
    period: 'Oct 2025 – Present',
    points: [
      'n8n / Zapier workflows connecting CRM, Gmail and Google Workspace.',
      'Leading development of the MNBEC Portal, a secure consultant & client management platform with Admin, Consultant and Client portals (Next.js, TypeScript, PostgreSQL, Prisma).',
      'Prototyping GenAI use cases like LLM email triage.',
    ],
  },
  {
    role: 'IT Systems & Operations Manager',
    company: 'Bunjoja',
    location: 'Lahore',
    period: 'Oct 2025 – Present',
    points: [
      'IT for head office and all branches: networks, ERP/POS, Google Workspace and cloud.',
      'Built an internal analytics dashboard (Laravel) for the shareholders team.',
    ],
  },
  {
    role: 'AI/ML Intern',
    company: 'DevelopersHub Corporation',
    location: 'Remote',
    period: 'Dec 2024 – Feb 2025',
    points: [
      'ML and deep learning projects on disease prediction, medical imaging, credit risk and anomaly detection.',
    ],
  },
]

export const skills: SkillGroup[] = [
  {
    title: 'Generative & Agentic AI',
    items: ['LLM APIs', 'AI agents', 'n8n', 'RAG', 'LangChain', 'LangGraph', 'Vector DBs'],
  },
  {
    title: 'ML & Vision',
    items: ['scikit-learn', 'TensorFlow/Keras', 'CNNs', 'OpenCV', 'dlib'],
  },
  {
    title: 'Backend & Web',
    items: ['Python', 'Flask', 'FastAPI', 'Django', 'Node.js', 'Next.js', 'React', 'TypeScript', 'Laravel'],
  },
  {
    title: 'Data & Deploy',
    items: ['pandas', 'PostgreSQL', 'Prisma', 'Git', 'Railway'],
  },
  {
    title: 'Automation & IT',
    items: ['n8n', 'Zapier', 'Google Workspace', 'Networking'],
  },
]

export const contact = {
  heading: 'Let’s work together',
  line: 'Open to AI engineering roles and freelance automation work.',
  cta: 'Email me',
}

export const footer = {
  text: '© 2026 Asad Ullah · Built with React',
}
