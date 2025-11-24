
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Zap, Search, LayoutGrid, GraduationCap } from 'lucide-react';
import { Page } from '../types';
import AccessibilityPanel from './AccessibilityPanel';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAccess, setShowAccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav 
        ref={navRef}
        className={`
            pointer-events-auto
            transition-all duration-500 ease-out
            ${scrolled ? 'w-full max-w-5xl bg-black/70 border-white/10 shadow-2xl backdrop-blur-3xl' : 'w-full max-w-7xl bg-transparent border-transparent'}
            border rounded-full p-2 pl-6
            flex items-center justify-between relative
        `}
      >
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group z-20" 
            onClick={() => setPage(Page.HOME)}
          >
            <div className="w-10 h-10 bg-cyber text-black rounded-xl flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                S
            </div>
            <span className="text-xl font-black text-white tracking-tight group-hover:text-cyber transition-colors">SAT.UZ</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center bg-black/40 rounded-full p-1.5 border border-white/5 backdrop-blur-md absolute left-1/2 transform -translate-x-1/2">
            {[
                { l: 'Asosiy', p: Page.HOME },
                { l: 'Kurslar', p: Page.COURSE },
                { l: 'Resurslar', p: Page.HUB },
                { l: 'Narxlar', p: Page.PRICING }
            ].map((item) => (
                <button 
                    key={item.l} 
                    onClick={() => setPage(item.p)} 
                    className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full overflow-hidden ${currentPage === item.p ? 'text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                    {currentPage === item.p && (
                        <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] layout-id-nav"></div>
                    )}
                    <span className="relative z-10">{item.l}</span>
                </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3 pr-2 z-20">
             <button 
                onClick={() => setPage(Page.SEARCH)} 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all border border-transparent hover:border-white/20"
             >
                 <Search size={18} />
             </button>
             <button 
                onClick={() => setPage(Page.PRACTICE)}
                className="group relative px-6 py-3 bg-cyber text-black rounded-full font-bold text-sm overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all hover:-translate-y-0.5"
             >
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               <span className="relative flex items-center gap-2">
                 <Zap size={14} fill="currentColor" /> BOSHLASH
               </span>
             </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden pr-2 z-20">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
      </nav>
    </div>

    {/* Mobile Menu Overlay */}
    {isOpen && (
      <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 pt-32 px-8 animate-in fade-in duration-300">
        <div className="flex flex-col gap-8">
          {[
              { l: 'Bosh Sahifa', p: Page.HOME, icon: LayoutGrid },
              { l: 'Mening Kabinetim', p: Page.COURSE, icon: Zap },
              { l: 'Resurslar Markazi', p: Page.HUB, icon: Search },
              { l: 'Grantlar', p: Page.SCHOLARSHIP, icon: GraduationCap }
          ].map((item, idx) => (
            <button
              key={item.l}
              onClick={() => { setPage(item.p); setIsOpen(false); }}
              className="flex items-center gap-6 text-3xl font-bold text-gray-500 hover:text-white transition-all duration-300 group"
            >
              <item.icon size={32} className="text-cyber opacity-50 group-hover:opacity-100" />
              {item.l}
            </button>
          ))}
        </div>
      </div>
    )}
    <AccessibilityPanel isOpen={showAccess} onClose={() => setShowAccess(false)} />
    </>
  );
};

export default Navbar;
    