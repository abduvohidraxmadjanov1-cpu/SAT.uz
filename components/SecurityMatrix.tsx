import React, { useState, useEffect } from 'react';
import { Shield, Lock, Fingerprint, Eye, FileKey, Database, Server, AlertTriangle, CheckCircle } from 'lucide-react';
import { SecurityLayer } from '../types';

const LAYERS: SecurityLayer[] = [
    { id: 1, name: "Physical Device Fingerprinting", status: "Secure", detail: "MAC/IMEI Analysis" },
    { id: 2, name: "Biometric Verification", status: "Secure", detail: "FaceID & VoicePrint" },
    { id: 3, name: "Network Encryption (TLS 1.3)", status: "Secure", detail: "2048-bit RSA" },
    { id: 4, name: "DNA Verification (Simulated)", status: "Secure", detail: "Identity Pattern Matching" },
    { id: 5, name: "Behavioral Analysis", status: "Scanning", detail: "Keystroke Dynamics" },
    { id: 6, name: "Location Geofencing", status: "Secure", detail: "GPS/IP Correlation" },
    { id: 7, name: "Temporal Access Control", status: "Secure", detail: "Session Time Valid" },
    { id: 8, name: "Database Sharding", status: "Secure", detail: "Distributed Storage" },
    { id: 9, name: "Quantum Key Distribution", status: "Secure", detail: "Entanglement Check" },
];

const SecurityMatrix: React.FC = () => {
    const [layers, setLayers] = useState(LAYERS);
    const [scanIndex, setScanIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanIndex(prev => (prev + 1) % 9);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-void pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-white mb-4 flex justify-center items-center gap-4">
                        <Shield size={48} className="text-cyber animate-pulse" />
                        9-LAYER SECURITY MATRIX
                    </h1>
                    <p className="text-gray-400 font-mono">Military Grade Protection for SAT.uz Infrastructure</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Visualizer Circle */}
                    <div className="relative h-[500px] flex items-center justify-center">
                         {/* Concentric Circles */}
                         {[1, 2, 3, 4].map((i) => (
                             <div key={i} className={`absolute border border-cyber/${30 - i*5} rounded-full animate-spin-slow`} style={{width: `${i * 100 + 100}px`, height: `${i * 100 + 100}px`, animationDuration: `${i * 5 + 5}s`, animationDirection: i % 2 === 0 ? 'normal' : 'reverse'}}></div>
                         ))}
                         
                         <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-40 h-40 bg-cyber/10 rounded-full blur-[50px] animate-pulse"></div>
                             <Fingerprint size={80} className="text-cyber relative z-10" />
                         </div>

                         {/* Floating Nodes */}
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black border border-cyber p-2 rounded text-xs text-cyber font-mono animate-float">
                             QUANTUM ENCRYPTION
                         </div>
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black border border-purple-500 p-2 rounded text-xs text-purple-400 font-mono animate-float" style={{animationDelay: '1s'}}>
                             BIOMETRIC LOCK
                         </div>
                    </div>

                    {/* Layer List */}
                    <div className="space-y-4">
                        {layers.map((layer, index) => (
                            <div 
                                key={layer.id}
                                className={`
                                    flex items-center justify-between p-4 rounded-xl border transition-all duration-300
                                    ${index === scanIndex ? 'bg-cyber/10 border-cyber scale-105 shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'bg-void-light border-white/5 opacity-80'}
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${index === scanIndex ? 'bg-cyber text-black' : 'bg-white/10 text-gray-500'}`}>
                                        L{layer.id}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">{layer.name}</h3>
                                        <p className="text-xs text-gray-500 font-mono">{layer.detail}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {index === scanIndex ? (
                                        <span className="text-cyber text-xs font-bold animate-pulse">SCANNING...</span>
                                    ) : (
                                        <CheckCircle size={16} className="text-green-500" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityMatrix;