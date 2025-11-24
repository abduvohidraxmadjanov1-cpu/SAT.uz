import React, { useState } from 'react';
import { Award, ShieldCheck, Download, Share2, Hexagon } from 'lucide-react';

const HoloCertificate: React.FC = () => {
    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12 flex items-center justify-center">
            <div className="w-full max-w-4xl perspective-1000">
                <div className="relative bg-black border border-cyber/50 p-1 rounded-3xl transform transition-transform duration-500 hover:rotate-x-2 hover:rotate-y-2 shadow-[0_0_100px_rgba(0,240,255,0.15)] group">
                    {/* Holographic Overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20" style={{mixBlendMode: 'overlay'}}></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none"></div>
                    
                    <div className="bg-void-lighter rounded-[22px] p-12 border border-white/10 relative overflow-hidden">
                        {/* Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyber via-purple-500 to-cyber"></div>
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyber/10 rounded-full blur-[80px]"></div>
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 text-center">
                            <div className="flex justify-center mb-8">
                                <div className="w-24 h-24 bg-black border-2 border-cyber rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                                    <Hexagon size={48} className="text-cyber animate-pulse" />
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase font-serif">
                                Certificate <span className="text-cyber text-3xl block mt-2 tracking-widest font-sans">of Mastery</span>
                            </h1>

                            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                                This certifies that <span className="text-white font-bold border-b border-white/20 pb-1">Azizbek Tolipov</span> has successfully completed the 
                                <br/> <span className="text-cyber font-bold">Quantum SAT Prep Course</span> with Distinction.
                            </p>

                            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12 border-t border-b border-white/10 py-6">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Date</div>
                                    <div className="text-white font-mono font-bold">26.05.2024</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Score Est.</div>
                                    <div className="text-cyber font-mono font-bold">1550+</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Verify ID</div>
                                    <div className="text-white font-mono font-bold text-xs mt-1">X99-QA-8821</div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-8 items-end">
                                <div className="text-center">
                                    <div className="w-32 h-12 border-b border-white/20 mb-2 mx-auto">
                                        {/* Signature Image Placeholder */}
                                        <div className="font-serif italic text-2xl text-gray-400">AI Core</div>
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase">System Architect</div>
                                </div>
                                <div className="w-20 h-20 bg-white p-1 rounded-lg">
                                    {/* QR Code Placeholder */}
                                    <div className="w-full h-full bg-black flex items-center justify-center">
                                        <ShieldCheck size={32} className="text-white" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="w-32 h-12 border-b border-white/20 mb-2 mx-auto">
                                        <div className="font-serif italic text-2xl text-gray-400">Gemini</div>
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase">Lead AI Instructor</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <button className="bg-cyber text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2">
                        <Download size={20} /> Download PDF
                    </button>
                    <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                        <Share2 size={20} /> Share on LinkedIn
                    </button>
                </div>
            </div>
            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .rotate-x-2 { transform: rotateX(2deg); }
                .rotate-y-2 { transform: rotateY(2deg); }
            `}</style>
        </div>
    );
};

export default HoloCertificate;