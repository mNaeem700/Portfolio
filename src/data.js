// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: 'Muhammad Naeem',
  first: 'Muhammad',
  last: 'Naeem',
  role: 'Flutter & Software Developer',
  location: 'Lahore, Pakistan',
  timezone: 'GMT+5',
  email: 'mnaeemkachala@gmail.com',
  phone: '+92 317 647 7369',
  whatsapp: 'https://wa.me/923176477369',
  linkedin: 'https://www.linkedin.com/in/muhammad-naeem-586264391/',
  github: 'https://github.com/mNaeem700',
  photo: '/naeem.jpg',
  intro:
    'I design, build and ship cross-platform mobile apps that real people use every day — from real-time social networks to AI-powered creative tools — for clients across the UAE, Pakistan and beyond.',
}

export const stats = [
  { value: 2, suffix: '+', label: 'Years shipping production apps' },
  { value: 5, suffix: '+', label: 'Apps live on App Store & Play' },
  { value: 3, suffix: '', label: 'Companies & international teams' },
  { value: 3.82, suffix: '', decimals: 2, label: 'CGPA · B.Sc. Software Engineering' },
]

export const projects = [
  {
    id: 'dapup',
    title: 'DapUp',
    category: 'Social Networking',
    platforms: ['iOS', 'Android'],
    year: '2025',
    color: '#ff6b3d',
    description:
      'A real-time, location-based social platform that helps people discover nearby friends through mutual connections — with live maps, a moments feed and instant messaging.',
    features: ['Moments Feed', "Who's Around", 'Nearest Mutuals Map', '1:1 & Group Chat', 'Real-Time Location'],
    stack: ['Flutter', 'Firebase', 'Google Maps', 'REST APIs', 'Real-Time Messaging'],
    icon: '/apps/dapup-icon.jpg',
    shots: ['/apps/dapup-1.jpg', '/apps/dapup-2.jpg', '/apps/dapup-3.jpg'],
    links: {
      appStore: 'https://apps.apple.com/pk/app/dapup/id6745735586',
      playStore: 'https://play.google.com/store/apps/details?id=com.arure.dapup',
    },
  },
  {
    id: 'shedrives',
    title: 'SheDrives',
    category: 'Ride-Sharing · Safety',
    platforms: ['iOS', 'Android'],
    year: '2024',
    color: '#e84393',
    description:
      'A women-exclusive ride-sharing app connecting verified female drivers with female passengers — built around trust, with live tracking and one-tap SOS support.',
    features: ['Verified Rides', 'Live Tracking', 'SOS Support', 'Transparent Pricing', 'Ratings & Reviews'],
    stack: ['Flutter', 'Firebase', 'Google Maps', 'REST APIs', 'Push Notifications'],
    icon: '/apps/shedrives-icon.jpg',
    shots: ['/apps/shedrives-1.jpg', '/apps/shedrives-2.jpg', '/apps/shedrives-3.jpg'],
    links: {
      appStore: 'https://apps.apple.com/pk/app/shedrives/id6670424505',
      playStore: 'https://play.google.com/store/apps/details?id=com.mtech.sdrives',
    },
  },
  {
    id: 'evoke',
    title: 'Evoke AI',
    category: 'AI · Creative Tools',
    platforms: ['iOS', 'Android'],
    year: '2025',
    color: '#8b5cf6',
    description:
      'An AI creative studio in your pocket — generate, edit, restore and transform images with cloud AI pipelines, from background removal to text-to-image and image-to-video.',
    features: ['AI Image Generation', 'Background & Object Removal', 'Photo Restoration', 'AI Avatars', 'Image-to-Video'],
    stack: ['Flutter', 'Firebase', 'AI APIs', 'Cloud Storage', 'REST APIs'],
    icon: '/apps/evoke-icon.jpg',
    shots: ['/apps/evoke-1.jpg', '/apps/evoke-2.jpg', '/apps/evoke-3.jpg'],
    links: {
      appStore: 'https://apps.apple.com/pk/app/evoke-ai-photo-pdf-editor/id6751753667',
      playStore: 'https://play.google.com/store/apps/details?id=com.bgremover.tools',
    },
  },
  {
    id: 'hashtag',
    title: 'Hashtag AI Expert',
    category: 'AI · Productivity',
    platforms: ['iOS'],
    year: '2026',
    color: '#06b6d4',
    description:
      'An AI assistant for creators and brands that generates optimised hashtags, captions and content strategies using LLMs and careful prompt engineering.',
    features: ['Smart Hashtags', 'AI Captions', 'Content Strategy', 'Trend Insights'],
    stack: ['Flutter', 'LLM APIs', 'Firebase', 'REST APIs'],
    icon: '/apps/hashtag-icon.jpg',
    shots: ['/apps/hashtag-1.jpg', '/apps/hashtag-2.jpg', '/apps/hashtag-3.jpg'],
    links: {
      appStore: 'https://apps.apple.com/pk/app/hashtag-expert-ai/id6758021359',
    },
  },
  {
    id: 'skylink',
    title: 'Skylink TV',
    category: 'IPTV Streaming',
    platforms: ['Android'],
    year: '2024',
    color: '#3b82f6',
    description:
      'A secure IPTV streaming app for verified subscribers — live TV with authenticated access, smooth high-quality playback and an efficient content-delivery backend.',
    features: ['Live TV', 'Secure Authentication', 'HD Playback', 'Subscriber Verification'],
    stack: ['Flutter', 'Video Streaming', 'REST APIs', 'Firebase'],
    icon: null,
    shots: [],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.skylink5.sdsiptv',
    },
  },
]

export const experience = [
  {
    company: 'Arure Technologies',
    role: 'Software & App Developer',
    place: 'Pakistan · in alignment with TMC',
    period: 'Present',
    current: true,
    points: [
      'Building and maintaining government-scale digital solutions delivered in alignment with TMC.',
      'Owning mobile and software development end-to-end — from architecture to release.',
      'Shipped DapUp, a real-time location-based social platform on iOS and Android.',
    ],
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
      'Architect scalable apps with Clean Architecture and MVVM; manage full App Store & Play Store releases.',
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
  {
    title: 'Mobile',
    items: ['Flutter', 'Dart', 'Kotlin', 'Swift', 'Android SDK', 'iOS', 'Material & Cupertino'],
  },
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
