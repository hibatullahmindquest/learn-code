import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, '..', 'public', 'images');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(url, key);

const mimeMap = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

const files = readdirSync(imagesDir);
const results = {};

for (const file of files) {
  const ext = extname(file).toLowerCase();
  const mime = mimeMap[ext];
  if (!mime) continue;

  const buffer = readFileSync(join(imagesDir, file));
  const path = `uploads/${file}`;

  const { data, error } = await supabase.storage
    .from('media')
    .upload(path, buffer, { contentType: mime, upsert: true });

  if (error) {
    console.error(`FAIL ${file}: ${error.message}`);
    continue;
  }

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(data.path);
  results[basename(file, ext).replace(/-/g, '_')] = publicUrl;
  console.log(`OK  ${file} → ${publicUrl}`);
}

console.log('\n--- URLs (JSON) ---');
console.log(JSON.stringify(results, null, 2));
