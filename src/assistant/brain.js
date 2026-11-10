// Naeem's portfolio assistant — a small, local "brain" trained on src/data.js.
// It runs fully in the browser (no API key, works on GitHub Pages). If VITE_ASSISTANT_API
// is set at build time, questions go to that endpoint first and this brain is the fallback.
import { education, experience, partners, profile, projects, services, skills } from '../data.js'

const first = profile.name.split(' ')[1] || profile.name

const norm = (t) =>
  t
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const tokens = (t) => norm(t).split(' ').filter(Boolean)

// A keyword matches a word if they are equal, or if one is a short inflection of the other
// (project/projects, build/building) — but not a different word (time/timezone).
function hit(words, kw) {
  if (kw.includes(' ')) return ` ${words.join(' ')} `.includes(` ${kw} `)
  return words.some((w) => {
    if (w === kw) return true
    if (kw.length < 4 || w.length < 4) return false
    const [a, b] = w.length > kw.length ? [w, kw] : [kw, w]
    return a.startsWith(b) && a.length - b.length <= 3
  })
}

const contactActions = [
  { label: 'Email Naeem', href: `mailto:${profile.email}?subject=Project%20inquiry` },
  { label: 'WhatsApp', href: profile.whatsapp },
]

const featured = projects.filter((p) => p.featured)

function projectAnswer(p) {
  const lines = [`**${p.title}** — ${p.category} (${p.platforms.join(' & ')})`, p.description]
  if (p.metric) lines.push(`Traction: **${p.metric}**`)
  if (p.role) lines.push(`Naeem's role: ${p.role}`)
  if (p.features) lines.push(`Key features: ${p.features.join(', ')}.`)
  lines.push(`Built with: ${p.stack.join(', ')}.`)
  const actions = []
  if (p.links.appStore) actions.push({ label: 'App Store', href: p.links.appStore })
  if (p.links.playStore) actions.push({ label: 'Google Play', href: p.links.playStore })
  return { text: lines.join('\n'), actions, chips: ['Other projects', 'Hire Naeem'] }
}

const allSkills = skills.flatMap((g) => g.items.map((item) => ({ item, group: g.title })))

const intents = [
  {
    id: 'greet',
    kw: ['hi', 'hello', 'hey', 'salam', 'assalam', 'aoa', 'hola', 'yo', 'good morning', 'good evening'],
    weight: 0.6,
    answer: () => ({
      text: `Hi! 👋 I'm ${first}'s AI assistant. Ask me about his apps, services, experience, tech stack, or how to start a project.`,
      chips: ['What does he build?', 'Show top apps', 'Is he available?', 'How to contact?'],
    }),
  },
  {
    id: 'about',
    kw: ['who', 'about', 'naeem', 'yourself', 'introduce', 'background', 'kon', 'kaun', 'bio', 'summary'],
    weight: 0.8,
    answer: () => ({
      text: `**${profile.name}** is a ${profile.role} based in ${profile.location}.\n${profile.intro}\nHe has 2+ years of production experience, 7+ apps live on the App Store and Google Play, and a B.Sc. in Software Engineering (CGPA 3.82).`,
      actions: [{ label: 'About section', scroll: '#about' }, { label: 'Download CV', href: profile.cv, download: true }],
      chips: ['Experience', 'Top apps', 'Tech stack'],
    }),
  },
  {
    id: 'services',
    kw: ['service', 'services', 'offer', 'build', 'make', 'develop', 'help', 'can you', 'kya banate', 'banwani', 'banwana', 'banate', 'kaam', 'work on', 'provide'],
    answer: () => ({
      text: `Here's what ${first} can build for you:\n${services.map((s) => `• **${s.title}** — ${s.text}`).join('\n')}`,
      actions: [{ label: 'See services', scroll: '#services' }],
      chips: ['Pricing', 'Process', 'Start a project'],
    }),
  },
  {
    id: 'projects',
    kw: ['project', 'projects', 'portfolio', 'apps', 'app', 'work', 'shipped', 'showcase', 'examples', 'top', 'best', 'other', 'published', 'store'],
    answer: () => ({
      text: `${first} has shipped ${projects.length}+ apps. Highlights:\n${featured.map((p) => `• **${p.title}** — ${p.category}${p.metric ? ` · ${p.metric}` : ''}`).join('\n')}\nAlso: ${projects.filter((p) => !p.featured).map((p) => p.title).join(', ')}.`,
      actions: [{ label: 'View work', scroll: '#work' }],
      chips: featured.slice(0, 3).map((p) => `Tell me about ${p.title}`),
    }),
  },
  {
    id: 'experience',
    kw: ['experience', 'job', 'jobs', 'company', 'companies', 'worked', 'career', 'employer', 'current', 'tajurba', 'years', 'arure', 'unique', 'coder', 'tmc', 'giz', 'sspa', 'srso'],
    answer: () => ({
      text: `${first}'s experience:\n${experience.map((j) => `• **${j.company}** — ${j.role} (${j.period}) · ${j.place}`).join('\n')}\nAt Arure he represents TMC on SSPA projects delivered with GIZ and SRSO.`,
      actions: [{ label: 'Experience', scroll: '#experience' }],
      chips: ['Tech stack', 'Education', 'Hire Naeem'],
    }),
  },
  {
    id: 'clients',
    kw: ['client', 'clients', 'partner', 'partners', 'worked with', 'organisation', 'organisations', 'organization', 'organizations', 'brands', 'customers'],
    answer: () => ({
      text: `${first} has worked with and delivered for:\n${partners.map((p) => `• **${p.name}**${p.full ? ` — ${p.full}` : ''}`).join('\n')}`,
      actions: partners.slice(0, 4).map((p) => ({ label: p.name, href: p.url })),
      chips: ['Experience', 'Top apps'],
    }),
  },
  {
    id: 'skills',
    kw: ['skill', 'skills', 'stack', 'tech', 'technology', 'technologies', 'tools', 'language', 'languages', 'framework', 'know', 'expert', 'expertise'],
    answer: () => ({
      text: `${first}'s toolkit:\n${skills.map((g) => `• **${g.title}:** ${g.items.join(', ')}`).join('\n')}`,
      actions: [{ label: 'Toolkit', scroll: '#skills' }],
      chips: ['Does he know Kotlin?', 'AI integration', 'Top apps'],
    }),
  },
  {
    id: 'ai',
    kw: ['ai', 'llm', 'openai', 'gpt', 'gemini', 'claude', 'chatbot', 'machine learning', 'ml', 'vision', 'artificial'],
    answer: () => {
      const evoke = projects.find((p) => p.id === 'evoke')
      return {
        text: `Yes — AI integration is one of ${first}'s specialities: LLM chat, image generation and computer-vision features with OpenAI, Gemini and Claude.\nShipped examples: **${evoke.title}** (AI image studio, ${evoke.metric}), **Hashtag AI Expert** and the AI creator search in **Inlinker**.`,
        actions: [{ label: 'View work', scroll: '#work' }],
        chips: ['Tell me about Evoke AI', 'Pricing', 'Start a project'],
      }
    },
  },
  {
    id: 'education',
    kw: ['education', 'degree', 'university', 'study', 'studied', 'cgpa', 'gpa', 'graduate', 'iub', 'islamia', 'parhai', 'qualification'],
    answer: () => ({
      text: `**${education.degree}** — ${education.school} (${education.period})\n${education.grade}\n${education.extra.map((e) => `• ${e}`).join('\n')}`,
      chips: ['Experience', 'Tech stack'],
    }),
  },
  {
    id: 'availability',
    kw: ['available', 'availability', 'freelance', 'remote', 'hire', 'hiring', 'full time', 'part time', 'open to', 'free', 'job offer', 'relocate', 'contract'],
    answer: () => ({
      text: `${first} is **available for freelance projects and remote roles**, working with clients in the UAE, Pakistan and worldwide. He usually replies within 24 hours.`,
      actions: contactActions,
      chips: ['Pricing', 'Process', 'Timezone'],
    }),
  },
  {
    id: 'pricing',
    kw: ['price', 'pricing', 'cost', 'rate', 'rates', 'budget', 'charge', 'charges', 'fee', 'quote', 'estimate', 'kitne', 'paise', 'paisa', 'hourly', 'how much'],
    answer: () => ({
      text: `Pricing depends on scope — screens, backend, integrations and timeline. ${first} works on **fixed-price milestones** or **hourly/monthly** engagements.\nShare a short brief (idea, platforms, deadline) and you'll get a clear estimate, usually within 24 hours.`,
      actions: contactActions,
      chips: ['Process', 'How long does an app take?'],
    }),
  },
  {
    id: 'timeline',
    kw: ['how long', 'long', 'time', 'timeline', 'duration', 'weeks', 'months', 'deadline', 'fast', 'quick', 'kitna time', 'kab tak', 'mvp'],
    weight: 0.8,
    answer: () => ({
      text: `Typical timelines:\n• **MVP** with core features: ~4–8 weeks\n• **Full product** with backend, payments and admin: ~2–4 months\nYou get weekly builds, so you see progress the whole way.`,
      chips: ['Process', 'Pricing', 'Start a project'],
    }),
  },
  {
    id: 'process',
    kw: ['process', 'workflow', 'approach', 'steps', 'method', 'how do you work', 'how does he work', 'tarika'],
    answer: () => ({
      text: `${first}'s process:\n• **Discover** — goals, users and scope turned into a plan and estimate\n• **Design** — flows and UI in Figma, reviewed with you first\n• **Build** — Clean Architecture, weekly builds, transparent progress\n• **Launch** — store release, monitoring and support after go-live`,
      actions: [{ label: 'Services', scroll: '#services' }],
      chips: ['Pricing', 'Start a project'],
    }),
  },
  {
    id: 'contact',
    kw: ['contact', 'email', 'mail', 'phone', 'call', 'whatsapp', 'number', 'reach', 'talk', 'message', 'linkedin', 'github', 'rabta', 'start', 'start a project', 'connect'],
    answer: () => ({
      text: `You can reach ${first} directly:\n• Email: **${profile.email}**\n• WhatsApp / phone: **${profile.phone}**\n• LinkedIn and GitHub are linked below.`,
      actions: [...contactActions, { label: 'LinkedIn', href: profile.linkedin }, { label: 'GitHub', href: profile.github }],
      chips: ['Pricing', 'Is he available?'],
    }),
  },
  {
    id: 'cv',
    kw: ['cv', 'resume', 'resum'],
    answer: () => ({
      text: `Here's ${first}'s CV — it covers his experience, apps, skills and education.`,
      actions: [{ label: 'Download CV', href: profile.cv, download: true }],
      chips: ['Experience', 'Contact'],
    }),
  },
  {
    id: 'location',
    kw: ['where', 'location', 'based', 'city', 'country', 'timezone', 'time zone', 'pakistan', 'lahore', 'kahan'],
    weight: 0.8,
    answer: () => ({
      text: `${first} is based in **${profile.location}** (PKT, UTC+5) and works remotely with teams in the UAE, Europe and beyond — overlapping hours are easy to arrange.`,
      chips: ['Is he available?', 'Contact'],
    }),
  },
  {
    id: 'platforms',
    kw: ['ios', 'android', 'iphone', 'cross platform', 'cross-platform', 'native', 'web', 'website'],
    weight: 0.9,
    answer: () => ({
      text: `${first} builds for **iOS and Android** from one Flutter codebase, and goes native with **Kotlin** (and Swift where needed) for platform features. Flutter web and admin dashboards are possible too, but mobile apps are his core.`,
      chips: ['Tech stack', 'Top apps'],
    }),
  },
  {
    id: 'thanks',
    kw: ['thanks', 'thank', 'shukriya', 'great', 'awesome', 'nice', 'cool', 'ok', 'okay', 'bye'],
    weight: 0.5,
    answer: () => ({
      text: `Happy to help! If you have a project in mind, ${first} would love to hear about it.`,
      actions: contactActions,
    }),
  },
]

// Pick the best answer for a message. Specific matches (a project or a skill) beat generic intents.
export function localReply(message) {
  const words = tokens(message)
  const text = words.join(' ')
  if (!words.length) return intents[0].answer()

  // 1) A specific project mentioned by name
  const proj = projects.find((p) => {
    const n = norm(p.title)
    return text.includes(n) || text.includes(n.replace(/\s+/g, '')) || words.includes(p.id) || (n.split(' ')[0].length > 4 && words.includes(n.split(' ')[0]))
  })
  if (proj) return projectAnswer(proj)

  // 2) Score generic intents
  let best = null
  let bestScore = 0
  for (const it of intents) {
    let score = 0
    for (const k of it.kw) if (hit(words, k)) score += k.includes(' ') ? 2 : 1
    score *= it.weight ?? 1
    if (score > bestScore) {
      best = it
      bestScore = score
    }
  }

  // 3) "Does he know X?" — a specific skill mentioned
  const skill = allSkills.find(({ item }) => {
    const n = norm(item)
    return n.length > 1 && (text === n || new RegExp(`(^|\\s)${n.replace(/[.+#]/g, '\\$&')}(\\s|$)`).test(text))
  })
  if (skill && (!best || ['skills', 'about', 'services'].includes(best.id) || bestScore < 1.5)) {
    return {
      text: `Yes — ${first} works with **${skill.item}**. It's part of his **${skill.group}** toolkit.\nOther tools in that area: ${skills.find((g) => g.title === skill.group).items.filter((i) => i !== skill.item).join(', ')}.`,
      actions: [{ label: 'Toolkit', scroll: '#skills' }],
      chips: ['Top apps', 'Hire Naeem'],
    }
  }

  if (best && bestScore >= 0.5) return best.answer()

  return {
    text: `I'm not sure about that one — I only know about ${first}'s work, services and experience. Try one of these, or ask ${first} directly:`,
    actions: contactActions,
    chips: ['What does he build?', 'Show top apps', 'Pricing', 'Experience'],
  }
}

// Compact knowledge pack — sent to a remote LLM endpoint as context when one is configured.
export function knowledge() {
  return {
    profile,
    services: services.map((s) => `${s.title}: ${s.text}`),
    projects: projects.map((p) => ({ title: p.title, category: p.category, platforms: p.platforms, description: p.description, metric: p.metric, stack: p.stack, links: p.links })),
    experience,
    skills,
    education,
  }
}

export const welcome = {
  text: `Hi! 👋 I'm ${first}'s AI assistant. I know his apps, services, experience and stack — ask me anything.`,
  chips: ['What does he build?', 'Show top apps', 'Is he available?', 'Pricing'],
}

// Normalise chip labels that don't contain obvious keywords.
const chipAlias = {
  'Hire Naeem': 'Is he available for hire?',
  'Other projects': 'Show top apps',
  'Start a project': 'How do I contact him to start a project?',
  Timezone: 'What timezone is he in?',
}
export const expandChip = (c) => chipAlias[c] || c

export async function reply(message, history) {
  const api = import.meta.env.VITE_ASSISTANT_API
  if (api) {
    try {
      const ctrl = new AbortController()
      const t = setTimeout(() => ctrl.abort(), 15000)
      const res = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: history.slice(-10), knowledge: knowledge() }),
        signal: ctrl.signal,
      })
      clearTimeout(t)
      if (res.ok) {
        const data = await res.json()
        if (data?.reply) return { text: String(data.reply), chips: [] }
      }
    } catch (e) {
      // fall through to the local brain
    }
  }
  return localReply(message)
}
