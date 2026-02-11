import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Mail, ChevronRight, Code, BookOpen, Calendar } from 'lucide-react';
import { BlogList } from './pages/BlogList';
import { BlogPostPage } from './pages/BlogPost';
import { useEffect, useState } from 'react';
import { getAllPosts } from './blogUtils';
import type { BlogPost } from './blogUtils';

const Navbar = () => (
  <nav className="navbar glass">
    <div className="logo" style={{ fontWeight: 800, fontSize: '1.2rem' }}>
      <Link to="/">LBWA<span style={{ color: 'var(--accent-color)' }}>.</span></Link>
    </div>
    <div className="nav-links">
      <Link to="/#projects" className="nav-link">Projects</Link>
      <Link to="/blog" className="nav-link">Blog</Link>
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

const Home = () => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getAllPosts().then(posts => setLatestPosts(posts.slice(0, 2)));
  }, []);

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
    <>
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

      <section id="blog" className="container" style={{ padding: '5rem 0' }}>
        <h2 className="section-title">Latest from the Blog</h2>
        <div className="projects-grid">
          {latestPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              className="glass-card project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={12} /> {post.date}
                </span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="project-link">
                Read Post <ChevronRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/blog" className="cta-button" style={{ display: 'inline-flex', background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            View All Posts <BookOpen size={20} />
          </Link>
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
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </main>

        <footer>
          <div className="container">
            <p>© {new Date().getFullYear()} Let's Build with AI. Built with passion and code.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
