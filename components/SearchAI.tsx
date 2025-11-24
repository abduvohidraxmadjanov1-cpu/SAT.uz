
import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Database, Network, FileText, ArrowRight, Zap, Loader2, PlayCircle, Book, Target, Share2, Mic, BarChart2, Activity, Video } from 'lucide-react';
import { performSemanticSearch } from '../services/geminiService';
import { SearchResult, GraphNode, Page } from '../types';

interface SearchAIProps {
    setPage?: (page: Page) => void;
}

const SearchAI: React.FC<SearchAIProps> = ({ setPage }) => {
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState<SearchResult[] | null>(null);
    const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
    const [redirecting, setRedirecting] = useState<{ title: string, type: string } | null>(null);
    
    // For mouse tracking
    const mouseRef = useRef({ x: 0, y: 0 });

    const handleSearch = async (searchQuery: string = query) => {
        if (!searchQuery.trim()) return;
        setQuery(searchQuery);
        setSearching(true);
        setResults(null);
        // Keep old nodes briefly for transition or clear them
        setGraphNodes([]); 

        const data = await performSemanticSearch(searchQuery);
        if (data) {
            setResults(data.results);
            setGraphNodes(data.graph);
        } else {
            setResults([]);
        }
        setSearching(false);
    };

    const handleResourceClick = (res: SearchResult, action: 'view' | 'generate' = 'view') => {
        if (!setPage) return;
        
        const actionTitle = action === 'generate' ? `GENERATING ${res.type.toUpperCase()}...` : `OPENING ${res.type.toUpperCase()}...`;
        setRedirecting({ title: res.title, type: actionTitle });
        
        // Simulate "Loading Module" delay for effect
        setTimeout(() => {
            switch (res.type) {
                case 'Video':
                    setPage(Page.VIDEO_LESSON);
                    break;
                case 'Podcast':
                    setPage(Page.VOICE_COACH); // Or VideoAI used as audio player
                    break;
                case 'Practice':
                    setPage(Page.PRACTICE);
                    break;
                case 'Article':
                    setPage(Page.NEURAL_LIBRARY);
                    break;
                case 'Concept':
                    setPage(Page.CONCEPT_UNIVERSE);
                    break;
                default:
                    setPage(Page.HUB);
            }
            setRedirecting(null);
        }, 1500);
    };

    // Handle Canvas Interaction
    const handleCanvasMouseMove = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleCanvasClick = () => {
        if (hoveredNode && hoveredNode.label !== query) {
            handleSearch(hoveredNode.label);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let t = 0;

        const render = () => {
            canvas.width = canvas.parentElement?.clientWidth || 800;
            canvas.height = canvas.parentElement?.clientHeight || 600;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Find hovered node logic
            let foundHover: GraphNode | null = null;

            // Draw Dynamic Connections
            if (graphNodes.length > 0) {
                const coreNode = graphNodes.find(n => n.type === 'Core') || graphNodes[0];
                
                graphNodes.forEach((node, i) => {
                    // Animate position slightly based on time and mouse parallax
                    const floatX = Math.sin(t + i) * 2;
                    const floatY = Math.cos(t + i * 0.5) * 2;
                    
                    // Parallax effect
                    const dx = (mouseRef.current.x - canvas.width/2) * 0.02;
                    const dy = (mouseRef.current.y - canvas.height/2) * 0.02;

                    // Clamp coordinates to ensure they stay within canvas bounds (10% padding)
                    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
                    const safeX = clamp(node.x, 5, 95);
                    const safeY = clamp(node.y, 5, 95);

                    const x = (safeX / 100) * canvas.width + floatX + dx;
                    const y = (safeY / 100) * canvas.height + floatY + dy;

                    // Check hover
                    const distToMouse = Math.hypot(mouseRef.current.x - x, mouseRef.current.y - y);
                    const nodeRadius = node.type === 'Core' ? 30 : 15;
                    if (distToMouse < nodeRadius + 5) {
                        foundHover = node;
                    }

                    // Draw line to Core
                    if (node.id !== coreNode.id) {
                        const safeCoreX = clamp(coreNode.x, 5, 95);
                        const safeCoreY = clamp(coreNode.y, 5, 95);
                        const coreX = (safeCoreX / 100) * canvas.width + Math.sin(t) * 2 + dx;
                        const coreY = (safeCoreY / 100) * canvas.height + Math.cos(t) * 2 + dy;
                        
                        ctx.beginPath();
                        ctx.moveTo(coreX, coreY);
                        ctx.lineTo(x, y);
                        ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        // Data packet animation along line
                        const packetPos = (t * 0.5 + i * 0.5) % 1;
                        const packetX = coreX + (x - coreX) * packetPos;
                        const packetY = coreY + (y - coreY) * packetPos;
                        
                        ctx.beginPath();
                        ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
                        ctx.fillStyle = '#00f0ff';
                        ctx.fill();
                    }

                    // Draw Node
                    ctx.beginPath();
                    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
                    
                    if (node.type === 'Core') {
                        ctx.fillStyle = '#00f0ff';
                        ctx.shadowBlur = 25;
                        ctx.shadowColor = '#00f0ff';
                    } else if (node === foundHover) {
                        ctx.fillStyle = '#fff';
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = '#fff';
                    } else if (node.type === 'Sub') {
                        ctx.fillStyle = '#a855f7';
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = '#a855f7';
                    } else {
                        ctx.fillStyle = '#333';
                        ctx.shadowBlur = 0;
                    }
                    
                    ctx.fill();
                    ctx.shadowBlur = 0; // Reset

                    // Label
                    ctx.fillStyle = node === foundHover ? '#00f0ff' : '#fff';
                    ctx.font = `${node.type === 'Core' ? 'bold 14px' : '11px'} Inter`;
                    ctx.textAlign = 'center';
                    ctx.fillText(node.label, x, y + nodeRadius + 15);
                });
            } else if (!searching) {
                // Idle Animation (Searching state)
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.lineWidth = 1;
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;
                
                for (let i = 0; i < 5; i++) {
                    ctx.beginPath();
                    ctx.arc(cx, cy, 50 + i * 40 + Math.sin(t * 0.5 + i) * 10, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            setHoveredNode(foundHover);
            t += 0.02;
            animationId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationId);
    }, [graphNodes, searching]);

    // Helper to get icon based on type
    const getResourceIcon = (type: string) => {
        switch (type) {
            case 'Video': return <PlayCircle size={16} />;
            case 'Podcast': return <Mic size={16} />;
            case 'Practice': return <Target size={16} />;
            case 'Article': return <FileText size={16} />;
            case 'Concept': return <Database size={16} />;
            default: return <Book size={16} />;
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto h-[85vh] flex flex-col">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        QIDIRUV <span className="text-cyber">AI AGENT</span>
                    </h1>
                    <p className="text-gray-400">Semantic Search Engine across 3000 Layers of Knowledge</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto w-full mb-12 relative z-20">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyber via-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-black rounded-2xl flex items-center p-2 border border-white/10">
                            <Search className="ml-4 text-gray-400" size={24} />
                            <input 
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Mavzu, savol yoki tushunchani kiriting (e.g., 'Linear Algebra')"
                                className="w-full bg-transparent border-none focus:ring-0 text-white text-lg px-4 py-2 placeholder-gray-600 outline-none"
                            />
                            <button 
                                onClick={() => handleSearch()}
                                disabled={searching}
                                className="bg-cyber text-black px-6 py-2 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {searching ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
                            </button>
                        </div>
                    </div>
                </div>

                {redirecting && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <div className="bg-void-lighter border border-cyber/30 p-8 rounded-3xl text-center shadow-[0_0_50px_rgba(0,240,255,0.3)] animate-in zoom-in-95">
                            <Loader2 size={48} className="text-cyber animate-spin mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">{redirecting.type}</h3>
                            <p className="text-gray-400 text-sm font-mono">Neural Link Established: <span className="text-cyber">{redirecting.title}</span></p>
                        </div>
                    </div>
                )}

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
                    {/* Knowledge Graph Visualizer */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl relative overflow-hidden flex items-center justify-center group shadow-[0_0_50px_rgba(0,240,255,0.05)]">
                        <div className="absolute top-4 left-4 z-10 bg-black/60 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                            <Network size={14} className="text-cyber" />
                            <span className="text-xs text-white font-bold">LIVE KNOWLEDGE GRAPH</span>
                        </div>
                        
                        <canvas 
                            ref={canvasRef} 
                            className="absolute inset-0 w-full h-full cursor-crosshair"
                            onMouseMove={handleCanvasMouseMove}
                            onClick={handleCanvasClick}
                        />
                        
                        {searching && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
                                <div className="text-center">
                                    <Loader2 size={48} className="text-cyber animate-spin mx-auto mb-4" />
                                    <p className="text-cyber font-mono text-sm">GENERATING NODES...</p>
                                </div>
                            </div>
                        )}

                        {hoveredNode && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border border-cyber/50 px-4 py-2 rounded-full text-xs text-cyber font-bold pointer-events-none animate-in fade-in zoom-in">
                                CLICK TO EXPLORE: {hoveredNode.label}
                            </div>
                        )}
                    </div>

                    {/* Results Area */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-6 overflow-y-auto custom-scrollbar relative">
                        {!results && !searching && (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                <Globe size={48} className="mb-4 opacity-20" />
                                <p>Butun platforma bo'ylab qidiring</p>
                            </div>
                        )}

                        {searching && (
                            <div className="space-y-4">
                                {[1,2,3].map(i => (
                                    <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse border border-white/5"></div>
                                ))}
                            </div>
                        )}

                        {results && results.length === 0 && !searching && (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                <p>Natija topilmadi yoki API xatosi.</p>
                            </div>
                        )}

                        {results && results.length > 0 && (
                            <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
                                <h3 className="text-cyber font-bold text-xs uppercase tracking-widest mb-4 sticky top-0 bg-void-lighter py-2 z-10 flex justify-between">
                                    <span>AI Suggested Resources</span>
                                    <span className="text-gray-500">{results.length} results found</span>
                                </h3>
                                {results.map((res, idx) => (
                                    <div 
                                        key={idx} 
                                        className="group p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-black hover:border-cyber/30 transition-all relative overflow-hidden transform hover:scale-[1.02] hover:shadow-[0_5px_15px_rgba(0,240,255,0.1)]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyber/0 to-cyber/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                                                        res.type === 'Video' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                        res.type === 'Podcast' ? 'bg-pink-500/10 text-pink-500 border-pink-500/20' :
                                                        res.type === 'Practice' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        res.type === 'Concept' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                                                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                    }`}>
                                                        {getResourceIcon(res.type)}
                                                        {res.type}
                                                    </span>
                                                    <h4 className="font-bold text-white group-hover:text-cyber transition-colors text-lg">{res.title}</h4>
                                                </div>
                                                <div className="flex items-center gap-1 text-cyber text-xs font-mono bg-cyber/10 px-2 py-1 rounded">
                                                    <Zap size={12} /> {res.relevance}
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{res.summary}</p>
                                            
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                                {/* Live Metrics Simulation */}
                                                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono">
                                                    <span className="flex items-center gap-1 text-green-500">
                                                        <Activity size={10} /> Live: {Math.floor(Math.random() * 500 + 100)} listening
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <BarChart2 size={10} /> Impact: High
                                                    </span>
                                                </div>

                                                <div className="flex gap-2">
                                                    {(res.type === 'Video' || res.type === 'Podcast') && (
                                                        <button 
                                                            onClick={() => handleResourceClick(res, 'generate')}
                                                            className="text-[10px] font-bold bg-cyber/10 text-cyber px-3 py-1.5 rounded hover:bg-cyber hover:text-black transition-all flex items-center gap-1 border border-cyber/20"
                                                        >
                                                            {res.type === 'Video' ? <Video size={12} /> : <Mic size={12} />}
                                                            GENERATE {res.type.toUpperCase()}
                                                        </button>
                                                    )}
                                                    <button 
                                                        onClick={() => handleResourceClick(res, 'view')}
                                                        className="flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-white transition-colors hover:underline"
                                                    >
                                                        OPEN <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchAI;
