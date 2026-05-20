import { createServiceClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase.storage
    .from('media')
    .list('uploads', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const urls = (data ?? [])
    .filter((f) => f.name && !f.name.startsWith('.'))
    .map((f) => ({
      name: f.name,
      url: supabase.storage.from('media').getPublicUrl(`uploads/${f.name}`).data.publicUrl,
    }));

  return NextResponse.json({ files: urls });
}
