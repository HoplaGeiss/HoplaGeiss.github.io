import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        // In a real app, you'd have a way to list all markdown files
        // For now, we'll manually list the posts
        const postSlugs = ['welcome-to-my-blog', 'getting-started-with-react'];
        
        const postsData = await Promise.all(
          postSlugs.map(async (slug) => {
            try {
              const response = await fetch(`/hoplaWeb/blog/${slug}.md`);
              const text = await response.text();
              const { data } = matter(text);
              
              return {
                slug,
                title: data.title || 'Untitled',
                date: data.date || '',
                excerpt: data.excerpt || '',
                tags: data.tags || [],
              };
            } catch (error) {
              console.error(`Error loading post ${slug}:`, error);
              return null;
            }
          })
        );

        const validPosts = postsData.filter((post): post is BlogPost => post !== null);
        
        // Sort by date, newest first
        validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setPosts(validPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-20 transition-colors">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Tech <span className="text-orange-500">Blog</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
          Thoughts, tutorials, and insights on software development
        </p>

        {posts.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-6 hover:border-primary transition-colors group"
              >
                <h2 className="text-2xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{post.date}</p>
                <p className="text-slate-700 dark:text-slate-300 mb-4">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-full text-sm text-slate-700 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
