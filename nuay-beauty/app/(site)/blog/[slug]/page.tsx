'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLang } from '@/components/LanguageContext';
import { useSiteData } from '@/components/SiteDataContext';
import { ArrowLeft } from '@phosphor-icons/react';

export default function BlogPostPage() {
  const { lang } = useLang();
  const { blogPosts } = useSiteData();
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const post = blogPosts.find((p) => p.slug === slug && p.published);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div style={{ background: 'var(--beige-50)' }} className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-4xl" style={{ fontFamily: 'var(--font-nuay-display), serif', color: 'var(--ink-950)', fontWeight: 300 }}>
          {lang === 'en' ? 'Post not found.' : 'Post tidak dijumpai.'}
        </p>
        <Link href="/blog" className="text-sm underline" style={{ color: 'var(--wine-700)' }}>
          {lang === 'en' ? '← Back to Blog' : '← Kembali ke Blog'}
        </Link>
      </div>
    );
  }

  const title = lang === 'en' ? post.titleEn : post.titleBm;
  const body = lang === 'en' ? post.bodyEn : post.bodyBm;
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <div style={{ background: 'var(--beige-50)' }}>

      {/* ─────────────── HERO ─────────────── */}
      <section
        className="relative pt-36 md:pt-44 pb-16 px-6 lg:px-10 overflow-hidden"
        style={{ background: 'var(--ink-950)' }}
      >
        <div className="max-w-3xl mx-auto relative z-10">
          {post.category && (
            <p className="text-xs tracking-[0.38em] uppercase mb-5" style={{ color: 'var(--gold-600)' }}>
              {post.category}
            </p>
          )}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-5"
            style={{ fontFamily: 'var(--font-nuay-display), serif', fontWeight: 600, color: 'var(--beige-50)' }}
          >
            {title}
          </h1>
          <p className="text-sm" style={{ color: 'rgba(249,246,243,0.45)' }}>
            {new Date(post.createdAt).toLocaleDateString(lang === 'en' ? 'en-MY' : 'ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, var(--beige-50), transparent)' }} />
      </section>

      {/* ─────────────── FEATURED IMAGE ─────────────── */}
      {post.featuredImage && (
        <div className="max-w-3xl mx-auto px-6 lg:px-10 -mt-8 mb-12">
          <div className="relative overflow-hidden rounded-3xl shadow-lg" style={{ aspectRatio: '16/9' }}>
            <Image src={post.featuredImage} alt={title} fill className="object-cover" />
          </div>
        </div>
      )}

      {/* ─────────────── BODY ─────────────── */}
      <article className="max-w-3xl mx-auto px-6 lg:px-10 pb-32">
        <div className="flex flex-col gap-5 mb-16">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--ink-400)' }}>
              {para}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-8" style={{ borderTop: '1px solid var(--line)' }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm"
            style={{ color: 'var(--wine-700)' }}
          >
            <ArrowLeft size={14} />
            {lang === 'en' ? 'Back to Blog' : 'Kembali ke Blog'}
          </Link>
        </div>
      </article>

    </div>
  );
}
