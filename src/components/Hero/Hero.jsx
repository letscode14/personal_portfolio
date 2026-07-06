import AutomationGraph from '../3d_vertex/AutomationGraph.jsx'
import avatar from '../assets/avatar.jpg'
import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__ghost" aria-hidden="true">AP</div>

      <div className="hero__grid section">
        <div className="hero__col hero__col--left">
          <p className="eyebrow">GoHighLevel Developer — 2026</p>
          <h2 className="hero__title">
            Building the
            <br /> automation
            <br /> behind growth.
          </h2>
          <p className="hero__desc">
            I design and build GoHighLevel systems, voice AI agents and
            integration pipelines that let businesses run on autopilot.
          </p>
          <div className="hero__cta">
            <a href="#work" className="btn btn--filled">View Work</a>
            <a href="#contact" className="btn btn--outline">Get in Touch</a>
          </div>
        </div>

        <div className="hero__stage">
          <AutomationGraph interactive />
          <img
            src={avatar}
            alt="Arjun Padinjarethil"
            className="hero__avatar"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            width="200"
            height="200"
          />
        </div>

        <div className="hero__col hero__col--right">
          <nav className="hero__quicklinks eyebrow">
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="hero__badge">
            <span className="hero__badge-star">✦</span>
            <span className="hero__badge-star">✦</span>
            <span className="hero__badge-star">✦</span>
          </div>
          <h3 className="hero__subtitle">
            Systems that work while you don't.
          </h3>
          <p className="hero__desc hero__desc--right">
            From lead capture to booked call, every handoff scripted,
            connected and automated — no manual busywork in between.
          </p>
        </div>
      </div>

      <hr className="hairline hero__rule" />
    </section>
  )
}