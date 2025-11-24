import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertTriangle, Zap } from 'lucide-react';

interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'alert';
    time: string;
}

const SmartNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        // Simulate incoming notifications from AI Core
        const timeouts: ReturnType<typeof setTimeout>[] = [];
        
        const scheduleNotification = (notif: Omit<Notification, 'id'>, delay: number) => {
            const timeout = setTimeout(() => {
                setNotifications(prev => [...prev, { ...notif, id: Date.now() }]);
            }, delay);
            timeouts.push(timeout);
        };

        scheduleNotification({ title: "AI System Optimization", message: "3000 qavatli yadro yangilandi. Tezlik 20% ga oshdi.", type: "success", time: "Hozir" }, 2000);
        scheduleNotification({ title: "Diqqat!", message: "IoT kamerasi charchoqni aniqladi. 5 daqiqa tanaffus qiling.", type: "warning", time: "1 daqiqa oldin" }, 15000);
        scheduleNotification({ title: "Yangi Grant!", message: "MIT universitetida siz uchun mos grant ochildi.", type: "info", time: "Hozir" }, 45000);

        return () => timeouts.forEach(clearTimeout);
    }, []);

    const removeNotif = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="fixed top-24 right-4 z-50 flex flex-col gap-3 pointer-events-none">
            {notifications.map((notif) => (
                <div 
                    key={notif.id}
                    className={`
                        pointer-events-auto w-80 bg-black/80 backdrop-blur-md border rounded-xl p-4 shadow-2xl
                        transform transition-all duration-500 animate-in slide-in-from-right
                        ${notif.type === 'success' ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 
                          notif.type === 'warning' ? 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 
                          'border-cyber/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]'}
                    `}
                >
                    <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                            {notif.type === 'success' && <Check size={16} className="text-green-500" />}
                            {notif.type === 'warning' && <AlertTriangle size={16} className="text-yellow-500" />}
                            {notif.type === 'info' && <Bell size={16} className="text-cyber" />}
                            <h4 className="font-bold text-white text-sm">{notif.title}</h4>
                        </div>
                        <button onClick={() => removeNotif(notif.id)} className="text-gray-500 hover:text-white">
                            <X size={14} />
                        </button>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">{notif.message}</p>
                    <div className="mt-2 text-[10px] text-gray-500 font-mono text-right">{notif.time}</div>
                </div>
            ))}
        </div>
    );
};

export default SmartNotifications;