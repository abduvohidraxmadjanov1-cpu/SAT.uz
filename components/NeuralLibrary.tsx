
import React, { useState, useEffect, useRef } from 'react';
import { Book, FileText, Download, Bookmark, Star, Search, Layers, X, Filter, CheckCircle, Loader2, Eye, Lock, Zap, Wifi, Database, Activity } from 'lucide-react';

interface Resource {
    id: number;
    title: string;
    type: 'PDF' | 'Guide' | 'Practice' | 'Archive' | 'Flashcard';
    category: 'Math' | 'Reading' | 'Writing' | 'Strategy';
    size: string;
    downloads: string;
    tier: 'Free' | 'Pro';
    description: string;
}

const RESOURCES: Resource[] = [
    { id: 1, title: "Official SAT Math Formula Sheet", type: "PDF", category: "Math", size: "2.4 MB", downloads: "12k", tier: "Free", description: "Essential formulas for Geometry and Trigonometry not provided on the exam." },
    { id: 2, title: "Advanced Grammar Rules Cheatsheet", type: "Guide", category: "Writing", size: "1.1 MB", downloads: "8.5k", tier: "Free", description: "Master punctuation, clauses, and modifiers with this quick reference." },
    { id: 3, title: "50 Hardest Geometry Problems", type: "Practice", category: "Math", size: "5.6 MB", downloads: "22k", tier: "Pro", description: "Challenge yourself with the most difficult questions from the last 5 years." },
    { id: 4, title: "Reading Comprehension: Historical Texts", type: "Archive", category: "Reading", size: "12 MB", downloads: "5k", tier: "Free", description: "Archive of 18th and 19th-century speeches often cited in the SAT." },
    { id: 5, title: "College Application Essay Samples (Ivy League)", type: "PDF", category: "Strategy", size: "3.2 MB", downloads: "15k", tier: "Pro", description: "Real essays that got students into Harvard, Princeton, and Yale." },
    { id: 6, title: "Digital SAT Vocabulary: Top 1000 Words", type: "Flashcard", category: "Reading", size: "8.0 MB", downloads: "45k", tier: "Free", description: "High-frequency words powered by spaced repetition algorithms." },
    { id: 7, title: "Linear Algebra & Functions Deep Dive", type: "Guide", category: "Math", size: "4.5 MB", downloads: "3k", tier: "Pro", description: "Comprehensive guide to mastering Heart of Algebra." },
    { id: 8, title: "Time Management Strategies", type: "Guide", category: "Strategy", size: "1.5 MB", downloads: "10k", tier: "Free", description: "How to pacing yourself perfectly in the digital adaptive format." },
];

const CATEGORIES = ["All", "Math", "Reading", "Writing", "Strategy"];

const NeuralLibrary: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [bookmarked, setBookmarked] = useState<number[]>([]);
    const [downloading, setDownloading] = useState<Record<number, number>>({}); // id -> progress
    const [previewItem, setPreviewItem] = useState<Resource | null>(null);
    
    // Safety refs
    const isMounted = useRef(true);
    const timeouts = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

    useEffect(() => {
        return () => {
            isMounted.current = false;
            Object.values(timeouts.current).forEach(clearTimeout);
        };
    }, []);

    // Filter Logic
    const filteredResources = RESOURCES.filter(res => {
        const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || res.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || res.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleBookmark = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setBookmarked(prev => 
            prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
        );
    };

    const handleDownload = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (downloading[id] !== undefined) return;

        setDownloading(prev => ({ ...prev, [id]: 0 }));

        let progress = 0;
        const interval = setInterval(() => {
            if (!isMounted.current) {
                clearInterval(interval);
                return;
            }

            progress += Math.random() * 15 + 5;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }

            setDownloading(prev => ({ ...prev, [id]: Math.round(progress) }));
        }, 150);
    };

    const getIconForType = (type: string) => {
        switch(type) {
            case 'PDF': return <FileText size={24} />;
            case 'Guide': return <Layers size={24} />;
            case 'Practice': return <Zap size={24} />;
            case 'Archive': return <Database size={24} />;
            default: return <Book size={24} />;
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                {/* System Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Wifi size={14} className="text-cyber animate-pulse" />
                            <span className="text-cyber text-xs font-mono tracking-widest">NEURAL LINK: ESTABLISHED</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <Database className="text-purple-500" size={40} />
                            NEURAL <span className="text-white">LIBRARY</span>
                        </h1>
                        <p className="text-gray-400">Quantum-Secured Knowledge Repository & Asset Bank</p>
                    </div>
                    
                    {/* Stats & Filter */}
                    <div className="flex flex-col items-end gap-6 w-full lg:w-auto">
                        <div className="flex gap-6 text-right">
                            <div>
                                <div className="text-xs text-gray-500 font-bold uppercase">Latency</div>
                                <div className="text-cyber font-mono font-bold">1.2ms</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-bold uppercase">Bandwidth</div>
                                <div className="text-green-500 font-mono font-bold">40 TB/s</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-bold uppercase">Assets</div>
                                <div className="text-purple-500 font-mono font-bold">{filteredResources.length}</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <div className="relative group flex-1">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber via-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                                <div className="relative flex items-center bg-black rounded-xl border border-white/10 p-1">
                                    <Search className="ml-3 text-gray-500" size={18} />
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search neural database..." 
                                        className="bg-transparent border-none focus:ring-0 text-white px-4 py-2 outline-none w-full placeholder-gray-600"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar scrollbar-hide">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                                            activeCategory === cat 
                                            ? 'bg-cyber text-black border-cyber shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/30'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((res) => (
                        <div 
                            key={res.id} 
                            onClick={() => setPreviewItem(res)}
                            className="group bg-void-lighter border border-white/10 rounded-3xl p-6 hover:border-cyber/50 transition-all hover:-translate-y-2 cursor-pointer relative overflow-hidden hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] perspective-1000"
                        >
                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-cyber/10 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-xl transition-all shadow-lg group-hover:scale-110 ${
                                    res.category === 'Math' ? 'bg-blue-500/10 text-blue-400' : 
                                    res.category === 'Reading' ? 'bg-purple-500/10 text-purple-400' :
                                    res.category === 'Writing' ? 'bg-pink-500/10 text-pink-400' :
                                    'bg-green-500/10 text-green-400'
                                }`}>
                                    {getIconForType(res.type)}
                                </div>
                                <div className="flex gap-2">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                                        res.tier === 'Pro' 
                                        ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                                        : 'bg-green-500/10 text-green-500 border-green-500/20'
                                    }`}>
                                        {res.tier}
                                    </span>
                                    <button 
                                        onClick={(e) => toggleBookmark(e, res.id)}
                                        className={`p-1.5 rounded-lg transition-colors z-20 relative ${bookmarked.includes(res.id) ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-600 hover:text-white'}`}
                                    >
                                        <Bookmark size={18} fill={bookmarked.includes(res.id) ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber transition-colors line-clamp-2 relative z-10">
                                {res.title}
                            </h3>
                            
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-mono relative z-10">
                                <span className="flex items-center gap-1"><Layers size={12} /> {res.type}</span>
                                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                <span>{res.size}</span>
                                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                <span className="flex items-center gap-1"><Download size={12} /> {res.downloads}</span>
                            </div>

                            <div className="relative z-10">
                                {downloading[res.id] !== undefined ? (
                                    <div className="w-full bg-black/50 rounded-xl h-10 px-4 flex items-center border border-white/10 relative overflow-hidden">
                                        <div 
                                            className="absolute left-0 top-0 bottom-0 bg-cyber/20 transition-all duration-150 ease-linear" 
                                            style={{width: `${downloading[res.id]}%`}}
                                        ></div>
                                        <div className="relative w-full flex justify-between items-center text-xs font-bold">
                                            {downloading[res.id] < 100 ? (
                                                <>
                                                    <span className="text-cyber flex items-center gap-2"><Loader2 size={12} className="animate-spin" /> DECRYPTING...</span>
                                                    <span className="text-white font-mono">{downloading[res.id]}%</span>
                                                </>
                                            ) : (
                                                <span className="text-green-500 flex items-center gap-2 w-full justify-center animate-in zoom-in"><CheckCircle size={14} /> READY</span>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={(e) => handleDownload(e, res.id)}
                                        className="w-full bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl font-bold text-sm border border-white/10 hover:border-cyber/50 transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        {res.tier === 'Pro' ? <Lock size={14} className="text-yellow-500" /> : <Download size={16} className="group-hover/btn:animate-bounce" />}
                                        {res.tier === 'Pro' ? 'Unlock Access' : 'Download Asset'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Preview Modal */}
                {previewItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in duration-300">
                        <div className="bg-void-lighter border border-cyber/30 w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,240,255,0.2)] relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
                            {/* Modal Header */}
                            <div className="bg-black/80 p-6 border-b border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg text-black ${
                                        previewItem.category === 'Math' ? 'bg-blue-400' : 'bg-cyber'
                                    }`}>
                                        <Eye size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{previewItem.title}</h3>
                                        <p className="text-gray-500 text-xs font-mono flex items-center gap-2">
                                            <Activity size={10} className="text-green-500" /> LIVE PREVIEW • {previewItem.size}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setPreviewItem(null)}
                                    className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 overflow-y-auto custom-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100">
                                <div className="flex gap-4 mb-6">
                                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs text-gray-300 flex items-center gap-1">
                                        <Layers size={12} /> Category: {previewItem.category}
                                    </span>
                                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs text-gray-300 font-mono">
                                        HASH: #{previewItem.id}X99-QA
                                    </span>
                                </div>
                                
                                <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-8">
                                    <h4 className="text-cyber font-bold text-xs uppercase mb-2 flex items-center gap-2">
                                        <Activity size={12} /> Neural Summary
                                    </h4>
                                    <p className="text-gray-300 leading-relaxed text-sm">
                                        {previewItem.description}
                                    </p>
                                </div>

                                {/* Fake Preview Content */}
                                <div className="bg-white text-black p-8 rounded-xl shadow-2xl opacity-95 font-serif relative overflow-hidden min-h-[300px]">
                                    {previewItem.category === 'Math' ? (
                                        <>
                                            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Chapter 4: Advanced Trigonometry</h2>
                                            <p className="mb-4 text-sm">The Unit Circle is fundamental to understanding sine, cosine, and tangent functions beyond right angles.</p>
                                            <div className="flex justify-center my-6">
                                                <div className="w-32 h-32 border-2 border-black rounded-full flex items-center justify-center relative">
                                                    <div className="w-full h-px bg-black absolute"></div>
                                                    <div className="h-full w-px bg-black absolute"></div>
                                                    <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-red-500 origin-left transform -rotate-45"></div>
                                                    <span className="absolute top-0 right-0 text-xs font-mono">(1, 0)</span>
                                                </div>
                                            </div>
                                            <p className="text-sm">Formula: sin²(θ) + cos²(θ) = 1</p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Rhetorical Analysis</h2>
                                            <p className="mb-4 text-sm">When analyzing the author's intent, look for shifts in tone. For example:</p>
                                            <div className="pl-4 border-l-4 border-gray-300 italic text-gray-600 mb-4">
                                                "While the industrial revolution brought prosperity, it also cast a long shadow over the environment."
                                            </div>
                                            <p className="text-sm">The phrase "cast a long shadow" implies negative long-term consequences...</p>
                                        </>
                                    )}
                                    
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 pointer-events-none"></div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 flex justify-center p-6 bg-gradient-to-t from-white to-transparent">
                                        <div className="bg-black text-white px-6 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-2">
                                            <Lock size={12} /> PREVIEW MODE ONLY
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-white/10 bg-black/80 flex justify-end gap-4">
                                <button onClick={() => setPreviewItem(null)} className="px-6 py-3 text-gray-400 hover:text-white font-bold transition-colors">
                                    Close Viewer
                                </button>
                                <button 
                                    onClick={(e) => { setPreviewItem(null); handleDownload(e, previewItem.id); }}
                                    className="bg-cyber text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2"
                                >
                                    <Download size={18} /> INITIATE DOWNLOAD
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NeuralLibrary;
