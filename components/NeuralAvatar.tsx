
import React, { useEffect, useRef, useState } from 'react';
import { User, Zap, Brain, Hexagon, Palette, Camera, Scan, Fingerprint, CheckCircle, AlertCircle } from 'lucide-react';

const NeuralAvatar: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [color, setColor] = useState('#00f0ff');
    const [aura, setAura] = useState('Pulse');
    const [scanning, setScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [cameraActive, setCameraActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frameId: number;
        let t = 0;

        const render = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth || 600;
            canvas.height = canvas.parentElement.clientHeight || 600;
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw Avatar Wireframe (Abstract Head)
            t += 0.02;
            
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';

            const layers = 12;
            const segments = 20;
            
            // Rotation
            const rx = Math.sin(t * 0.5) * 0.2;
            const ry = t;

            for(let i=0; i<layers; i++) {
                const y = (i - layers/2) * 20;
                const radius = 100 - Math.abs(y) * 0.8;
                
                ctx.beginPath();
                for(let j=0; j<=segments; j++) {
                    const angle = (j / segments) * Math.PI * 2;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;

                    // 3D Rotate
                    const x1 = x * Math.cos(ry) - z * Math.sin(ry);
                    const z1 = z * Math.cos(ry) + x * Math.sin(ry);
                    
                    const y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
                    // Perspective
                    const scale = 400 / (400 + z1);
                    const px = cx + x1 * scale;
                    const py = cy + y1 * scale;

                    if(j===0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.stroke();
            }

            // Aura Effect
            if (aura === 'Pulse') {
                const glowSize = 150 + Math.sin(t * 5) * 10;
                const gradient = ctx.createRadialGradient(cx, cy, 100, cx, cy, glowSize);
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(1, color + '33'); // low opacity
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(cx, cy, glowSize, 0, Math.PI * 2);
                ctx.fill();
            } else if (aura === 'Static') {
                ctx.strokeStyle = color;
                ctx.lineWidth = 0.5;
                for(let k=0; k<10; k++) {
                    const ang = Math.random() * Math.PI * 2;
                    const len = 120 + Math.random() * 50;
                    ctx.beginPath();
                    ctx.moveTo(cx + Math.cos(ang)*100, cy + Math.sin(ang)*100);
                    ctx.lineTo(cx + Math.cos(ang)*len, cy + Math.sin(ang)*len);
                    ctx.stroke();
                }
            }

            frameId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(frameId);
    }, [color, aura]);

    const startCameraScan = async () => {
        setError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraActive(true);
                setScanning(true);
                setScanProgress(0);

                // Simulate Scanning Process
                let p = 0;
                const interval = setInterval(() => {
                    p += 2;
                    setScanProgress(p);
                    if (p >= 100) {
                        clearInterval(interval);
                        setScanning(false);
                        // Randomly assign traits based on "scan"
                        setColor(['#00f0ff', '#a855f7', '#22c55e'][Math.floor(Math.random() * 3)]);
                        setAura(['Pulse', 'Static', 'Wave'][Math.floor(Math.random() * 3)]);
                        
                        // Cleanup
                        stream.getTracks().forEach(track => track.stop());
                        setCameraActive(false);
                    }
                }, 50);
            }
        } catch (err) {
            console.error("Camera Error:", err);
            setError("Camera access denied. Switching to Manual Mode.");
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto h-[80vh] flex flex-col lg:flex-row gap-8">
                {/* Canvas Side */}
                <div className="flex-1 bg-void-lighter border border-white/10 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(0,240,255,0.1)] group">
                    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
                    
                    {/* Camera Feed Layer (Low Opacity Background) */}
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover opacity-20 transition-opacity duration-1000 ${cameraActive ? 'block' : 'hidden'} grayscale`} 
                    />
                    
                    {/* Scan Overlay */}
                    {scanning && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                            <Scan size={64} className="text-cyber animate-ping mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">SCANNING BIOMETRICS...</h3>
                            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-cyber transition-all duration-75" style={{width: `${scanProgress}%`}}></div>
                            </div>
                            <p className="text-cyber font-mono text-xs mt-2">{scanProgress}% COMPLETE</p>
                        </div>
                    )}

                    <canvas ref={canvasRef} className="w-full h-full relative z-10" />
                    
                    <div className="absolute top-6 left-6 z-20">
                        <h2 className="text-3xl font-black text-white flex items-center gap-3">
                            <User className="text-cyber" size={32} />
                            NEURAL <span className="text-purple-500">AVATAR</span>
                        </h2>
                        <p className="text-gray-400 text-sm font-mono mt-1">Digital Twin Identification</p>
                    </div>

                    {!cameraActive && !scanning && !error && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                            <button 
                                onClick={startCameraScan}
                                className="bg-cyber text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                            >
                                <Camera size={20} /> INITIATE BIO-SCAN
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 bg-red-500/20 border border-red-500 px-4 py-2 rounded-lg flex items-center gap-2 backdrop-blur-md">
                            <AlertCircle size={16} className="text-red-500" />
                            <span className="text-red-200 text-xs font-bold">{error}</span>
                        </div>
                    )}

                    {cameraActive && !scanning && (
                        <div className="absolute bottom-6 right-6 text-right z-20">
                             <div className="flex items-center justify-end gap-2 text-green-500 mb-1">
                                 <CheckCircle size={14} />
                                 <span className="text-xs font-bold uppercase tracking-widest">Scan Complete</span>
                             </div>
                             <div className="font-mono text-white text-sm bg-black/50 px-3 py-1 rounded border border-white/10">
                                 ID: 8821-X99-QA
                             </div>
                        </div>
                    )}
                </div>

                {/* Controls Side */}
                <div className="w-full lg:w-96 flex flex-col gap-6">
                    <div className="bg-void-lighter border border-white/10 rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <Palette className="text-cyber" size={18} /> CORE AESTHETICS
                        </h3>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold mb-3 block">Synaptic Color</label>
                                <div className="flex gap-3">
                                    {['#00f0ff', '#a855f7', '#22c55e', '#ef4444', '#eab308'].map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setColor(c)}
                                            className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-white scale-110' : 'border-transparent'}`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold mb-3 block">Energy Aura</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Pulse', 'Static', 'Wave', 'Void'].map((a) => (
                                        <button
                                            key={a}
                                            onClick={() => setAura(a)}
                                            className={`py-2 rounded-lg text-sm font-bold border transition-all ${aura === a ? 'bg-white/10 border-white text-white' : 'border-white/10 text-gray-500 hover:text-white'}`}
                                        >
                                            {a}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-gradient-to-b from-black to-cyber/10 border border-cyber/20 rounded-2xl p-6 flex flex-col justify-center text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <Hexagon size={48} className="text-cyber mx-auto mb-4 animate-spin-slow" />
                            <h3 className="text-2xl font-black text-white mb-1">LEVEL 42</h3>
                            <p className="text-cyber text-xs font-bold uppercase tracking-widest mb-6">Quantum Scholar</p>
                            
                            <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mb-2">
                                <div className="bg-cyber h-full w-[75%] animate-progress"></div>
                            </div>
                            <p className="text-[10px] text-gray-400">2,450 / 3,000 XP to Level 43</p>
                        </div>
                        
                        {/* Fingerprint bg */}
                        <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                            <Fingerprint size={150} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeuralAvatar;
