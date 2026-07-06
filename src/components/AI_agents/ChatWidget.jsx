import { useState } from 'react'
import Modal from './Modal.jsx'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="chatw__bubble"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M2 10a8 8 0 1 1 3.2 6.4L2 17.5l1.1-3.3A7.96 7.96 0 0 1 2 10Z"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
        <span>Chat</span>
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} labelledBy="chat-modal-title">
        <div className="chatw__modal">
          <p className="eyebrow">Chat with the assistant</p>
          <h3 id="chat-modal-title" className="chatw__title">Ask me anything</h3>

          <div className="chatw__frame">
            <div data-chat-widget data-widget-id="6a4ab3d6c579066080396576" data-location-id="KJdsZd0VIJo3DQTMVkSM"></div>

          </div>
        </div>
      </Modal>

      <style>{`
        .chatw__bubble {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 900;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          background: var(--ink, #111);
          color: var(--bg, #fff);
          border: none;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 180ms ease;
        }
        .chatw__bubble:hover { transform: translateY(-2px); }

        .chatw__title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          margin: 10px 0 20px;
        }
        .chatw__frame {
          border: 1px dashed var(--line);
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chatw__placeholder {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
    </>
  )
}
