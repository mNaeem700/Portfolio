// Original brand logos (from svgl.app), stored in /public/logos.
// Logos whose official mark is black get a white "-dark" version for the dark theme.
const themed = new Set(['apple', 'express', 'aws', 'openai', 'github'])
const base = `${import.meta.env.BASE_URL}logos/`

export const logoName = {
  figma: 'Figma',
  flutter: 'Flutter',
  dart: 'Dart',
  firebase: 'Firebase',
  github: 'GitHub',
  apple: 'Apple',
  'app-store': 'App Store Connect',
  'google-play': 'Google Play Console',
}

export default function Logo({ name, size = 18, className = '' }) {
  const style = { height: size, width: 'auto' }
  if (themed.has(name)) {
    return (
      <span className={`logo logo-pair ${className}`} aria-hidden="true">
        <img className="on-light" src={`${base}${name}.svg`} alt="" style={style} loading="lazy" decoding="async" />
        <img className="on-dark" src={`${base}${name}-dark.svg`} alt="" style={style} loading="lazy" decoding="async" />
      </span>
    )
  }
  return <img className={`logo ${className}`} src={`${base}${name}.svg`} alt="" aria-hidden="true" style={style} loading="lazy" decoding="async" />
}
