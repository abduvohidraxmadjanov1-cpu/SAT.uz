
import React from 'react';
import { MapPin, User, Video, Star, Building, ArrowRight, Globe } from 'lucide-react';
import { Page } from '../types';

const CAMPUSES = [
    { id: 1, name: "Massachusetts Institute of Technology", short: "MIT", location: "Cambridge, MA", acceptance: "3.9%", image: "bg-red-900" },
    { id: 2, name: "Stanford University", short: "Stanford", location: "Stanford, CA", acceptance: "3.7%", image: "bg-red-800" },
    { id: 3, name: "Harvard University", short: "Harvard", location: "Cambridge, MA", acceptance: "3.2%", image: "bg-red-700" },
    { id: 4, name: "University of Oxford", short: "Oxford", location: "Oxford, UK", acceptance: "13.5%", image: "bg-blue-900" },
    { id: 5, name: "ETH Zurich", short: "ETH", location: "Zurich, CH", acceptance: "27%", image: "bg-slate-700" },
    { id: 6, name: "National Univ. of Singapore", short: "NUS", location: "Singapore", acceptance: "5.0%", image: "bg-orange-600" },
];

interface VirtualCampusProps {
    setPage?: (page: Page) => void;
}

const VirtualCampus: React.FC<VirtualCampusProps> = ({ setPage }) => {
    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-white mb-4 flex items-center justify-center gap-3">
                        <Building className="text-cyber" size={40} />
                        VIRTUAL <span className="text-white">CAMPUS</span>
                    </h1>
                    <p className="text-gray-400">Immersive University Explorer & Alumni Network</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CAMPUSES.map((uni) => (
                        <div key={uni.id} className="group relative bg-void-lighter border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500">
                            {/* Header Image Area */}
                            <div className={`h-48 ${uni.image} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500"></div>
                                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-4 py-1 rounded-lg border border-white/10">
                                    <span className="text-white font-bold text-xl">{uni.short}</span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <div className="bg-white/10 backdrop-blur p-2 rounded-full hover:bg-cyber hover:text-black transition-colors cursor-pointer">
                                        <Video size={20} className="text-white group-hover:text-black" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{uni.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {uni.location}</span>
                                    <span className="flex items-center gap-1 text-cyber"><Star size={14} /> {uni.acceptance}</span>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm">
                                        <Video size={16} /> VR Campus Tour
                                    </button>
                                    <button className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-white font-bold hover:bg-cyber hover:text-black transition-all flex items-center justify-center gap-2 text-sm group-hover:border-cyber/50">
                                        <User size={16} /> Chat with Alumni
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Global Map Teaser */}
                <div className="mt-16 bg-void-lighter border border-white/10 rounded-3xl p-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                    <div className="bg-gradient-to-r from-blue-900/20 to-black p-8 md:p-12 rounded-[22px] flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-2">Global Opportunity Map</h3>
                            <p className="text-gray-400 max-w-lg">
                                Explore 1000+ universities worldwide. Filter by grant availability, major strength, and climate.
                            </p>
                        </div>
                        <button 
                            onClick={() => setPage && setPage(Page.GEO_MAP)}
                            className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            <Globe size={20} /> Open World Map <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualCampus;
