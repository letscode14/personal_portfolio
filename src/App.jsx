import { Routes, Route } from 'react-router-dom'
import GrainOverlay from './components/GrainOverlay.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import VoiceAgentSection from './components/VoiceAgent/VoiceAgentSection.jsx'
import WebsiteSection from './components/WebDesignSection/WebDesignsSection.jsx'
import ChatWidget from './components/AI_agents/ChatWidget.jsx'

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <VoiceAgentSection />

        <Contact />
      </main>

      <Footer />
    </>
  )
}

function DesignsPage() {
  return <WebsiteSection standalone />
}

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/designs" element={<DesignsPage />} />
      </Routes>
    </>
  )
}