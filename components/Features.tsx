
import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <div className="py-32 bg-void border-t border-white/5 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyber/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-left mb-20 border-l-2 border-cyber pl-8">
          <h2 className="text-sm text-cyber font-bold tracking-[0.3em] uppercase mb-4">Ekotizim Afzalliklari</h2>
          <p className="text-4xl md:text-5xl font-black text-white leading-tight max-w-3xl">
            Biz ta'limni <span className="text-gray-500">texnologiya</span> bilan birlashtirdik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
                key={index} 
                className="group relative bg-void-lighter rounded-3xl p-10 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Holographic Border Effect */}
              <div className="absolute inset-0 border border-white/5 rounded-3xl group-hover:border-white/20 transition-colors"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-white group-hover:text-cyber group-hover:border-cyber/50 transition-all duration-500 shadow-lg">
                        <feature.icon size={32} strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-white/5 group-hover:border-cyber/30 group-hover:text-cyber transition-all">
                          {feature.stat}
                      </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyber transition-colors tracking-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed flex-1 font-light">
                    {feature.description}
                  </p>
                  
                  <div className="w-full h-0.5 bg-white/5 overflow-hidden rounded-full mt-8">
                      <div className="h-full bg-cyber w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
