import { lazy, Suspense, useState, useRef, useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navLinks, secondaryLinks } from '../config/navigation'
import SOCIAL_LINK_ITEMS from '../data/socialLinks'
import Container from './ui/Container'
import SocialLinks from './ui/SocialLinks'
import { scrollToId } from '../utils/scrollToId'

const OrbitGame = lazy(() => import('./OrbitGame'))

/* ── Constants ─────────────────────────────────────────────────────────── */

const LAUNCH_MS = 2200
const EXIT_MS   = 1600

const STARS = Array.from({ length: 88 }, (_, i) => ({
  x: ((i * 137.508 + 31) % 99).toFixed(1),
  y: ((i * 97.31  + 19) % 98).toFixed(1),
  r: i % 9 === 0 ? 1.5 : 1,
  o: +(0.07 + (i % 11) * 0.055).toFixed(2),
}))

/* ── Stars ──────────────────────────────────────────────────────────────── */

function Stars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="space-star absolute block rounded-full"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r, opacity: s.o }}
        />
      ))}
    </div>
  )
}

/* ── Rocket SVG ─────────────────────────────────────────────────────────── */

function Rocket({ className, showFlame = false, style }) {
  return (
    <svg
      viewBox="0 0 44 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M12 57 L2 73 L12 70 Z"  fill="var(--color-rocket-structure)" />
      <path d="M32 57 L42 73 L32 70 Z" fill="var(--color-rocket-structure)" />
      <path d="M14 23 L12 65 L32 65 L30 23 Z" fill="var(--color-rocket-shell)" />
      <path d="M22 4 C16 6 12 15 12 23 L32 23 C32 15 28 6 22 4 Z"  fill="var(--color-rocket-highlight)" />
      <path d="M22 4 C20 8 18 17 18 23 L26 23 C26 17 24 8 22 4 Z"   fill="var(--color-rocket-shadow)" />
      <circle cx="22" cy="35" r="6"   fill="none" stroke="var(--color-rocket-window-frame)" strokeWidth="1.5" />
      <circle cx="22" cy="35" r="4.5" fill="var(--color-rocket-window)" />
      <circle cx="20.5" cy="33.5" r="1.2" fill="var(--color-rocket-window-glint)" opacity="0.7" />
      <rect x="16" y="63" width="12" height="5" rx="2.5" fill="var(--color-rocket-window-frame)" />
      <path d="M17 68 L15 77 L29 77 L27 68 Z" fill="var(--color-rocket-engine)" />
      {showFlame ? (
        <g className="space-rocket-flame">
          <ellipse cx="22" cy="83" rx="6"   ry="11"  fill="var(--color-space-flame)" opacity="0.88" />
          <ellipse cx="22" cy="87" rx="4"   ry="7.5" fill="var(--color-space-flame-hot)" opacity="0.92" />
          <ellipse cx="22" cy="90" rx="2.2" ry="4.5" fill="var(--color-space-flame-core)" opacity="0.70" />
        </g>
      ) : (
        <ellipse cx="22" cy="80" rx="2" ry="2.5" fill="var(--color-space-flame)" opacity="0.18" />
      )}
    </svg>
  )
}

/* ── Confirmation modal ─────────────────────────────────────────────────── */

function ConfirmModal({ onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCancel() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-canvas/80 backdrop-blur-md" onClick={onCancel} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bh-modal-title"
        className="bh-modal-enter relative z-10 w-full max-w-[340px] rounded-panel border border-line bg-surface p-8"
      >
        <p
          className="space-warning mb-5 text-center font-mono text-micro uppercase tracking-[0.18em]"
        >
          ⚠ Time Dilation Warning
        </p>
        <h2 id="bh-modal-title" className="mb-3 text-center font-display text-title text-foreground">
          Are you sure?
        </h2>
        <p className="mb-8 text-center text-small text-muted leading-relaxed">
          It might pass years.
          <br />
          Or never at all.
          <br />
          Still want to go?
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-tile border border-line py-3 text-small text-muted transition-colors duration-200 hover:border-foreground/30 hover:text-foreground"
          >
            Abort
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-tile py-3 text-small font-semibold transition-opacity duration-200 hover:opacity-90"
            style={{ background: 'rgb(var(--color-foreground-rgb))', color: 'rgb(var(--color-canvas-rgb))' }}
          >
            Launch
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Full-screen space transition overlay ───────────────────────────────── */

function SpaceOverlay({ seqAnimation, rocketAnimation, label }) {
  return (
    <div
      className="space-scene-bg fixed inset-0 z-overlay flex flex-col items-center justify-center overflow-hidden"
      style={{ animation: seqAnimation }}
    >
      <Stars />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <Rocket className="w-14 h-auto" showFlame style={{ animation: rocketAnimation }} />
        <p className="space-label font-mono text-micro uppercase tracking-[0.2em] animate-pulse">
          {label}
        </p>
      </div>
    </div>
  )
}

/* ── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  const year = new Date().getFullYear()
  const navigate = useNavigate()
  const location = useLocation()

  // Phase machine: idle → confirming → launching → playing → done → exiting → idle
  const [phase, setPhase]     = useState('idle')
  const [gameKey, setGameKey] = useState(0)
  const timerRef = useRef(null)
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const clearT = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const handleLaunch = useCallback(() => {
    if (reducedMotion.current) { setPhase('playing'); return }
    setPhase('launching')
    clearT()
    timerRef.current = setTimeout(() => setPhase('playing'), LAUNCH_MS)
  }, [clearT])

  const handleDone = useCallback(() => setPhase('done'), [])

  const handleExit = useCallback(() => {
    if (reducedMotion.current) { setGameKey(k => k + 1); setPhase('idle'); return }
    setPhase('exiting')
    clearT()
    timerRef.current = setTimeout(() => {
      setGameKey(k => k + 1)
      setPhase('idle')
    }, EXIT_MS)
  }, [clearT])

  useEffect(() => () => clearT(), [clearT])

  const goToSection = (id) => {
    if (location.pathname !== '/') { navigate(`/#${id}`); return }
    scrollToId(id)
  }

  const teaserVisible    = phase === 'idle' || phase === 'confirming'
  // Mounted during 'launching' so the canvas warms up behind the overlay —
  // when the overlay fades, the game is already rendered and ship appears
  // 350ms after autoStart fires.
  const gameInDOM        = phase === 'launching' || phase === 'playing' || phase === 'done' || phase === 'exiting'
  const gameFullyVisible = phase === 'playing' || phase === 'done'

  return (
    <footer className="relative overflow-hidden border-t border-line bg-canvas py-12">
      <Container className="relative z-10">

        {/* ── Fixed overlays — position:fixed escapes footer's overflow:hidden ── */}
        {phase === 'confirming' && (
          <ConfirmModal onConfirm={handleLaunch} onCancel={() => setPhase('idle')} />
        )}
        {phase === 'launching' && (
          <SpaceOverlay
            seqAnimation={`launchOverlaySeq ${LAUNCH_MS}ms ease-in-out forwards`}
            rocketAnimation={`rocketLaunchAscent ${Math.round(LAUNCH_MS * 0.8)}ms ease-in forwards`}
            label="Approaching event horizon"
          />
        )}
        {phase === 'exiting' && (
          <SpaceOverlay
            seqAnimation={`exitOverlaySeq ${EXIT_MS}ms ease-in-out forwards`}
            rocketAnimation={`rocketLandDescent ${Math.round(EXIT_MS * 0.85)}ms ease-out forwards`}
            label="Returning to orbit"
          />
        )}

        {/* ── Game area ───────────────────────────────────────────────────── */}
        <div className="mb-8">

          {/* COMPACT TEASER — visible only when game is not active.
              Small footprint: the rocket is parked, not demanding attention. */}
          {teaserVisible && (
            <div className="overflow-hidden rounded-panel border border-line">
              <div
                className="space-teaser-bg relative flex flex-col items-center gap-5 overflow-hidden px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-6"
              >
                <Stars />

                {/* Rocket — compact, floating */}
                <div className="space-rocket-float relative z-10 flex-shrink-0">
                  <Rocket className="w-10 h-auto" />
                  <div className="space-rocket-glow absolute -bottom-1 left-1/2 -translate-x-1/2 h-4 w-8 rounded-full blur-lg" />
                </div>

                {/* Copy */}
                <div className="relative z-10 min-w-0 flex-1 text-center sm:text-left">
                  <p className="space-label mb-0.5 font-mono text-micro uppercase tracking-[0.18em]">
                    Coordinates: Sagittarius A*
                  </p>
                  <p className="font-display text-muted text-foreground">
                    Travel to the Black Hole
                  </p>
                  <p className="text-small text-muted">
                    One-way ticket. No refunds. Time dilation not included.
                  </p>
                </div>

                {/* CTA */}
                <div className="relative z-10 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setPhase('confirming')}
                    className="space-cta inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-small"
                  >
                    Initiate Journey
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                      <path
                        d="M1.5 6.5h10M7 2.5l4.5 4L7 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* GAME PANEL — grows from 0 → full height as the launch overlay fades.
              The panel itself IS the landing animation: a hatch opening into
              the black hole simulation. grid-template-rows is the only
              performant way to animate height to/from auto. */}
          {gameInDOM && (
            <div
              className="bh-expand-grid overflow-hidden rounded-panel border border-line"
              style={{
                gridTemplateRows: gameFullyVisible ? '1fr' : '0fr',
                // Border fades with the panel so there's no ghost 1px line at 0fr
                borderColor: gameFullyVisible ? 'var(--color-line)' : 'transparent',
              }}
            >
              {/* overflow:hidden + min-h:0 are required for grid-rows trick */}
              <div className="min-h-0 overflow-hidden">
                <Suspense fallback={<div className="space-game-fallback" role="status" aria-label="Loading black hole simulation" />}>
                  <OrbitGame
                    key={gameKey}
                    autoStart={gameFullyVisible}
                    hideOverlay
                    onDone={handleDone}
                  />
                </Suspense>

                {phase === 'done' && (
                  <div className="space-game-footer flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                    <p className="space-game-footer-copy text-small">
                      Ready to leave the event horizon?
                    </p>
                    <button
                      type="button"
                      onClick={handleExit}
                      className="space-game-exit rounded-full px-4 py-1.5 text-small"
                    >
                      Exit black hole ↗
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Original footer nav — unchanged ── */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link
            to="/"
            className="flex-shrink-0 text-center font-display text-title font-bold tracking-tight text-foreground md:text-left"
          >
            HP
          </Link>

          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => goToSection(item.id)}
                className="text-caption tracking-wider text-foreground/60 transition-colors hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
            <span aria-hidden="true" className="hidden h-4 w-px bg-line sm:block" />
            <span className="basis-full text-center font-mono text-micro uppercase tracking-[0.14em] text-muted sm:hidden">
              Elsewhere
            </span>
            <span className="hidden font-mono text-micro uppercase tracking-[0.14em] text-muted sm:inline">
              Elsewhere
            </span>
            {secondaryLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-caption tracking-wider text-foreground/60 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <SocialLinks
            links={SOCIAL_LINK_ITEMS}
            tone="dark"
            className="flex-shrink-0 justify-center md:justify-end"
          />
        </div>

        <div className="border-t border-line pt-8 text-center">
          <p className="text-small text-foreground/40">© {year} Harshal Pinge</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer