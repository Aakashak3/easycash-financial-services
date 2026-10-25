import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  className?: string;
  overlayOpacity?: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  className = '',
  overlayOpacity = 0.25,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying] = useState(true);
  const [imgSrc, setImgSrc] = useState('/Eco Growth and Financial Prosperity.png');

  // Canvas-based drifting green leaves particle effect matching the video
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Leaf particle definition
    interface Leaf {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      opacity: number;
    }

    const leafColors = ['#3cb334', '#2ea347', '#48bb35', '#054e29'];
    const leaves: Leaf[] = Array.from({ length: 9 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 14 + 10,
      speedX: -(Math.random() * 0.8 + 0.3),
      speedY: Math.random() * 0.9 + 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      color: leafColors[Math.floor(Math.random() * leafColors.length)],
      opacity: Math.random() * 0.4 + 0.3,
    }));

    const drawLeaf = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      // Draw stylized botanical leaf path
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(size * 0.7, -size * 0.3, 0, size);
      ctx.quadraticCurveTo(-size * 0.7, -size * 0.3, 0, -size);
      ctx.fill();

      // Leaf central vein
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.lineTo(0, size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      leaves.forEach((leaf) => {
        if (isPlaying) {
          leaf.x += leaf.speedX;
          leaf.y += leaf.speedY;
          leaf.rotation += leaf.rotationSpeed;

          if (leaf.x < -40) leaf.x = width + 20;
          if (leaf.y > height + 40) leaf.y = -20;
        }

        drawLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.rotation, leaf.color, leaf.opacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* 1. Full-Cover Master Background Image (Eco Growth and Financial Prosperity) */}
      <img
        src={imgSrc}
        alt="Eco Growth and Financial Prosperity Background"
        onError={() => setImgSrc('/hero-bg.png')}
        className="absolute inset-0 w-full h-full object-cover object-right sm:object-center transform scale-100"
      />

      {/* 2. Optional ambient video backdrop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* 3. Soft Gradient Overlays for High Text Contrast */}
      {/* Desktop Left-to-Right gradient (readable text on left, clear visual on right) */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/10" />

      {/* Mobile Top-to-Bottom gradient (readable text on top, floating card and slider below) */}
      <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-white/95 via-white/75 to-white/90" />

      {/* 4. Canvas Floating Green Leaves Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};
