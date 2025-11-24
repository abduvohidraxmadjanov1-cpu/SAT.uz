import React, { useState, useEffect } from 'react';
import { University } from '../types';
import { Search, MapPin, Award, CheckCircle, Loader2, Globe, TrendingUp, AlertCircle } from 'lucide-react';

const UNIVERSITIES: University[] = [
    { id: '1', name: "Massachusetts Institute of Technology (MIT)", location: "Cambridge, USA", ranking: 1, matchScore: 0, scholarship: "Full Ride", requirements: ["SAT: 1570+", "IELTS: 8.0"], logo: "bg-red-900" },
    { id: '2', name: "Stanford University", location: "Stanford, USA", ranking: 2, matchScore: 0, scholarship: "Need-based", requirements: ["SAT: 1550+", "GPA: 4.0"], logo: "bg-red-800" },
    { id: '3', name: "Harvard University", location: "Cambridge, USA", ranking: 3, matchScore: 0, scholarship: "Full Need", requirements: ["SAT: 1560+", "Leadership"], logo: "bg-red-700" },
    { id: '4', name: "University of Oxford", location: "Oxford, UK", ranking: 4, matchScore: 0, scholarship: "Rhodes", requirements: ["SAT: 1500+", "Interview"], logo: "bg-blue-900" },
    { id: '5', name: "National University of Singapore (NUS)", location: "Singapore", ranking: 8, matchScore: 0, scholarship: "ASEAN Grant", requirements: ["SAT: 1450+", "Math Lv2"], logo: "bg-orange-600" },
    { id: '6', name: "KAIST", location: "Daejeon, South Korea", ranking: 42, matchScore: 0, scholarship: "Full Tuition", requirements: ["SAT: 1400+", "Science"], logo: "bg-blue-600" },
];

const UniversityAI: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [results, setResults] = useState<University[]>([]);
    const [userScore, setUserScore] = useState(1450);

    const handleAnalysis = () => {
        setAnalyzing(true);
        setResults([]);
        
        // Simulate AI Analysis
        setTimeout(() => {
            const calculated = UNIVERSITIES.map(uni => {
                // Fake complex algorithm
                const baseScore = 100 - (uni.ranking / 2);
                const scoreDiff = Math.max(0, 1600 - userScore);
                const variance = Math.random() * 10;
                let match = baseScore - (scoreDiff / 20) + variance;
                match = Math.min(99.9, Math.max(10, match));
                return { ...uni, matchScore: match };
            }).sort((a, b) => b.matchScore - a.matchScore);

            setResults(calculated);
            setAnalyzing(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <span className="bg-cyber/10 text-cyber border border-cyber/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                        AI Admission Predictor v4.0
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        UNIVERSITET <span className="text-cyber">MATCHING</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Bizning algoritm 1000 dan ortiq universitetlarning qabul talablarini tahlil qilib, 
                        sizning SAT ballingiz va profil ma'lumotlaringiz asosida qabul qilinish ehtimolingizni hisoblaydi.
                    </p>
                </div>

                {/* Input Section */}
                <div className="max-w-3xl mx-auto bg-void-lighter border border-white/10 rounded-3xl p-8 mb-16 relative overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-10"></div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-end">
                        <div className="flex-1 w-full">
                            <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Joriy SAT Ballingiz</label>
                            <input 
                                type="number" 
                                value={userScore}
                                onChange={(e) => setUserScore(Number(e.target.value))}
                                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-xl focus:border-cyber focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="flex-1 w-full">
                            <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Yo'nalish (Major)</label>
                            <select className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-lg focus:border-cyber focus:outline-none transition-colors">
                                <option>Computer Science</option>
                                <option>Economics</option>
                                <option>Engineering</option>
                                <option>Medicine</option>
                            </select>
                        </div>
                        <button 
                            onClick={handleAnalysis}
                            disabled={analyzing}
                            className="w-full md:w-auto bg-cyber text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {analyzing ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                            {analyzing ? 'AI TAHLIL QILMOQDA...' : 'MATCHING'}
                        </button>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {analyzing ? (
                        // Skeleton Loading
                        Array.from({length: 6}).map((_, i) => (
                            <div key={i} className="bg-void-lighter rounded-3xl p-6 h-80 animate-pulse border border-white/5">
                                <div className="h-16 w-16 bg-white/10 rounded-full mb-4"></div>
                                <div className="h-6 w-3/4 bg-white/10 rounded mb-2"></div>
                                <div className="h-4 w-1/2 bg-white/10 rounded mb-6"></div>
                                <div className="h-2 w-full bg-white/10 rounded mb-2"></div>
                                <div className="h-2 w-full bg-white/10 rounded mb-2"></div>
                            </div>
                        ))
                    ) : (
                        results.map((uni, idx) => (
                            <div key={uni.id} className="group relative bg-void-lighter border border-white/10 rounded-3xl overflow-hidden hover:border-cyber/50 transition-all duration-300 hover:-translate-y-2">
                                <div className={`h-24 ${uni.logo} relative`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute -bottom-8 left-6">
                                        <div className="w-16 h-16 bg-black border border-white/10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                                            {uni.name.substring(0, 1)}
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10 flex items-center gap-1 text-xs font-bold text-white">
                                        <Globe size={12} className="text-cyber" /> #{uni.ranking} Global
                                    </div>
                                </div>
                                
                                <div className="pt-10 p-6">
                                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{uni.name}</h3>
                                    <p className="text-gray-400 text-sm mb-6 flex items-center gap-1">
                                        <MapPin size={14} /> {uni.location}
                                    </p>

                                    <div className="mb-6">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-bold uppercase text-gray-500">Qabul Ehtimoli</span>
                                            <span className={`text-2xl font-black ${uni.matchScore > 80 ? 'text-green-500' : uni.matchScore > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                                                {uni.matchScore.toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-1000 ${uni.matchScore > 80 ? 'bg-green-500' : uni.matchScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                                style={{width: `${uni.matchScore}%`}}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <Award size={16} className="text-cyber" />
                                            <span>Grant: <span className="text-white font-bold">{uni.scholarship}</span></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-cyber" />
                                            <span>Talab: <span className="text-white">{uni.requirements[0]}</span></span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-white/5 border border-white/10 text-white py-3 rounded-xl font-bold hover:bg-cyber hover:text-black transition-all">
                                        To'liq Tahlil
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UniversityAI;