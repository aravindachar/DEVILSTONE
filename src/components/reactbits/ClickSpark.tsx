'use client';

import React, { useRef, useEffect } from 'react';

interface Spark {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  life: number;
  maxLife: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#00D7FF',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  children,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        spark.life += 16;
        if (spark.life >= spark.maxLife) return false;

        const progress = spark.life / spark.maxLife;
        const currentRadius = sparkRadius + spark.speed * spark.life * 0.08;
        const x1 = spark.x + Math.cos(spark.angle) * currentRadius;
        const y1 = spark.y + Math.sin(spark.angle) * currentRadius;
        const x2 = spark.x + Math.cos(spark.angle) * (currentRadius + spark.length * (1 - progress));
        const y2 = spark.y + Math.sin(spark.angle) * (currentRadius + spark.length * (1 - progress));

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 1 - progress;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(updateAndDraw);
    };

    animationId = requestAnimationFrame(updateAndDraw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkRadius]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparks: Spark[] = [];
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
      newSparks.push({
        x,
        y,
        angle,
        speed: 1 + Math.random() * 2,
        length: sparkSize + Math.random() * 8,
        life: 0,
        maxLife: duration,
      });
    }

    sparksRef.current.push(...newSparks);
  };

  return (
    <div onClick={handleClick} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-50 w-full h-full"
      />
      {children}
    </div>
  );
};

export default ClickSpark;
