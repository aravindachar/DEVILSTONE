'use client';

import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: string;
  hoverFillColor?: string;
  squareSize?: number;
  className?: string;
}

export const Squares: React.FC<SquaresProps> = ({
  direction = 'right',
  speed = 0.3,
  borderColor = 'rgba(255, 255, 255, 0.04)',
  hoverFillColor = 'rgba(0, 215, 255, 0.15)',
  squareSize = 48,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ x: number; y: number; opacity: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor((mouseX - (gridOffset.current.x % squareSize)) / squareSize);
      const startY = Math.floor((mouseY - (gridOffset.current.y % squareSize)) / squareSize);

      hoveredSquare.current = { x: startX, y: startY, opacity: 1 };
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const offsetX = gridOffset.current.x % squareSize;
      const offsetY = gridOffset.current.y % squareSize;

      // Draw grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;

      for (let x = -squareSize; x < canvas.width + squareSize; x += squareSize) {
        ctx.beginPath();
        ctx.moveTo(x + (offsetX >= 0 ? offsetX : squareSize + offsetX), 0);
        ctx.lineTo(x + (offsetX >= 0 ? offsetX : squareSize + offsetX), canvas.height);
        ctx.stroke();
      }

      for (let y = -squareSize; y < canvas.height + squareSize; y += squareSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + (offsetY >= 0 ? offsetY : squareSize + offsetY));
        ctx.lineTo(canvas.width, y + (offsetY >= 0 ? offsetY : squareSize + offsetY));
        ctx.stroke();
      }

      // Draw hovered square highlight
      if (hoveredSquare.current && hoveredSquare.current.opacity > 0.01) {
        const hx = hoveredSquare.current.x * squareSize + (gridOffset.current.x % squareSize);
        const hy = hoveredSquare.current.y * squareSize + (gridOffset.current.y % squareSize);

        ctx.fillStyle = hoverFillColor;
        ctx.globalAlpha = hoveredSquare.current.opacity;
        ctx.fillRect(hx, hy, squareSize, squareSize);

        ctx.strokeStyle = 'rgba(0, 215, 255, 0.4)';
        ctx.strokeRect(hx, hy, squareSize, squareSize);
        ctx.globalAlpha = 1.0;

        hoveredSquare.current.opacity *= 0.93; // Smooth trail
      }

      // Update offsets according to direction
      switch (direction) {
        case 'right':
          gridOffset.current.x -= speed;
          break;
        case 'left':
          gridOffset.current.x += speed;
          break;
        case 'up':
          gridOffset.current.y += speed;
          break;
        case 'down':
          gridOffset.current.y -= speed;
          break;
        case 'diagonal':
          gridOffset.current.x -= speed;
          gridOffset.current.y -= speed;
          break;
        default:
          break;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`}
    />
  );
};

export default Squares;
