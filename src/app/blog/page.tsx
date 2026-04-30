import type { Metadata } from 'next';
import { Search } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import BlogCard from '@/components/ui/BlogCard';
import { MOCK_BLOG_POSTS } from '@/lib/constants/data';

export const metadata: Metadata = {
  title: 'Blog – Stories, Insights & Impact Reports',
  description: 'Read stories of transformation, insights on education and technology, and impact reports from EduReach.',
};

const CATEGORIES = ['All', 'Impact', 'Technology', 'Health', 'Education', 'Policy', 'Community'];

const ALL_POSTS = [...MOCK_BLOG_POSTS, ...MOCK_BLOG_POSTS.map(p => ({ ...p, id: p.id + '_2', slug: p.slug + '-2' }))];

export default function BlogPage() {
  return (
    <>
      <section className="section pt-32 hero-mesh">
        <div className="container-xl text-center">
          <span className="badge badge-green mb-4">Blog</span>
          <h1 className="section-title mb-4">Stories, Insights & Impact</h1>
          <p className="section-subtitle mx-auto text-center mb-8">
            Perspectives on education, technology, and social change from our team and community.
          </p>
          <div className="flex gap-2 max-w-md mx-auto p-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-[var(--shadow-md)]">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search size={16} className="text-[var(--color-text-faint)]" />
              <input type="text" placeholder="Search articles..." className="flex-1 bg-transparent text-sm focus:outline-none text-[var(--color-text)] placeholder:text-[var(--color-text-faint)]" />
            </div>
            <button className="btn-sm btn-primary">Search</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-xl">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat, i) => (
              <button key={cat}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  i === 0
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          <div className="mb-8">
            <BlogCard post={MOCK_BLOG_POSTS[0]} featured />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_POSTS.slice(1).map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button className="btn-lg btn-ghost">Load more articles</button>
          </div>
        </div>
      </section>
    </>
  );
}
