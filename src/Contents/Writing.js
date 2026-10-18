import { Link } from 'react-router-dom';
import WRITING_ENTRIES from '../data/writing.json';
import Container from '../Components/ui/Container';
import SectionHeading from '../Components/ui/SectionHeading';
import { WRITING_PATH } from '../config/navigation';

function formatDate(iso) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function ArrowIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeaturedEssay({ entry }) {
  return (
    <article className="group border-y border-line" data-aos="fade-up">
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="grid min-h-[400px] lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)]"
      >
        <div className="order-2 flex min-w-0 flex-col py-7 sm:py-9 lg:order-1 lg:py-12 lg:pr-12">
          <div className="mb-8 flex items-center gap-3 font-mono text-micro uppercase tracking-[0.14em] text-muted">
            <span className="inline-flex items-center gap-2 text-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-foreground" />
              Featured essay
            </span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted/50" />
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          </div>

          <h2 className="max-w-[13ch] font-display text-heading font-bold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-display">
            {entry.title}
          </h2>
          <p className="mt-5 max-w-prose text-body leading-[1.75] text-muted">
            {entry.excerpt || entry.content}
          </p>

          <span className="group/link mt-auto inline-flex min-h-12 items-center gap-3 pt-8 font-mono text-caption text-foreground">
            Read on {entry.platform}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover/link:border-foreground group-hover/link:bg-foreground group-hover/link:text-canvas">
              <ArrowIcon />
            </span>
          </span>
        </div>

        {entry.image && (
          <div className="order-1 flex h-52 items-center justify-center overflow-hidden border-b border-line bg-surface-raised p-4 sm:h-64 lg:order-2 lg:h-full lg:min-h-[400px] lg:border-b-0 lg:border-l lg:p-6">
            <img
              src={entry.image}
              alt={entry.imageAlt || `Illustration for ${entry.title}`}
              loading="lazy"
              className="h-full max-h-[360px] w-auto max-w-full object-contain shadow-xl shadow-black/20 transition-transform duration-700 group-hover:scale-[1.025]"
            />
          </div>
        )}
      </a>
    </article>
  );
}

function EssayRow({ entry, index }) {
  return (
    <li data-aos="fade-up" data-aos-delay={index * 70}>
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid gap-4 py-6 transition-colors duration-300 hover:text-foreground sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-start sm:gap-6 sm:py-8"
      >
        <span className="font-mono text-caption tabular-nums text-muted/70">{String(index + 2).padStart(2, '0')}</span>
        <span className="min-w-0">
          <span className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-micro uppercase tracking-[0.12em] text-muted">
            <span>{entry.platform}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted/50" />
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          </span>
          <span className="block font-display text-title font-bold leading-tight text-foreground transition-colors group-hover:text-muted-strong sm:text-heading">
            {entry.title}
          </span>
          <span className="mt-3 block max-w-3xl text-body leading-relaxed text-muted">
            {entry.excerpt || entry.content}
          </span>
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-caption text-foreground sm:mt-1">
          Read essay <ArrowIcon />
        </span>
      </a>
    </li>
  );
}

function Writing({ limit }) {
  const isPreview = Boolean(limit);
  const allEntries = WRITING_ENTRIES
    .filter((entry) => !entry.draft)
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const entries = allEntries.slice(0, limit || undefined);
  const [featured, ...archive] = entries;

  return (
    <section className={`${isPreview ? 'py-section-y' : 'min-h-screen pt-32 pb-24 lg:pt-40 lg:pb-32'} relative overflow-hidden bg-canvas`}>
      <Container className="relative z-10">
        <div className="mb-section-head flex flex-wrap items-end justify-between gap-5" data-aos="fade-up">
          <SectionHeading
            as={isPreview ? 'h2' : 'h1'}
            eyebrow="Long-form notes & essays"
            title="Writing"
            description="Occasional essays on books, ideas, and the questions that stay with me."
          />
          <span className="pb-1 font-mono text-caption tabular-nums text-muted">
            {String(allEntries.length).padStart(2, '0')} {allEntries.length === 1 ? 'essay' : 'essays'}
          </span>
        </div>

        {featured ? (
          <>
            <FeaturedEssay entry={featured} />
            {archive.length > 0 && (
              <div className="mt-12 sm:mt-16">
                <div className="mb-2 flex items-center justify-between border-b border-line pb-3">
                  <h3 className="font-mono text-micro uppercase tracking-[0.14em] text-muted">Earlier essays</h3>
                  <span className="font-mono text-micro tabular-nums text-muted/70">{String(archive.length).padStart(2, '0')}</span>
                </div>
                <ol className="divide-y divide-line" aria-label="Earlier essays">
                  {archive.map((entry, index) => (
                    <EssayRow key={`${entry.platform}-${entry.date}-${entry.title}`} entry={entry} index={index} />
                  ))}
                </ol>
              </div>
            )}
          </>
        ) : (
          <p className="rounded-card border border-line bg-surface px-6 py-8 text-body text-muted">Nothing published yet. Check back soon.</p>
        )}

        {isPreview && (
          <div className="mt-8 flex justify-end">
            <Link to={WRITING_PATH} className="group inline-flex min-h-11 items-center gap-2 font-mono text-caption text-foreground transition-colors hover:text-muted">
              Writing archive <ArrowIcon />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Writing;
