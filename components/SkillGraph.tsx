import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const DATA = [
  { subject: 'Algebra', A: 120, fullMark: 150 },
  { subject: 'Geometry', A: 98, fullMark: 150 },
  { subject: 'Trig', A: 86, fullMark: 150 },
  { subject: 'Reading', A: 99, fullMark: 150 },
  { subject: 'Grammar', A: 85, fullMark: 150 },
  { subject: 'Vocabulary', A: 65, fullMark: 150 },
];

const SkillGraph: React.FC = () => {
  return (
    <div className="w-full h-full relative">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_70%)]"></div>
       
       <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={DATA}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#aaa', fontSize: 12, fontWeight: 'bold' }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Radar
            name="Mening Bilimim"
            dataKey="A"
            stroke="#00f0ff"
            strokeWidth={3}
            fill="#00f0ff"
            fillOpacity={0.3}
          />
          <Tooltip 
             contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '8px' }}
             itemStyle={{ color: '#00f0ff' }}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="absolute top-2 right-2 text-right">
         <div className="text-xs text-cyber font-mono font-bold animate-pulse">NEURAL LINK ACTIVE</div>
         <div className="text-[10px] text-gray-500">UPDATING REAL-TIME</div>
      </div>
    </div>
  );
};

export default SkillGraph;