
import React, { useState } from 'react';
import { Accessibility, Eye, Type, Volume2, Sun, Monitor, X } from 'lucide-react';

interface AccessibilityPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ isOpen, onClose }) => {
    const [settings, setSettings] = useState({
        highContrast: false,
        largeText: false,
        dyslexiaFont: false,
        screenReader: false,
        focusMask: false
    });

    const toggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
        // In a real app, this would trigger global context updates or CSS class injections
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-void-lighter border border-cyber/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)] animate-in zoom-in-95 duration-300">
                <div className="bg-black/50 p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-white flex items-center gap-3">
                        <Accessibility className="text-cyber" />
                        NEURO ADAPTER
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => toggle('highContrast')}>
                        <div className="flex items-center gap-4">
                            <div className="bg-black border border-white/20 p-2 rounded-lg">
                                <Sun size={20} className="text-yellow-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">High Contrast</div>
                                <div className="text-xs text-gray-500">Vizual ajratishni kuchaytirish</div>
                            </div>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.highContrast ? 'bg-cyber' : 'bg-gray-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.highContrast ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => toggle('largeText')}>
                        <div className="flex items-center gap-4">
                            <div className="bg-black border border-white/20 p-2 rounded-lg">
                                <Type size={20} className="text-green-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">Large Text (120%)</div>
                                <div className="text-xs text-gray-500">O'qishni osonlashtirish</div>
                            </div>
                        </div>
                         <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.largeText ? 'bg-cyber' : 'bg-gray-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.largeText ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => toggle('dyslexiaFont')}>
                        <div className="flex items-center gap-4">
                            <div className="bg-black border border-white/20 p-2 rounded-lg">
                                <Eye size={20} className="text-blue-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">Dyslexia Friendly</div>
                                <div className="text-xs text-gray-500">Maxsus shrift rejimi</div>
                            </div>
                        </div>
                         <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.dyslexiaFont ? 'bg-cyber' : 'bg-gray-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.dyslexiaFont ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => toggle('screenReader')}>
                        <div className="flex items-center gap-4">
                            <div className="bg-black border border-white/20 p-2 rounded-lg">
                                <Volume2 size={20} className="text-purple-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">Screen Reader AI</div>
                                <div className="text-xs text-gray-500">Elementlarni ovozli o'qish</div>
                            </div>
                        </div>
                         <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.screenReader ? 'bg-cyber' : 'bg-gray-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.screenReader ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </div>

                     <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => toggle('focusMask')}>
                        <div className="flex items-center gap-4">
                            <div className="bg-black border border-white/20 p-2 rounded-lg">
                                <Monitor size={20} className="text-red-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">Focus Mask</div>
                                <div className="text-xs text-gray-500">Atrofni qoraytirish</div>
                            </div>
                        </div>
                         <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.focusMask ? 'bg-cyber' : 'bg-gray-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.focusMask ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                </div>

                <div className="bg-black/50 p-6 border-t border-white/10 text-center">
                    <p className="text-gray-500 text-xs">
                        Ushbu sozlamalar AI orqali sizning xatti-harakatingizga qarab avtomatik moslashishi ham mumkin.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityPanel;
