import { useRef, useState } from 'react';
import PillButton from '../Components/ui/PillButton';
import SocialLinks from '../Components/ui/SocialLinks';
import Container from '../Components/ui/Container';
import { RESUME_URL } from '../config/navigation';
import SOCIAL_LINK_ITEMS from '../data/socialLinks';
import { scrollToId } from '../utils/scrollToId';

const CONTENT = {
  pitchLead: 'Frontend-focused full-stack developer.',
  pitchRest: 'Building web products from interface to database.',

  primaryCta: 'View projects',
  resumeCta: 'Resume',
  nextCta: 'About me',
  portrait: {
    src: '/assets/linkedin2.png',
    alt: 'Portrait of Harshal Pinge',
  },
  sketch: null,
};

const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]';

function motionAllowed() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Home() {
  const {
    pitchLead,
    pitchRest,
    primaryCta,
    resumeCta,
    nextCta,
    portrait,
    sketch,
  } = CONTENT;

  const tiltRef = useRef(null);
  const [showSketch, setShowSketch] = useState(false);

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse' || !motionAllowed()) return;

    const node = tiltRef.current;
    if (!node) return;

    const bounds = node.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    node.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const handlePointerLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = '';
  };

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative overflow-hidden bg-canvas text-foreground"
    >
      <Container className="relative flex min-h-svh flex-col pb-8 pt-24 sm:pb-10 sm:pt-28 lg:pb-8 lg:pt-28">
        <div className="my-auto grid w-full items-center gap-12 py-8 sm:gap-14 md:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)] md:gap-12 lg:gap-20 xl:gap-24">
          <div className="min-w-0 max-w-[760px]">
            <div className="mb-6 inline-flex items-center gap-2 sm:mb-8">
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-green-500" />
              </span>
              <span className="font-mono text-small uppercase tracking-widest text-muted">
                Available for work
              </span>
            </div>

            <h1
              id="home-heading"
              className="mb-7 font-display text-display-lg font-bold leading-[0.94] tracking-[-0.055em] text-foreground sm:mb-9 md:text-[clamp(5rem,8.2vw,8.5rem)]"
            >
              Harshal<br />
              Pinge<span>.</span>
            </h1>

            <div data-aos="fade-up">
              <p className="font-sans text-heading leading-snug sm:text-display sm:leading-snug">
                <span className="font-medium text-foreground">{pitchLead}</span>
                <br />
                <span className="font-normal text-muted-strong">{pitchRest}</span>
              </p>
            </div>

            <div
              className="mt-9 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
              data-aos="fade-up"
              data-aos-delay="160"
            >
              <PillButton
                label={primaryCta}
                href="#project"
                variant="accent"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId('project');
                }}
              />
              <PillButton
                label={resumeCta}
                href={RESUME_URL}
                variant="ghost-dark"
                external
                icon="external"
              />
            </div>

            <div
              className="mt-8 sm:mt-9"
              data-aos="fade-up"
              data-aos-delay="240"
            >
              <SocialLinks tone="dark" size="large" links={SOCIAL_LINK_ITEMS} />
            </div>
          </div>

          <div
            className="flex justify-center md:justify-end"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            <div
              ref={tiltRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="relative aspect-[4/5] w-[min(23rem,72vw)] transition-transform duration-200 ease-out motion-reduce:transform-none sm:w-[min(26rem,70vw)] md:w-full md:max-w-[360px] lg:max-w-[400px]"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-2 -rotate-2 rounded-panel rounded-tl-frame border border-line"
              />
              <div className="relative h-full w-full overflow-hidden rounded-panel rounded-tl-frame border border-line bg-surface">
                <img
                  src={portrait.src}
                  alt={portrait.alt}
                  width="400"
                  height="500"
                  loading="eager"
                  fetchPriority="high"
                  className={`absolute inset-0 h-full w-full object-cover object-[center_20%] transition-opacity duration-500 motion-reduce:transition-none ${
                    showSketch ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {sketch && (
                  <>
                    <img
                      src={sketch.src}
                      alt={sketch.alt}
                      width="400"
                      height="500"
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full object-cover object-[center_20%] transition-opacity duration-500 motion-reduce:transition-none ${
                        showSketch ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <button
                      type="button"
                      aria-pressed={showSketch}
                      aria-label="Switch between photo and pencil sketch"
                      onClick={() => setShowSketch((value) => !value)}
                      className={`absolute inset-0 z-10 cursor-pointer ${FOCUS_RING}`}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-3 left-3 z-20 rounded-full border border-line bg-canvas px-3 py-1 font-mono text-micro uppercase tracking-widest text-muted-strong"
                    >
                      {showSketch ? 'View photo' : 'View sketch'}
                    </span>
                  </>
                )}
                {/* Fades white-bg photo into frame surface — effective in dark mode */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-surface to-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-end border-t border-line pt-4">
          <button
            type="button"
            onClick={() => scrollToId('about')}
            className={`group inline-flex min-h-11 items-center gap-3 font-mono text-caption uppercase tracking-widest text-foreground transition-colors hover:text-muted ${FOCUS_RING}`}
          >
            {nextCta}
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-transform duration-300 group-hover:translate-y-1 motion-reduce:transition-none"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M12 4v16m0 0 6-6m-6 6-6-6"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </Container>
    </section>
  );
}

export default Home;