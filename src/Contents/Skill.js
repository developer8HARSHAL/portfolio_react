import { useState } from 'react';

function Skill() {
  const domains = [
    {
      title: "Frontend",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      color: "blue",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Next.js 14", level: 85 },
        { name: "Redux Toolkit", level: 80 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Responsive Design", level: 95 },
      ]
    },
    {
      title: "Backend",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      color: "blue",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "REST APIs", level: 90 },
        { name: "JWT Authentication", level: 80 },
        { name: "Middleware Design", level: 80 },
      ]
    },
    {
      title: "Languages",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: "blue",
      skills: [
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "C++ (STL, OOP)", level: 75 },
        { name: "SQL", level: 80 },
      ]
    },
    {
      title: "Database",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      color: "blue",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "GridFS", level: 75 },
        { name: "Aggregation", level: 80 },
        { name: "Indexes", level: 75 },
        { name: "MySQL", level: 80 },
      ]
    },
    {
      title: "DevOps & Tools",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "blue",
      skills: [
        { name: "AWS (EC2, S3, Lambda)", level: 75 },
        { name: "Git/GitHub", level: 90 },
        { name: "npm Publishing", level: 75 },
        { name: "Postman", level: 85 },
      ]
    },
    {
      title: "Additional",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      color: "blue",
      skills: [
        { name: "LangChain", level: 70 },
        { name: "OpenAI API", level: 75 },
        { name: "Agile/Scrum", level: 80 },
        { name: "Code Optimization", level: 85 },
      ]
    }
  ];

  const colorSchemes = {
    blue: {
      gradient: "from-blue-600 to-cyan-900",
      text: "text-blue-400"
    }
  };

  return (
    <section id="skill" className="min-h-screen py-32 lg:py-40 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

      <div className="w-[90%] lg:w-[85%] xl:w-[80%] mx-auto relative z-10">

        {/* Section Header */}
        <div className="mb-20 lg:mb-28">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-medium text-blue-300">Technical Expertise</span>
          </div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4">
            Skills &<span className="text-gradient-primary"> Tech Stack</span>
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6"></div>

          <p className="text-xl lg:text-2xl text-slate-400 max-w-3xl">
            Proven technical expertise across the full-stack development spectrum, from frontend to backend, databases to cloud deployment
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="card-glass text-center p-6">
            <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-900 bg-clip-text text-transparent mb-2">
              30+
            </div>
            <div className="text-sm text-slate-400 font-medium">Technologies</div>
          </div>
          <div className="card-glass text-center p-6">
            <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              6
            </div>
            <div className="text-sm text-slate-400 font-medium">Domains</div>
          </div>
          <div className="card-glass text-center p-6">
            <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              100+
            </div>
            <div className="text-sm text-slate-400 font-medium">LeetCode</div>
          </div>
          <div className="card-glass text-center p-6">
            <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
              4.5/5
            </div>
            <div className="text-sm text-slate-400 font-medium">Intern Rating</div>
          </div>
        </div>

        {/* Domain Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {domains.map((domain, domainIndex) => {
            const colors = colorSchemes[domain.color];

            return (
              <div
                key={domainIndex}
                className="card-glass-hover p-6"
              >
                {/* Domain Header */}
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                    {domain.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{domain.title}</h3>
                    <p className="text-xs text-slate-500">{domain.skills.length} skills</p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {domain.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      {/* Skill Name with Percentage */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-300">
                          {skill.name}
                        </span>
                        <span className={`text-sm font-bold ${colors.text}`}>
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Problem Solving & Certifications */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Problem Solving */}
          <div className="card-glass-hover p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Problem Solving</h3>
                <p className="text-slate-400 text-sm mb-3">
                  Strong DSA foundation: Arrays, Strings, Dynamic Programming, Stacks, Queues, and algorithmic problem-solving
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs font-medium text-purple-300">
                    100+ LeetCode
                  </span>
                  <span className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-medium text-blue-300">
                    C++ STL
                  </span>
                </div>
              </div>
            </div>
          </div>



        </div>

      </div>
    </section>
  );
}

export default Skill;