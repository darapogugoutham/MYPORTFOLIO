// Brain portfolio configuration and content data
import portfolioData from './portfolioData';

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
      bio: portfolioData.about.bio,
      highlights: portfolioData.about.highlights,
    },

    skills: {
      categories: [
        {
          name: 'Frontend',
          items: portfolioData.skills.frontend,
        },
        {
          name: 'Backend',
          items: portfolioData.skills.backend,
        },
        {
          name: 'AI/ML',
          items: portfolioData.skills.genAIML,
        },
        {
          name: 'Tools & DevOps',
          items: [...portfolioData.skills.cloud, ...portfolioData.skills.tools],
        },
        {
          name: 'Data Engineering',
          items: portfolioData.skills.dataEngineering,
        },
      ],
    },

    projects: {
      items: portfolioData.projects.map((project) => ({
        title: project.title,
        tech: project.technologies.join(', '),
        description: project.description,
      })),
    },

    experience: {
      items: portfolioData.experience.map((job) => ({
        title: job.role,
        company: job.company,
        date: job.dates,
        description: job.description,
      })),
    },

    contact: {
      links: [
        {
          label: 'GitHub',
          url: portfolioData.contact.github,
          icon: '🐙',
        },
        {
          label: 'LinkedIn',
          url: portfolioData.contact.linkedin,
          icon: '💼',
        },
        {
          label: 'Email',
          url: `mailto:${portfolioData.contact.email}`,
          icon: '✉️',
        },
        {
          label: 'Portfolio',
          url: 'https://goutham-dev.vercel.app',
          icon: '🌐',
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
