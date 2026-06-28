import { createServiceClient } from '@/lib/supabase';
import { isAuthedRequest } from '@/lib/adminSession';
import { NextRequest, NextResponse } from 'next/server';

// Storage object names are server-generated basenames (see upload/route.ts);
// reject anything else to prevent path traversal in the storage key.
const SAFE_FILENAME = /^[A-Za-z0-9._-]+$/;

export async function GET(request: NextRequest) {
  if (!isAuthedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const checkUrl = request.nextUrl.searchParams.get('checkUrl');

  if (checkUrl) {
    const { data, error } = await supabase.from('site_settings').select('key, value');
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const usedIn = (data ?? [])
      .filter((row) => JSON.stringify(row.value).includes(checkUrl))
      .map((row) => row.key);
    return NextResponse.json({ usedIn });
  }

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

export async function DELETE(request: NextRequest) {
  if (!isAuthedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await request.json();
  if (!name || typeof name !== 'string' || !SAFE_FILENAME.test(name)) {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.storage.from('media').remove([`uploads/${name}`]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
