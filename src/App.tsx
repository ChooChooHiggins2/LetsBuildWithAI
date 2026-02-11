import { motion } from 'framer-motion';
import { Github, Mail, ChevronRight, Code, BookOpen } from 'lucide-react';

const Navbar = () => (
  <nav className="navbar glass">
    <div className="logo" style={{ fontWeight: 800, fontSize: '1.2rem' }}>
      LBWA<span style={{ color: 'var(--accent-color)' }}>.</span>
    </div>
    <div className="nav-links">
      <a href="#projects" className="nav-link">Projects</a>
      <a href="#blog" className="nav-link">Blog</a>
      <a href="#contact" className="nav-link">Contact</a>
    </div>
  </nav>
);

const ProjectCard = ({ title, description, link }: { title: string, description: string, link: string }) => (
  <motion.div
    className="glass-card project-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>
      <Code size={24} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    {link !== "#" ? (
      <a href={link} className="project-link" target="_blank" rel="noopener noreferrer">
        View Project <ChevronRight size={16} />
      </a>
    ) : (
      <div className="project-link" style={{ opacity: 0.5, cursor: 'default' }}>
        Local Tool / Coming Soon
      </div>
    )}
  </motion.div>
);

function App() {
  const projects = [
    {
      title: "Valentine's Slots",
      description: "A romantic themed slot machine game with Stripe integration and Vercel Blob storage.",
      link: "https://cupids-jackpot.vercel.app/"
    },
    {
      title: "Hippie Cat Slots",
      description: "A groovy, retro-styled slot machine experience with funky cat-themed mechanics.",
      link: "https://hippie-cats-slots.vercel.app/"
    },
    {
      title: "Meow Meow Butt Coloring Book",
      description: "A delightful AI-assisted coloring book featuring quirky cat illustrations.",
      link: "https://meowmeowbutt.gumroad.com/l/yfviu"
    },
    {
      title: "Creative Studio",
      description: "An AI-powered art pipeline for generating and upscaling coloring pages.",
      link: "#"
    }
  ];

  return (
    <div className="app-container">
      <Navbar />

      <main>
        <section className="hero container">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="gradient-text"
          >
            Let's Build with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A collection of experimental projects, tools, and thoughts on building the future with artificial intelligence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a href="#projects" className="cta-button">
              Explore Projects <ChevronRight size={20} />
            </a>
          </motion.div>
        </section>

        <section id="projects" className="container" style={{ padding: '8rem 0' }}>
          <h2 className="section-title">AI Projects</h2>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </div>
        </section>

        <section id="blog" className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
          <h2 className="section-title">The Blog</h2>
          <div className="glass-card" style={{ padding: '4rem 2rem' }}>
            <BookOpen size={48} style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }} />
            <p style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem' }}>Coming soon...</p>
            <p style={{ opacity: 0.7, maxWidth: '500px', margin: '0 auto' }}>Deep dives into AI engineering, prompt design, and the technical side of creative AI.</p>
          </div>
        </section>

        <section id="contact" className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
          <h2 className="section-title">Get in Touch</h2>
          <p style={{ opacity: 0.8, marginBottom: '3rem' }}>Have a project in mind or just want to chat about AI?</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <a href="mailto:contact@letsbuildwithai.com" className="cta-button">
              <Mail size={20} /> Email Me
            </a>
            <a href="https://github.com/BDHRE" className="cta-button" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <Github size={20} /> GitHub
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} Let's Build with AI. Built with passion and code.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
