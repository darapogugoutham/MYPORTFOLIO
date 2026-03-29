// Brain portfolio configuration and content data

export const brainConfig = {
  // Hotspot positions in 3D space
  hotspots: {
    about: {
      position: [0, 0.8, 0.4],
      label: 'About',
      color: '#00d9ff',
      description: 'Who I am',
    },
    skills: {
      position: [-0.6, 0.3, 0.2],
      label: 'Skills',
      color: '#00d9ff',
      description: 'Technical expertise',
    },
    projects: {
      position: [0.6, 0.3, 0.2],
      label: 'Projects',
      color: '#a855f7',
      description: 'What I\'ve built',
    },
    experience: {
      position: [0, 0, -0.7],
      label: 'Experience',
      color: '#3b82f6',
      description: 'My journey',
    },
    contact: {
      position: [0, -0.7, 0],
      label: 'Contact',
      color: '#00d9ff',
      description: 'Let\'s connect',
    },
    'ai-core': {
      position: [0, 0, 0],
      label: 'AI Core',
      color: '#00d9ff',
      description: 'Ask me anything',
    },
  },

  // Camera positions for each section
  cameraTargets: {
    null: { x: 0, y: 0.5, z: 2.5 },
    about: { x: 0, y: 0.5, z: 2.0 },
    skills: { x: -1.5, y: 0.4, z: 1.8 },
    projects: { x: 1.5, y: 0.4, z: 1.8 },
    experience: { x: 0, y: 0, z: 2.2 },
    contact: { x: 0, y: -1.2, z: 1.8 },
    'ai-core': { x: 0, y: 0, z: 1.2 },
  },

  // Content data
  content: {
    about: {
      bio: 'I\'m a full-stack developer passionate about creating innovative digital experiences. My approach to technology is deeply rooted in how people think and interact with the world around them. Every project I undertake is a reflection of my problem-solving methodology and creative mindset.',
      highlights: [
        '8+ years of software development experience',
        'Full-stack expertise in React, Node.js, and Python',
        'Specialization in AI integration and automation',
        'Published open-source projects',
        'Tech speaker and community contributor',
        'Continuous learner and innovator',
      ],
    },

    skills: {
      categories: [
        {
          name: 'Frontend',
          items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP'],
        },
        {
          name: 'Backend',
          items: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB'],
        },
        {
          name: 'AI/ML',
          items: ['LLMs', 'OpenAI API', 'RAG Systems', 'Prompt Engineering', 'Fine-tuning'],
        },
        {
          name: 'Tools & DevOps',
          items: ['Git', 'Docker', 'AWS', 'Vercel', 'CI/CD', 'Linux'],
        },
        {
          name: 'Specializations',
          items: ['3D Web', 'Real-time Systems', 'Animation', 'API Design', 'System Architecture'],
        },
      ],
    },

    projects: {
      items: [
        {
          title: 'AI Research Platform',
          tech: 'React, Node.js, OpenAI API, PostgreSQL',
          description: 'Built a comprehensive platform for researchers to leverage AI for literature analysis and data synthesis with real-time collaboration.',
        },
        {
          title: '3D Interactive Dashboard',
          tech: 'Three.js, React Three Fiber, GSAP',
          description: 'Created an immersive 3D data visualization dashboard with interactive elements and smooth animations.',
        },
        {
          title: 'Automated Workflow Engine',
          tech: 'Node.js, Python, Redis, Webhooks',
          description: 'Engineered an event-driven system for automating complex business processes with 99.9% uptime.',
        },
        {
          title: 'Real-time Chat Application',
          tech: 'Socket.io, React, Express, MongoDB',
          description: 'Developed a scalable chat platform supporting 10k+ concurrent users with end-to-end encryption.',
        },
        {
          title: 'Machine Learning Pipeline',
          tech: 'Python, TensorFlow, Kubernetes, Apache Airflow',
          description: 'Orchestrated a distributed ML training pipeline processing 100GB+ of data daily.',
        },
        {
          title: 'Cloud Migration Suite',
          tech: 'AWS, Terraform, Python, Jenkins',
          description: 'Automated migration of legacy systems to cloud infrastructure with zero downtime.',
        },
      ],
    },

    experience: {
      items: [
        {
          title: 'Senior Full-Stack Engineer',
          company: 'TechCorp AI',
          date: '2022 - Present',
          description: 'Leading development of AI-powered products, mentoring junior engineers, and architecting scalable systems.',
        },
        {
          title: 'Full-Stack Developer',
          company: 'Digital Innovations Inc',
          date: '2020 - 2022',
          description: 'Built and maintained production applications serving 100k+ users, implemented CI/CD pipelines, and optimized performance.',
        },
        {
          title: 'Junior Developer',
          company: 'StartUp Labs',
          date: '2018 - 2020',
          description: 'Launched MVP for venture-funded startup, collaborated with designers and product managers, gained full-stack expertise.',
        },
        {
          title: 'Freelance Developer',
          company: 'Self-employed',
          date: '2017 - 2018',
          description: 'Developed custom web applications for clients across diverse industries, managed projects from conception to deployment.',
        },
      ],
    },

    contact: {
      links: [
        {
          label: 'GitHub',
          url: 'https://github.com',
          icon: '🐙',
        },
        {
          label: 'LinkedIn',
          url: 'https://linkedin.com',
          icon: '💼',
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com',
          icon: '🐦',
        },
        {
          label: 'Email',
          url: 'mailto:hello@example.com',
          icon: '✉️',
        },
        {
          label: 'Portfolio',
          url: 'https://myportfolio.com',
          icon: '🌐',
        },
        {
          label: 'Codepen',
          url: 'https://codepen.io',
          icon: '🎨',
        },
      ],
    },
  },

  // Animations config
  animations: {
    cameraDuration: 0.8, // seconds
    cameraEase: 'power2.inOut',
    panelAnimationDuration: 0.4,
    hoverGlowIntensity: 0.8,
    idleGlowIntensity: 0.3,
  },
};

export default brainConfig;
