import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Project() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    AOS.init({ 
      duration: 1200,
      easing: 'ease-out-quart',
      once: true,
      offset: 50
    });
  }, []);

  const projects = [
    {
      id: 1,
      title: "Edureka",
      subtitle: "Food Delivery Ecosystem",
      category: "Full-Stack Development",
      description: "A comprehensive cloud kitchen platform revolutionizing food delivery with real-time tracking, intelligent recommendations, and seamless payment integration.",
      image: "assets/im3.png",
      githubLink: "https://github.com",
      liveLink: "https://example.com",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      year: "2024",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "EDMS",
      subtitle: "Enterprise Document Hub",
      category: "Enterprise Solution",
      description: "Secure document management platform serving enterprise clients with advanced security, workflow automation, and intelligent document processing.",
      image: "assets/edms.png",
      githubLink: "https://github.com/developer8HARSHAL/EDMS",
      tech: ["React", "Express", "MongoDB", "AWS S3"],
      year: "2024",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "CoffeeTown",
      subtitle: "Artisan Coffee Experience",
      category: "E-commerce Platform",
      description: "Premium coffee e-commerce platform featuring immersive product experiences, subscription services, and community-driven reviews.",
      image: "assets/coff.png",
      githubLink: "https://github.com/developer8HARSHAL/coffee-town/tree/master",
      tech: ["PHP", "MySQL", "JavaScript", "Figma"],
      year: "2023",
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 4,
      title: "AWS Blog Platform",
      subtitle: "Serverless Publishing",
      category: "Cloud Architecture",
      description: "Highly scalable blogging platform leveraging AWS serverless architecture, serving thousands of users with near-zero downtime.",
      image: "assets/aws.jpeg",
      githubLink: "https://github.com",
      tech: ["AWS Lambda", "DynamoDB", "CloudFront", "S3"],
      year: "2024",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section id="project-section" className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-yellow-400/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 lg:py-32">
      

        {/* Projects Grid */}
        <div className="grid gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              data-aos="fade-up"
              data-aos-delay={index * 150}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 lg:p-12 transition-all duration-700 group-hover:border-slate-700/50 group-hover:bg-slate-900/60">
                {/* Project Number */}
                <div className="absolute -top-4 left-8">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 text-lg font-bold rounded-full">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Project Info */}
                  <div className={`lg:col-span-7 space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="space-y-4">
                      {/* Category & Year */}
                      <div className="flex items-center justify-between">
                        <span className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm font-medium border border-slate-700/50">
                          {project.category}
                        </span>
                        <span className="text-slate-500 font-mono text-sm">
                          {project.year}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="space-y-2">
                        <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-yellow-300 transition-all duration-500">
                          {project.title}
                        </h3>
                        <p className="text-xl text-slate-400 font-light">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 leading-relaxed text-lg">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {project.tech.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-4 py-2 bg-slate-800/30 text-slate-200 rounded-xl text-sm font-medium border border-slate-700/30 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 text-slate-200 rounded-2xl border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span>Source Code</span>
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-2xl font-semibold hover:from-yellow-300 hover:to-yellow-400 hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
                        >
                          <span>View Live</span>
                          <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative group/image">
                      {/* Gradient Border */}
                      <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-3xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-700`}></div>
                      
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800/50">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                        />
                        
                        {/* Image Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
                        
                        {/* Floating Elements */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-0 group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>

     
      </div>
    </section>
  );
}

export default Project;