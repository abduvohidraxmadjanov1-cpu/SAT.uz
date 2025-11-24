import React, { useEffect, useRef } from 'react';
import { Globe, MapPin, Radio, Wifi, Navigation } from 'lucide-react';

const GeoMap: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.parentElement?.clientWidth || 800;
        let height = canvas.parentElement?.clientHeight || 600;
        canvas.width = width;
        canvas.height = height;

        const points: {x: number, y: number, r: number, alpha: number, speed: number}[] = [];
        const connections: {p1: number, p2: number, opacity: number}[] = [];

        // Generate Nodes (Simulating IoT Devices/Users)
        for(let i=0; i<50; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 2 + 1,
                alpha: Math.random(),
                speed: (Math.random() - 0.5) * 0.5
            });
        }

        // Create Connections
        for(let i=0; i<points.length; i++) {
            for(let j=i+1; j<points.length; j++) {
                if (Math.random() > 0.95) {
                    connections.push({p1: i, p2: j, opacity: Math.random() * 0.5});
                }
            }
        }

        const render = () => {
            if(!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Draw World Map Outline (Abstract)
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            // Simplified sine waves to simulate map contours
            for(let i=0; i<width; i+=10) {
                 ctx.moveTo(i, height/2 + Math.sin(i/50)*50);
                 ctx.lineTo(i+10, height/2 + Math.sin((i+10)/50)*50);
            }
            ctx.stroke();

            // Draw Connections
            connections.forEach(c => {
                const p1 = points[c.p1];
                const p2 = points[c.p2];
                const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                
                if (dist < 200) {
                    ctx.strokeStyle = `rgba(0, 240, 255, ${c.opacity * (1 - dist/200)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });

            // Draw Nodes
            points.forEach(p => {
                p.alpha += p.speed * 0.05;
                if(p.alpha > 1 || p.alpha < 0.2) p.speed *= -1;

                ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#00f0ff';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Active Ping Effect
                if (Math.random() > 0.98) {
                     ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha})`;
                     ctx.beginPath();
                     ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
                     ctx.stroke();
                }
            });

            requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
             width = canvas.parentElement?.clientWidth || 800;
             height = canvas.parentElement?.clientHeight || 600;
             canvas.width = width;
             canvas.height = height;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full h-[600px] bg-black rounded-3xl overflow-hidden border border-cyber/20 shadow-[0_0_50px_rgba(0,240,255,0.05)]">
            <canvas ref={canvasRef} className="absolute inset-0" />
            
            {/* UI Overlay */}
            <div className="absolute inset-0 p-8 pointer-events-none">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-black text-white flex items-center gap-3">
                            <Globe className="text-cyber animate-spin-slow" />
                            GLOBAL GEOLOCATION <span className="text-xs bg-cyber text-black px-2 py-1 rounded">LIVE</span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-1 font-mono">GPS • BEIDOU • GALILEO • GLONASS • UWB</p>
                    </div>
                    <div className="text-right font-mono">
                        <div className="text-4xl font-bold text-white">10,293,102</div>
                        <div className="text-cyber text-xs uppercase tracking-widest">Active Devices</div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-8 grid grid-cols-2 gap-8">
                     <div className="bg-black/80 backdrop-blur border border-white/10 p-4 rounded-xl">
                         <div className="flex items-center gap-2 text-cyber mb-2">
                             <Wifi size={16} />
                             <span className="text-xs font-bold">NETWORK LATENCY</span>
                         </div>
                         <div className="text-2xl font-bold text-white">12ms</div>
                     </div>
                     <div className="bg-black/80 backdrop-blur border border-white/10 p-4 rounded-xl">
                         <div className="flex items-center gap-2 text-purple-400 mb-2">
                             <Navigation size={16} />
                             <span className="text-xs font-bold">ACCURACY</span>
                         </div>
                         <div className="text-2xl font-bold text-white">0.01m</div>
                     </div>
                </div>

                <div className="absolute bottom-8 right-8">
                    <div className="flex flex-col gap-2">
                        {['UWB Tracking', 'LiDAR Scan', 'Face ID', 'Voice Print'].map((tech, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                {tech} <span className="text-gray-600">:: ACTIVE</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scanning Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber/10 to-transparent h-20 w-full animate-scan pointer-events-none" style={{animationDuration: '3s'}}></div>
        </div>
    );
};

export default GeoMap;