import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const revalidate = 60;

export async function GET() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value');

  if (error) {
    return NextResponse.json({});
  }

  const settings: Record<string, unknown> = {};
  for (const row of data) {
    settings[row.key] = row.value;
  }

  return NextResponse.json(settings);
}
