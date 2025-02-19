const CRITICAL_IMAGES = [
  '/images/tango7-logo.png',
  '/images/marker-icon.png',
  '/images/marker-icon-2x.png',
  '/images/marker-shadow.png',
] as const;

const CRITICAL_FONTS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
] as const;

export const preloadCriticalAssets = () => {
  if (typeof window === 'undefined') return;

  // Preload critical images
  CRITICAL_IMAGES.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical fonts
  CRITICAL_FONTS.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = src;
    document.head.appendChild(link);
  });
};
