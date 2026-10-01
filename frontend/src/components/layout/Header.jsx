export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        {/* UAE emblem placeholder */}
        <div style={{
          width: 44, height: 44,
          background: 'linear-gradient(135deg, #c0392b 0%, #8b0000 100%)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 10, fontWeight: 700, textAlign: 'center',
          letterSpacing: 0.5, lineHeight: 1.2
        }}>
          UAE<br/>GOV
        </div>
        <div className="header-logo-divider" />
        <div className="header-logo-text">
          <span className="header-logo-arabic">دائرة التنمـيـة الاقتصادية</span>
          <span className="header-logo-english">Department of Economic Development</span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-lang-badge">ع</div>
        <div className="header-user">
          <div className="header-user-name">Abdullah<br />Mohammed</div>
          <div className="header-avatar">AM</div>
        </div>
      </div>
    </header>
  )
}
