import { useEffect, useRef, useState } from 'react'
import VoiceOrb from '../3d_vertex/VoiceOrb.jsx'
import './VoiceAgents.css'

const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID
const PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY

export default function VoiceAgentSection() {
  const vapiRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | connecting | live
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    let cancelled = false

    import('@vapi-ai/web').then((mod) => {
      if (cancelled) return
      const Vapi = mod.default?.default || mod.default
      const vapi = new Vapi(PUBLIC_KEY)
      vapiRef.current = vapi

      vapi.on('call-start', () => setStatus('live'))
      vapi.on('call-end', () => {
        setStatus('idle')
        setIsSpeaking(false)
      })
      vapi.on('speech-start', () => setIsSpeaking(true))
      vapi.on('speech-end', () => setIsSpeaking(false))
    })

    return () => {
      cancelled = true
      vapiRef.current?.stop()
    }
  }, [])

  const handleToggle = () => {
    if (status === 'idle') {
      setStatus('connecting')
      vapiRef.current?.start(ASSISTANT_ID)
    } else {
      vapiRef.current?.stop()
      setStatus('idle')
      setIsSpeaking(false)
    }
  }

  const isActive = status !== 'idle'
  const isLive = status === 'live'
  const statusLabel =
    status === 'live' ? (isSpeaking ? 'Speaking' : 'Listening') : status === 'connecting' ? 'Connecting' : 'Idle'
  const buttonLabel = isLive ? 'End call' : status === 'connecting' ? 'Connecting…' : 'Start voice call'

  return (
    <section id="voice-agents" className="voice section">

      <div className="voice__head">
        <p className="eyebrow">04 — Voice Agents</p>
        <h2 className="voice__heading">Talk to one, right now</h2>
        <p className="voice__sub">
          A live agent, not a demo video. It answers, qualifies and books —
          the same system running behind client phone lines today.
        </p>
      </div>

      <div className="voice__stage">
        <div className="voice__orb">
          <VoiceOrb active={isActive} color={isLive ? '#f5f5f2' : '#3d3d3b'} />
        </div>

        <div className="voice__status">
          <span className={`voice__dot ${isActive ? 'is-live' : ''}`} />
          <span className="voice__statusLabel">{statusLabel}</span>
        </div>

        <div className="voice__controls">
          <button
            className={`btn-vapi  voice__cta ${isLive ? 'is-live' : ''}`}
            onClick={handleToggle}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  )
}