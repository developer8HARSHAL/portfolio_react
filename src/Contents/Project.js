import { useEffect, useRef, useState } from 'react'
import PROJECT_DATA from '../data/projects'
import { ArrowRightIcon, GitHubIcon, NpmIcon } from '../Components/ui/Icons'
import Container from '../Components/ui/Container'
import SectionHeading from '../Components/ui/SectionHeading'
import TagList from '../Components/ui/TagList'
import IconButton from '../Components/ui/IconButton'
import PillButton from '../Components/ui/PillButton'

const EASE = 'ease-[cubic-bezier(0.32,0.72,0,1)]'
const pad = (value) => String(value).padStart(2, '0')

function ProjectMedia({ project, index }) {
  const videoRef = useRef(null)
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const video = videoRef.current
    if (!video || prefersReducedMotion || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { rootMargin: '120px' })

    observer.observe(video)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  if (project.media?.type === 'video' && project.media?.src) {
    return (
      <figure className="w-full min-w-0 self-center">
        <video
          ref={videoRef}
          className="block aspect-[16/10] max-h-[420px] w-full object-contain"
          src={project.media.src}
          poster={project.media.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
      </figure>
    )
  }

  if (project.media?.src) {
    return (
      <figure className="w-full min-w-0 self-center">
        <img
          src={project.media.src}
          alt={`${project.title} preview`}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="block aspect-[16/10] max-h-[420px] w-full object-contain"
        />
      </figure>
    )
  }

  return (
    <figure className="flex aspect-[16/10] max-h-[420px] w-full items-center justify-center self-center">
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        Preview not available
      </figcaption>
    </figure>
  )
}

function ProjectDetails({ project }) {
  const [showBuildNote, setShowBuildNote] = useState(false)
  const primaryHref = project.liveLink || project.githubLink
  const primaryLabel = project.liveLink ? 'live' : 'View source'

  return (
    <div className="flex min-w-0 flex-col justify-center">
      <h3 className="font-display text-heading font-bold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-display">
        {project.title}
      </h3>
      <p className="mt-3 text-body-lg font-medium text-muted-strong">
        {project.tagline}
      </p>
      <p className="mt-3 max-w-prose text-body leading-[1.7] text-muted">
        {project.description}
      </p>

      {project.buildNote && (
        <div className="mt-4">
          <button
            type="button"
            aria-expanded={showBuildNote}
            aria-controls={`build-note-${project.id}`}
            onClick={() => setShowBuildNote((current) => !current)}
            className={`inline-flex min-h-8 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors duration-200 ${EASE} hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmos focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`}
          >
            <span>{showBuildNote ? 'Hide details' : 'How I built it'}</span>
            <ArrowRightIcon className={`h-3.5 w-3.5 transition-transform duration-200 ${EASE} ${showBuildNote ? 'rotate-90' : ''}`} />
          </button>
          <p
            id={`build-note-${project.id}`}
            hidden={!showBuildNote}
            className="mt-2 max-w-prose text-small leading-[1.65] text-muted-strong"
          >
            {project.buildNote}
          </p>
        </div>
      )}

      {project.tech?.length > 0 && (
        <div className="mt-5">
          <TagList items={project.tech} tone="dark" />
        </div>
      )}

      {(primaryHref || (project.liveLink && project.githubLink) || project.npmLink) && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {primaryHref && (
            <PillButton
              label={primaryLabel}
              accessibleLabel={`${project.title} ${project.liveLink ? 'live demo' : 'source code'}`}
              href={primaryHref}
              variant="live"
              external
              className="!text-caption"
            />
          )}
          {project.liveLink && project.githubLink && (
            <IconButton
              href={project.githubLink}
              label={`${project.title} source code on GitHub`}
              tone="dark"
              className="h-11 w-11 shrink-0 transition-transform duration-150 active:scale-[0.98]"
            >
              <GitHubIcon />
            </IconButton>
          )}
          {project.npmLink && (
            <IconButton
              href={project.npmLink}
              label={`${project.title} on npm`}
              tone="dark"
              className="h-11 w-11 shrink-0 transition-transform duration-150 active:scale-[0.98]"
            >
              <NpmIcon />
            </IconButton>
          )}
        </div>
      )}
    </div>
  )
}

function ProjectRow({ project, index = 0 }) {
  const reversed = index % 2 === 1

  return (
    <article className="border-t border-line py-8 sm:py-10 lg:py-12">
      <div className="mb-5">
        <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">
          <span className="text-cosmos">/{pad(index + 1)}</span>
          <span aria-hidden="true" className="mx-2 text-line">·</span>
          {project.category}
        </p>
      </div>

      <div className="grid items-center gap-7 sm:gap-10 lg:grid-cols-2 lg:gap-x-14 xl:gap-x-20">
        <div className={`min-w-0 ${reversed ? 'lg:col-start-2 lg:row-start-1' : 'lg:col-start-1'}`}>
          <ProjectMedia project={project} index={index} />
        </div>
        <div className={`min-w-0 ${reversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2'}`}>
          <ProjectDetails project={project} />
        </div>
      </div>
    </article>
  )
}

function Project() {
  return (
    <section id="project" className="relative bg-canvas py-section-y" aria-labelledby="projects-heading">
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow="Selected work"
          title="Projects"
          description="A few things I’ve built, and the problems I wanted them to solve."
          className="mb-section-head"
          side={(
            <div className="font-mono text-caption text-muted">
              <span className="tabular-nums">{pad(PROJECT_DATA.length)} projects</span>
            </div>
          )}
        />

        <div>
          {PROJECT_DATA.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-small leading-relaxed text-muted">
            More code and experiments are available on GitHub.
          </p>
          <a
            href="https://github.com/developer8HARSHAL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-caption text-foreground transition-colors duration-200 hover:border-foreground hover:bg-foreground hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmos"
          >
            <GitHubIcon />
            View all repositories
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </section>
  )
}

export default Project