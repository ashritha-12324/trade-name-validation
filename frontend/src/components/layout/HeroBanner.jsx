export default function HeroBanner({ eyebrow, title }) {
  return (
    <div className="hero-banner">
      {eyebrow && <div className="hero-banner-eyebrow">{eyebrow}</div>}
      <div className="hero-banner-title">{title}</div>
    </div>
  )
}
