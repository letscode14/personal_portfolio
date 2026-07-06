import { useEffect, useState, useRef } from 'react'

/**
 * Reusable modal with a spring-in / fade-out animation.
 * Usage:
 *   <Modal isOpen={open} onClose={() => setOpen(false)}>
 *     ...content...
 *   </Modal>
 */
export default function Modal({ isOpen, onClose, children, labelledBy }) {
  const [mounted, setMounted] = useState(isOpen)
  const [closing, setClosing] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      setClosing(false)
    } else if (mounted) {
      setClosing(true)
      const t = setTimeout(() => setMounted(false), 220)
      return () => clearTimeout(t)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mounted) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [mounted, onClose])

  if (!mounted) return null

  return (
    <div
      className={`modal__backdrop ${closing ? 'is-closing' : 'is-open'}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`modal__panel ${closing ? 'is-closing' : 'is-open'}`}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
        {children}
      </div>

      <style>{`
        .modal__backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(10, 10, 10, 0.5);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .modal__backdrop.is-open { animation: backdropIn 260ms ease forwards; }
        .modal__backdrop.is-closing { animation: backdropOut 220ms ease forwards; }

        .modal__panel {
          position: relative;
          background: var(--bg, #fff);
          color: var(--ink, #111);
          max-width: 720px;
          width: 100%;
          max-height: 86vh;
          overflow-y: auto;
          border: 1px solid var(--line, #ddd);
          padding: 40px;
        }
        .modal__panel.is-open { animation: panelIn 380ms cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .modal__panel.is-closing { animation: panelOut 200ms ease forwards; }

        .modal__close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid var(--line, #ddd);
          border-radius: 50%;
          color: var(--ink, #111);
          cursor: pointer;
          transition: background 160ms ease, transform 160ms ease;
        }
        .modal__close:hover { background: var(--line, #eee); transform: rotate(90deg); }

        @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes backdropOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes panelIn {
          from { opacity: 0; transform: scale(0.92) translateY(14px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes panelOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.96) translateY(8px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .modal__backdrop, .modal__panel { animation: none !important; }
        }
        @media (max-width: 640px) {
          .modal__panel { padding: 28px 20px; max-height: 90vh; }
        }
      `}</style>
    </div>
  )
}
