
import React, { useEffect, useRef } from 'react';
import { Globe, Star, Compass } from 'lucide-react';

const CosmicLearn: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let stars: { x: number; y: number; z: number; size: number; color: string; label?: string }[] = [];
        const numStars = 300;
        let width = canvas.parentElement?.clientWidth || 800;
        let height = canvas.parentElement?.clientHeight || 600;

        // Init Stars (Knowledge Nodes)
        for (let i = 0; i < numStars; i++) {
            const mastered = Math.random() > 0.7;
            stars.push({
                x: (Math.random() - 0.5) * width * 2,
                y: (Math.random() - 0.5) * height * 2,
                z: Math.random() * width,
                size: Math.random() * 2,
                color: mastered ? '#00f0ff' : '#333',
                label: Math.random() > 0.95 ? (mastered ? "Algebra" : "Geometry") : undefined
            });
        }

        const animate = () => {
            width = canvas.parentElement?.clientWidth || 800;
            height = canvas.parentElement?.clientHeight || 600;
            canvas.width = width;
            canvas.height = height;
            const cx = width / 2;
            const cy = height / 2;

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);

            stars.forEach(star => {
                star.z -= 2; // Fly forward speed
                if (star.z <= 0) {
                    star.z = width;
                    star.x = (Math.random() - 0.5) * width * 2;
                    star.y = (Math.random() - 0.5) * height * 2;
                }

                const scale = 300 / star.z;
                const x2d = cx + star.x * scale;
                const y2d = cy + star.y * scale;
                const size = Math.max(0.5, star.size * scale);

                // Draw connection if close to center
                if (scale > 1 && scale < 2) {
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    ctx.lineTo(x2d, y2d);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * scale})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }

                // Draw Star
                ctx.beginPath();
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.shadowBlur = star.color === '#00f0ff' ? 10 : 0;
                ctx.shadowColor = star.color;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Label
                if (star.label && scale > 0.8) {
                    ctx.fillStyle = '#fff';
                    ctx.font = '10px Inter';
                    ctx.fillText(star.label, x2d + 10, y2d);
                }
            });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <Globe className="text-cyber" size={40} />
                            COSMIC <span className="text-purple-500">LEARN</span>
                        </h1>
                        <p className="text-gray-400">Visualizing Your Expanding Universe of Knowledge</p>
                    </div>
                    <div className="bg-white/5 px-6 py-3 rounded-xl border border-white/10 flex gap-6">
                        <div className="text-center">
                            <div className="text-xs text-gray-500 uppercase font-bold">Explored</div>
                            <div className="text-xl font-black text-cyber">34%</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-500 uppercase font-bold">Dark Matter (Unknown)</div>
                            <div className="text-xl font-black text-gray-600">66%</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-black border border-white/10 rounded-3xl relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                    
                    {/* HUD */}
                    <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between">
                        <div className="flex justify-between">
                            <div className="text-cyber font-mono text-xs">COORD: 42.991, -99.212</div>
                            <Compass className="text-white/20 animate-spin-slow" size={32} />
                        </div>
                        
                        <div className="text-center">
                            <div className="inline-block bg-black/50 backdrop-blur border border-white/10 px-4 py-2 rounded-full text-white text-sm animate-pulse">
                                WARPING TO NEXT TOPIC...
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="w-64 h-32 bg-black/50 backdrop-blur border border-white/10 rounded-xl p-4">
                                <div className="text-xs text-gray-500 uppercase mb-2">Recent Discoveries</div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-white"><Star size={12} className="text-yellow-500" /> Quadratic Formula</div>
                                    <div className="flex items-center gap-2 text-sm text-white"><Star size={12} className="text-yellow-500" /> Critical Reading</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CosmicLearn;
