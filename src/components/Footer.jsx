export default function Footer() {
  return (
    <footer className="footer section">
      <hr className="hairline" />
      <div className="footer__row">
        <span className="eyebrow">© 2026 Arjun Padinjarethil</span>
        <span className="eyebrow">GoHighLevel Developer</span>
      </div>

      <style>{`
        .footer { padding: 28px 0 40px; }
        .footer__row {
          display: flex;
          justify-content: space-between;
          padding-top: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }
      `}</style>
    </footer>
  )
}
