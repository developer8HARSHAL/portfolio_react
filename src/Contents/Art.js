import { useState, useEffect, useRef } from 'react';
import ART_PIECES from '../data/art';
import Container from '../Components/ui/Container';
import SectionHeading from '../Components/ui/SectionHeading';
import PillButton from '../Components/ui/PillButton';
import { ART_PATH } from '../config/navigation';

function Art({ limit }) {
  const isPreview = Boolean(limit);
  const pieces = ART_PIECES.slice(0, limit);

  const [activeIndex, setActiveIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const lastTriggerRef = useRef(null);

  const isOpen = activeIndex !== null;
  const activePiece = isOpen ? ART_PIECES[activeIndex] : null;
  const counter = (n) => String(n).padStart(2, '0');

  const closePiece = () => setActiveIndex(null);
  const stepPiece = (delta) =>
    setActiveIndex((i) => (i + delta + ART_PIECES.length) % ART_PIECES.length);
  const openPiece = (index, event) => {
    lastTriggerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      const total = ART_PIECES.length;
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + total) % total);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % total);
      }
      if (e.key === 'Tab') {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll('button:not([disabled])') || []
        ).filter((item) => item.getClientRects().length > 0);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      lastTriggerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <section className={`${isPreview ? 'py-section-y' : 'min-h-screen pt-32 pb-24 lg:pt-40 lg:pb-32'} relative overflow-hidden bg-canvas`}>
      <Container className="relative z-10">
        <div className="mb-section-head" data-aos="fade-up">
          <SectionHeading
            as={isPreview ? 'h2' : 'h1'}
            eyebrow="Outside the editor"
            title="Art"
            description="A small, ongoing collection of paintings and sketches made away from the screen."
            className="!items-end"
            titleClassName="mb-3"
            side={(
              <span className="pb-1 font-mono text-caption tabular-nums text-muted">
                {counter(pieces.length)} / {counter(ART_PIECES.length)} works
              </span>
            )}
          />
        </div>

        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-7 xl:grid-cols-3" aria-label="Art collection">
          {pieces.map((piece, i) => {
            return (
              <li
                key={piece.id}
                data-aos="fade-up"
                className="min-w-0"
              >
                <button
                  type="button"
                  onClick={(e) => openPiece(i, e)}
                  aria-label={`View ${piece.title} larger`}
                  className="group relative block aspect-[3/4] w-full overflow-hidden border border-line bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <img
                    src={piece.src}
                    alt={piece.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:p-3"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-line bg-canvas/80 px-2.5 py-1 font-mono text-micro tabular-nums text-foreground backdrop-blur-sm">
                    {counter(i + 1)}
                  </span>
                  <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
                  <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 font-mono text-micro uppercase tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    View
                  </span>
                </button>
                <div className="flex items-start justify-between gap-3 pt-4 sm:pt-5">
                  <div className="min-w-0">
                    <h2 className="font-display text-title font-bold leading-tight text-foreground">{piece.title}</h2>
                    <p className="mt-2 font-mono text-micro text-muted">{piece.medium}</p>
                  </div>
                  <time className="flex-shrink-0 pt-1 font-mono text-micro tabular-nums text-muted/70">{piece.year}</time>
                </div>
              </li>
            );
          })}
        </ol>

        {isPreview && (
          <div className="mt-8 flex justify-end border-t border-line pt-5 sm:mt-10">
            <PillButton
              label={`View all ${ART_PIECES.length} artworks`}
              href={ART_PATH}
              variant="ghost"
              className="text-caption"
            />
          </div>
        )}
      </Container>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={closePiece}
          role="dialog"
          aria-modal="true"
          aria-label={activePiece.title}
          ref={dialogRef}
        >
          <button
            type="button"
            ref={closeButtonRef}
            onClick={closePiece}
            aria-label="Close"
            className="absolute top-6 right-6 icon-btn-dark"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); stepPiece(-1); }}
            aria-label="Previous piece"
            className="absolute left-6 top-1/2 -translate-y-1/2 icon-btn-dark hidden sm:flex"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); stepPiece(1); }}
            aria-label="Next piece"
            className="absolute right-6 top-1/2 -translate-y-1/2 icon-btn-dark hidden sm:flex"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div onClick={(e) => e.stopPropagation()} className="max-w-full">
            <img
              src={activePiece.src}
              alt={activePiece.title}
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain mx-auto"
            />
            <div className="mt-4 flex items-baseline justify-between gap-6 font-mono text-small text-white/70">
              <span>{counter(activeIndex + 1)} / {counter(ART_PIECES.length)}</span>
              <span className="text-white">{activePiece.title}</span>
              <span>{activePiece.medium}, {activePiece.year}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Art;
