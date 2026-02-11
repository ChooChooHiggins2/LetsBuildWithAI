import matter from 'gray-matter';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    author: string;
    content: string;
}

// Simple frontmatter parser to avoid issues with gray-matter in some browser environments
function parseFrontmatter(rawContent: string) {
    const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { data: {} as any, content: rawContent };

    const yaml = match[1];
    const body = match[2];
    const data: any = {};
    yaml.split('\n').forEach(line => {
        const [key, ...val] = line.split(':');
        if (key && val.length > 0) {
            data[key.trim()] = val.join(':').trim().replace(/^["']|["']$/g, '');
        }
    });
    return { data, content: body };
}

export async function getAllPosts(): Promise<BlogPost[]> {
    // Using relative path for Vite glob
    const modules = import.meta.glob('./content/blog/*.md', { query: '?raw', import: 'default', eager: true });

    console.log('Blog initialization - found modules:', Object.keys(modules));

    const posts = Object.entries(modules).map(([filepath, rawContent]) => {
        const slug = filepath.split('/').pop()?.replace('.md', '') || '';
        console.log('Processing blog post:', slug);

        try {
            const { data, content } = parseFrontmatter(rawContent as string);
            return {
                slug,
                title: data.title || 'Untitled',
                date: data.date || '',
                excerpt: data.excerpt || '',
                author: data.author || 'Anonymous',
                content
            };
        } catch (err) {
            console.error('Failed to parse blog post:', slug, err);
            return null;
        }
    }).filter((p): p is BlogPost => p !== null);

    console.log('Final parsed posts count:', posts.length);
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await getAllPosts();
    return posts.find(p => p.slug === slug) || null;
}
