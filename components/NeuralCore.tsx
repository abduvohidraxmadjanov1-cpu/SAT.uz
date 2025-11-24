
import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    size: number;
    density: number;
    color: string;
    alpha: number;
}

interface Connection {
    p1: Particle;
    p2: Particle;
    opacity: number;
}

interface Impulse {
    path: Connection;
    progress: number;
    speed: number;
}

const NeuralCore: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let impulses: Impulse[] = [];
    let mouse = { x: -1000, y: -1000, radius: 150 };

    // Initialization Configuration
    const PARTICLE_COUNT = window.innerWidth > 768 ? 130 : 60;
    const CONNECTION_DIST = 140;
    const MOUSE_INFLUENCE = 0.05; // Speed of return to base
    const COLOR_CYBER = '0, 240, 255'; // RGB format for easy alpha manipulation
    const COLOR_VOID = '124, 58, 237'; // Deep Purple accent

    const init = () => {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        particles = [];
        impulses = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const isAnchor = Math.random() > 0.85; // Brighter, bigger nodes
            
            particles.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                baseX: x,
                baseY: y,
                size: isAnchor ? Math.random() * 2.5 + 1.5 : Math.random() * 1.5 + 0.5,
                density: (Math.random() * 30) + 1,
                color: isAnchor ? COLOR_CYBER : (Math.random() > 0.5 ? '255, 255, 255' : COLOR_VOID),
                alpha: isAnchor ? 0.8 : Math.random() * 0.5 + 0.1
            });
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Logic Loop
        const connections: Connection[] = [];

        // 1. Update Particles
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];

            // Mouse Interaction Physics
            let dx = mouse.x - p.x;
            let dy = mouse.y - p.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * p.density;
            let directionY = forceDirectionY * force * p.density;

            if (distance < mouse.radius) {
                p.x -= directionX;
                p.y -= directionY;
            } else {
                if (p.x !== p.baseX) {
                    let dx = p.x - p.baseX;
                    p.x -= dx * MOUSE_INFLUENCE;
                }
                if (p.y !== p.baseY) {
                    let dy = p.y - p.baseY;
                    p.y -= dy * MOUSE_INFLUENCE;
                }
            }

            // Natural Drift
            p.x += p.vx;
            p.y += p.vy;
            p.baseX += p.vx;
            p.baseY += p.vy;

            // Bounce off edges
            if (p.baseX < 0 || p.baseX > width) p.vx = -p.vx;
            if (p.baseY < 0 || p.baseY > height) p.vy = -p.vy;

            // Draw Particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            
            // Glow for larger particles
            if (p.size > 2) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = `rgba(${p.color}, 0.5)`;
            } else {
                ctx.shadowBlur = 0;
            }
            
            ctx.fill();
            ctx.shadowBlur = 0; // Reset

            // Find Connections
            for (let j = i; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    let opacity = 1 - (dist / CONNECTION_DIST);
                    connections.push({ p1: p, p2: p2, opacity });
                    
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${COLOR_CYBER}, ${opacity * 0.25})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        // 2. Spawn Impulses (Data Packets)
        if (Math.random() > 0.92 && connections.length > 0) {
            const randConn = connections[Math.floor(Math.random() * connections.length)];
            // Only spawn on stronger connections
            if (randConn.opacity > 0.3) {
                impulses.push({
                    path: randConn,
                    progress: 0,
                    speed: Math.random() * 0.02 + 0.01
                });
            }
        }

        // 3. Update & Draw Impulses
        for (let i = impulses.length - 1; i >= 0; i--) {
            let imp = impulses[i];
            imp.progress += imp.speed;
            
            if (imp.progress >= 1) {
                impulses.splice(i, 1);
                continue;
            }

            const x = imp.path.p1.x + (imp.path.p2.x - imp.path.p1.x) * imp.progress;
            const y = imp.path.p1.y + (imp.path.p2.y - imp.path.p1.y) * imp.progress;

            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ffffff';
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
        init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    init();
    animate();

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="block" style={{width: '100%', height: '100%'}} />
    </div>
  );
};

export default NeuralCore;
