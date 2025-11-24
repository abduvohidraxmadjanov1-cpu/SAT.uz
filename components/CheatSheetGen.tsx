
import React, { useState } from 'react';
import { FileText, Download, RefreshCw, Brain, Zap, Printer, Check, AlertCircle } from 'lucide-react';

const WEAK_TOPICS = [
    { id: 1, name: "Circle Theorems", category: "Math", urgency: "High" },
    { id: 2, name: "Dangling Modifiers", category: "Writing", urgency: "Medium" },
    { id: 3, name: "Standard Deviation", category: "Data", urgency: "High" },
    { id: 4, name: "Transitional Words", category: "Reading", urgency: "Medium" }
];

const CheatSheetGen: React.FC = () => {
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            setGenerating(false);
            setGenerated(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-5xl mx-auto h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <FileText className="text-yellow-500" size={32} />
                            CHEAT SHEET <span className="text-cyber">GEN</span>
                        </h1>
                        <p className="text-gray-400 text-sm">Personalized Strategy Compressor</p>
                    </div>
                    <button 
                        onClick={handleGenerate}
                        disabled={generating}
                        className="bg-cyber text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                    >
                        {generating ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
                        {generating ? 'COMPILING...' : 'GENERATE PDF'}
                    </button>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Config Panel */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-6">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <Brain className="text-purple-500" size={18} /> WEAK AREAS DETECTED
                        </h3>
                        <div className="space-y-4">
                            {WEAK_TOPICS.map(topic => (
                                <div key={topic.id} className="bg-black/40 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                                    <div>
                                        <div className="text-white font-bold text-sm">{topic.name}</div>
                                        <div className="text-xs text-gray-500">{topic.category}</div>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${topic.urgency === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                        {topic.urgency} Priority
                                    </span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <h4 className="text-blue-400 font-bold text-xs uppercase mb-2 flex items-center gap-2">
                                <AlertCircle size={14} /> AI Insight
                            </h4>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                You consistently miss Geometry questions involving sector area. 
                                The generator will prioritize circle formulas and arc length ratios.
                            </p>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="lg:col-span-2 bg-white text-black rounded-3xl p-8 relative overflow-hidden shadow-2xl transform transition-all duration-500">
                        {!generated ? (
                            <div className="absolute inset-0 bg-void-lighter z-20 flex flex-col items-center justify-center border border-white/10">
                                <FileText size={64} className="text-gray-600 mb-4 opacity-50" />
                                <p className="text-gray-400">Press generate to build your personalized cheat sheet.</p>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col animate-in zoom-in-95 duration-500">
                                <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-6">
                                    <h2 className="text-3xl font-black tracking-tighter">SAT<span className="text-blue-600">.uz</span> STRATEGY</h2>
                                    <div className="text-right">
                                        <div className="text-xs font-bold uppercase">Personalized For</div>
                                        <div className="font-mono font-bold">AZIZBEK TOLIPOV</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 flex-1">
                                    <div>
                                        <h3 className="font-black text-lg mb-4 border-b border-gray-300 pb-1">MATH ESSENTIALS</h3>
                                        <div className="space-y-4 text-sm">
                                            <div className="bg-gray-100 p-2 rounded">
                                                <div className="font-bold">Circle Equation</div>
                                                <div className="font-mono text-blue-600">(x-h)² + (y-k)² = r²</div>
                                                <div className="text-xs text-gray-600">Center: (h,k), Radius: r</div>
                                            </div>
                                            <div className="bg-gray-100 p-2 rounded">
                                                <div className="font-bold">Sector Area</div>
                                                <div className="font-mono text-blue-600">A = (θ/360) * πr²</div>
                                            </div>
                                            <div className="bg-gray-100 p-2 rounded">
                                                <div className="font-bold">Discriminant</div>
                                                <div className="font-mono text-blue-600">b² - 4ac</div>
                                                <div className="text-xs text-gray-600">{`>0: 2 sol, =0: 1 sol, <0: 0 sol`}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg mb-4 border-b border-gray-300 pb-1">WRITING HACKS</h3>
                                        <div className="space-y-4 text-sm">
                                            <div className="bg-gray-100 p-2 rounded">
                                                <div className="font-bold">Dangling Modifiers</div>
                                                <div className="text-xs text-gray-600 italic">"Walking down the street, the trees..." (Wrong)</div>
                                                <div className="text-xs text-green-600 font-bold">Subject must follow modifier immediately.</div>
                                            </div>
                                            <div className="bg-gray-100 p-2 rounded">
                                                <div className="font-bold">Semicolon Usage</div>
                                                <div className="font-mono text-blue-600">Sent 1; Sent 2</div>
                                                <div className="text-xs text-gray-600">Both must be independent clauses.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t-2 border-black flex justify-between items-center">
                                    <div className="text-[10px] font-mono text-gray-500">GENERATED BY NEURAL CORE V4.0</div>
                                    <div className="flex gap-2">
                                        <button className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-gray-800">
                                            <Printer size={14} /> PRINT
                                        </button>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-blue-700">
                                            <Download size={14} /> PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheatSheetGen;
