
import React, { useState, useEffect } from 'react';
import { Search, Command, ArrowRight, Zap, Settings, User, FileText, Cpu } from 'lucide-react';
import { Page } from '../types';

interface CommandPaletteProps {
    setPage: (page: Page) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ setPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const COMMANDS = [
        { label: "Go to Dashboard", page: Page.COURSE, icon: User, type: "Navigation" },
        { label: "Start Practice Session", page: Page.PRACTICE, icon: Zap, type: "Action" },
        { label: "Open MCP Hub", page: Page.MCP_HUB, icon: Cpu, type: "System" },
        { label: "View Pricing", page: Page.PRICING, icon: FileText, type: "Navigation" },
        { label: "System Configuration", page: Page.CONFIG, icon: Settings, type: "Settings" },
        { label: "Search Knowledge Base", page: Page.SEARCH, icon: Search, type: "Tool" },
    ];

    const filteredCommands = COMMANDS.filter(cmd => 
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSelect = (page: Page) => {
        setPage(page);
        setIsOpen(false);
        setQuery('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-void-lighter border border-white/10 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
                {/* Search Input */}
                <div className="flex items-center px-6 py-4 border-b border-white/10">
                    <Search className="text-gray-400 mr-4" size={24} />
                    <input 
                        type="text"
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type a command or search..."
                        className="flex-1 bg-transparent text-white text-lg outline-none placeholder-gray-600"
                    />
                    <div className="flex items-center gap-2 text-xs text-gray-500 border border-white/10 px-2 py-1 rounded">
                        <span className="font-bold">ESC</span> to close
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                    {filteredCommands.length > 0 ? (
                        filteredCommands.map((cmd, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelect(cmd.page)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all group ${idx === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                onMouseEnter={() => setSelectedIndex(idx)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${idx === selectedIndex ? 'bg-cyber text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                                        <cmd.icon size={18} />
                                    </div>
                                    <div>
                                        <div className={`font-bold ${idx === selectedIndex ? 'text-white' : 'text-gray-300'}`}>{cmd.label}</div>
                                        <div className="text-xs text-gray-500">{cmd.type}</div>
                                    </div>
                                </div>
                                {idx === selectedIndex && <ArrowRight size={16} className="text-cyber" />}
                            </button>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No commands found.
                        </div>
                    )}
                </div>

                <div className="px-4 py-2 bg-black/50 border-t border-white/5 flex justify-between text-[10px] text-gray-600">
                    <span>Pro Tip: Use Ctrl+K to open this menu anywhere.</span>
                    <div className="flex gap-2">
                        <span>↑↓ to navigate</span>
                        <span>↵ to select</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
