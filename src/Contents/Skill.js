import { useEffect, useRef, useState } from 'react';
import Container from '../Components/ui/Container';

const capabilities = [
  {
    number: '01',
    category: 'Frontend',
    skills: ['React.js', 'Next.js 14', 'Redux Toolkit', 'Tailwind CSS', 'Responsive design'],
    icon: 'frontend',
  },
  {
    number: '02',
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT authentication', 'Middleware design'],
    icon: 'backend',
  },
  {
    number: '03',
    category: 'Databases',
    skills: ['MongoDB', 'MySQL', 'GridFS', 'Aggregation', 'Indexes'],
    icon: 'database',
  },
  {
    number: '04',
    category: 'Languages & fundamentals',
    skills: ['JavaScript', 'C++ (STL, OOP)', 'Java', 'Python', 'SQL'],
    foundation: 'Data structures & algorithms · Arrays · Strings · Dynamic programming · Stacks · Queues',
    icon: 'code',
  },
];

// Generic, non-brand category glyphs — deliberately simple line icons rather
// than specific tool logos, since the icon represents the discipline, not
// any one product.
function CategoryIcon({ type, className }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (type === 'backend') {
    return (
      <svg {...common}>
        <rect x="3.5" y="4" width="17" height="5.5" rx="1.2" />
        <rect x="3.5" y="14.5" width="17" height="5.5" rx="1.2" />
        <circle cx="7" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="7" cy="17.25" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === 'database') {
    return (
      <svg {...common}>
        <ellipse cx="12" cy="5.5" rx="8" ry="2.8" />
        <path d="M4 5.5v13c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-13" />
        <path d="M4 12c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8" />
      </svg>
    );
  }

  if (type === 'code') {
    return (
      <svg {...common}>
        <path d="M9 6.5 3.5 12 9 17.5" />
        <path d="M15 6.5 20.5 12 15 17.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.4" />
      <path d="M3.5 8.5h17" />
      <circle cx="6.2" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Fires once when the ledger scrolls into view, so the rail line draws
// downward a single time rather than replaying on every scroll pass.
function useRevealOnce(threshold = 0.15) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, revealed];
}

function Skill() {
  const [railRef, revealed] = useRevealOnce();

  return (
    <section id="skill" className="relative overflow-hidden bg-canvas py-section-y" aria-labelledby="skill-heading">
      <Container>
        <div className="mb-section-head flex flex-wrap items-end justify-between gap-5" data-aos="fade-up">
          <div>
            <h2
              id="skill-heading"
              className="font-display text-display font-bold leading-[0.95] tracking-[-0.05em] text-paper sm:text-display-lg"
            >
              Skills<span className="text-muted">.</span>
            </h2>
          </div>
        </div>

        <div ref={railRef} className="relative border-t border-line pt-8 md:pt-10">
          <div className="relative">
            <div
              aria-hidden="true"
              className={`absolute left-6 top-0 bottom-0 w-px origin-top bg-muted-strong transition-transform duration-1000 ease-out ${
                revealed ? 'scale-y-100' : 'scale-y-0'
              }`}
            />

            {capabilities.map((capability, index) => {
              return (
                <div
                  key={capability.number}
                  className="group relative flex gap-6 pb-12 last:pb-8 sm:gap-8"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <div className="flex w-12 flex-shrink-0 flex-col items-center gap-2 pt-1">
                    <span className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line bg-canvas font-mono text-caption text-muted transition-colors duration-300 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                      {capability.number}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 gap-4">
                    <CategoryIcon
                      type={capability.icon}
                      className="h-7 w-7 flex-shrink-0 text-muted transition-colors duration-300 group-hover:text-foreground"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-mono text-small font-semibold uppercase tracking-[0.13em] text-paper">
                          {capability.category}
                        </h3>
                      </div>

                      <ul aria-label={`${capability.category} skills`} className="mt-4 flex flex-wrap gap-2.5">
                        {capability.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-tile border border-line bg-surface px-4 py-2.5 font-medium leading-tight tracking-[-0.01em] text-small text-paper transition-colors duration-300 group-hover:border-muted-strong"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>

                      {capability.foundation && (
                        <p className="mt-5 border-l border-line pl-3 font-mono text-caption leading-relaxed text-muted">
                          {capability.foundation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-6 sm:gap-8" aria-hidden="true">
              <div className="flex w-12 flex-shrink-0 flex-col items-center gap-1.5 pb-1">
                <span className="h-1 w-1 rounded-full bg-muted/45" />
                <span className="h-1 w-1 rounded-full bg-muted/25" />
                <span className="h-1 w-1 rounded-full bg-muted/10" />
              </div>
              <div className="flex-1" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Skill;
