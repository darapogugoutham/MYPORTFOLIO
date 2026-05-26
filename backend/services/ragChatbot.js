const portfolioData = require('../data/portfolioData');

// Simple RAG implementation without external API dependencies
// Uses pure JavaScript for embeddings and semantic search

// Simple embedding function
// Creates vector representation of text using hash-based approach
const createSimpleEmbedding = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  const embedding = new Array(300).fill(0);
  
  // Simple hash-based embedding
  for (let word of words) {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = ((hash << 5) - hash) + word.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    const index = Math.abs(hash) % 300;
    embedding[index] += 1 / words.length;
  }
  
  return embedding;
};

// Calculate cosine similarity
const cosineSimilarity = (a, b) => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (normA * normB);
};

// Initialize RAG system
const initializeRAG = () => {
  const documents = [];
  
  // Add about information
  if (portfolioData.about) {
    documents.push({
      content: `${portfolioData.about.name} is a ${portfolioData.about.role}. ${portfolioData.about.bio}`,
      metadata: { type: 'about' }
    });
  }
  
  // Add projects
  if (portfolioData.projects) {
    portfolioData.projects.forEach(project => {
      documents.push({
        content: `Project: ${project.title}. ${project.description}. Technologies: ${project.technologies.join(', ')}. ${project.approach}. ${project.impact}`,
        metadata: { type: 'project', id: project.id, title: project.title }
      });
    });
  }
  
  // Add experience
  if (portfolioData.experience) {
    portfolioData.experience.forEach(exp => {
      documents.push({
        content: `${exp.role} at ${exp.company}. ${exp.description}. Achievements: ${exp.achievements.join(', ')}. Technologies: ${exp.technologies.join(', ')}`,
        metadata: { type: 'experience', company: exp.company }
      });
    });
  }
  
  // Add skills
  if (portfolioData.skills) {
    documents.push({
      content: `Skills: Languages - ${portfolioData.skills.languages.join(', ')}. Frontend - ${portfolioData.skills.frontend.join(', ')}. Backend - ${portfolioData.skills.backend.join(', ')}. Cloud - ${portfolioData.skills.cloud.join(', ')}. Data Engineering - ${portfolioData.skills.dataEngineering.join(', ')}. GenAI & ML - ${portfolioData.skills.genAIML.join(', ')}. Databases - ${portfolioData.skills.databases.join(', ')}. Tools - ${portfolioData.skills.tools.join(', ')}`,
      metadata: { type: 'skills' }
    });
  }
  
  // Add certifications
  if (portfolioData.certifications) {
    portfolioData.certifications.forEach(cert => {
      documents.push({
        content: `Certification: ${cert.title} from ${cert.issuer}. Skills: ${cert.skills.join(', ')}. Description: ${cert.description}`,
        metadata: { type: 'certification', issuer: cert.issuer }
      });
    });
  }
  
  // Create embeddings for all documents
  const docsWithEmbeddings = documents.map(doc => ({
    ...doc,
    embedding: createSimpleEmbedding(doc.content)
  }));
  
  return docsWithEmbeddings;
};

// Retrieve relevant documents
const retrieveRelevantDocs = (query, allDocs, topK = 3) => {
  const queryEmbedding = createSimpleEmbedding(query);
  
  const scored = allDocs.map(doc => ({
    ...doc,
    score: cosineSimilarity(queryEmbedding, doc.embedding)
  }));
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter(doc => doc.score > 0.1);
};

// Generate response based on retrieved context
const generateRAGResponse = (query, relevantDocs) => {
  // Define responses based on query intent
  const queryLower = query.toLowerCase();
  
  // Route queries to appropriate response generators
  if (queryLower.includes('skill') || queryLower.includes('expertise') || queryLower.includes('work with')) {
    return generateSkillsResponse(relevantDocs);
  }
  
  if (queryLower.includes('project') || queryLower.includes('built') || queryLower.includes('work')) {
    return generateProjectsResponse(query, relevantDocs);
  }
  
  if (queryLower.includes('experience') || queryLower.includes('background') || queryLower.includes('role')) {
    return generateExperienceResponse(relevantDocs);
  }
  
  if (queryLower.includes('certificate') || queryLower.includes('certified') || queryLower.includes('education')) {
    return generateCertificationResponse(relevantDocs);
  }
  
  if (queryLower.includes('about') || queryLower.includes('who are') || queryLower.includes('introduce')) {
    return generateAboutResponse(relevantDocs);
  }
  
  // Default response using context
  return generateContextualResponse(query, relevantDocs);
};

const generateSkillsResponse = (docs) => {
  const skillDoc = docs.find(d => d.metadata.type === 'skills');
  if (skillDoc) {
    return `I have expertise in a broad range of technologies:\n\n${skillDoc.content}\n\nI'm always learning new technologies and adapting to project requirements!`;
  }
  return "I work with modern technologies across full-stack development, cloud platforms, and machine learning.";
};

const generateProjectsResponse = (query, docs) => {
  const projectDocs = docs.filter(d => d.metadata.type === 'project');
  if (projectDocs.length === 0) {
    return "I've built several interesting projects. Visit the Projects page to see them all!";
  }
  
  let response = `I've worked on ${projectDocs.length} featured projects:\n\n`;
  projectDocs.forEach((doc, idx) => {
    response += `${idx + 1}. ${doc.metadata.title} - Demonstrates expertise in ${doc.content.split('Technologies:')[1]?.split('.')[0] || 'modern technologies'}.\n`;
  });
  response += `\nEach project represents challenges I solved and skills I demonstrated. Check out the Projects page for full details!`;
  
  return response;
};

const generateExperienceResponse = (docs) => {
  const expDocs = docs.filter(d => d.metadata.type === 'experience');
  if (expDocs.length === 0) {
    return "I have professional experience in software engineering, data engineering, and machine learning roles.";
  }
  
  let response = `I've had the privilege to work at:\n\n`;
  expDocs.forEach(doc => {
    response += `• ${doc.metadata.company}\n`;
  });
  response += `\nThese roles have given me hands-on experience in building scalable systems and solving real-world problems.`;
  
  return response;
};

const generateCertificationResponse = (docs) => {
  const certDocs = docs.filter(d => d.metadata.type === 'certification');
  if (certDocs.length === 0) {
    return "I'm constantly learning and have earned several professional certifications.";
  }
  
  const issuers = new Set(certDocs.map(d => d.metadata.issuer));
  let response = `I've earned certifications from:\n\n`;
  issuers.forEach(issuer => {
    response += `• ${issuer}\n`;
  });
  response += `\nThese certifications validate my expertise in emerging technologies and best practices.`;
  
  return response;
};

const generateAboutResponse = (docs) => {
  const aboutDoc = docs.find(d => d.metadata.type === 'about');
  if (aboutDoc) {
    return aboutDoc.content + '\n\nFeel free to explore my work through the navigation menu!';
  }
  return "I'm a passionate developer dedicated to building scalable and intelligent systems. Learn more about me through the portfolio!";
};

const generateContextualResponse = (query, docs) => {
  if (docs.length === 0) {
    return "Great question! Feel free to explore different sections of my portfolio to learn more about my work, skills, and experience. What specific area interests you most?";
  }
  
  const firstDoc = docs[0];
  const docTypeResponses = {
    'project': `This relates to my project work. ${firstDoc.content.substring(0, 200)}... Check the Projects page for more details!`,
    'experience': `This relates to my professional experience. I have experience in ${firstDoc.metadata.company} and many other roles.`,
    'skills': `This relates to my technical skills. I'm proficient in various technologies across different domains.`,
    'certification': `This relates to my continuous learning journey. I have earned several professional certifications.`,
    'about': `${firstDoc.content}`,
  };
  
  return docTypeResponses[firstDoc.metadata.type] || 'I appreciate your interest! Feel free to explore more sections of my portfolio to find what you\'re looking for.';
};

// Rate limiting helper
const createRateLimiter = () => {
  const cache = new Map();
  
  return {
    isLimited: (ip) => {
      const now = Date.now();
      const record = cache.get(ip) || { count: 0, resetTime: now + 60000 };
      
      if (now > record.resetTime) {
        cache.set(ip, { count: 1, resetTime: now + 60000 });
        return false;
      }
      
      if (record.count >= 10) {
        return true;
      }
      
      record.count++;
      cache.set(ip, record);
      return false;
    }
  };
};

module.exports = {
  initializeRAG,
  retrieveRelevantDocs,
  generateRAGResponse,
  createRateLimiter
};
