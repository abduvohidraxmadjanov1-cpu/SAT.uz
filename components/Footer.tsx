
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Hexagon } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
    setPage?: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const nav = (page: Page) => {
      if (setPage) setPage(page);
      window.scrollTo(0, 0);
  }

  return (
    <footer className="bg-void border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 cursor-pointer group" onClick={() => nav(Page.HOME)}>
               <Hexagon className="text-cyber group-hover:animate-spin-slow transition-all" size={24} />
               <span className="text-2xl font-black text-white group-hover:text-cyber transition-colors">SAT.uz</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dunyodagi eng ilg'or sun'iy intellekt asosidagi ta'lim platformasi. 
              Biz sizning kelajagingizni kodlaymiz.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Platforma</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li onClick={() => nav(Page.COURSE)} className="hover:text-cyber cursor-pointer transition-colors duration-200 flex items-center gap-2 hover:translate-x-1">SAT Kurslari</li>
              <li onClick={() => nav(Page.PRACTICE)} className="hover:text-cyber cursor-pointer transition-colors duration-200 flex items-center gap-2 hover:translate-x-1">AI Mentor</li>
              <li onClick={() => nav(Page.PRICING)} className="hover:text-cyber cursor-pointer transition-colors duration-200 flex items-center gap-2 hover:translate-x-1">Narxlar</li>
              <li onClick={() => nav(Page.BLOG)} className="hover:text-cyber cursor-pointer transition-colors duration-200 flex items-center gap-2 hover:translate-x-1">Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Kompaniya</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li onClick={() => nav(Page.ABOUT)} className="hover:text-cyber cursor-pointer transition-colors duration-200 flex items-center gap-2 hover:translate-x-1">Biz Haqimizda</li>
              <li onClick={() => nav(Page.ABOUT)} className="hover:text-cyber cursor-pointer transition-colors duration-200 flex items-center gap-2 hover:translate-x-1">Kontaktlar</li>
              <li className="hover:text-cyber cursor-pointer transition-colors duration-200 flex items-center gap-2 hover:translate-x-1">Maxfiylik Siyosati</li>
              <li className="hover:text-cyber cursor-pointer transition-colors duration-200 flex items-center gap-2 hover:translate-x-1">Foydalanish Shartlari</li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Ijtimoiy Tarmoqlar</h4>
             <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/5 p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-white/10 transition-all transform hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  title="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/5 p-2 rounded-lg text-gray-400 hover:text-pink-500 hover:bg-white/10 transition-all transform hover:scale-110 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/5 p-2 rounded-lg text-gray-400 hover:text-sky-400 hover:bg-white/10 transition-all transform hover:scale-110 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                  title="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/5 p-2 rounded-lg text-gray-400 hover:text-blue-700 hover:bg-white/10 transition-all transform hover:scale-110 hover:shadow-[0_0_15px_rgba(29,78,216,0.5)]"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
             </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-gray-500 text-sm">
                &copy; 2024 SAT.uz. Barcha huquqlar himoyalangan. 
                <span className="text-cyber/50 ml-2 font-mono text-xs">Powered by SALES LLM Core v4.0</span>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
