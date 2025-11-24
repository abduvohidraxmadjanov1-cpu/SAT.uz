
import React, { useState, useEffect } from 'react';
import { DollarSign, Globe, Search, CheckCircle, Loader2, FileText, Send } from 'lucide-react';

const SCHOLARSHIPS = [
    { id: 1, name: "NextGen STEM Grant", amount: "$50,000", org: "TechFuture Foundation", probability: 92, deadline: "15 Days" },
    { id: 2, name: "Global Leaders Fellowship", amount: "Full Ride", org: "World Education Council", probability: 78, deadline: "2 Months" },
    { id: 3, name: "Asian Pacific Merit Award", amount: "$25,000", org: "APEC Edu", probability: 85, deadline: "3 Weeks" },
    { id: 4, name: "Women in Science", amount: "$10,000", org: "Science for All", probability: 60, deadline: "5 Days" },
];

const ScholarshipFinder: React.FC = () => {
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [applying, setApplying] = useState<number | null>(null);

    const startScan = () => {
        setScanning(true);
        setResults([]);
        setTimeout(() => {
            setScanning(false);
            setResults(SCHOLARSHIPS);
        }, 2500);
    };

    const handleApply = (id: number) => {
        setApplying(id);
        setTimeout(() => {
            setResults(prev => prev.map(s => s.id === id ? { ...s, applied: true } : s));
            setApplying(null);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <DollarSign className="text-green-500" size={40} />
                            SCHOLARSHIP <span className="text-white">AI AGENT</span>
                        </h1>
                        <p className="text-gray-400">Global Grant Scanning & Auto-Application System</p>
                    </div>
                    <button 
                        onClick={startScan}
                        disabled={scanning}
                        className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center gap-2"
                    >
                        {scanning ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                        {scanning ? 'SCANNING DATABASE...' : 'FIND GRANTS'}
                    </button>
                </div>

                {scanning && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-void-lighter border border-white/10 h-48 rounded-2xl p-6 animate-pulse flex flex-col justify-between">
                                <div className="h-8 w-1/2 bg-white/10 rounded"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-white/10 rounded"></div>
                                    <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {results.map((scholarship) => (
                        <div key={scholarship.id} className="bg-void-lighter border border-white/10 rounded-3xl p-8 group hover:border-green-500/50 transition-all hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded border border-green-500/20">
                                            MATCH: {scholarship.probability}%
                                        </span>
                                        <span className="text-gray-500 text-xs font-mono flex items-center gap-1">
                                            <Globe size={10} /> {scholarship.org}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{scholarship.name}</h3>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-500 uppercase">Value</div>
                                    <div className="text-2xl font-black text-white">{scholarship.amount}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <div className="text-xs text-gray-400">Deadline: <span className="text-white font-bold">{scholarship.deadline}</span></div>
                                
                                {scholarship.applied ? (
                                    <div className="flex items-center gap-2 text-green-500 font-bold bg-green-500/10 px-4 py-2 rounded-xl">
                                        <CheckCircle size={18} /> APPLIED
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => handleApply(scholarship.id)}
                                        disabled={applying === scholarship.id}
                                        className="bg-white/5 hover:bg-green-500 hover:text-black text-white border border-white/10 px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2"
                                    >
                                        {applying === scholarship.id ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                        Auto-Apply
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {!scanning && results.length === 0 && (
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-96">
                        <div className="w-24 h-24 bg-black border-2 border-white/10 rounded-full flex items-center justify-center mb-6">
                            <FileText size={40} className="text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Grants Found Yet</h3>
                        <p className="text-gray-400 max-w-md">
                            Activate the AI Agent to scan 150+ global databases for scholarship opportunities matching your profile.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScholarshipFinder;
