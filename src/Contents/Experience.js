import { useState } from 'react';

function Experience() {
  // const [expandedItem, setExpandedItem] = useState(0);

  const experiences = [
    {
      role: "Frontend Developer Intern",
      company: "Fulcrum Resources Infinity Pvt Ltd",
      location: "Pune",
      duration: "Nov 2024 - Feb 2025",
      type: "Internship",
      rating: "4.5/5",
      achievements: [
        "Designed and implemented an employee management system using Next.js and Tailwind CSS, improving HR task efficiency by 35% and reducing manual errors by 25%",
        "Optimized performance through code-splitting and lazy loading, achieving 23% improvement (Lighthouse: 72→89, Load: 3.2s→2.5s)",
        "Worked independently under HR guidance, receiving regular feedback and direction while consistently meeting project milestones and deadlines"
      ],
      technologies: ["Next.js", "Tailwind CSS", "React.js", "JavaScript"],
      metrics: [
        { label: "Efficiency Gain", value: "35%" },
        { label: "Error Reduction", value: "25%" },
        { label: "Performance", value: "+23%" }
      ]
    }
  ];

  return (
    <section id="experience" className="min-h-screen py-32 lg:py-40 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

      <div className="w-[90%] lg:w-[85%] xl:w-[80%] mx-auto relative z-10">
        
        {/* Section Header - Matching About Section Style */}
        <div className="mb-20 lg:mb-28">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-medium text-blue-300">Professional Journey</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4">
            Work <span className="text-gradient-primary">Experience</span>
          </h2>
          
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent hidden md:block"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-8 w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50 hidden md:block -translate-x-[5px]">
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Content Card - Matching About Section Style */}
                <div className="card-glass-hover p-8 lg:p-10 group">
                  
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-3xl lg:text-4xl font-bold text-white">
                          {exp.role}
                        </h3>
                        {exp.rating && (
                          <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-bold rounded-full flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {exp.rating}
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-xl lg:text-2xl text-blue-400 font-semibold">
                          {exp.company}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-base text-slate-400">
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {exp.location}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 font-medium text-base lg:text-lg whitespace-nowrap">
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.duration}
                    </div>
                  </div>

                  {/* Metrics */}
                  {exp.metrics && (
                    <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-white/10">
                      {exp.metrics.map((metric, i) => (
                        <div key={i} className="text-center group/metric">
                          <div className="text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2 group-hover/metric:scale-110 transition-transform duration-300">
                            {metric.value}
                          </div>
                          <div className="text-sm text-slate-400 font-medium">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Achievements */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex gap-4 group/item">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2.5 group-hover/item:bg-cyan-400 group-hover/item:scale-125 transition-all duration-300"></div>
                        <p className="text-slate-300 leading-relaxed text-base lg:text-lg">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>

                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full text-slate-300 text-base font-medium hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <span>Currently open to new opportunities</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Experience;