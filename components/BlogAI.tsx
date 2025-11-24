
import React, { useState, useEffect, useRef } from 'react';
import { BlogPost } from '../types';
import { Clock, Eye, Share2, Rss, ArrowRight, Zap, RefreshCw, Search, Cpu, X, Bookmark, ChevronRight, Volume2, StopCircle, Minimize, Type, Activity, Sparkles, ThumbsUp, BarChart2, Globe } from 'lucide-react';

// Extended type for internal use
interface ExtendedBlogPost extends BlogPost {
    body: React.ReactNode;
}

const INITIAL_POSTS: ExtendedBlogPost[] = [
    { 
        id: 1, 
        title: "SAT 2025: Raqamli Evolyutsiya va Yangi Strategiyalar", 
        excerpt: "College Board tomonidan e'lon qilingan yangi adaptiv formatdagi 5 ta fundamental o'zgarish. Neyron tarmoqlar yordamida imtihon jarayonini qanday 'hack' qilish mumkin?", 
        category: 'News', 
        readTime: "3 daqiqa", 
        views: 12500, 
        image: "bg-blue-900",
        body: (
            <>
                <p className="lead text-xl text-white mb-8 font-light border-l-4 border-cyber pl-6 italic">
                    "Raqamli SAT shunchaki format o'zgarishi emas, bu standartlashtirilgan testlarning kvant sakrashidir. Tayyorgarlik endi boshqacha bo'lishi shart."
                </p>
                <p className="mb-6">
                    2025-yilgi SAT imtihonlari to'liq raqamli formatga o'tdi. Bu o'zgarish o'quvchilardan nafaqat bilimlarni, 
                    balki <strong>raqamli chidamlilik</strong> va <strong>adaptiv strategiya</strong>larni talab qiladi. 
                    Qog'oz va qalam davri tugadi; endi algoritm bilan o'ynash vaqti keldi.
                </p>
                <h3 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
                    <span className="text-cyber">01.</span> Adaptiv Modullar (MST)
                </h3>
                <p className="mb-4">
                    Imtihon endi ikki bosqichli (Multistage Adaptive Testing). Birinchi moduldagi natijangiz ikkinchi modulning qiyinlik darajasini belgilaydi. 
                    Agar birinchi modulda yuqori natija ko'rsatsangiz, ikkinchi modul qiyinroq bo'ladi, lekin ballar ham yuqori (High Ceiling) bo'ladi.
                </p>
                <div className="my-8 p-6 bg-void-lighter border border-white/10 rounded-2xl relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Sparkles className="text-yellow-500" size={18} /> PRO STRATEGIYA:</h4>
                    <p className="text-sm text-gray-400 m-0">
                        Oson savollarda xato qilish qimmatga tushadi. Tizim sizni "pastroq qobiliyatli" deb belgilab, 
                        ikkinchi modulda osonroq (lekin past balli) savollar berishi mumkin. Diqqatni yo'qotmang.
                    </p>
                </div>
                <h3 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
                    <span className="text-cyber">02.</span> Vaqtni Boshqarish
                </h3>
                <p className="mb-4">
                    Desmos kalkulyatori endi har bir matematik savol uchun mavjud. Bu esa "Mental Math" ga bo'lgan ehtiyojni kamaytirib, 
                    "Tool Mastery" (Kalkulyatordan foydalanish mahorati) ni birinchi o'ringa olib chiqadi.
                </p>
            </>
        )
    },
    { 
        id: 2, 
        title: "Kognitiv Tezlik: Vocabulary 10x Tezroq Yodlash", 
        excerpt: "Mnemonika va AI algoritmlarini birlashtirgan holda 3000 ta akademik so'zni 30 kunda yodlashning ilmiy isbotlangan usuli.", 
        category: 'Tech', 
        readTime: "5 daqiqa", 
        views: 8900, 
        image: "bg-purple-900",
        body: (
            <>
                <p className="mb-6">
                    Inson miyasi ma'lumotni assotsiatsiyalar orqali saqlaydi. An'anaviy "yodlash" (rote learning) samarasiz. 
                    Bizning AI tahlilimiz shuni ko'rsatadiki, so'zlarni vizual obrazlar va kontekst bilan bog'lash eslab qolishni 400% ga oshiradi.
                </p>
                <h3 className="text-2xl font-bold text-white mt-8 mb-4">Neyro-lingvistik Dasturlash (NLP)</h3>
                <p className="mb-4">
                    Har bir so'z uchun "hissiy langar" yarating. Masalan, "Benevolent" (Mehribon) so'zini eslash uchun o'zingizga yoqadigan 
                    biror qahramonni tasavvur qiling.
                </p>
                <div className="my-8 p-6 bg-cyber/5 border border-cyber/20 rounded-2xl">
                    <h4 className="text-cyber font-bold mb-2">AI Flashcard Tizimi</h4>
                    <p className="text-sm text-gray-400">
                        Bizning platformadagi Flashcardlar Ebbinghaus unutish egri chizig'i asosida ishlaydi.
                    </p>
                </div>
            </>
        )
    },
    { 
        id: 3, 
        title: "MIT va Harvard: To'liq Grant Yutish Sirlari", 
        excerpt: "Top universitetlarning qabul komissiyasi sun'iy intellekti (AI Screener) insholarni qanday tekshiradi? Ichki ma'lumotlar tahlili.", 
        category: 'University', 
        readTime: "7 daqiqa", 
        views: 24000, 
        image: "bg-green-900",
        body: (
            <>
                <p className="mb-6">
                    Ivy League universitetlari har yili 50,000 dan ortiq ariza qabul qiladi. Insonlar hammasini o'qib chiqishi imkonsiz. 
                    Dastlabki saralashni AI bajaradi.
                </p>
                <h3 className="text-2xl font-bold text-white mt-8 mb-4">AI Nimani Qidiradi?</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-6">
                    <li><strong>Originallik indeksi:</strong> Klishe jumlalardan qochish.</li>
                    <li><strong>Hissiy intellekt (EQ):</strong> Matndagi empatiya va liderlik belgilari.</li>
                    <li><strong>Struktura murakkabligi:</strong> Gaplarning tuzilishi va lug'at boyligi.</li>
                </ul>
            </>
        )
    },
    { 
        id: 4, 
        title: "Matematika: 'Hard' Masalalarni 15 Soniyada Yechish", 
        excerpt: "Geometriya va Algebra bo'yicha maktabda o'rgatilmaydigan 'shortcut' formulalar. Vaqtni tejashning kvant usullari.", 
        category: 'Strategy', 
        readTime: "4 daqiqa", 
        views: 15600, 
        image: "bg-red-900",
        body: (
            <>
                <p className="mb-6">
                    SAT Matematika bo'limi bilimni emas, balki mantiqni va tezlikni tekshiradi. Ko'p masalalarni yechish uchun 
                    standart yo'ldan yurish shart emas.
                </p>
                <div className="bg-black border border-white/10 p-4 rounded-xl mb-4 font-mono text-sm">
                    <span className="text-gray-500">// Standart usul (2 daqiqa)</span><br/>
                    Solve system: 3x + 2y = 12, 5x - 2y = 4...<br/><br/>
                    <span className="text-cyber">// Shortcut (10 soniya)</span><br/>
                    Add equations: 8x = 16 -> x = 2. Done.
                </div>
            </>
        )
    },
    { 
        id: 5, 
        title: "Fokus va Diqqat: IoT Natijalari", 
        excerpt: "10,000 o'quvchi ustida o'tkazilgan tajriba. Smartfonni 'Do Not Disturb' ga qo'yishning o'zi yetarli emas.", 
        category: 'Tech', 
        readTime: "6 daqiqa", 
        views: 5400, 
        image: "bg-indigo-900",
        body: (
            <>
                <p className="mb-6">
                    Bizning IoT sensorlarimiz shuni ko'rsatdiki, xona harorati 22°C va yorug'lik 4000K bo'lganda, 
                    o'quvchilarning diqqatni jamlash qobiliyati 35% ga oshadi.
                </p>
                <h3 className="text-2xl font-bold text-white mt-8 mb-4">Raqamli Gigiena</h3>
                <p className="mb-4">
                    Telefoni ko'z o'ngida turgan o'quvchilar, hatto u o'chiq bo'lsa ham, 20% kognitiv resursini 
                    "telefonni tekshirmaslik" uchun sarflaydi.
                </p>
            </>
        )
    },
    { 
        id: 6, 
        title: "Insho Yozishda AI: Do'stmi yoki Dushman?", 
        excerpt: "ChatGPT va Gemini yordamida inshoni tahrirlash, lekin plagiatsiz yozish san'ati. Prompt Engineering asoslari.", 
        category: 'Strategy', 
        readTime: "5 daqiqa", 
        views: 9200, 
        image: "bg-pink-900",
        body: (
            <>
                <p className="mb-6">
                    AI sizning inshongizni yozib bermasligi kerak, lekin u eng zo'r muharrir bo'lishi mumkin. 
                    O'z fikringizni yozing va AI dan "stilistik tahrir" so'rang.
                </p>
                <h3 className="text-2xl font-bold text-white mt-8 mb-4">To'g'ri Prompt</h3>
                <div className="bg-black/50 p-4 rounded-xl border border-cyber/30 text-cyber font-mono text-sm">
                    "Act as a Harvard Admissions Officer. Critique this essay for emotional resonance and clarity. Do not rewrite it, just provide feedback."
                </div>
            </>
        )
    }
];

const CATEGORIES = ['All', 'News', 'Tech', 'University', 'Strategy'];

const BlogAI: React.FC = () => {
    const [posts, setPosts] = useState<ExtendedBlogPost[]>(INITIAL_POSTS);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedPost, setSelectedPost] = useState<ExtendedBlogPost | null>(null);
    
    // Reader State
    const [aiGenerating, setAiGenerating] = useState(false);
    const [aiSummary, setAiSummary] = useState('');
    const [speaking, setSpeaking] = useState(false);
    const [readProgress, setReadProgress] = useState(0);
    const [fontSize, setFontSize] = useState(18);
    
    const modalContentRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Ticker State
    const [tickerOffset, setTickerOffset] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTickerOffset(prev => (prev - 1) % -2000);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    // Simulate fetching more posts
    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            const newPosts: ExtendedBlogPost[] = [
                { 
                    id: Date.now() + 1, 
                    title: "AI Repetitor vs Inson: Kim G'olib?", 
                    excerpt: "40% tezroq o'rganish ko'rsatkichi. Sun'iy intellekt ta'lim tizimini qanday o'zgartirmoqda?", 
                    category: 'Tech', 
                    readTime: "4 daqiqa", 
                    views: 3200, 
                    image: "bg-cyan-900",
                    body: <p>Sun'iy intellekt shaxsiy ehtiyojlarga moslashishda insondan ustun...</p>
                },
                { 
                    id: Date.now() + 2, 
                    title: "Yashirin Grammatika Qoidalari", 
                    excerpt: "SAT Writing bo'limida 80% uchraydigan, lekin darsliklarda kam yozilgan 5 ta oltin qoida.", 
                    category: 'Strategy', 
                    readTime: "6 daqiqa", 
                    views: 11000, 
                    image: "bg-orange-900",
                    body: <p>Verbal bo'limida eng ko'p uchraydigan xato bu vergul va nuqta-vergul farqidir...</p>
                }
            ];
            setPosts(prev => [...prev, ...newPosts]);
            setLoading(false);
        }, 1500);
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handlePostClick = (post: ExtendedBlogPost) => {
        setSelectedPost(post);
        setAiGenerating(true);
        setAiSummary('');
        setSpeaking(false);
        setReadProgress(0);
        window.speechSynthesis.cancel();
        
        const summaryText = `NEURAL CORE TAHLILI: Ushbu maqola "${post.title}" mavzusida bo'lib, o'quvchilarga ${post.category} bo'yicha strategik ustunlik beradi. Asosiy g'oya: an'anaviy usullardan voz kechib, ma'lumotlarga asoslangan (Data-Driven) yondashuvni qo'llash. Tavsiya etiladi: Barcha darajadagi talabalar uchun.`;
        
        let i = 0;
        setTimeout(() => {
            setAiGenerating(false);
            const interval = setInterval(() => {
                setAiSummary(prev => prev + summaryText.charAt(i));
                i++;
                if (i >= summaryText.length) clearInterval(interval);
            }, 15);
        }, 1000);
    };

    const toggleSpeech = () => {
        if (speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
        } else {
            if (!selectedPost) return;
            const text = document.getElementById('article-content')?.innerText || selectedPost.excerpt;
            const utterance = new SpeechSynthesisUtterance(text);
            
            const voices = window.speechSynthesis.getVoices();
            // Try to find a good English voice (since content is mixed, or Uzbek if available)
            const preferredVoice = voices.find(v => v.lang.includes('en-GB') || v.name.includes('Google UK')) || voices[0];
            if (preferredVoice) utterance.voice = preferredVoice;
            
            utterance.rate = 1.05;
            utterance.pitch = 1.0;
            utterance.onend = () => setSpeaking(false);
            
            window.speechSynthesis.speak(utterance);
            setSpeaking(true);
        }
    };

    // Audio Visualizer Animation
    useEffect(() => {
        if (!speaking || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let t = 0;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00f0ff';
            
            const bars = 15;
            const width = canvas.width / bars;
            t += 0.2;
            
            for(let i=0; i<bars; i++) {
                // Simulate frequency data with sine waves
                const h = Math.abs(Math.sin(t + i * 0.5)) * (canvas.height * 0.8) + 2;
                
                // Gradient
                const grad = ctx.createLinearGradient(0, canvas.height - h, 0, canvas.height);
                grad.addColorStop(0, '#00f0ff');
                grad.addColorStop(1, '#004a4d');
                ctx.fillStyle = grad;
                
                ctx.fillRect(i * width + 1, (canvas.height - h)/2, width - 2, h);
            }
            animId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animId);
    }, [speaking]);

    const handleScroll = () => {
        if (modalContentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;
            const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setReadProgress(progress);
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                
                {/* Live Neural Ticker */}
                <div className="w-full bg-white/5 border-y border-white/10 h-8 mb-8 overflow-hidden relative flex items-center rounded-lg backdrop-blur-md">
                    <div className="absolute left-0 bg-cyber text-black text-[10px] font-black px-3 h-full flex items-center z-10 tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                        JONLI NEURAL TASMA
                    </div>
                    <div className="whitespace-nowrap text-xs text-gray-400 font-mono flex gap-12 items-center" style={{ transform: `translateX(${tickerOffset}px)` }}>
                        <span className="flex items-center gap-2"><Globe size={10} className="text-blue-500"/> COLLEGE BOARD YANGILANISHI: YANGI MATH MODULLARI ANIQLANDI</span>
                        <span className="flex items-center gap-2"><Activity size={10} className="text-green-500"/> MIT QABUL KOMISSIYASI: INTERVYU SAVOLLARI TAHLIL QILINDI</span>
                        <span className="flex items-center gap-2"><BarChart2 size={10} className="text-purple-500"/> GLOBAL SAT O'RTACHA BALL: 1050 (+2%)</span>
                        <span className="flex items-center gap-2"><Cpu size={10} className="text-cyber"/> TIZIM HOLATI: 4000 AGENT ONLINE</span>
                        <span className="flex items-center gap-2"><Zap size={10} className="text-yellow-500"/> YANGI "HARD" READING STRATEGIYASI GENERATSIYA QILINDI</span>
                    </div>
                </div>

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber"></span>
                            </span>
                            <span className="text-cyber text-xs font-bold uppercase tracking-[0.2em]">Intellektual Oqim v4.0</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-2 leading-none tracking-tighter">
                            SAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber via-white to-purple-500">NEURAL BLOG</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl text-lg font-light leading-relaxed">
                            AI tomonidan yaratilgan, tahrirlangan va optimallashtirilgan kontent. 
                            Inson omilisiz sof ma'lumot.
                        </p>
                    </div>

                    <div className="w-full lg:w-auto flex flex-col items-end gap-4">
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 w-full lg:w-96 transition-all focus-within:border-cyber/50 focus-within:bg-black/50 focus-within:shadow-[0_0_20px_rgba(0,240,255,0.1)] group">
                            <Search className="text-gray-500 ml-3 group-focus-within:text-cyber" size={20} />
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Intellektual Bazadan Qidirish..." 
                                className="bg-transparent border-none text-white px-4 py-2 focus:outline-none w-full placeholder-gray-600 text-sm font-medium"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 custom-scrollbar scrollbar-hide">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border whitespace-nowrap flex items-center gap-2 ${
                                        activeCategory === cat 
                                        ? 'bg-cyber text-black border-cyber shadow-[0_0_20px_rgba(0,240,255,0.4)]' 
                                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/30'
                                    }`}
                                >
                                    {activeCategory === cat && <Zap size={12} fill="currentColor" />}
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured Post (Dynamic) */}
                {activeCategory === 'All' && !searchQuery && (
                    <div 
                        onClick={() => handlePostClick(posts[0])}
                        className="mb-16 relative group rounded-[40px] overflow-hidden border border-white/10 cursor-pointer shadow-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,240,255,0.15)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                        
                        {/* Animated Background */}
                        <div className="h-[600px] bg-void-lighter relative group-hover:scale-105 transition-transform duration-[2s]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3)_0%,transparent_60%)]"></div>
                            <div className="absolute inset-0 grid-bg opacity-30"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber/10 rounded-full blur-[150px] group-hover:bg-cyber/20 transition-colors duration-1000"></div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 max-w-5xl w-full">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="bg-cyber text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2 shadow-lg">
                                    <Zap size={12} fill="currentColor" /> Viral Strategy
                                </span>
                                <span className="bg-black/50 backdrop-blur border border-white/10 text-gray-300 text-xs font-mono px-3 py-1.5 rounded-full flex items-center gap-2">
                                    <Cpu size={12} /> AI ANALYSIS READY
                                </span>
                            </div>
                            
                            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[0.9] group-hover:text-cyber transition-colors duration-300 tracking-tighter">
                                Sun'iy Intellekt va <br/> Kelajak Ta'limi: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber to-purple-500">Manifest</span>
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                                <div className="col-span-2">
                                    <p className="text-gray-300 text-lg leading-relaxed line-clamp-2 font-light">
                                        Biz qanday qilib 3000 qavatli neyron tarmoq yordamida an'anaviy ta'limni o'zgartirmoqdamiz? 
                                        To'liq texnik tahlil va O'zbekiston yoshlari uchun kelajak bashoratlari.
                                    </p>
                                </div>
                                <div className="flex flex-col justify-between items-start md:items-end gap-4">
                                    <div className="flex items-center gap-6 text-sm text-gray-400 font-medium font-mono">
                                        <span className="flex items-center gap-2"><Clock size={16} className="text-cyber" /> 10 min o'qish</span>
                                        <span className="flex items-center gap-2"><Eye size={16} className="text-cyber" /> 45.2k</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white font-bold group/btn">
                                        MAQOLANI O'QISH 
                                        <div className="bg-white text-black rounded-full p-1 group-hover/btn:translate-x-2 transition-transform">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <div 
                            key={post.id} 
                            onClick={() => handlePostClick(post)}
                            className="group bg-void-lighter border border-white/10 rounded-[32px] overflow-hidden hover:border-cyber/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,240,255,0.1)] cursor-pointer flex flex-col relative"
                        >
                            <div className={`h-64 ${post.image} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-void-lighter to-transparent"></div>
                                
                                <div className="absolute top-6 left-6">
                                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase px-4 py-2 rounded-full border border-white/10 tracking-wider flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${post.category === 'Tech' ? 'bg-blue-500' : post.category === 'Strategy' ? 'bg-purple-500' : 'bg-green-500'}`}></div>
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-8 flex-1 flex flex-col relative -mt-12">
                                <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-cyber transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed flex-1">
                                    {post.excerpt}
                                </p>
                                
                                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <Cpu size={16} className="text-cyber" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold">Muallif</span>
                                            <span className="text-xs text-white font-bold">AI Agent #{post.id}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                                        <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
                                        <span className="flex items-center gap-1.5"><Eye size={14} /> {post.views > 1000 ? (post.views/1000).toFixed(1) + 'k' : post.views}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More / Empty State */}
                <div className="mt-20 text-center">
                    {filteredPosts.length > 0 ? (
                        <button 
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-white/5 font-mono rounded-full hover:bg-white/10 hover:text-cyber focus:outline-none ring-offset-2 focus:ring-2 ring-cyber"
                        >
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                            <span className="relative flex items-center gap-3">
                                {loading ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} className="group-hover:fill-cyber transition-all" />}
                                {loading ? 'GENERATSIYA...' : "KO'PROQ YUKLASH"}
                            </span>
                        </button>
                    ) : (
                        <div className="py-20 bg-void-lighter rounded-3xl border border-white/10 border-dashed">
                            <Search size={64} className="text-gray-700 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-2">Ma'lumot Topilmadi</h3>
                            <p className="text-gray-500">"Math", "Grant", yoki "Strategiya" so'zlarini qidirib ko'ring.</p>
                        </div>
                    )}
                </div>

                {/* Subscription Box */}
                <div className="mt-32 relative rounded-[40px] overflow-hidden border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-black to-purple-900/20 opacity-80"></div>
                    <div className="absolute inset-0 grid-bg opacity-20"></div>
                    
                    <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-cyber/10 rounded-xl text-cyber">
                                    <Rss size={32} />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white">NEURAL <span className="text-cyber">OBUNA</span></h2>
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                Shaxsiy o'quv rejalari, universitet yangiliklari va AI tomonidan yaratilgan "Maxfiy Strategiyalar" to'g'ridan-to'g'ri pochtangizda. 
                                Spam yo'q. Faqat sof intellekt.
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
                                <span className="flex items-center gap-2"><Cpu size={14} className="text-green-500" /> 256-bit Himoya</span>
                                <span className="flex items-center gap-2"><Zap size={14} className="text-yellow-500" /> Tezkor Yetkazish</span>
                            </div>
                        </div>
                        
                        <div className="w-full max-w-md bg-black/50 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Email manzilingiz..." 
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-cyber outline-none text-lg placeholder-gray-500"
                                />
                                <button className="bg-cyber text-black px-8 py-4 rounded-xl font-black text-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                                    ULANISH
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Post Reading Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-300">
                    <div className="bg-void-lighter w-full max-w-5xl max-h-[95vh] rounded-[32px] border border-white/10 overflow-hidden shadow-2xl flex flex-col relative animate-in zoom-in-95 duration-300">
                        
                        {/* Reading Progress Bar */}
                        <div className="h-1 w-full bg-gray-800 absolute top-0 left-0 z-50">
                            <div className="h-full bg-cyber transition-all duration-100" style={{width: `${readProgress}%`}}></div>
                        </div>

                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/80 backdrop-blur-md z-40">
                            <div className="flex items-center gap-4">
                                <span className="bg-cyber/10 text-cyber text-xs font-bold px-3 py-1.5 rounded-lg border border-cyber/20 uppercase tracking-wider">
                                    {selectedPost.category}
                                </span>
                                <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1">
                                    <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="p-1 hover:text-cyber text-gray-400"><Minimize size={16} /></button>
                                    <span className="text-xs font-mono w-8 text-center text-white">{fontSize}px</span>
                                    <button onClick={() => setFontSize(Math.min(24, fontSize + 2))} className="p-1 hover:text-cyber text-gray-400"><Type size={16} /></button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex items-center gap-2 bg-black/50 rounded-full px-3 py-1.5 border border-white/10">
                                    {speaking && <canvas ref={canvasRef} width="60" height="20" className="opacity-80" />}
                                    <button 
                                        onClick={toggleSpeech}
                                        className={`text-xs font-bold uppercase flex items-center gap-2 ${speaking ? 'text-cyber animate-pulse' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        {speaking ? <StopCircle size={16} /> : <Volume2 size={16} />}
                                        {speaking ? "To'xtatish" : "Tinglash"}
                                    </button>
                                </div>
                                <button 
                                    onClick={() => { setSelectedPost(null); window.speechSynthesis.cancel(); }}
                                    className="p-3 hover:bg-red-500/20 rounded-full text-gray-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-500/50"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div 
                            ref={modalContentRef}
                            onScroll={handleScroll}
                            className="overflow-y-auto p-8 md:p-16 custom-scrollbar relative scroll-smooth bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20"
                        >
                            <div className="max-w-3xl mx-auto" id="article-content">
                                <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight font-serif">
                                    {selectedPost.title}
                                </h1>
                                
                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-12 pb-8 border-b border-white/10 font-mono">
                                    <span className="flex items-center gap-2"><Clock size={16} className="text-cyber" /> {selectedPost.readTime} o'qish</span>
                                    <span className="flex items-center gap-2"><Eye size={16} className="text-cyber" /> {selectedPost.views.toLocaleString()} ko'rish</span>
                                    <span className="flex items-center gap-2"><Cpu size={16} className="text-cyber" /> Agent: Core-v9</span>
                                </div>

                                {/* AI Summary Box */}
                                <div className="bg-gradient-to-br from-cyber/5 to-purple-900/10 border border-cyber/20 rounded-3xl p-8 mb-12 relative overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.05)]">
                                    <div className="absolute top-0 right-0 p-6 opacity-10">
                                        <Cpu size={80} />
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-cyber text-black rounded-lg">
                                            <Zap size={18} fill="currentColor" />
                                        </div>
                                        <h3 className="text-white font-bold text-sm uppercase tracking-widest">
                                            Neyron Xulosa
                                        </h3>
                                    </div>
                                    
                                    {aiGenerating ? (
                                        <div className="flex items-center gap-3 text-cyber animate-pulse">
                                            <RefreshCw className="animate-spin" size={18} />
                                            <span className="font-mono text-sm">MA'LUMOTLAR DEKODLANMOQDA...</span>
                                        </div>
                                    ) : (
                                        <div className="text-gray-200 leading-relaxed font-medium font-mono text-sm border-l-2 border-cyber pl-4">
                                            {aiSummary}
                                            <span className="inline-block w-2 h-4 bg-cyber ml-1 animate-pulse"></span>
                                        </div>
                                    )}
                                </div>

                                {/* Article Body */}
                                <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-loose" style={{ fontSize: `${fontSize}px` }}>
                                    {selectedPost.body || (
                                        <>
                                            <p className="lead text-2xl text-white mb-8 font-light border-l-4 border-cyber pl-6 italic">
                                                "{selectedPost.excerpt}"
                                            </p>
                                            <p>
                                                Ma'lumot yuklanmoqda... Ushbu maqola to'liq shakllantirilmoqda. Iltimos, biroz kuting yoki
                                                <strong className="text-white"> AI Generatsiya</strong> tugmasini bosing.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-white/10 bg-black/80 backdrop-blur-md flex justify-between items-center z-40">
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group">
                                    <Share2 size={18} className="group-hover:text-cyber" /> Ulashish
                                </button>
                                <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group">
                                    <Bookmark size={18} className="group-hover:text-yellow-500" /> Saqlash
                                </button>
                                <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group">
                                    <ThumbsUp size={18} className="group-hover:text-green-500" /> Foydali
                                </button>
                            </div>
                            <button className="bg-white text-black px-8 py-3 rounded-xl font-black hover:bg-cyber transition-all shadow-lg flex items-center gap-2">
                                KUTUBXONAGA QO'SHISH <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogAI;
