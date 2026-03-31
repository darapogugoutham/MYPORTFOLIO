const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const { OpenAI } = require('openai');
const portfolioData = require('./data/portfolioData');

dotenv.config();

const app = express();

// ============ SECURITY LAYER 1: CORS (MUST BE FIRST) ============
// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
  'http://localhost:4000',
  'https://goutham-dev.vercel.app',
  'https://goutham-myportfolio.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in whitelist or is a Vercel preview branch
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-JSON-Response'],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200 
};

// Apply CORS middleware FIRST - before any other middleware
app.use(cors(corsOptions));

// Handle Preflight requests globally
app.options('*', cors(corsOptions));

// ============ SECURITY LAYER 2: TRANSPORT & HEADERS ============
// Helmet helps secure Express apps by setting various HTTP headers
// MUST come AFTER CORS to avoid interfering with CORS headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "*.vercel.app"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "api.openai.com", "https:"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  noSniff: true,
  xssFilter: true,
  frameguard: { action: 'deny' },
}));

// ============ SECURITY LAYER 3: RATE LIMITING ============

// Rate limiting - prevent abuse
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // max 5 contact form submissions per hour per IP
  message: 'Too many contact submissions, please try again later.',
  standardHeaders: true,
});

const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // max 10 chat messages per minute per IP
  message: 'Rate limit exceeded. Please wait before sending another message.',
  standardHeaders: true,
});

app.use('/api/', generalLimiter);

// ============ SECURITY LAYER 4: BODY PARSING & VALIDATION ============
app.use(bodyParser.json({ limit: '10kb' })); // limit request size
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

// Input validation middleware
const validateInput = (req, res, next) => {
  if (req.body.message && typeof req.body.message === 'string') {
    req.body.message = sanitizeInput(req.body.message);
  }
  if (req.body.email && typeof req.body.email === 'string') {
    req.body.email = req.body.email.trim().toLowerCase();
  }
  if (req.body.name && typeof req.body.name === 'string') {
    req.body.name = sanitizeInput(req.body.name);
  }
  next();
};

const sanitizeInput = (input) => {
  if (!input) return '';
  return input
    .trim()
    .slice(0, 500) // max length
    .replace(/[<>\"']/g, ''); // remove potentially dangerous chars
};

app.use(validateInput);

// Initialize OpenAI (optional - only if API key is provided)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// ============ ROOT ENDPOINT ============
app.get('/', (req, res) => {
  res.json({
    message: 'Goutham Darapogu Portfolio API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      data: '/api/data',
      projects: '/api/projects',
      experience: '/api/experience',
      skills: '/api/skills',
      certifications: '/api/certifications',
      contact: '/api/contact (POST)',
      chat: '/api/chat (POST)',
    }
  });
});

// ============ HEALTH CHECK ENDPOINT (for keep-alive pings) ============
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime() 
  });
});

// ============ API ENDPOINTS ============
app.get('/api/data', (req, res) => {
  res.json(portfolioData);
});

app.get('/api/projects', (req, res) => {
  res.json(portfolioData.projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = portfolioData.projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

app.get('/api/experience', (req, res) => {
  res.json(portfolioData.experience);
});

app.get('/api/skills', (req, res) => {
  res.json(portfolioData.skills);
});

app.get('/api/certifications', (req, res) => {
  res.json(portfolioData.certifications);
});

// Visitor Counter endpoint
app.get('/api/visitors', (req, res) => {
  const visitorsFile = path.join(__dirname, 'data', 'visitors.json');
  
  try {
    let data = { count: 0 };
    
    // Read existing count
    if (fs.existsSync(visitorsFile)) {
      const fileContent = fs.readFileSync(visitorsFile, 'utf8');
      data = JSON.parse(fileContent);
    }
    
    // Increment count
    data.count += 1;
    data.lastUpdated = new Date().toISOString();
    
    // Write back to file
    fs.writeFileSync(visitorsFile, JSON.stringify(data, null, 2));
    
    res.json({ visitors: data.count });
  } catch (error) {
    console.error('Error updating visitor count:', error);
    res.json({ visitors: 0 });
  }
});

app.get('/api/visitors-count', (req, res) => {
  const visitorsFile = path.join(__dirname, 'data', 'visitors.json');
  
  try {
    if (fs.existsSync(visitorsFile)) {
      const fileContent = fs.readFileSync(visitorsFile, 'utf8');
      const data = JSON.parse(fileContent);
      res.json({ visitors: data.count });
    } else {
      res.json({ visitors: 0 });
    }
  } catch (error) {
    console.error('Error reading visitor count:', error);
    res.json({ visitors: 0 });
  }
});

// AI Assistant endpoint
// AI Assistant endpoint with rate limiting
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message } = req.body;

    // If OpenAI is not configured, return a friendly message
    if (!openai) {
      return res.json({
        message: "Thanks for reaching out! The AI assistant isn't configured right now, but you can still contact me directly through the contact form. Feel free to ask about my experience on the other pages!",
      });
    }
    
    const systemPrompt = `You are an AI assistant representing Goutham Darapogu, a Software Engineer, Data Engineer, and ML Builder. 
    Here is Goutham's portfolio information:
    ${JSON.stringify(portfolioData, null, 2)}
    
    Answer questions about Goutham's experience, projects, skills, and background in a friendly, professional manner.
    Keep responses concise and engaging. Direct users to specific sections or projects when relevant.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json({
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'gouthamdarapogu@gmail.com',
    pass: process.env.GMAIL_PASSWORD || process.env.APP_PASSWORD || '',
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('New contact form submission:', { name, email, message });
  
  // Send email to portfolio owner
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER || 'gouthamdarapogu@gmail.com',
      to: 'gouthamdarapogu@gmail.com',
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Reply to: ${escapeHtml(email)}</em></p>
      `,
    };

    if (process.env.APP_PASSWORD || process.env.GMAIL_PASSWORD) {
      await transporter.sendMail(mailOptions);
      console.log('✓ Email sent successfully to gouthamdarapogu@gmail.com');
    } else {
      console.log('⚠ Email not configured - set GMAIL_PASSWORD or APP_PASSWORD environment variable');
    }
  } catch (emailError) {
    console.error('Email sending failed:', emailError.message);
    // Still return success - don't fail the request
  }
  
  res.json({ success: true, message: 'Message received! We\'ll get back to you soon.' });
});

// Helper function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

app.get('/api/about', (req, res) => {
  res.json(portfolioData.about);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
