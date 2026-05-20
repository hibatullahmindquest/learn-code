'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/components/LanguageContext';
import { useSiteData } from '@/components/SiteDataContext';
import { ArrowRight } from '@phosphor-icons/react';

export default function BlogPage() {
  const { lang } = useLang();
  const { blogPosts } = useSiteData();
  const published = blogPosts.filter((p) => p.published);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ─────────────── HEADER ─────────────── */}
      <section
        className="relative pt-36 pb-20 md:pb-24 px-6 lg:px-10 overflow-hidden"
        style={{ background: 'var(--charcoal)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal" style={{ transform: 'translateY(32px)' } as React.CSSProperties}>
            <p className="text-xs tracking-[0.42em] uppercase mb-5" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'Beauty Tips & Stories' : 'Tips & Cerita Kecantikan'}
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none mb-6"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
            >
              {lang === 'en' ? (
                <>Our <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Blog</span></>
              ) : (
                <>Blog <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Kami</span></>
              )}
            </h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, var(--cream), transparent)' }} />
      </section>

      {/* ─────────────── POSTS ─────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
        {published.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl mb-3" style={{ fontFamily: 'var(--font-cormorant), serif', color: 'var(--charcoal)', fontWeight: 300 }}>
              {lang === 'en' ? 'No posts yet.' : 'Tiada post lagi.'}
            </p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {lang === 'en' ? 'Check back soon.' : 'Nantikan kandungan kami.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {published.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="reveal group block rounded-3xl overflow-hidden bg-white border border-transparent transition-all duration-300 hover:shadow-lg hover:border-[var(--beige)]"
                style={{ transform: 'translateY(32px)', '--delay': `${i * 0.07}s` } as React.CSSProperties}
              >
                {post.featuredImage && (
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={post.featuredImage}
                      alt={post.titleEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.category && (
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--burgundy)' }}>
                      {post.category}
                    </p>
                  )}
                  <h2
                    className="text-xl leading-snug mb-3 group-hover:text-[var(--burgundy)] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--charcoal)' }}
                  >
                    {lang === 'en' ? post.titleEn : post.titleBm}
                  </h2>
                  <p className="text-xs text-gray-400 mb-4">
                    {new Date(post.createdAt).toLocaleDateString(lang === 'en' ? 'en-MY' : 'ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--burgundy)' }}>
                    {lang === 'en' ? 'Read more' : 'Baca lanjut'} <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
