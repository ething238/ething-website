export const serviceImageSizes = '(max-width: 650px) calc(100vw - 96px), (max-width: 850px) calc(100vw - 310px), (max-width: 1100px) 240px, 320px';

export function serviceImageSources(file) {
  const base = `/website-development/optimized/${file.replace(/\.webp$/, '')}`;
  return { src: `${base}-640.webp`, srcSet: [320, 640, 960].map(width => `${base}-${width}.webp ${width}w`).join(', '), sizes: serviceImageSizes };
}

export const carImageSources = {
  src: '/website-development/optimized/sample-electric-car-rear-960.webp',
  srcSet: [480, 960, 1440].map(width => `/website-development/optimized/sample-electric-car-rear-${width}.webp ${width}w`).join(', '),
  sizes: '(max-width: 650px) calc(100vw - 48px), (max-width: 850px) 540px, 520px',
};
