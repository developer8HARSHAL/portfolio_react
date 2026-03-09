"use client"

import { useState } from "react"

// ─── Data (move to src/data/projects.js when scaling) ────────────────────────
const PROJECT_DATA = [
  {
    id: 1,
    title: "EDMS",
    tagline: "Enterprise Document Management",
    category: "Full-Stack",
    description:
      "Production-ready document management platform with 25+ RESTful APIs, JWT authentication, and 3-level RBAC, enabling secure document sharing and automated email-based onboarding for team collaboration.",
    githubLink: "https://github.com/developer8HARSHAL/EDMS",
    liveLink: "https://dmanager-hp.vercel.app/",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux"],
    metrics: [
      { label: "APIs", value: "25+" },
      { label: "Storage", value: "50MB" },
      { label: "RBAC", value: "3-Level" },
    ],
    featured: true,
  },
  {
    id: 2,
    title: "DevMetrics SDK",
    tagline: "API Monitoring System",
    category: "Tools & SDK",
    description:
      "Published npm package for API monitoring tracking performance across 100+ endpoints, processing 10K+ requests/hour with <50ms latency and real-time analytics dashboard.",
    githubLink: "https://github.com/developer8HARSHAL/DevMetrics",
    liveLink: "https://dev-metrics-six.vercel.app/",
    npmLink: "https://www.npmjs.com/package/devmetrics-sdk",
    tech: ["JavaScript SDK", "Express.js", "MongoDB", "Next.js"],
    metrics: [
      { label: "Requests/hr", value: "10K+" },
      { label: "Endpoints", value: "100+" },
      { label: "Latency", value: "<50ms" },
    ],
    featured: true,
  },
  {
    id: 3,
    title: "ROIgen",
    tagline: "AI Cost Optimization Advisor",
    category: "AI",
    description:
      "Enterprise AI cost consultant that identifies automation opportunities, recommends optimal LLMs, tracks credit consumption, and calculates ROI across business functions.",
    githubLink: "https://github.com/developer8HARSHAL/AI-Cost-Optimization-Advisor",
    tech: ["Lyzr Studio", "Amazon Nova", "AWS Bedrock", "AI Agents"],
    metrics: [
      { label: "Cost Accuracy", value: "92%" },
      { label: "ROI Accuracy", value: "89%" },
    ],
    achievement: "🏆 HackerEarth Lyzr AI Architect Challenge",
    featured: true,
  },
  {
    id: 4,
    title: "Bug Analyzer Agent",
    tagline: "Intelligent Workflow Automation",
    category: "AI",
    description:
      "Intelligent n8n workflow for automated bug triage, semantic duplicate detection, and AI-powered GitHub issue analysis.",
    githubLink: "https://github.com/developer8HARSHAL/Bug-Analyzer-Agent",
    tech: ["n8n", "LLM", "Vector DB"],
    metrics: [
      { label: "Detection", value: "AI" },
      { label: "Platform", value: "n8n" },
    ],
    featured: false,
  },
  {
    id: 5,
    title: "AWS Blog Platform",
    tagline: "Serverless CMS",
    category: "Cloud",
    description:
      "Scalable blogging platform with AWS serverless architecture handling 100K+ monthly visitors with near-zero downtime.",
    tech: ["AWS Lambda", "DynamoDB", "CloudFront", "S3"],
    metrics: [
      { label: "Monthly Visitors", value: "100K+" },
      { label: "Cost Reduction", value: "70%" },
    ],
    featured: false,
  },
]

const CATEGORIES = ["All", "Full-Stack", "Tools & SDK", "AI", "Cloud"]

// ─── Icons ────────────────────────────────────────────────────────────────────
const GitHubIcon = () => (
  <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

const NpmIcon = () => (
  <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const metricCols =
    project.metrics?.length === 3 ? "grid-cols-3" : "grid-cols-2"

  return (
    <article className="card-glass-hover p-8 group flex flex-col h-full">

      {/* Achievement badge */}
      {project.achievement && (
        <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-400 mb-5">
          {project.achievement}
        </div>
      )}

      {/* Title + category */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          <span className="flex-shrink-0 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold text-blue-400">
            {project.category}
          </span>
        </div>
        <p className="text-sm font-semibold text-blue-400">{project.tagline}</p>
      </div>

      {/* Description */}
      <p className="text-base text-slate-400 leading-relaxed mb-6 line-clamp-3">
        {project.description}
      </p>

      {/* Metrics — same pattern as Experience.js */}
      {project.metrics && (
        <div className={`grid ${metricCols} gap-4 mb-6 pb-6 border-b border-white/10`}>
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center group/metric">
              <div className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-1 group-hover/metric:scale-110 transition-transform duration-300">
                {m.value}
              </div>
              <div className="text-xs text-slate-400 font-medium">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-medium text-slate-400"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-auto">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-semibold rounded-lg transition-all duration-300"
          >
            <GitHubIcon /> Code
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
          >
            Live <ExternalLinkIcon />
          </a>
        )}
        {project.npmLink && (
          <a
            href={project.npmLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on npm`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg transition-all duration-300"
          >
            <NpmIcon /> npm
          </a>
        )}
      </div>
    </article>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
function Project() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const getCount = (cat) =>
    cat === "All"
      ? PROJECT_DATA.length
      : PROJECT_DATA.filter((p) => p.category === cat).length

  const filtered = PROJECT_DATA.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  )

  const featured = filtered.filter((p) => p.featured)
  const rest     = filtered.filter((p) => !p.featured)

  return (
    <section
      id="project"
      className="min-h-screen py-32 lg:py-40 relative overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* ── Background — identical to About & Experience ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

      <div className="w-[90%] lg:w-[85%] xl:w-[80%] mx-auto relative z-10">

        {/* ── Section Header — identical structure to About & Experience ── */}
        <div className="mb-20 lg:mb-28">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-medium text-blue-300">Featured Work</span>
          </div>

          <h2
            id="projects-heading"
            className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4"
          >
            My <span className="text-gradient-primary">Projects</span>
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
        </div>

        {/* ── Filter Tabs ── */}
        <nav aria-label="Filter projects by category" className="mb-12">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat}
                <span className="ml-2 text-xs opacity-60">({getCount(cat)})</span>
              </button>
            ))}
          </div>
        </nav>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <svg aria-hidden="true" className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-500 text-lg font-medium">No projects in this category yet.</p>
            <p className="text-slate-600 text-sm mt-1">Try a different filter above.</p>
          </div>
        )}

        {/* ── Featured Projects ── */}
        {featured.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-400">★ Featured</span>
              <div className="flex-1 h-px bg-blue-500/15"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* ── More Projects ── */}
        {rest.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-500">More Work</span>
              <div className="flex-1 h-px bg-white/5"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA — same pill style as Experience "open to opportunities" ── */}
        {filtered.length > 0 && (
          <div className="mt-20 text-center">
            <a
              href="https://github.com/developer8HARSHAL"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full text-slate-300 text-base font-medium hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300"
            >
              <GitHubIcon />
              View all repositories on GitHub
              <ArrowRightIcon />
            </a>
          </div>
        )}

      </div>
    </section>
  )
}

export default Project