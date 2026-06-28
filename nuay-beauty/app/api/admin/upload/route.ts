import { createServiceClient } from '@/lib/supabase';
import { isAuthedRequest } from '@/lib/adminSession';
import { NextRequest, NextResponse } from 'next/server';

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB

const SIGNATURES: { mime: string; ext: string; bytes: number[] }[] = [
  { mime: 'image/jpeg', ext: 'jpg', bytes: [0xff, 0xd8, 0xff] },
  { mime: 'image/png', ext: 'png', bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { mime: 'image/gif', ext: 'gif', bytes: [0x47, 0x49, 0x46, 0x38] },
];

// Detects the real file type from its magic bytes rather than trusting the
// client-supplied extension/MIME type, so an uploaded file can't masquerade
// as an image while actually being served (publicly, from storage) as HTML/SVG.
function detectImageType(buffer: Buffer): { mime: string; ext: string } | null {
  for (const sig of SIGNATURES) {
    if (sig.bytes.every((b, i) => buffer[i] === b)) return { mime: sig.mime, ext: sig.ext };
  }
  if (buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    return { mime: 'image/webp', ext: 'webp' };
  }
  return null;
}

export async function POST(request: NextRequest) {
  if (!isAuthedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: 'Fail terlalu besar (max 8MB)' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = detectImageType(buffer);
  if (!detected) {
    return NextResponse.json({ error: 'Jenis fail tidak disokong. Hanya JPG, PNG, GIF, WEBP.' }, { status: 400 });
  }

  const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${detected.ext}`;

  const supabase = createServiceClient();
  const { data, error } = await supabase.storage
    .from('media')
    .upload(filename, buffer, { contentType: detected.mime, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(data.path);
  return NextResponse.json({ url: publicUrl });
}
