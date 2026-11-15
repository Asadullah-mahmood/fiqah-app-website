import * as THREE from 'three';

function drawEightPointStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerR: number,
  strokeStyle: string,
  fillStyle?: string,
  lineWidth = 2
) {
  ctx.save();
  ctx.translate(cx, cy);
  const drawSquare = (angle: number) => {
    ctx.save();
    ctx.rotate(angle);
    const s = outerR * 1.4142;
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fillRect(-s / 2, -s / 2, s, s);
    }
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(-s / 2, -s / 2, s, s);
    ctx.restore();
  };
  drawSquare(0);
  drawSquare(Math.PI / 4);
  ctx.restore();
}

export function createQuranPageTexture(
  side: 'left' | 'right',
  maxAnisotropy: number
): THREE.CanvasTexture {
  const width = 1024;
  const height = 1400;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Warm illuminated parchment base (#FFFBF0)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFFDF7');
  bgGrad.addColorStop(0.5, '#FFFBF0');
  bgGrad.addColorStop(1, '#F5EFE0');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle gutter shadow along spine
  const spineGrad =
    side === 'right'
      ? ctx.createLinearGradient(0, 0, 120, 0)
      : ctx.createLinearGradient(width - 120, 0, width, 0);
  if (side === 'right') {
    spineGrad.addColorStop(0, 'rgba(65, 48, 22, 0.22)');
    spineGrad.addColorStop(1, 'rgba(65, 48, 22, 0)');
    ctx.fillStyle = spineGrad;
    ctx.fillRect(0, 0, 120, height);
  } else {
    spineGrad.addColorStop(0, 'rgba(65, 48, 22, 0)');
    spineGrad.addColorStop(1, 'rgba(65, 48, 22, 0.22)');
    ctx.fillStyle = spineGrad;
    ctx.fillRect(width - 120, 0, 120, height);
  }

  // Outer illuminated gold & emerald border frame
  const pad = 74;
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 6;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  ctx.strokeStyle = '#1B5E20';
  ctx.lineWidth = 3;
  ctx.strokeRect(pad + 14, pad + 14, width - (pad + 14) * 2, height - (pad + 14) * 2);

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.strokeRect(pad + 26, pad + 26, width - (pad + 26) * 2, height - (pad + 26) * 2);

  // Corner geometric rosettes
  const corners = [
    [pad + 14, pad + 14],
    [width - pad - 14, pad + 14],
    [pad + 14, height - pad - 14],
    [width - pad - 14, height - pad - 14],
  ];
  for (const [cx, cy] of corners) {
    drawEightPointStar(ctx, cx, cy, 18, '#D4AF37', '#1B5E20', 2);
  }

  // Surah Header Cartouche
  const headerY = pad + 72;
  const headerH = 128;
  const innerX = pad + 56;
  const innerW = width - (pad + 56) * 2;

  const cartoucheGrad = ctx.createLinearGradient(innerX, headerY, innerX + innerW, headerY);
  cartoucheGrad.addColorStop(0, '#1B5E20');
  cartoucheGrad.addColorStop(0.5, '#2E7D32');
  cartoucheGrad.addColorStop(1, '#1B5E20');
  ctx.fillStyle = cartoucheGrad;
  ctx.fillRect(innerX, headerY, innerW, headerH);

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 4;
  ctx.strokeRect(innerX + 6, headerY + 6, innerW - 12, headerH - 12);

  drawEightPointStar(ctx, innerX + 54, headerY + headerH / 2, 22, '#F5E6A3', '#144718', 2);
  drawEightPointStar(ctx, innerX + innerW - 54, headerY + headerH / 2, 22, '#F5E6A3', '#144718', 2);

  ctx.fillStyle = '#F5E6A3';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 46px "Traditional Arabic", "Amiri", Georgia, serif';
  ctx.fillText(
    side === 'right' ? 'سُورَةُ الْفَاتِحَةِ' : 'سُورَةُ الْبَقَرَةِ',
    width / 2,
    headerY + headerH / 2 - 4
  );

  // Subtle horizontal ruling lines
  const startY = headerY + headerH + 64;
  const lineCount = 10;
  const lineStep = 94;

  const rightVerses = [
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝١',
    'الرَّحْمَٰنِ الرَّحِيمِ ۝٢',
    'مَالِكِ يَوْمِ الدِّينِ ۝٣',
    'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝٤',
    'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝٥',
    'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ',
    'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝٧',
    'آمِينَ يَا رَبَّ الْعَالَمِينَ',
    'صَدَقَ اللَّهُ الْعَظِيمُ',
  ];

  const leftVerses = [
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    'الم ۝١ ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ',
    'هُدًى لِّلْمُتَّقِينَ ۝٢',
    'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ',
    'وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ',
    'يُنفِقُونَ ۝٣ وَالَّذِينَ يُؤْمِنُونَ',
    'بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ',
    'وَبِالْآخِرَةِ هُمْ يُوقِنُونَ ۝٤',
    'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ',
    'وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ ۝٥',
  ];

  const verses = side === 'right' ? rightVerses : leftVerses;

  for (let i = 0; i < lineCount; i++) {
    const y = startY + i * lineStep;
    // Delicate gold line rule
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(innerX, y + 28);
    ctx.lineTo(innerX + innerW, y + 28);
    ctx.stroke();

    // Arabic verse calligraphy
    ctx.fillStyle = '#1A1A2E';
    ctx.font = 'bold 42px "Traditional Arabic", "Amiri", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(verses[i], width / 2, y);

    // Emerald verse medallion dot on alternating lines
    if (i % 2 === 1) {
      const rx = side === 'right' ? innerX + 24 : innerX + innerW - 24;
      ctx.beginPath();
      ctx.arc(rx, y, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#1B5E20';
      ctx.fill();
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#FFFBF0';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(String((i + 1) >> 1), rx, y + 1);
    }
  }

  // Page footer indicator
  ctx.fillStyle = '#1B5E20';
  ctx.font = '600 22px Georgia, serif';
  ctx.fillText(side === 'right' ? 'Juz 1 · Al-Fatihah' : 'Juz 1 · Al-Baqarah', width / 2, height - pad - 44);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function createLeatherCoverTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Rich mosque emerald morocco leather (#1B5E20)
  const grad = ctx.createRadialGradient(size / 2, size / 2, 60, size / 2, size / 2, size * 0.72);
  grad.addColorStop(0, '#226E28');
  grad.addColorStop(0.6, '#1B5E20');
  grad.addColorStop(1, '#113E15');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Subtle leather pebble grain
  for (let i = 0; i < 4000; i++) {
    const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const y = (Math.sin(i * 78.233) * 43758.5453) % 1;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.06)';
    ctx.fillRect(Math.abs(x) * size, Math.abs(y) * size, 3, 3);
  }

  // Gold filigree border
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 10;
  ctx.strokeRect(56, 56, size - 112, size - 112);

  ctx.strokeStyle = '#F5E6A3';
  ctx.lineWidth = 3;
  ctx.strokeRect(78, 78, size - 156, size - 156);

  // Central Gold Shamsa Medallion
  drawEightPointStar(ctx, size / 2, size / 2, 165, '#D4AF37', '#144718', 6);
  drawEightPointStar(ctx, size / 2, size / 2, 118, '#F5E6A3', '#1B5E20', 3);

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 68, 0, Math.PI * 2);
  ctx.fillStyle = '#D4AF37';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 56, 0, Math.PI * 2);
  ctx.fillStyle = '#144718';
  ctx.fill();

  ctx.fillStyle = '#F5E6A3';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 42px Georgia, serif';
  ctx.fillText('القرآن', size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function createWalnutWoodTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#4E311E';
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y += 2) {
    const wave = Math.sin(y * 0.045) * 14 + Math.cos(y * 0.13) * 6;
    const tone = Math.floor(10 + Math.abs(Math.sin(y * 0.08 + wave * 0.02)) * 22);
    ctx.strokeStyle = `rgba(${32 + tone}, ${18 + tone * 0.6}, ${10 + tone * 0.3}, 0.45)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(size * 0.33, y + wave, size * 0.66, y - wave, size, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function createAstrolabeDialTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;

  // Deep emerald enamel dial background
  const grad = ctx.createRadialGradient(cx, cy, 40, cx, cy, size * 0.5);
  grad.addColorStop(0, '#226E28');
  grad.addColorStop(0.65, '#1B5E20');
  grad.addColorStop(1, '#103714');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Concentric golden degree rings
  const radii = [470, 445, 390, 315, 220, 120];
  radii.forEach((r, idx) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = idx % 2 === 0 ? '#D4AF37' : 'rgba(245, 230, 163, 0.55)';
    ctx.lineWidth = idx === 0 ? 6 : 2.5;
    ctx.stroke();
  });

  // 360 degree tick marks
  for (let deg = 0; deg < 360; deg += 2) {
    const rad = (deg * Math.PI) / 180;
    const isMajor = deg % 30 === 0;
    const isMedium = deg % 10 === 0;
    const rOut = 444;
    const rIn = isMajor ? 404 : isMedium ? 418 : 430;

    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(rad) * rIn, cy + Math.sin(rad) * rIn);
    ctx.lineTo(cx + Math.cos(rad) * rOut, cy + Math.sin(rad) * rOut);
    ctx.strokeStyle = isMajor ? '#F5E6A3' : 'rgba(212, 175, 55, 0.72)';
    ctx.lineWidth = isMajor ? 4 : isMedium ? 2.5 : 1.2;
    ctx.stroke();

    if (isMajor) {
      ctx.save();
      ctx.translate(cx + Math.cos(rad) * 356, cy + Math.sin(rad) * 356);
      ctx.rotate(rad + Math.PI / 2);
      ctx.fillStyle = '#F5E6A3';
      ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label =
        deg === 0 ? 'N' : deg === 90 ? 'E' : deg === 180 ? 'S' : deg === 270 ? 'W' : `${deg}°`;
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
  }

  // Geometric 8-pointed star web in center
  drawEightPointStar(ctx, cx, cy, 195, 'rgba(212, 175, 55, 0.55)', undefined, 2.5);
  drawEightPointStar(ctx, cx, cy, 135, 'rgba(245, 230, 163, 0.75)', undefined, 2);

  // Qibla Kaaba direction badge at ~255° azimuth
  ctx.fillStyle = '#F5E6A3';
  ctx.font = 'bold 24px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('QIBLA · MAKKAH', cx, cy + 265);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(size / 2, size / 2, 12, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(20, 34, 22, 0.55)');
  grad.addColorStop(0.45, 'rgba(20, 34, 22, 0.24)');
  grad.addColorStop(1, 'rgba(20, 34, 22, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
