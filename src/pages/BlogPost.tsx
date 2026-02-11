import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { getPostBySlug } from '../blogUtils';
import type { BlogPost as PostType } from '../blogUtils';

export const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<PostType | null>(null);

    useEffect(() => {
        if (slug) {
            getPostBySlug(slug).then(setPost);
        }
    }, [slug]);

    if (!post) {
        return (
            <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <p>Loading post...</p>
            </div>
        );
    }

    return (
        <motion.div
            className="container"
            style={{ padding: '8rem 0', maxWidth: '800px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Link to="/blog" className="project-link" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
                <ArrowLeft size={16} /> Back to Blog
            </Link>

            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1rem' }} className="gradient-text">
                    {post.title}
                </h1>
                <div style={{ display: 'flex', gap: '1.5rem', opacity: 0.6 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={16} /> {post.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <User size={16} /> {post.author}
                    </span>
                </div>
            </header>

            <div className="markdown-content" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </motion.div>
    );
};
