const PROJECT_DATA = [
  {
    id: 1,
    title: 'EDMS',
    tagline: 'I wanted document approvals to stop getting lost in email.',
    category: 'Full-stack',
    description:
      'I built EDMS for teams whose documents are scattered across shared drives and email threads. In that setup, it is easy to lose track of the latest version or who needs to approve it. EDMS puts documents into workspaces, moves each through an assigned reviewer and approver, and keeps a history of every status change. Teams can see what needs attention instead of chasing updates.',
    buildNote:
      'Workspace and document permissions are checked by the backend, not just hidden or shown in the interface. Each document has one reviewer and one final approver, and every status change is saved in DocumentHistory.',
    githubLink: 'https://github.com/developer8HARSHAL/EDMS',
    liveLink: 'https://dmanager-hp.vercel.app/',
    tech: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
    metrics: ['4 lifecycle states', '3 workspace roles'],
    // Replace this path when you add a different EDMS preview.
    media: { type: 'video', src: '/assets/projects/edms.mp4' },
  },
  {
    id: 2,
    title: 'DevMetrics',
    tagline: 'I wanted API tests to tell me more than just pass or fail.',
    category: 'Developer tooling',
    description:
      'Run saved API request collections against real endpoints. Inspect failures, retries, and slow responses, then compare runs to track changes in error rates and latency.',
    buildNote:
      'The backend executes saved requests, stores run results, and evaluates six finding types. A separate Insights service aggregates error rates and latency trends across runs.',
    githubLink: 'https://github.com/developer8HARSHAL/DevMetrics',
    liveLink: 'https://dev-metrics-six.vercel.app/',
    tech: ['React 19', 'Node.js', 'PostgreSQL', 'FastAPI', 'D3'],
    // Replace this path when you add a different DevMetrics preview.
    media: { type: 'image', src: '/assets/projects/dev_img.png' },
  },
  {
    id: 3,
    title: 'Async Report Generator',
    tagline: 'Non-blocking report generation at scale',
    category: 'Java Backend',
    description:
      'A Spring Boot backend that instantly returns a jobId, generates reports asynchronously via thread pools, lets clients poll status and download CSVs, and auto-expires files after 24 hours.',
    githubLink: 'https://github.com/developer8HARSHAL/report-generator',
    tech: ['Spring Boot', 'Java 23', 'MySQL', 'Quartz', 'Flyway', 'OpenCSV'],
    metrics: ['Async jobs', 'CSV export', '24h auto-expiry'],
    media: { type: 'image', src: '/assets/projects/java_pimg.png' },
  },
  {
    id: 4,
    title: 'ROIgen',
    tagline: 'AI Cost Optimization Advisor',
    category: 'AI',
    description:
      'Enterprise AI cost consultant that identifies automation opportunities, recommends optimal LLMs, tracks credit consumption, and calculates ROI across business functions.',
    githubLink: 'https://github.com/developer8HARSHAL/AI-Cost-Optimization-Advisor',
    tech: ['Lyzr Studio', 'Amazon Nova', 'AWS Bedrock', 'AI Agents'],
    metrics: ['92% Cost accuracy', '89% ROI accuracy'],
    achievement: 'HackerEarth Lyzr AI Architect Challenge',
    media: { type: 'image', src: '/assets/projects/roi_img.png' },
  },
  {
    id: 5,
    title: 'Bug Analyzer Agent',
    tagline: 'Intelligent Workflow Automation',
    category: 'AI',
    description:
      'Intelligent n8n workflow for automated bug triage, semantic duplicate detection, and AI-powered GitHub issue analysis.',
    githubLink: 'https://github.com/developer8HARSHAL/Bug-Analyzer-Agent',
    tech: ['n8n', 'LLM', 'Vector DB'],
    media: { type: 'video', src: '/assets/projects/agent_vid.mp4', poster: '/assets/n8n2.png' },
  },
  {
    id: 6,
    title: 'AWS Blog Platform',
    tagline: 'Serverless CMS',
    category: 'Cloud',
    description:
      'Scalable blogging platform with AWS serverless architecture handling 100K+ monthly visitors with near-zero downtime.',
    tech: ['AWS Lambda', 'DynamoDB', 'CloudFront', 'S3'],
    metrics: ['100K+ Monthly visitors', '70% Cost reduction'],
    media: { type: 'image', src: '/assets/projects/aws_img.png' },
  },
];

export default PROJECT_DATA;