# Goutham Darapogu's Portfolio

A modern, interactive portfolio website showcasing software engineering, data engineering, and machine learning projects.

## Features

- **Beautiful Galaxy-Themed Homepage** - Immersive landing page with interactive planets and starfield background
- **Project Showcase** - Detailed case studies with filtering capabilities
- **Experience Timeline** - Professional timeline with metrics and achievements
- **AI Assistant Chatbot** - Interactive assistant powered by OpenAI that answers questions about your experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Theme** - Modern dark design with cyan and purple accents
- **Smooth Animations** - Professional transitions and interactions throughout

## Tech Stack

### Frontend
- React 18
- React Router v6
- Framer Motion
- Axios
- React Icons
- Three.js (for 3D effects)

### Backend
- Node.js
- Express.js
- OpenAI API (for AI Assistant)
- CORS
- Body Parser

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (for AI Assistant feature)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_key_here
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## Project Structure

```
portfolio/
├── backend/
│   ├── config/           # Configuration files
│   ├── controllers/      # API controllers
│   ├── routes/          # API routes
│   ├── data/
│   │   └── portfolioData.js  # Portfolio content
│   ├── server.js        # Express server
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Navbar.css
    │   │   ├── AIAssistant.js
    │   │   └── AIAssistant.css
    │   ├── pages/
    │   │   ├── HomePage.js & HomePage.css
    │   │   ├── AboutPage.js & AboutPage.css
    │   │   ├── ExperiencePage.js & ExperiencePage.css
    │   │   ├── ProjectsPage.js & ProjectsPage.css
    │   │   ├── ProjectDetailPage.js & ProjectDetailPage.css
    │   │   ├── SkillsPage.js & SkillsPage.css
    │   │   └── ContactPage.js & ContactPage.css
    │   ├── styles/
    │   │   ├── App.css    # Global styles and design system
    │   │   └── index.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Customization

### Update Your Information

Edit `backend/data/portfolioData.js` to update:
- Personal information
- Experience entries
- Projects
- Skills
- Contact information

### Styling

The design system uses CSS custom properties in `frontend/src/styles/App.css`:
- Colors
- Spacing
- Typography
- Animations
- Responsive breakpoints

### AI Assistant

The AI Assistant uses the OpenAI API. Update prompts and behavior in `backend/server.js` at the `/api/chat` endpoint.

## Pages Overview

### Home
- Hero section with animated starfield
- Interactive planet navigation
- Featured projects preview
- Quick statistics

### About
- Professional bio
- Education details
- Key specialties
- Personal stats

### Experience
- Timeline view of professional roles
- Achievements and metrics
- Technology stack per role
- Measurable impact

### Projects
- Gallery with filtering options
- Projects by category
- Links to detailed case studies

### Project Detail
- Problem statement
- Solution approach
- Results and metrics
- Technology stack
- Key features and challenges

### Skills
- Grouped skill categories
- Visual skill representation
- Technology proficiency summary

### Contact
- Contact form
- Social media links
- Email and availability
- Quick connection options

## AI Assistant Features

Ask the assistant questions like:
- "What are your main skills?"
- "Show me your projects"
- "Tell me about your experience"
- "What technologies do you use?"

## Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to your hosting platform

### Backend (Heroku/Railway/Render)

1. Add `.env` variables to your hosting platform
2. Deploy the `backend` directory
3. Update the `proxy` in `frontend/package.json` if needed

## Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key
PORT=5000
NODE_ENV=production
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

- Images are optimized and lazy-loaded
- CSS animations use GPU acceleration
- API calls are debounced
- Components use React.memo for optimization

## Troubleshooting

### AI Assistant not working
- Check OpenAI API key in backend `.env`
- Verify API quota hasn't been exceeded
- Check browser console for errors

### Styling not loading
- Clear browser cache
- Rebuild frontend: `npm run build`
- Check CSS file imports

### Backend not responding
- Verify backend is running on correct port
- Check `proxy` setting in frontend `package.json`
- Review backend console for errors

## Future Enhancements

- [ ] Blog section
- [ ] Dark/Light theme toggle
- [ ] Analytics integration
- [ ] Newsletter signup
- [ ] More interactive 3D visualizations
- [ ] Project comments/feedback
- [ ] Multiple language support

## License

This portfolio is personal work and not licensed for public use.

## Contact

For inquiries about this portfolio or to discuss opportunities:
- Email: goutham.darapogu@example.com
- LinkedIn: linkedin.com/in/yourusername
- GitHub: github.com/yourusername
