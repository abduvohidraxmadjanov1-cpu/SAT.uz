
import React, { useState } from 'react';
import { Settings, Monitor, Globe, Cpu, Volume2, Moon, Zap, Sliders } from 'lucide-react';

const SystemConfig: React.FC = () => {
    const [settings, setSettings] = useState({
        language: 'Uzbek (Latin)',
        graphics: 'Ultra (Ray Tracing)',
        aiModel: 'Gemini 2.5 Flash',
        notifications: 'Smart AI',
        voice: 'Natural (Female)',
        theme: 'Cyberpunk Dark'
    });

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <Settings size={32} className="text-cyber animate-spin-slow" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white">SYSTEM CONFIG</h1>
                        <p className="text-gray-400">Global Platform Settings & Neural Parameters</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Section 1: General */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Globe className="text-blue-500" /> Localization & Interface
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold block mb-2">Interface Language</label>
                                <select 
                                    value={settings.language}
                                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                                    className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyber outline-none"
                                >
                                    <option>Uzbek (Latin)</option>
                                    <option>Uzbek (Cyrillic)</option>
                                    <option>English (US)</option>
                                    <option>Russian</option>
                                    <option>Korean</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold block mb-2">UI Theme</label>
                                <select 
                                    value={settings.theme}
                                    onChange={(e) => setSettings({...settings, theme: e.target.value})}
                                    className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyber outline-none"
                                >
                                    <option>Cyberpunk Dark</option>
                                    <option>Matrix Green</option>
                                    <option>Deep Void</option>
                                    <option>Minimalist Light</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Neural Engine */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Cpu size={200} />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Cpu className="text-purple-500" /> Neural Engine Parameters
                        </h2>
                        <div className="space-y-6 relative z-10">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs text-gray-500 uppercase font-bold">Active AI Model</label>
                                    <span className="text-xs text-cyber font-mono">Tokens: 100k/req</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {['Gemini 2.5 Flash', 'Gemini 2.5 Pro', 'GPT-4o (Bridge)'].map((model) => (
                                        <button 
                                            key={model}
                                            onClick={() => setSettings({...settings, aiModel: model})}
                                            className={`py-3 rounded-xl border text-sm font-bold transition-all ${settings.aiModel === model ? 'bg-cyber text-black border-cyber' : 'bg-black text-gray-400 border-white/10 hover:border-white/30'}`}
                                        >
                                            {model}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold block mb-4">Thinking Budget (Token Allocation)</label>
                                <input type="range" className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>Speed Priority</span>
                                    <span>Balanced</span>
                                    <span>Deep Reasoning (High Cost)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Rendering */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Monitor className="text-green-500" /> Graphics & Performance
                        </h2>
                        <div className="flex items-center justify-between mb-4 p-4 bg-black rounded-xl border border-white/5">
                            <div>
                                <div className="text-white font-bold">Particle Effects</div>
                                <div className="text-xs text-gray-500">Neural Core & Background Animations</div>
                            </div>
                            <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow"></div>
                            </div>
                        </div>
                         <div className="flex items-center justify-between mb-4 p-4 bg-black rounded-xl border border-white/5">
                            <div>
                                <div className="text-white font-bold">Ray Tracing (Simulated)</div>
                                <div className="text-xs text-gray-500">High fidelity lighting on UI elements</div>
                            </div>
                            <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors">Default</button>
                    <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SystemConfig;
