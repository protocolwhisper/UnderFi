'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function OrbitalAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with higher resolution
    const setCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Animation properties
    let rotation = 0;
    const centerX = canvas.width / (2 * (window.devicePixelRatio || 1));
    const centerY = canvas.height / (2 * (window.devicePixelRatio || 1));
    const baseScale = Math.min(canvas.width, canvas.height) / (800 * (window.devicePixelRatio || 1)); // Reduced denominator for bigger scale
    const scale = baseScale * 1.2; // Increased from 0.8 to 1.2

    const orbitalRings = [
      { radius: 220 * scale, speed: 0.0005, particles: generateParticles(10) },
      { radius: 320 * scale, speed: 0.0003, particles: generateParticles(14) },
      { radius: 420 * scale, speed: 0.0002, particles: generateParticles(18) }
    ];

    // Generate random particles for each ring
    function generateParticles(count: number) {
      return Array.from({ length: count }, () => ({
        angle: Math.random() * Math.PI * 2,
        size: Math.random() * 2.5 + 1, // Slightly bigger particles
        speed: (Math.random() - 0.5) * 0.001
      }));
    }

    // Animation function
    function animate() {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      // Update rotation
      rotation += 0.001;

      // Draw central sphere
      const sphereRadius = 100 * scale; // Increased from 80 to 100
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, sphereRadius
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');  // Purple core
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');    // Fade to transparent
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw orbital rings and particles
      orbitalRings.forEach((ring, ringIndex) => {
        // Draw ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw and update particles
        ring.particles.forEach((particle, i) => {
          // Update particle position
          particle.angle += particle.speed + ring.speed;
          
          const x = centerX + Math.cos(particle.angle + rotation) * ring.radius;
          const y = centerY + Math.sin(particle.angle + rotation) * ring.radius;

          // Draw particle
          ctx.beginPath();
          ctx.arc(x, y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
          ctx.fill();

          // Draw particle trail
          const trailLength = 8;
          for (let j = 1; j <= trailLength; j++) {
            const trailAngle = particle.angle - (j * 0.1);
            const trailX = centerX + Math.cos(trailAngle + rotation) * ring.radius;
            const trailY = centerY + Math.sin(trailAngle + rotation) * ring.radius;
            
            ctx.beginPath();
            ctx.arc(trailX, trailY, particle.size * (1 - j/trailLength), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${0.8 * (1 - j/trailLength)})`;
            ctx.fill();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
} 