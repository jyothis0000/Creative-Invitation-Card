import { execSync } from 'child_process';
import { mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';

const artifactsDir = 'C:/Users/Administrator/.gemini/antigravity/brain/7f79cd11-6d66-4853-8289-2b4578d15fe7';
const galleryDir   = join(process.cwd(), 'public', 'gallery');

mkdirSync(galleryDir, { recursive: true });
console.log('Created:', galleryDir);

const files = [
  ['alexa_richard_gallery1_1777354301332.png', 'ar-1.png'],
  ['alexa_richard_gallery2_1777354318285.png', 'ar-2.png'],
  ['alexa_richard_gallery3_1777354346803.png', 'ar-3.png'],
  ['alexa_richard_gallery4_1777354365838.png', 'ar-4.png'],
  ['alexa_richard_gallery5_1777354410132.png', 'ar-5.png'],
  ['alexa_richard_gallery6_1777354427782.png', 'ar-6.png'],
];

for (const [src, dest] of files) {
  copyFileSync(join(artifactsDir, src), join(galleryDir, dest));
  console.log('Copied:', dest);
}
console.log('ALL DONE');
