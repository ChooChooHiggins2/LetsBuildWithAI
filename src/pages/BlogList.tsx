import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, User } from 'lucide-react';
import { getAllPosts } from '../blogUtils';
import type { BlogPost } from '../blogUtils';

export const BlogList = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        getAllPosts().then(setPosts);
    }, []);

    return (posts.length > 0 ? (
        <div className="container" style={{ padding: '8rem 0' }}>
            <h1 className="section-title gradient-text">The Blog</h1>
            <div className="projects-grid">
                {posts.map((post, i) => (
                    <motion.div
                        key={post.slug}
                        className="glass-card project-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Calendar size={12} /> {post.date}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <User size={12} /> {post.author}
                            </span>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <Link to={`/blog/${post.slug}`} className="project-link">
                            Read More <ChevronRight size={16} />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    ) : (
        <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <h1 className="section-title gradient-text">The Blog</h1>
            <p style={{ opacity: 0.7 }}>No posts found yet. Check back soon!</p>
        </div>
    ));
};
