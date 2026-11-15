const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 1. Favicon SVG definition (Square 512x512)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="qc-bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>

    <!-- Document Fill Gradient -->
    <linearGradient id="qc-doc" x1="120" y1="90" x2="380" y2="430" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>

    <!-- Corner Fold Gradient -->
    <linearGradient id="qc-fold" x1="290" y1="90" x2="370" y2="170" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#cbd5e1" />
      <stop offset="50%" stop-color="#94a3b8" />
      <stop offset="100%" stop-color="#64748b" />
    </linearGradient>

    <!-- Accent Cyan Gradient -->
    <linearGradient id="qc-cyan" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>

    <!-- Badge Gradient -->
    <linearGradient id="qc-badge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>

    <!-- Soft Drop Shadow -->
    <filter id="qc-shadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.35" />
    </filter>

    <filter id="doc-shadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.22" />
    </filter>
  </defs>

  <!-- Base Rounded Container (Squircle) -->
  <rect width="512" height="512" rx="118" fill="url(#qc-bg)" />

  <!-- Subtle Inner Border Highlight -->
  <rect x="4" y="4" width="504" height="504" rx="114" stroke="#ffffff" stroke-opacity="0.18" stroke-width="8" fill="none" />

  <!-- Main Document Body with folded corner -->
  <g filter="url(#doc-shadow)">
    <!-- Document polygon: Top-left, top-right-before-fold, fold-point-down, bottom-right, bottom-left -->
    <path d="M 148 100 
             C 134 100 124 110 124 124 
             L 124 388 
             C 124 402 134 412 148 412 
             L 364 412 
             C 378 412 388 402 388 388 
             L 388 184 
             L 304 100 
             Z" 
          fill="url(#qc-doc)" />

    <!-- Folded Corner Flap -->
    <path d="M 304 100 
             L 304 172 
             C 304 178 310 184 316 184 
             L 388 184 
             Z" 
          fill="url(#qc-fold)" />
  </g>

  <!-- Large Stylized Quotation Mark (Top-Left of Document) -->
  <!-- Left Quote mark -->
  <path d="M 166 206 
           C 166 176 182 156 208 150 
           L 212 162 
           C 196 166 188 176 186 188 
           L 204 188 
           C 210 188 214 192 214 198 
           L 214 220 
           C 214 226 210 230 204 230 
           L 176 230 
           C 170 230 166 226 166 220 
           Z" 
        fill="#2563eb" />

  <!-- Right Quote mark -->
  <path d="M 226 206 
           C 226 176 242 156 268 150 
           L 272 162 
           C 256 166 248 176 246 188 
           L 264 188 
           C 270 188 274 192 274 198 
           L 274 220 
           C 274 226 270 230 264 230 
           L 236 230 
           C 230 230 226 226 226 220 
           Z" 
        fill="#2563eb" />

  <!-- Horizontal Itemized Rows (Representing Quote Lines) -->
  <!-- Row 1: Primary item highlight bar -->
  <rect x="166" y="252" width="180" height="14" rx="7" fill="#2563eb" fill-opacity="0.85" />

  <!-- Row 2: Secondary item description bar -->
  <rect x="166" y="280" width="135" height="11" rx="5.5" fill="#94a3b8" />
  <rect x="316" y="280" width="30" height="11" rx="5.5" fill="#64748b" />

  <!-- Row 3: Third line -->
  <rect x="166" y="304" width="105" height="11" rx="5.5" fill="#94a3b8" />
  <rect x="316" y="304" width="30" height="11" rx="5.5" fill="#64748b" />

  <!-- Divider line -->
  <line x1="166" y1="334" x2="346" y2="334" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 3" />

  <!-- Total summary row -->
  <rect x="166" y="352" width="60" height="14" rx="4" fill="#64748b" fill-opacity="0.6" />
  <rect x="286" y="350" width="60" height="18" rx="5" fill="#0284c7" />

  <!-- Verified / Approved Floating Badge (Bottom Right) -->
  <g filter="url(#qc-shadow)">
    <circle cx="372" cy="372" r="48" fill="url(#qc-cyan)" stroke="#ffffff" stroke-width="6" />
    <!-- Checkmark / Pencil / Sparkle inside badge -->
    <path d="M 354 372 L 366 384 L 392 358" 
          stroke="#ffffff" 
          stroke-width="7" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          fill="none" />
  </g>
</svg>`;

// 2. Full Horizontal Brand Logo SVG (1200 x 320)
const fullLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 320" fill="none">
  <defs>
    <linearGradient id="logo-bg" x1="0" y1="0" x2="260" y2="260" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
    <linearGradient id="logo-cyan" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <linearGradient id="logo-text-accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
  </defs>

  <!-- Brand Emblem (left: 30, top: 30, size: 260x260) -->
  <g transform="translate(30, 30)">
    <rect width="260" height="260" rx="60" fill="url(#logo-bg)" />
    <rect x="2" y="2" width="256" height="256" rx="58" stroke="#ffffff" stroke-opacity="0.2" stroke-width="4" fill="none" />
    
    <!-- Mini Document -->
    <path d="M 75 50 C 68 50 62 56 62 63 L 62 197 C 62 204 68 210 75 210 L 185 210 C 192 210 198 204 198 197 L 198 93 L 155 50 Z" fill="#ffffff" />
    <!-- Fold -->
    <path d="M 155 50 L 155 87 C 155 90 158 93 161 93 L 198 93 Z" fill="#cbd5e1" />
    
    <!-- Quotation Marks -->
    <path d="M 84 105 C 84 90 92 80 105 77 L 107 83 C 99 85 95 90 94 96 L 103 96 C 106 96 108 98 108 101 L 108 112 C 108 115 106 117 103 117 L 89 117 C 86 117 84 115 84 112 Z" fill="#2563eb" />
    <path d="M 114 105 C 114 90 122 80 135 77 L 137 83 C 129 85 125 90 124 96 L 133 96 C 136 96 138 98 138 101 L 138 112 C 138 115 136 117 133 117 L 119 117 C 116 117 114 115 114 112 Z" fill="#2563eb" />
    
    <!-- Lines -->
    <rect x="84" y="128" width="90" height="7" rx="3.5" fill="#2563eb" fill-opacity="0.85" />
    <rect x="84" y="142" width="68" height="6" rx="3" fill="#94a3b8" />
    <rect x="160" y="142" width="14" height="6" rx="3" fill="#64748b" />
    <rect x="84" y="154" width="53" height="6" rx="3" fill="#94a3b8" />
    <rect x="160" y="154" width="14" height="6" rx="3" fill="#64748b" />
    
    <!-- Badge -->
    <circle cx="190" cy="190" r="24" fill="url(#logo-cyan)" stroke="#ffffff" stroke-width="3" />
    <path d="M 181 190 L 187 196 L 200 183" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </g>

  <!-- Typography -->
  <g transform="translate(330, 0)">
    <!-- Brand Wordmark -->
    <text x="0" y="170" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="118" letter-spacing="-2.5" fill="#0f172a">
      Quote<tspan fill="url(#logo-text-accent)">Craft</tspan>
    </text>

    <!-- Tagline -->
    <text x="4" y="228" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="600" font-size="28" letter-spacing="4" fill="#64748b">
      PROFESSIONAL QUOTATION BUILDER &amp; DESIGNER
    </text>
  </g>
</svg>`;

// Helper: compute CRC32 for PNG chunks
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makePngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([typeBuf, data]);
  const crc = crc32(typeAndData);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([lenBuf, typeAndData, crcBuf]);
}

// Generate simple crisp RGBA pixel icon buffer
function generateIconPixels(size) {
  const buf = Buffer.alloc(size * size * 4);
  const r = size / 2;
  const cornerR = size * 0.22;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      // Squircle distance check
      const dx = Math.max(0, Math.abs(x - r + 0.5) - (r - cornerR));
      const dy = Math.max(0, Math.abs(y - r + 0.5) - (r - cornerR));
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > cornerR) {
        // Transparent outside rounded corner
        buf[idx] = 0;
        buf[idx + 1] = 0;
        buf[idx + 2] = 0;
        buf[idx + 3] = 0;
        continue;
      }

      // Antialiasing edge
      let alpha = 255;
      if (dist > cornerR - 1) {
        alpha = Math.round(Math.max(0, Math.min(255, (cornerR - dist) * 255)));
      }

      // Background gradient (Royal blue to indigo/cyan)
      const t = (x + y) / (size * 2);
      const bgR = Math.round(30 + t * 45);   // ~30 to 75
      const bgG = Math.round(75 + t * 45);   // ~75 to 120
      const bgB = Math.round(210 + t * 35);  // ~210 to 245

      // Document rectangle bounds (approx 26% to 74% in x, 20% to 80% in y)
      const docX1 = Math.round(size * 0.25);
      const docX2 = Math.round(size * 0.75);
      const docY1 = Math.round(size * 0.20);
      const docY2 = Math.round(size * 0.80);
      const foldSize = Math.round(size * 0.16);

      const inDocBody = (x >= docX1 && x <= docX2 && y >= docY1 && y <= docY2);
      // Cut top-right corner for fold
      const inCutFold = inDocBody && (x > docX2 - foldSize) && (y < docY1 + foldSize) && ((x - (docX2 - foldSize)) + ((docY1 + foldSize) - y) > foldSize);

      if (inDocBody && !inCutFold) {
        // Document interior (clean crisp white/off-white)
        let pr = 255;
        let pg = 255;
        let pb = 255;

        // Draw inner quotation / lines in document
        const relX = (x - docX1) / (docX2 - docX1);
        const relY = (y - docY1) / (docY2 - docY1);

        // Quote icon area (top third)
        if (relY >= 0.22 && relY <= 0.42 && relX >= 0.18 && relX <= 0.70) {
          // Quote glyph
          if ((relX <= 0.38 && relY <= 0.38) || (relX >= 0.44 && relX <= 0.64 && relY <= 0.38)) {
            pr = 37; pg = 99; pb = 235; // Blue-600
          }
        }
        // First row line (blue accent)
        else if (relY >= 0.50 && relY <= 0.57 && relX >= 0.18 && relX <= 0.82) {
          pr = 37; pg = 99; pb = 235;
        }
        // Second row line (gray)
        else if (relY >= 0.63 && relY <= 0.69 && relX >= 0.18 && relX <= 0.75) {
          pr = 148; pg = 163; pb = 184;
        }
        // Third row line (gray)
        else if (relY >= 0.75 && relY <= 0.81 && relX >= 0.18 && relX <= 0.60) {
          pr = 148; pg = 163; pb = 184;
        }

        buf[idx] = pr;
        buf[idx + 1] = pg;
        buf[idx + 2] = pb;
        buf[idx + 3] = alpha;
      } else if (inCutFold) {
        // Corner fold triangle
        buf[idx] = 148;
        buf[idx + 1] = 163;
        buf[idx + 2] = 184;
        buf[idx + 3] = alpha;
      } else {
        // Background squircle
        buf[idx] = bgR;
        buf[idx + 1] = bgG;
        buf[idx + 2] = bgB;
        buf[idx + 3] = alpha;
      }

      // Bottom-right floating badge (cyan check circle)
      const badgeCenterX = size * 0.75;
      const badgeCenterY = size * 0.75;
      const badgeR = size * 0.18;
      const bdx = x - badgeCenterX;
      const bdy = y - badgeCenterY;
      const bdist = Math.sqrt(bdx * bdx + bdy * bdy);

      if (bdist <= badgeR) {
        if (bdist > badgeR - 1.5) {
          // White border around badge
          buf[idx] = 255; buf[idx + 1] = 255; buf[idx + 2] = 255; buf[idx + 3] = alpha;
        } else {
          // Cyan badge interior
          buf[idx] = 2; buf[idx + 1] = 132; buf[idx + 2] = 199; buf[idx + 3] = alpha;
        }
      }
    }
  }
  return buf;
}

// Encode raw RGBA buffer into PNG Buffer
function encodePng(width, height, rgbaBuffer) {
  // PNG signature
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR: 13 bytes
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makePngChunk('IHDR', ihdr);

  // Scanlines with filter byte 0
  const rawScanlines = Buffer.alloc(height * (1 + width * 4));
  let srcOffset = 0;
  let dstOffset = 0;
  for (let y = 0; y < height; y++) {
    rawScanlines[dstOffset++] = 0; // No filter
    for (let x = 0; x < width * 4; x++) {
      rawScanlines[dstOffset++] = rgbaBuffer[srcOffset++];
    }
  }

  const compressed = zlib.deflateSync(rawScanlines, { level: 9 });
  const idatChunk = makePngChunk('IDAT', compressed);
  const iendChunk = makePngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

// Generate multi-resolution ICO file from PNG buffers
function createIcoFile(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type = 1
  header.writeUInt16LE(count, 4); // Count of images

  let currentOffset = 6 + (16 * count);
  const dirEntries = [];
  for (const { width, height, pngBuf } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(pngBuf.length, 8); // Size of image data
    entry.writeUInt32LE(currentOffset, 12); // Offset
    dirEntries.push(entry);
    currentOffset += pngBuf.length;
  }

  return Buffer.concat([
    header,
    ...dirEntries,
    ...pngBuffers.map(p => p.pngBuf)
  ]);
}

// Execute Generation
const publicDir = path.join(__dirname, '..', 'public');

console.log('Generating QuoteCraft visual branding assets in public/...');

// 1. Write SVGs
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg.trim());
fs.writeFileSync(path.join(publicDir, 'logo.svg'), fullLogoSvg.trim());

// 2. Generate PNGs of various sizes
const sizes = [16, 32, 48, 64, 180, 192, 512];
const generatedPngs = {};

for (const s of sizes) {
  const pixels = generateIconPixels(s);
  const pngBuf = encodePng(s, s, pixels);
  generatedPngs[s] = pngBuf;
  console.log(`Generated ${s}x${s} PNG (${pngBuf.length} bytes)`);
}

// Write apple-touch-icon.png (180x180)
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatedPngs[180]);

// Write PWA icons
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), generatedPngs[192]);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), generatedPngs[512]);

// 3. Write favicon.ico containing 16x16, 32x32, 48x48
const icoBuf = createIcoFile([
  { width: 16, height: 16, pngBuf: generatedPngs[16] },
  { width: 32, height: 32, pngBuf: generatedPngs[32] },
  { width: 48, height: 48, pngBuf: generatedPngs[48] }
]);

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);

console.log(`Successfully generated favicon.ico (${icoBuf.length} bytes)!`);

