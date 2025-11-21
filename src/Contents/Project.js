"use client"

import { useState } from "react"

function Project() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredProject, setHoveredProject] = useState(null)

  const categories = ["All", "Full-Stack", "Tools & SDK", "AI", "Cloud"]

  const projects = [
    {
      id: 1,
      title: "EDMS",
      tagline: "Enterprise Document Management",
      category: "Full-Stack",
      description: "Full-stack platform with 25+ RESTful APIs, JWT authentication, and 3-level RBAC supporting automated email-based onboarding.",
      image: "assets/edms.png",
      githubLink: "https://github.com/developer8HARSHAL/EDMS",
      liveLink: "https://dmanager-hp.vercel.app/",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux"],
      metrics: {
        APIs: "25+",
        Storage: "50MB",
        RBAC: "3-Level"
      },
      size: "large" // Featured project
    },
    {
      id: 2,
      title: "DevMetrics SDK",
      tagline: "API Monitoring System",
      category: "Tools & SDK",
      description: "API monitoring processing 10K+ requests/hour across 100+ endpoints with sub-50ms latency. Published NPM package with real-time dashboard.",
      image: "assets/ds2.png",
      githubLink: "https://github.com/developer8HARSHAL/devmetrics-sdk",
      liveLink: "https://dev-metrics-six.vercel.app/",
      npmLink: "https://www.npmjs.com/package/devmetrics-sdk",
      tech: ["JavaScript SDK", "Express.js", "MongoDB", "Next.js"],
      metrics: {
        Requests: "10K+/hr",
        Endpoints: "100+",
        Latency: "<50ms"
      },
      size: "large" // Featured project
    },
    {
      id: 3,
      title: "Edureka",
      tagline: "Cloud Kitchen & Food Delivery",
      category: "Full-Stack",
      description: "End-to-end food delivery platform with real-time tracking, restaurant recommendations, and multi-gateway payment integration.",
      image: "assets/im3.png",
      githubLink: "https://github.com",
      tech: ["React", "Node.js", "MongoDB", "Socket.io", "Redis"],
      metrics: {
        Orders: "5K+",
        Uptime: "99.9%"
      },
      size: "medium"
    },
    {
      id: 4,
      title: "Bug Analyzer Agent",
      tagline: "Intelligent Workflow Automation",
      category: "AI",
      description: "Intelligent n8n workflow for automated bug triage, semantic duplicate detection, and AI-powered GitHub issue analysis.",
      image: "assets/n8n2.png",
      githubLink: "https://github.com/developer8HARSHAL/coffee-town/tree/master",
      tech: ["n8n", "LLM", "Vector DB"],
      metrics: {
        Detection: "AI",
        Platform: "n8n"
      },
      size: "medium"
    },
    {
      id: 5,
      title: "AWS Blog Platform",
      tagline: "Serverless CMS",
      category: "Cloud",
      description: "Scalable blogging platform with AWS serverless architecture. Handles 100K+ monthly visitors with near-zero downtime.",
      image: "assets/aws.jpeg",
      githubLink: "https://github.com",
      tech: ["AWS Lambda", "DynamoDB", "CloudFront", "S3"],
      metrics: {
        Visitors: "100K+",
        Cost: "-70%"
      },
      size: "medium"
    }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    return matchesCategory
  })

  return (
    <section id="project" className="min-h-screen py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

      <div className="w-[90%] lg:w-[85%] xl:w-[80%] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 lg:mb-28">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-300">Featured Work</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4">
            My <span className="text-gradient-primary">Projects</span>
          </h2>
          
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6"></div>
          
          <p className="text-xl lg:text-2xl text-slate-400 max-w-3xl">
            Production-ready applications showcasing full-stack development expertise
          </p>
        </div>

        {/* Filter Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Synchronized Even Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Tech Stack */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-black/60 backdrop-blur-xl border border-white/20 text-white text-xs font-medium rounded"
                    >
                      {tech}
                    </span>
                  ))}
                 
                </div>
              </div>

              {/* Content Container */}
              <div className="relative flex-1 flex flex-col p-6">
                
                {/* Title & Tagline */}
                <div className="mb-3">
                  <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-blue-400">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="mt-auto">
                  {project.metrics && Object.keys(project.metrics).length > 0 && (
                    <div className={`grid gap-3 mb-4 ${
                      project.size === 'large' ? 'grid-cols-3' : 'grid-cols-2'
                    }`}>
                      {Object.entries(project.metrics).map(([key, value], i) => (
                        <div key={i} className="text-center p-2 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                          <div className={`font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text ${
                            project.size === 'large' ? 'text-xl' : 'text-base'
                          }`}>
                            {value}
                          </div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-semibold rounded-lg transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
                      >
                        Live
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {project.npmLink && (
                      <a
                        href={project.npmLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/>
                        </svg>
                        NPM
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

    

      </div>
    </section>
  )
}

export default Project