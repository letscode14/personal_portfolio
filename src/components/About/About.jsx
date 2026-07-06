import SystemCore from '../3d_vertex/Systemcore.jsx'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__bg">
        <SystemCore />
      </div>

      <div className="section about__inner">
        <div className="about__panel about__panel--desc">
          <p className="eyebrow">01 — About</p>
          <h2 className="about__heading">
            I'm Arjun — a GoHighLevel developer who
            builds the operating system behind small
            and mid-sized businesses.
          </h2>
          <p className="about__text">
            I specialize in GoHighLevel: building sub-accounts, sales funnels,
            pipelines and automations that turn scattered lead-gen into a
            single, predictable system. Beyond GHL itself, I connect it to
            voice AI agents and third-party tools so that calls get answered,
            leads get qualified and calendars get filled — without anyone on
            the team lifting a finger.
          </p>
          <p className="about__text">
            My day-to-day sits at the intersection of CRM logic, conversational
            AI and integration plumbing: designing the workflow first, then
            wiring GHL, voice platforms, forms and automation tools like
            Make, Zapier and n8n together so every handoff between them is
            invisible to the end user.
          </p>
        </div>

        <div className="about__panel about__panel--stats">
          <p className="eyebrow">By the numbers</p>
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-number">4+</span>
              <span className="eyebrow">years building automations</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">30+</span>
              <span className="eyebrow">GHL systems shipped</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">12</span>
              <span className="eyebrow">voice AI agents deployed</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="hairline about__rule" />
    </section>
  )
}