// All portfolio content lives here — edit this file to update the site.
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export const profile = {
  name: 'Muhammad Naeem',
  role: 'Flutter & Software Developer',
  location: 'Lahore, Pakistan',
  email: 'mnaeemkachala@gmail.com',
  phone: '+92 317 647 7369',
  whatsapp: 'https://wa.me/923176477369',
  linkedin: 'https://www.linkedin.com/in/muhammad-naeem-586264391/',
  github: 'https://github.com/mNaeem700',
  photo: asset('/naeem.webp'),
  cv: asset('/Muhammad_Naeem_CV.pdf'),
  intro:
    'I design, build and ship cross-platform mobile apps — from real-time social networks to AI-powered tools — for startups and businesses in the UAE, Pakistan and beyond.',
}

// Companies and organisations Naeem has worked with — shown (with logos) under the hero.
export const partners = [
  { name: 'Unique Solutions UAE', url: 'https://unique-solutions.ae/', logo: asset('/partners/unique-solutions.webp') },
  { name: 'Arure Technologies', url: 'https://arure.tech/', logo: asset('/partners/arure.webp') },
  { name: 'TMC', full: 'TallyMarks Consulting', url: 'https://tmcltd.com/', logo: asset('/partners/tmc.webp') },
  { name: 'GIZ', full: 'Deutsche Gesellschaft für Internationale Zusammenarbeit', url: 'https://www.giz.de/en', logo: asset('/partners/giz.webp') },
  { name: 'SSPA', full: 'Sindh Social Protection Authority', url: 'https://sspa.gos.pk/', logo: asset('/partners/sspa.webp') },
  { name: 'SRSO', full: 'Sindh Rural Support Organisation', url: 'https://srso.org.pk/', logo: asset('/partners/srso.webp') },
  { name: 'CadreSpace', url: 'https://cadrespace.com/', logo: asset('/partners/cadrespace.webp') },
  { name: 'Zentric Solutions', url: 'https://www.zentricsolutions.com/', logo: asset('/partners/zentric.webp') },
]

export const stats = [
  { value: 2, suffix: '+', label: 'Years building production apps' },
  { value: 7, suffix: '+', label: 'Apps live on App Store & Google Play' },
  { value: 10, unit: 'K', suffix: '+', label: 'Downloads on SheDrives alone' },
  { value: 3.82, suffix: '', decimals: 2, label: 'CGPA · B.Sc. Software Engineering' },
]

export const services = [
  {
    title: 'Cross-Platform Apps',
    text: 'Pixel-perfect Flutter apps for iOS and Android from a single, maintainable codebase.',
    tags: ['Flutter', 'Dart'],
  },
  {
    title: 'Native Android',
    text: 'Kotlin features, platform channels and performance work when an app needs to go native.',
    tags: ['Kotlin', 'Android SDK'],
  },
  {
    title: 'Backend & APIs',
    text: 'Secure, scalable backends with Firebase, Supabase or Node.js — auth, data, storage and push.',
    tags: ['Firebase', 'Node.js', 'GraphQL'],
  },
  {
    title: 'AI Integration',
    text: 'LLM chat, image generation and computer-vision features with OpenAI, Gemini and Claude.',
    tags: ['OpenAI', 'Gemini', 'Claude'],
  },
  {
    title: 'Real-Time & Maps',
    text: 'Live chat, location tracking, proximity discovery and Google Maps experiences.',
    tags: ['Realtime', 'Google Maps'],
  },
  {
    title: 'Store Launch & Care',
    text: 'App Store and Play Store releases, CI/CD, crash monitoring and ongoing maintenance.',
    tags: ['CI/CD', 'Releases'],
  },
]

export const process = [
  {
    step: '01',
    key: 'discover',
    title: 'Discover',
    short: 'Goals, users & scope',
    text: 'We start with your goals, your users and the problem worth solving — then turn it into a clear scope, timeline and fixed quote.',
    tasks: ['Kick-off call & goals', 'User stories & features', 'Tech stack & architecture', 'Timeline & fixed quote'],
    output: 'Project brief & estimate',
    duration: '3–5 days',
  },
  {
    step: '02',
    key: 'design',
    title: 'Design',
    short: 'Flows, UI & prototype',
    text: 'User flows, wireframes and polished UI in Figma — a clickable prototype you can test and approve before a line of code.',
    tasks: ['User flows & sitemap', 'Wireframes', 'High-fidelity UI & design system', 'Clickable prototype review'],
    output: 'Approved Figma prototype',
    duration: '1–2 weeks',
  },
  {
    step: '03',
    key: 'build',
    title: 'Build',
    short: 'Flutter app & backend',
    text: 'Clean Architecture in Flutter with a secure backend, built in weekly sprints — you install a fresh test build every week.',
    tasks: ['Sprint planning', 'Flutter app + backend & APIs', 'Weekly TestFlight / Play test builds', 'QA & automated tests'],
    output: 'Release-ready iOS & Android build',
    duration: '4–10 weeks',
  },
  {
    step: '04',
    key: 'launch',
    title: 'Launch',
    short: 'Stores, monitoring & care',
    text: 'Store listing, App Store and Google Play review, crash monitoring and analytics — plus support as real users arrive.',
    tasks: ['Store listing & screenshots', 'App Store & Play review', 'Crash monitoring & analytics', 'Post-launch support'],
    output: 'Live on App Store & Google Play',
    duration: '1 week + support',
  },
]

// Ordered by real-world traction (installs / store ratings), most popular first.
// Featured projects get the large showcase layout; the rest appear in the grid.
export const projects = [
  {
    id: 'shedrives',
    featured: true,
    title: 'SheDrives',
    category: 'Ride-Sharing · Safety',
    platforms: ['iOS', 'Android'],
    color: '#f0469b',
    metric: '10K+ downloads',
    description:
      'A women-exclusive ride-sharing app connecting verified female drivers with female passengers — built around trust, with live tracking and one-tap SOS support.',
    role: 'Flutter app architecture, Firebase, Google Maps, live tracking, SOS flows and store release.',
    features: ['Verified Rides', 'Live Tracking', 'SOS Support', 'Transparent Pricing', 'Ratings & Reviews'],
    stack: ['Flutter', 'Firebase', 'Google Maps', 'Push Notifications'],
    icon: asset('/apps/shedrives-icon.webp'),
    shots: [asset('/apps/shedrives-1.webp'), asset('/apps/shedrives-2.webp'), asset('/apps/shedrives-3.webp')],
    links: {
      appStore: 'https://apps.apple.com/pk/app/shedrives/id6670424505',
      playStore: 'https://play.google.com/store/apps/details?id=com.mtech.sdrives',
    },
  },
  {
    id: 'evoke',
    featured: true,
    title: 'Evoke AI',
    category: 'AI · Creative Tools',
    platforms: ['iOS', 'Android'],
    color: '#14b8a6',
    metric: '★ 4.9 on the App Store',
    description:
      'An AI creative studio in your pocket — generate, edit, restore and convert images and files with cloud AI pipelines, from background removal to text-to-image.',
    role: 'Flutter product development, AI API integration, cloud workflows and App Store delivery.',
    features: ['AI Image Generation', 'Background Removal', 'Photo Restoration', 'File Conversion', 'Image-to-Video'],
    stack: ['Flutter', 'Firebase', 'AI APIs', 'Cloud Storage'],
    icon: asset('/apps/evoke-icon.webp'),
    shots: [asset('/apps/evoke-1.webp'), asset('/apps/evoke-2.webp'), asset('/apps/evoke-3.webp')],
    links: {
      appStore: 'https://apps.apple.com/pk/app/evoke-ai-photo-enhancer/id6751753667',
      playStore: 'https://play.google.com/store/apps/details?id=com.bgremover.tools',
    },
  },
  {
    id: 'inlinker',
    featured: true,
    title: 'Inlinker',
    category: 'Creator Marketplace',
    platforms: ['iOS', 'Android'],
    color: '#3b82f6',
    metric: '★ 4.5 on the App Store',
    description:
      'A marketplace where brands find the right content creators and influencers — AI-powered search, direct messaging, job posts and secure escrow-style payments.',
    role: 'Cross-platform UI, real-time messaging, AI search and payment-ready product flows.',
    features: ['AI Creator Search', 'Direct Messaging', 'Post Jobs', 'Secure Payments', 'Delivery Approval'],
    stack: ['Flutter', 'Firebase', 'AI Search', 'Payments'],
    icon: asset('/apps/inlinker-icon.webp'),
    shots: [asset('/apps/inlinker-1.webp'), asset('/apps/inlinker-2.webp'), asset('/apps/inlinker-3.webp')],
    links: {
      appStore: 'https://apps.apple.com/pk/app/inlinker/id6757296583',
      playStore: 'https://play.google.com/store/apps/details?id=com.arure.inlinker',
    },
  },
  {
    id: 'dapup',
    featured: true,
    title: 'DapUp',
    category: 'Social Networking',
    platforms: ['iOS', 'Android'],
    color: '#c6f432',
    metric: '★ 5.0 on the App Store',
    description:
      'A real-time, location-based social platform that helps people discover nearby friends through mutual connections — with live maps, a moments feed and instant messaging.',
    role: 'Flutter implementation, realtime data, maps, social feeds and production release.',
    features: ['Moments Feed', "Who's Around", 'Nearest Mutuals Map', '1:1 & Group Chat', 'Real-Time Location'],
    stack: ['Flutter', 'Firebase', 'Google Maps', 'Realtime'],
    icon: asset('/apps/dapup-icon.webp'),
    shots: [asset('/apps/dapup-1.webp'), asset('/apps/dapup-2.webp'), asset('/apps/dapup-3.webp')],
    links: {
      appStore: 'https://apps.apple.com/pk/app/dapup/id6745735586',
      playStore: 'https://play.google.com/store/apps/details?id=com.arure.dapup',
    },
  },
  {
    id: 'hashtag',
    title: 'Hashtag AI Expert',
    category: 'AI · Productivity',
    platforms: ['iOS'],
    color: '#a855f7',
    description: 'AI assistant for creators that writes optimised hashtags, captions, bios and content strategies.',
    stack: ['Flutter', 'LLM APIs', 'Firebase'],
    icon: asset('/apps/hashtag-icon.webp'),
    cover: asset('/apps/hashtag-2.webp'),
    links: { appStore: 'https://apps.apple.com/pk/app/hashtag-expert-ai/id6758021359' },
  },
  {
    id: 'monyta',
    title: 'Monyta',
    category: 'Personal Finance',
    platforms: ['Android'],
    color: '#10b981',
    art: 'finance',
    description: 'Budget and money tracker that makes it simple to log spending, plan budgets and see where money goes.',
    stack: ['Flutter', 'Local DB', 'Charts'],
    links: { playStore: 'https://play.google.com/store/apps/details?id=com.app.monytaPersonal' },
  },
  {
    id: 'chatified',
    title: 'Chatified',
    category: 'Messaging',
    platforms: ['Android'],
    color: '#6366f1',
    art: 'chat',
    description: 'A chat and messaging app built at Arure Technologies for fast, reliable conversations.',
    stack: ['Flutter', 'Firebase', 'Realtime'],
    links: { playStore: 'https://play.google.com/store/apps/details?id=arure.chatified' },
  },
]

export const experience = [
  {
    company: 'Arure Technologies',
    role: 'Software Developer · TMC',
    place: 'Pakistan · TMC representative',
    period: 'Present',
    current: true,
    points: [
      'Representing TMC as a software developer on digital projects for the Sindh Social Protection Authority (SSPA).',
      'Delivering in partnership with GIZ (Deutsche Gesellschaft für Internationale Zusammenarbeit) and in alignment with SRSO (Sindh Rural Support Organisation).',
      'Building and shipping Arure products including DapUp, Inlinker and Chatified.',
    ],
    partners: ['SSPA', 'GIZ', 'SRSO', 'TMC'],
  },
  {
    company: 'Unique Solutions',
    role: 'Flutter Developer',
    place: 'Dubai, UAE · Remote',
    period: 'Jul 2024 — Present',
    current: true,
    points: [
      'Deliver production-ready Flutter apps for international clients across multiple industries.',
      'Designed reusable UI component libraries that cut development time across projects.',
      'Architect apps with Clean Architecture and MVVM; own App Store and Play Store releases.',
    ],
  },
  {
    company: 'Coder Space',
    role: 'Flutter Developer',
    place: 'Lahore, Pakistan · On-site',
    period: 'Oct 2025 — Apr 2026',
    points: [
      'Developed and shipped scalable cross-platform apps for production environments.',
      'Integrated Firebase (Auth, Firestore, Storage, FCM), REST and GraphQL APIs.',
      'Applied Provider, Bloc and GetX across multiple projects with cross-functional teams.',
    ],
  },
]

export const skills = [
  { title: 'Mobile', items: ['Flutter', 'Dart', 'Kotlin', 'Swift', 'Android SDK', 'iOS', 'Material & Cupertino'] },
  {
    title: 'Backend & Cloud',
    items: ['Firebase', 'Supabase', 'Node.js', 'Express', 'Django', 'PostgreSQL', 'GraphQL', 'REST APIs', 'Google Cloud', 'AWS'],
  },
  {
    title: 'Architecture',
    items: ['Clean Architecture', 'MVVM', 'SOLID', 'Repository Pattern', 'Bloc', 'Provider', 'GetX', 'Dependency Injection'],
  },
  {
    title: 'AI & Integrations',
    items: ['OpenAI', 'Gemini', 'Claude API', 'Prompt Engineering', 'Computer Vision', 'Google Maps SDK', 'Payments', 'Push Notifications'],
  },
  {
    title: 'Quality & Delivery',
    items: ['Unit / Widget / Integration Tests', 'GitHub Actions', 'GitLab CI/CD', 'App Store Connect', 'Play Console', 'Figma', 'Postman'],
  },
]

export const marquee = ['Flutter', 'Kotlin', 'Dart', 'Firebase', 'Swift', 'Clean Architecture', 'AI Integration', 'Google Maps', 'Supabase', 'GraphQL', 'Bloc', 'iOS & Android']

export const education = {
  degree: 'B.Sc. Software Engineering',
  school: 'The Islamia University of Bahawalpur',
  period: '2022 — 2026',
  grade: 'CGPA 3.82 / 4.00 · First Class',
  extra: ['IEEE Seminar Presenter (2024)', 'Game Development Diploma · GTTI (2024)', 'Class Topper · ICS (2021)'],
}
