
import React, { useState } from 'react';
import { Page } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import GeminiChat from './components/GeminiChat';
import CourseDashboard from './components/CourseDashboard';
import Footer from './components/Footer';
import VoiceControl from './components/VoiceControl';
import SmartNotifications from './components/SmartNotifications';
import CommandPalette from './components/CommandPalette';
import PracticeArena from './components/PracticeArena';
import MCPHub from './components/MCPHub';
import SecurityMatrix from './components/SecurityMatrix';
import GeoMap from './components/GeoMap';
import AutoMarketing from './components/AutoMarketing';
import UniversityAI from './components/UniversityAI';
import NeuroGames from './components/NeuroGames';
import ComputerVisionLab from './components/ComputerVisionLab';
import SearchAI from './components/SearchAI';
import IntegrationDeck from './components/IntegrationDeck';
import FlashcardSystem from './components/FlashcardSystem';
import VideoAI from './components/VideoAI';
import ParentPortal from './components/ParentPortal';
import CareerROI from './components/CareerROI';
import Leaderboard from './components/Leaderboard';
import StudentDNA from './components/StudentDNA';
import StudyRoom from './components/StudyRoom';
import AgentMarketplace from './components/AgentMarketplace';
import IQTestArena from './components/IQTestArena';
import ExamSimulator from './components/ExamSimulator';
import QuantumBattle from './components/QuantumBattle';
import AlgorithmForge from './components/AlgorithmForge';
import CurriculumArchitect from './components/CurriculumArchitect';
import HoloCertificate from './components/HoloCertificate';
import SystemConfig from './components/SystemConfig';
import GeometryVoid from './components/GeometryVoid';
import DebateAI from './components/DebateAI';
import NeuralLibrary from './components/NeuralLibrary';
import EssayGrader from './components/EssayGrader';
import ARConcept from './components/ARConcept';
import LiveSeminar from './components/LiveSeminar';
import PaymentPortal from './components/PaymentPortal';
import InterviewSimulator from './components/InterviewSimulator';
import ZenZone from './components/ZenZone';
import ScholarshipFinder from './components/ScholarshipFinder';
import DreamTimeline from './components/DreamTimeline';
import NeuralAvatar from './components/NeuralAvatar';
import DataScienceLab from './components/DataScienceLab';
import VirtualCampus from './components/VirtualCampus';
import GamificationStore from './components/GamificationStore';
import QuantumReader from './components/QuantumReader';
import ErrorNeuralNet from './components/ErrorNeuralNet';
import HoloBoard from './components/HoloBoard';
import MindMapGenerator from './components/MindMapGenerator';
import SniperMode from './components/SniperMode';
import CosmicLearn from './components/CosmicLearn';
import VoiceCoach from './components/VoiceCoach';
import LogicGraph from './components/LogicGraph';
import SmartScheduler from './components/SmartScheduler';
import ConceptUniverse from './components/ConceptUniverse';
import PerformancePredictor from './components/PerformancePredictor';
import ScientificCalculator from './components/ScientificCalculator';
import CheatSheetGen from './components/CheatSheetGen';
import MistakeAutopsy from './components/MistakeAutopsy';
import AboutPage from './components/AboutPage';
import BlogAI from './components/BlogAI';
import SATHub from './components/SATHub';
import IoTFocusMode from './components/IoTFocusMode';
import CustomCursor from './components/CustomCursor'; 
import { PRICING_TIERS } from './constants';
import { Check, Brain } from 'lucide-react';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.HOME);

  const renderPage = () => {
    switch (page) {
      case Page.HOME:
        return (
          <div className="animate-in fade-in duration-700">
            <Hero setPage={setPage} />
            <Features />
            
            {/* Simplified AI Chat Section */}
            <div className="bg-void-lighter border-y border-white/5 py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-white mb-4 flex items-center justify-center gap-3">
                            <Brain className="text-cyber" /> AI PERSONAL TUTOR
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Savol bering va sun'iy intellektdan oniy, aniq javob oling.
                        </p>
                    </div>
                    <GeminiChat />
                </div>
            </div>
          </div>
        );
      case Page.COURSE: return <CourseDashboard setPage={setPage} />;
      case Page.PRACTICE: return <PracticeArena />;
      case Page.HUB: return <SATHub setPage={setPage} />;
      case Page.MCP_HUB: return <MCPHub />;
      case Page.SECURITY: return <SecurityMatrix />;
      case Page.GEO_MAP: return <GeoMap />;
      case Page.MARKETING: return <AutoMarketing />;
      case Page.UNIVERSITY: return <UniversityAI />;
      case Page.GAMES: return <NeuroGames />;
      case Page.CV_LAB: return <ComputerVisionLab />;
      case Page.SEARCH: return <SearchAI setPage={setPage} />;
      case Page.INTEGRATION: return <IntegrationDeck />;
      case Page.FLASHCARDS: return <FlashcardSystem />;
      case Page.VIDEO_LESSON: return <VideoAI generating={true} />;
      case Page.PARENT_PORTAL: return <ParentPortal />;
      case Page.ROI_CALCULATOR: return <CareerROI />;
      case Page.LEADERBOARD: return <Leaderboard />;
      case Page.STUDENT_DNA: return <StudentDNA />;
      case Page.STUDY_ROOM: return <StudyRoom />;
      case Page.AGENT_MARKET: return <AgentMarketplace />;
      case Page.IQ_TEST: return <IQTestArena />;
      case Page.EXAM_SIM: return <ExamSimulator />;
      case Page.QUANTUM_BATTLE: return <QuantumBattle />;
      case Page.ALGO_FORGE: return <AlgorithmForge />;
      case Page.CURRICULUM: return <CurriculumArchitect />;
      case Page.CERTIFICATE: return <HoloCertificate />;
      case Page.CONFIG: return <SystemConfig />;
      case Page.GEOMETRY_VOID: return <GeometryVoid />;
      case Page.DEBATE_AI: return <DebateAI />;
      case Page.NEURAL_LIBRARY: return <NeuralLibrary />;
      case Page.ESSAY_GRADER: return <EssayGrader />;
      case Page.AR_CONCEPT: return <ARConcept />;
      case Page.LIVE_SEMINAR: return <LiveSeminar />;
      case Page.PAYMENT: return <PaymentPortal />;
      case Page.INTERVIEW: return <InterviewSimulator />;
      case Page.ZEN_ZONE: return <ZenZone />;
      case Page.SCHOLARSHIP: return <ScholarshipFinder />;
      case Page.DREAM_TIMELINE: return <DreamTimeline />;
      case Page.AVATAR: return <NeuralAvatar />;
      case Page.DATA_LAB: return <DataScienceLab />;
      case Page.VIRTUAL_CAMPUS: return <VirtualCampus setPage={setPage} />;
      case Page.STORE: return <GamificationStore />;
      case Page.QUANTUM_READER: return <QuantumReader />;
      case Page.ERROR_NET: return <ErrorNeuralNet />;
      case Page.HOLO_BOARD: return <HoloBoard />;
      case Page.MIND_MAP: return <MindMapGenerator />;
      case Page.SNIPER: return <SniperMode />;
      case Page.COSMIC: return <CosmicLearn />;
      case Page.VOICE_COACH: return <VoiceCoach />;
      case Page.LOGIC_GRAPH: return <LogicGraph />;
      case Page.SCHEDULER: return <SmartScheduler />;
      case Page.CONCEPT_UNIVERSE: return <ConceptUniverse />;
      case Page.PREDICTOR: return <PerformancePredictor />;
      case Page.CALCULATOR: return <ScientificCalculator />;
      case Page.CHEAT_SHEET: return <CheatSheetGen />;
      case Page.AUTOPSY: return <MistakeAutopsy />;
      case Page.ABOUT: return <AboutPage />;
      case Page.BLOG: return <BlogAI />;
      case Page.PRICING:
        return (
            <div className="py-32 bg-black text-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-in slide-in-from-bottom duration-700">
                        <h2 className="text-5xl font-black text-white mb-6">KURSGA <span className="text-cyber">YOZILISH</span></h2>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                            Kelajagingizga sarmoya kiriting. Eng hamyonbop va samarali rejalarni tanlang.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PRICING_TIERS.map((tier, index) => (
                            <div key={index} className={`relative p-8 rounded-[32px] border transition-all duration-500 hover:transform hover:-translate-y-2 ${tier.recommended ? 'border-cyber bg-cyber/5 shadow-[0_0_60px_rgba(0,240,255,0.15)]' : 'border-white/10 bg-void-lighter hover:border-white/30'}`}>
                                {tier.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyber text-black text-xs font-black px-6 py-2 rounded-full shadow-lg tracking-widest">
                                        ENG OMMABOP
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-4 text-white">{tier.name}</h3>
                                <div className="flex items-baseline mb-8">
                                    <span className="text-6xl font-black text-white tracking-tighter">{tier.price}</span>
                                    <span className="text-gray-500 ml-2 text-lg">/ oy</span>
                                </div>
                                <ul className="space-y-5 mb-10">
                                    {tier.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-4 text-sm text-gray-300">
                                            <div className={`p-1 rounded-full ${tier.recommended ? 'bg-cyber/20 text-cyber' : 'bg-white/10 text-gray-400'}`}>
                                                <Check size={14} />
                                            </div>
                                            <span className="leading-snug">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    onClick={() => setPage(Page.PAYMENT)} 
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2 group ${tier.recommended ? 'bg-cyber text-black hover:bg-white hover:scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                >
                                    Rejani Tanlash
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
      case Page.FOCUS_MODE:
        return (
            <div className="min-h-screen bg-black pt-24 px-4 pb-12 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-20"></div>
                <div className="max-w-6xl w-full h-[80vh] glass-panel rounded-[40px] p-2 border border-cyber/20 shadow-[0_0_100px_rgba(0,240,255,0.1)] relative z-10">
                    <IoTFocusMode />
                </div>
            </div>
        );
      default:
        return <Hero setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyber selection:text-black relative overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Global Ambient */}
      <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none z-0"></div>
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber via-purple-500 to-blue-600 z-[100] opacity-80"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar currentPage={page} setPage={setPage} />
        <main className="flex-grow">
            {renderPage()}
        </main>
        <Footer setPage={setPage} />
        <VoiceControl setPage={setPage} />
        <SmartNotifications />
        <CommandPalette setPage={setPage} />
      </div>
    </div>
  );
};

export default App;
