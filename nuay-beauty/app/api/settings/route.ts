import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const revalidate = 60;

// Rows that hold an array of items with a `published` flag — unpublished
// items (drafts, hidden artists/services, unapproved testimonials) must be
// stripped server-side, not just hidden client-side, since this endpoint is
// public and unauthenticated. Matches the same "published" semantics each
// public page already applies client-side (artists/services/testimonials
// default to shown unless explicitly hidden; blog posts default to hidden
// unless explicitly published).
const DEFAULT_SHOWN_KEYS = new Set(['artists', 'services', 'testimonials']);
const DEFAULT_HIDDEN_KEYS = new Set(['blog_posts']);

export async function GET() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value');

  if (error) {
    return NextResponse.json({});
  }

  const settings: Record<string, unknown> = {};
  for (const row of data) {
    if (DEFAULT_SHOWN_KEYS.has(row.key) && Array.isArray(row.value)) {
      settings[row.key] = row.value.filter((item) => item?.published !== false);
    } else if (DEFAULT_HIDDEN_KEYS.has(row.key) && Array.isArray(row.value)) {
      settings[row.key] = row.value.filter((item) => item?.published === true);
    } else {
      settings[row.key] = row.value;
    }
  }

  return NextResponse.json(settings);
}
