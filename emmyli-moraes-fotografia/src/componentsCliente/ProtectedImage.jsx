import React, { useRef, useEffect } from 'react';

/**
 * ProtectedImage: desenha no <canvas> a imagem + watermark de usuário.
 * Props:
 *  - src: URL da foto
 *  - userTag: string a ser impressa em marca-d’água
 *  - alt: texto alternativo
 *  - rest: permite passar onClick, className, etc.
 */
export default function ProtectedImage({ src, userTag, alt, ...rest }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      // Desenha foto
      ctx.drawImage(img, 0, 0);
      // Watermark em grade
      const fontSize = Math.floor(img.width / 20);
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.textBaseline = 'bottom';
      const step = fontSize * 4;
      for (let x = 0; x < img.width; x += step) {
        for (let y = fontSize * 2; y < img.height; y += step) {
          ctx.fillText(userTag, x, y);
        }
      }
    };
  }, [src, userTag]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      className="protected-image w-full h-auto"
      {...rest}
    />
  );
}
