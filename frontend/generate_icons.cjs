const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'logo.svg');
const out192 = path.join(__dirname, 'public', 'pwa-192x192.png');
const out512 = path.join(__dirname, 'public', 'pwa-512x512.png');

async function convert() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);

    // 192x192 icon with logo resized to 96x96 (50% of canvas) for safe maskable area
    await sharp({
      create: {
        width: 192,
        height: 192,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([{ input: await sharp(svgBuffer).resize(96, 96).toBuffer(), gravity: 'center' }])
    .png()
    .toFile(out192);

    // 512x512 icon with logo resized to 256x256 (50% of canvas) for safe maskable area
    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([{ input: await sharp(svgBuffer).resize(256, 256).toBuffer(), gravity: 'center' }])
    .png()
    .toFile(out512);

    console.log('Successfully generated PWA PNG icons.');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

convert();
