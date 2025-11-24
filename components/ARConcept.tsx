
import React, { useRef, useEffect, useState } from 'react';
import { Camera, Box, Layers, Maximize, RefreshCw, ScanLine } from 'lucide-react';

const ARConcept: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [active, setActive] = useState(true);
    const [detected, setDetected] = useState(false);

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
                .then(stream => {
                    if (videoRef.current) videoRef.current.srcObject = stream;
                })
                .catch(console.error);
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;
        let rotation = 0;

        const render = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Simulate AR Target Detection Reticle
            if (!detected) {
                const size = 200;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 2;
                // Corners
                ctx.beginPath();
                ctx.moveTo(cx - size/2, cy - size/2 + 20); ctx.lineTo(cx - size/2, cy - size/2); ctx.lineTo(cx - size/2 + 20, cy - size/2);
                ctx.moveTo(cx + size/2 - 20, cy - size/2); ctx.lineTo(cx + size/2, cy - size/2); ctx.lineTo(cx + size/2, cy - size/2 + 20);
                ctx.moveTo(cx - size/2, cy + size/2 - 20); ctx.lineTo(cx - size/2, cy + size/2); ctx.lineTo(cx - size/2 + 20, cy + size/2);
                ctx.moveTo(cx + size/2 - 20, cy + size/2); ctx.lineTo(cx + size/2, cy + size/2); ctx.lineTo(cx + size/2, cy + size/2 - 20);
                ctx.stroke();
                
                // Scan line
                const scanY = cy - size/2 + (Math.sin(Date.now() / 500) * size/2 + size/2);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
                ctx.fillRect(cx - size/2, scanY, size, 2);
            } else {
                // Render 3D Graph "Floating" in AR
                rotation += 0.01;
                
                // Draw Grid Floor (projected)
                ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
                ctx.lineWidth = 1;
                
                for(let i = -5; i <= 5; i++) {
                    // Perspective projection logic simplified
                    const x1 = cx + i * 40;
                    const y1 = cy + 100;
                    const x2 = cx + i * 60; // Perspective widen
                    const y2 = cy + 200;
                    
                    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); // Vertical linesish
                    
                    // Horizontal linesish
                    const hy = cy + 100 + (i + 5) * 10;
                    ctx.beginPath(); ctx.moveTo(cx - 200 - i*10, hy); ctx.lineTo(cx + 200 + i*10, hy); ctx.stroke();
                }

                // Draw Parabola Function
                ctx.strokeStyle = '#00f0ff';
                ctx.lineWidth = 3;
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 15;
                ctx.beginPath();
                for (let x = -100; x <= 100; x+=5) {
                    const y = (x * x) / 50; // y = x^2
                    // Apply 3D rotation simulation
                    const rx = x * Math.cos(rotation) - y * Math.sin(rotation);
                    
                    const screenX = cx + x;
                    const screenY = cy + 150 - y; // Inverted Y
                    if (x === -100) ctx.moveTo(screenX, screenY);
                    else ctx.lineTo(screenX, screenY);
                }
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Data Points
                ctx.fillStyle = '#ffffff';
                ctx.font = '12px monospace';
                ctx.fillText("f(x) = x²", cx + 60, cy + 50);
                ctx.fillText("Vertex (0,0)", cx - 20, cy + 170);
            }

            animationFrame = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animationFrame);
    }, [detected]);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-5xl mx-auto h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <Box className="text-cyber" size={32} />
                            AR <span className="text-white">CONCEPT</span>
                        </h1>
                        <p className="text-gray-400 text-sm">Augmented Reality Math Visualizer</p>
                    </div>
                    <button 
                        onClick={() => setDetected(!detected)}
                        className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-white font-bold flex items-center gap-2 hover:bg-white/20 transition-all"
                    >
                        <RefreshCw size={18} /> {detected ? 'Reset Target' : 'Simulate Scan'}
                    </button>
                </div>

                <div className="flex-1 bg-black border border-cyber/30 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        playsInline 
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                    
                    {/* UI Overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                        <div className="flex justify-between">
                            <div className="bg-black/60 backdrop-blur px-4 py-2 rounded-lg border border-white/10 text-xs font-mono text-cyber">
                                LiDAR MESH: ACTIVE
                            </div>
                            <Maximize className="text-white/50" />
                        </div>

                        <div className="flex justify-center">
                            {detected ? (
                                <div className="bg-cyber/20 border border-cyber px-6 py-3 rounded-xl backdrop-blur-md animate-in slide-in-from-bottom">
                                    <h3 className="text-white font-bold text-lg text-center">Quadratic Function</h3>
                                    <p className="text-cyber text-xs font-mono text-center">Equation identified: y = x²</p>
                                </div>
                            ) : (
                                <div className="bg-black/60 backdrop-blur px-6 py-3 rounded-xl border border-white/10 text-center">
                                    <ScanLine size={24} className="mx-auto text-white mb-2 animate-pulse" />
                                    <p className="text-white font-bold">Point camera at math problem</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ARConcept;
