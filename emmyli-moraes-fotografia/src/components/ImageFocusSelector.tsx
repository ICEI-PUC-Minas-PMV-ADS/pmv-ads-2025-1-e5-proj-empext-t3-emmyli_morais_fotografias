import { useState, useRef } from 'react';

interface ImageFocus {
  x: number;
  y: number;
}

interface ImageFocusSelectorProps {
  imageUrl: string;
  defaultFocus?: ImageFocus;
  onSave: (focus: ImageFocus) => void;
  className?: string;
}

export default function ImageFocusSelector({
  imageUrl,
  defaultFocus = { x: 50, y: 50 },
  onSave,
  className = '',
}: ImageFocusSelectorProps) {
  const [focus, setFocus] = useState<ImageFocus>(defaultFocus);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFocusFromEvent = (e: MouseEvent | React.MouseEvent | React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setFocus({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) updateFocusFromEvent(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => setIsDragging(true);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) updateFocusFromEvent(e);
  };
  const handleTouchEnd = () => setIsDragging(false);

  const handleClick = (e: React.MouseEvent) => {
    updateFocusFromEvent(e);
  };

  const handleReset = () => {
    setFocus({ x: 50, y: 50 });
  };

  // Efeitos globais para drag com mouse
  if (typeof window !== 'undefined') {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  }

  return (
    <div className={`inline-block relative ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full cursor-crosshair select-none"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={imageUrl}
          alt="Imagem de capa"
          className="w-full h-auto object-cover"
          style={{ objectPosition: `${focus.x}% ${focus.y}%` }}
        />
        <div
          className="absolute w-4 h-4 bg-red-500 border-2 border-white rounded-full cursor-move"
          style={{
            left: `${focus.x}%`,
            top: `${focus.y}%`,
            transform: 'translate(-50%, -50%)',
            touchAction: 'none',
          }}
          onMouseDown={handleMouseDown}
        />
      </div>

      <div className="mt-3 flex justify-between gap-2">
        <button
          onClick={handleReset}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Resetar foco
        </button>
        <button
          onClick={() => onSave(focus)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Salvar foco
        </button>
      </div>
    </div>
  );
}
