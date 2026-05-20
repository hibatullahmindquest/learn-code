import { createServiceClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const buffer = await file.arrayBuffer();

  const supabase = createServiceClient();
  const { data, error } = await supabase.storage
    .from('media')
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(data.path);
  return NextResponse.json({ url: publicUrl });
}
