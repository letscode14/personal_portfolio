import { useEffect, useState } from 'react'
import logo from './assets/logo_ap.png'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <img src={logo} alt="Arjun Padinjarethil" className="nav__mark" />

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="eyebrow nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="eyebrow">Menu</span>
          <span className={`nav__burger ${open ? 'is-open' : ''}`}>
            <span />
            <span />
          </span>
        </button>
      </div>

      {open && (
        <div className="nav__drawer">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: transparent;
          transition: background 0.3s ease, border-color 0.3s ease;
          border-bottom: 1px solid transparent;
        }
        .nav--scrolled {
          background: rgba(241,239,234,0.85);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--line);
        }
        .nav__inner {
          max-width: var(--container);
          margin: 0 auto;
          padding: 20px var(--gutter);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav__mark {
          font-family: var(--font-display);
         height: 62px;
          letter-spacing: -0.02em;
        }
        .nav__links {
          display: flex;
          gap: 36px;
        }
        .nav__link {
          position: relative;
          padding-bottom: 4px;
        }
        .nav__link:hover { color: var(--ink); }
        .nav__toggle {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav__burger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 22px;
        }
        .nav__burger span {
          height: 1px;
          background: var(--ink);
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .nav__burger.is-open span:first-child { transform: translateY(2.5px) rotate(45deg); }
        .nav__burger.is-open span:last-child { transform: translateY(-2.5px) rotate(-45deg); }
        .nav__drawer {
          display: none;
        }
        @media (max-width: 720px) {
          .nav__links { display: none; }
          .nav__drawer {
            display: flex;
            flex-direction: column;
            background: var(--bg);
            border-bottom: 1px solid var(--line);
            padding: 8px var(--gutter) 24px;
          }
          .nav__drawer a {
            padding: 12px 0;
            font-family: var(--font-display);
            font-size: 22px;
            border-bottom: 1px solid var(--line);
          }
        }
      `}</style>
    </header>
  )
}
