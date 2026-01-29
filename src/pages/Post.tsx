import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

interface PostData {
  title: string;
  date: string;
  tags: string[];
  content: string;
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      
      try {
        const response = await fetch(`/blog/${slug}.md`);
        
        if (!response.ok) {
          setError(true);
          return;
        }
        
        const text = await response.text();
        const { data, content } = matter(text);
        
        setPost({
          title: data.title || 'Untitled',
          date: data.date || '',
          tags: data.tags || [],
          content,
        });
      } catch (err) {
        console.error('Error loading post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-20 transition-colors">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-20 transition-colors">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="inline-flex items-center text-orange-500 hover:text-orange-600"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      <article className="container mx-auto max-w-4xl px-4">
        <Link
          to="/blog"
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-8"
        >
          ← Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{post.date}</p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full text-sm text-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-300 dark:border-slate-800">
          <Link
            to="/blog"
            className="inline-flex items-center text-orange-500 hover:text-orange-600"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
