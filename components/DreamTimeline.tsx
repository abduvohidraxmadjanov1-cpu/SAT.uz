
import React, { useState } from 'react';
import { Rocket, Briefcase, GraduationCap, DollarSign, Star, ArrowRight } from 'lucide-react';

const DreamTimeline: React.FC = () => {
    const [score, setScore] = useState(1400);

    const getTrajectory = (s: number) => {
        if (s >= 1550) return {
            uni: "MIT / Harvard",
            career: "AI Architect at Google",
            income: "$250k/year",
            impact: "Global Tech Leader"
        };
        if (s >= 1450) return {
            uni: "Top 50 US Univ",
            career: "Senior Software Engineer",
            income: "$150k/year",
            impact: "Tech Innovator"
        };
        return {
            uni: "State University",
            career: "Software Developer",
            income: "$90k/year",
            impact: "Local Expert"
        };
    };

    const trajectory = getTrajectory(score);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-white mb-4">
                        BUTTERFLY <span className="text-purple-500">EFFECT</span>
                    </h1>
                    <p className="text-gray-400">How 50 points today changes your life in 10 years.</p>
                </div>

                {/* Slider */}
                <div className="max-w-2xl mx-auto mb-20 bg-void-lighter border border-white/10 p-8 rounded-3xl">
                    <div className="flex justify-between items-end mb-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">Projected SAT Score</label>
                        <span className="text-4xl font-black text-white">{score}</span>
                    </div>
                    <input 
                        type="range" 
                        min="1200" 
                        max="1600" 
                        step="10" 
                        value={score} 
                        onChange={(e) => setScore(Number(e.target.value))}
                        className="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
                        <span>1200</span>
                        <span>1600</span>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyber to-blue-500"></div>

                    <div className="space-y-24 relative">
                        {/* 2024 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-1/2 md:text-right order-2 md:order-1 pl-20 md:pl-0 md:pr-12">
                                <h3 className="text-2xl font-bold text-white mb-2">2024: Exam Day</h3>
                                <p className="text-gray-400">You achieve a score of <span className="text-white font-bold">{score}</span>.</p>
                            </div>
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-black border-4 border-purple-500 rounded-full flex items-center justify-center z-10">
                                <Star className="text-purple-500" fill="currentColor" />
                            </div>
                            <div className="md:w-1/2 order-3 md:order-2"></div>
                        </div>

                        {/* 2025 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-1/2 order-2 md:order-1"></div>
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-black border-4 border-purple-400 rounded-full flex items-center justify-center z-10">
                                <GraduationCap className="text-purple-400" />
                            </div>
                            <div className="md:w-1/2 pl-20 md:pl-12 order-3 md:order-2">
                                <h3 className="text-2xl font-bold text-white mb-2">2025: Admission</h3>
                                <p className="text-gray-400">Accepted into <span className="text-cyber font-bold">{trajectory.uni}</span>.</p>
                            </div>
                        </div>

                        {/* 2029 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-1/2 md:text-right order-2 md:order-1 pl-20 md:pl-0 md:pr-12">
                                <h3 className="text-2xl font-bold text-white mb-2">2029: Career Start</h3>
                                <p className="text-gray-400">Role: <span className="text-blue-400 font-bold">{trajectory.career}</span>.</p>
                            </div>
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-black border-4 border-blue-500 rounded-full flex items-center justify-center z-10">
                                <Briefcase className="text-blue-500" />
                            </div>
                            <div className="md:w-1/2 order-3 md:order-2"></div>
                        </div>

                        {/* 2035 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-1/2 order-2 md:order-1"></div>
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-black border-4 border-green-500 rounded-full flex items-center justify-center z-10">
                                <DollarSign className="text-green-500" />
                            </div>
                            <div className="md:w-1/2 pl-20 md:pl-12 order-3 md:order-2">
                                <h3 className="text-2xl font-bold text-white mb-2">2035: Peak Earning</h3>
                                <p className="text-gray-400">Net Income: <span className="text-green-500 font-bold">{trajectory.income}</span>.</p>
                            </div>
                        </div>

                        {/* 2045 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-1/2 md:text-right order-2 md:order-1 pl-20 md:pl-0 md:pr-12">
                                <h3 className="text-2xl font-bold text-white mb-2">2045: Legacy</h3>
                                <p className="text-gray-400">Status: <span className="text-yellow-500 font-bold">{trajectory.impact}</span>.</p>
                            </div>
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-black border-4 border-yellow-500 rounded-full flex items-center justify-center z-10">
                                <Rocket className="text-yellow-500" />
                            </div>
                            <div className="md:w-1/2 order-3 md:order-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DreamTimeline;
