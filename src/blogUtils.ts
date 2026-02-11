import matter from 'gray-matter';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    author: string;
    content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
    const modules = import.meta.glob('/src/content/blog/*.md', { as: 'raw', eager: true });

    const posts = Object.entries(modules).map(([filepath, rawContent]) => {
        const slug = filepath.split('/').pop()?.replace('.md', '') || '';
        const { data, content } = matter(rawContent as string);

        return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || '',
            excerpt: data.excerpt || '',
            author: data.author || 'Anonymous',
            content
        };
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await getAllPosts();
    return posts.find(p => p.slug === slug) || null;
}
