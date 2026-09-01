import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { ErrorState, LoadingState } from '../../components/admin/SurfaceStates';
import { adminAPI } from '../../utils/auth';
import { blogCategories } from '../../data/blogData';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  meta_description: '',
  keywords: '',
  content: '',
  author: 'Ondosoft',
  category: 'web-development',
  tags: '',
  featured_image: '',
  social_image: '',
  publish_date: new Date().toISOString().slice(0, 10),
  published: false,
  featured: false,
};

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

const AdminBlogEditorPage = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!isNew);

  useEffect(() => {
    if (isNew) return undefined;
    let cancelled = false;
    const load = async () => {
      try {
        const data = await adminAPI.getBlogPost(id);
        if (cancelled) return;
        const post = data.post;
        setForm({
          ...emptyForm,
          ...post,
          tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
          published: Boolean(post.published),
          featured: Boolean(post.featured),
          publish_date: (post.publish_date || '').slice(0, 10),
        });
      } catch (err) {
        if (!cancelled) setLoadError(err.message || 'Failed to load post');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [id, isNew]);

  const update = (name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'title' && !slugTouched) next.slug = slugify(value);
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    const payload = {
      ...form,
      slug: slugify(form.slug || form.title),
      tags: form.tags,
    };
    try {
      if (isNew) {
        const created = await adminAPI.createBlogPost(payload);
        navigate(`/admin/blogs/${created.post.id}`, { replace: true });
      } else {
        await adminAPI.updateBlogPost(id, payload);
        setSaved(true);
      }
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (isNew || !window.confirm('Delete this CMS post? Static in-repo posts are not affected.')) return;
    try {
      await adminAPI.deleteBlogPost(id);
      navigate('/admin/blogs');
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  };

  if (loading) {
    return (
      <>
        <SEOHead title="Edit blog post" noIndex />
        <LoadingState label="Loading post…" />
      </>
    );
  }

  if (loadError) {
    return (
      <>
        <SEOHead title="Edit blog post" noIndex />
        <ErrorState title="Could not load post" message={loadError} />
      </>
    );
  }

  const fieldClass = 'w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white';
  const labelClass = 'block text-sm text-gray-300 mb-1';

  return (
    <>
      <SEOHead title={isNew ? 'New blog post' : 'Edit blog post'} noIndex />
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-400 mb-4">
          <Link to="/admin/blogs" className="text-orange-400 hover:underline">All posts</Link>
        </p>
        <h1 className="text-3xl font-bold text-white mb-6">{isNew ? 'New post' : 'Edit post'}</h1>
        {error ? <ErrorState title="Could not save" message={error} /> : null}
        {saved ? (
          <p className="mb-4 text-sm text-green-400" role="status">Saved.</p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className={labelClass}>Title</label>
            <input id="title" required className={fieldClass} value={form.title} onChange={(e) => update('title', e.target.value)} />
          </div>
          <div>
            <label htmlFor="slug" className={labelClass}>Slug</label>
            <input
              id="slug"
              required
              className={fieldClass}
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                update('slug', e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="excerpt" className={labelClass}>Excerpt</label>
            <textarea id="excerpt" rows={2} className={fieldClass} value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} />
          </div>
          <div>
            <label htmlFor="meta_description" className={labelClass}>SEO description</label>
            <textarea id="meta_description" rows={2} className={fieldClass} value={form.meta_description} onChange={(e) => update('meta_description', e.target.value)} />
          </div>
          <div>
            <label htmlFor="keywords" className={labelClass}>SEO keywords</label>
            <input id="keywords" className={fieldClass} value={form.keywords} onChange={(e) => update('keywords', e.target.value)} />
          </div>
          <div>
            <label htmlFor="content" className={labelClass}>Body (Markdown)</label>
            <textarea id="content" required rows={16} className={`${fieldClass} font-mono text-sm`} value={form.content} onChange={(e) => update('content', e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="author" className={labelClass}>Author</label>
              <input id="author" className={fieldClass} value={form.author} onChange={(e) => update('author', e.target.value)} />
            </div>
            <div>
              <label htmlFor="category" className={labelClass}>Category</label>
              <select id="category" className={fieldClass} value={form.category} onChange={(e) => update('category', e.target.value)}>
                {blogCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="tags" className={labelClass}>Tags (comma separated)</label>
            <input id="tags" className={fieldClass} value={form.tags} onChange={(e) => update('tags', e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="featured_image" className={labelClass}>Featured image URL</label>
              <input id="featured_image" className={fieldClass} value={form.featured_image} onChange={(e) => update('featured_image', e.target.value)} />
            </div>
            <div>
              <label htmlFor="social_image" className={labelClass}>Social image URL</label>
              <input id="social_image" className={fieldClass} value={form.social_image} onChange={(e) => update('social_image', e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="publish_date" className={labelClass}>Publish date</label>
            <input id="publish_date" type="date" className={fieldClass} value={form.publish_date} onChange={(e) => update('publish_date', e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2 text-gray-300">
              <input type="checkbox" checked={form.published} onChange={(e) => update('published', e.target.checked)} />
              Published
            </label>
            <label className="inline-flex items-center gap-2 text-gray-300">
              <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
              Featured
            </label>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" disabled={saving} className="min-h-11 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg">
              {saving ? 'Saving…' : 'Save'}
            </button>
            {!isNew ? (
              <button type="button" onClick={handleDelete} className="min-h-11 px-4 py-2 border border-red-500/50 text-red-300 rounded-lg">
                Delete
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminBlogEditorPage;
