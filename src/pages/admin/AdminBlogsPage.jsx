import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { EmptyState, ErrorState, LoadingState } from '../../components/admin/SurfaceStates';
import { adminAPI } from '../../utils/auth';
import { useAbortableEffect, isAbortError } from '../../hooks/useAbortableEffect';

const AdminBlogsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminAPI.getBlogPosts({ signal });
      setPosts(data.posts || []);
    } catch (err) {
      if (isAbortError(err)) return;
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useAbortableEffect((signal) => {
    load(signal);
  }, []);

  if (loading) {
    return (
      <>
        <SEOHead title="Admin Blogs" noIndex />
        <LoadingState label="Loading blog posts…" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEOHead title="Admin Blogs" noIndex />
        <ErrorState title="Could not load posts" message={error} onRetry={() => load()} />
      </>
    );
  }

  return (
    <>
      <SEOHead title="Admin Blogs" noIndex />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Blog posts</h1>
            <p className="text-gray-400 mt-1">
              CMS posts live in the database. Static in-repo posts still appear on /blogs unless a CMS slug matches.
            </p>
          </div>
          <Link
            to="/admin/blogs/new"
            className="inline-flex items-center justify-center min-h-11 gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            New post
          </Link>
        </div>

        {posts.length === 0 ? (
          <EmptyState
            title="No CMS posts yet"
            message="Create a post with a slug, SEO fields, and a publish state. The public blog still shows the existing static articles."
            action={(
              <Link to="/admin/blogs/new" className="text-orange-400 font-semibold hover:underline">
                Write the first post
              </Link>
            )}
          />
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-lg">
            <table className="min-w-full text-sm text-left">
              <caption className="sr-only">CMS blog posts</caption>
              <thead className="bg-gray-900 text-gray-300">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Title</th>
                  <th scope="col" className="px-4 py-3 font-medium">Slug</th>
                  <th scope="col" className="px-4 py-3 font-medium">Status</th>
                  <th scope="col" className="px-4 py-3 font-medium">Published</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t border-gray-800">
                    <td className="px-4 py-3">
                      <Link to={`/admin/blogs/${post.id}`} className="text-white hover:text-orange-400 font-medium">
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">{post.slug}</td>
                    <td className="px-4 py-3">
                      <span className={post.published ? 'text-green-400' : 'text-amber-400'}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{post.publish_date || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminBlogsPage;
