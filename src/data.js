// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: 'Muhammad Naeem',
  role: 'Flutter & Software Developer',
  location: 'Lahore, Pakistan',
  email: 'mnaeemkachala@gmail.com',
  phone: '+92 317 647 7369',
  whatsapp: 'https://wa.me/923176477369',
  linkedin: 'https://www.linkedin.com/in/muhammad-naeem-586264391/',
  github: 'https://github.com/mNaeem700',
  photo: '/naeem.jpg',
  cv: '/Muhammad_Naeem_CV.pdf',
  intro:
    'I design, build and ship cross-platform mobile apps — from real-time social networks to AI tools and public-sector systems — for clients in the UAE, Pakistan and beyond.',
}

export const partners = ['SSPA Sindh', 'GIZ', 'SRSO', 'TMC', 'Arure Technologies', 'Unique Solutions UAE', 'Coder Space']

export const stats = [
  { value: 2, suffix: '+', label: 'Years building production apps' },
  { value: 8, suffix: '+', label: 'Apps shipped to App Store & Google Play' },
  { value: 3, suffix: '', label: 'Development partners — GIZ, SSPA & SRSO' },
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
  { step: '01', title: 'Discover', text: 'Goals, users and scope — turned into a clear plan and estimate.' },
  { step: '02', title: 'Design', text: 'Flows and UI in Figma, reviewed with you before a line of code.' },
  { step: '03', title: 'Build', text: 'Clean Architecture, weekly builds and transparent progress.' },
  { step: '04', title: 'Launch', text: 'Store release, monitoring and support after go-live.' },
]

// Featured projects get the large showcase layout; the rest appear in the grid.
export const projects = [
  {
    id: 'dapup',
    featured: true,
    title: 'DapUp',
    category: 'Social Networking',
    platforms: ['iOS', 'Android'],
    color: '#c6f432',
    description:
      'A real-time, location-based social platform that helps people discover nearby friends through mutual connections — with live maps, a moments feed and instant messaging.',
    features: ['Moments Feed', "Who's Around", 'Nearest Mutuals Map', '1:1 & Group Chat', 'Real-Time Location'],
    stack: ['Flutter', 'Firebase', 'Google Maps', 'Realtime'],
    icon: '/apps/dapup-icon.jpg',
    shots: ['/apps/dapup-1.jpg', '/apps/dapup-2.jpg', '/apps/dapup-3.jpg'],
    links: {
      appStore: 'https://apps.apple.com/pk/app/dapup/id6745735586',
      playStore: 'https://play.google.com/store/apps/details?id=com.arure.dapup',
    },
  },
  {
    id: 'shedrives',
    featured: true,
    title: 'SheDrives',
    category: 'Ride-Sharing · Safety',
    platforms: ['iOS', 'Android'],
    color: '#f0469b',
    description:
      'A women-exclusive ride-sharing app connecting verified female drivers with female passengers — built around trust, with live tracking and one-tap SOS support.',
    features: ['Verified Rides', 'Live Tracking', 'SOS Support', 'Transparent Pricing', 'Ratings & Reviews'],
    stack: ['Flutter', 'Firebase', 'Google Maps', 'Push Notifications'],
    icon: '/apps/shedrives-icon.jpg',
    shots: ['/apps/shedrives-1.jpg', '/apps/shedrives-2.jpg', '/apps/shedrives-3.jpg'],
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
    description:
      'An AI creative studio in your pocket — generate, edit, restore and convert images and files with cloud AI pipelines, from background removal to text-to-image.',
    features: ['AI Image Generation', 'Background Removal', 'Photo Restoration', 'File Conversion', 'Image-to-Video'],
    stack: ['Flutter', 'Firebase', 'AI APIs', 'Cloud Storage'],
    icon: '/apps/evoke-icon.jpg',
    shots: ['/apps/evoke-1.jpg', '/apps/evoke-2.jpg', '/apps/evoke-3.jpg'],
    links: {
      appStore: 'https://apps.apple.com/pk/app/evoke-ai-photo-pdf-editor/id6751753667',
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
    description:
      'A marketplace where brands find the right content creators and influencers — AI-powered search, direct messaging, job posts and secure escrow-style payments.',
    features: ['AI Creator Search', 'Direct Messaging', 'Post Jobs', 'Secure Payments', 'Delivery Approval'],
    stack: ['Flutter', 'Firebase', 'AI Search', 'Payments'],
    icon: '/apps/inlinker-icon.jpg',
    shots: ['/apps/inlinker-1.jpg', '/apps/inlinker-2.jpg', '/apps/inlinker-3.jpg'],
    links: {
      appStore: 'https://apps.apple.com/app/inlinker/id6757296583',
      playStore: 'https://play.google.com/store/apps/details?id=com.arure.inlinker',
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
    icon: '/apps/hashtag-icon.jpg',
    cover: '/apps/hashtag-2.jpg',
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
    description: 'A real-time chat app by Arure Technologies, built for fast, reliable one-to-one and group conversations.',
    stack: ['Flutter', 'Firebase', 'Realtime'],
    links: { playStore: 'https://play.google.com/store/apps/details?id=arure.chatified' },
  },
  {
    id: 'skylink',
    title: 'Skylink TV',
    category: 'IPTV Streaming',
    platforms: ['Android'],
    color: '#0ea5e9',
    art: 'tv',
    description: 'Secure IPTV streaming for verified subscribers — authenticated live TV with smooth HD playback.',
    stack: ['Flutter', 'Video Streaming', 'REST APIs'],
    links: {},
  },
]

export const experience = [
  {
    company: 'Arure Technologies',
    role: 'Software Developer · TMC',
    place: 'Pakistan · Public-sector & product development',
    period: 'Present',
    current: true,
    points: [
      'Representing TMC as a software developer on digital projects for the Sindh Social Protection Authority (SSPA).',
      'Delivering in partnership with GIZ — the German government’s international development agency — and in alignment with SRSO (Sindh Rural Support Organisation).',
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
