import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateRoundFavicon() {
  const size = 192;

  // Create a circular mask SVG
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/></svg>`
  );

  // Resize the source logo to 192x192 and apply circular mask
  const roundIcon = await sharp('public/logo.jpeg')
    .resize(size, size)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join('public', 'favicon-192.png'), roundIcon);
  console.log('✅ Generated round favicon-192.png');
}

generateRoundFavicon().catch(console.error);
