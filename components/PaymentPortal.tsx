
import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, ShieldCheck, Zap, CheckCircle, Loader2, Wallet } from 'lucide-react';

const PaymentPortal: React.FC = () => {
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<'card' | 'crypto'>('card');

    const handlePayment = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
                        <Wallet className="text-cyber" size={40} />
                        QUANTUM <span className="text-green-500">PAY</span>
                    </h1>
                    <p className="text-gray-400">Secure Blockchain-Verified Transaction Layer</p>
                </div>

                {success ? (
                    <div className="bg-void-lighter border border-green-500/50 rounded-3xl p-12 text-center animate-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={48} className="text-green-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">To'lov Muvaffaqiyatli!</h2>
                        <p className="text-gray-400 mb-8">Sizning Pro AI hisobingiz faollashtirildi.</p>
                        <div className="font-mono text-xs text-cyber bg-black/50 p-4 rounded-xl border border-cyber/20 inline-block">
                            TX_ID: 0x492...a921f // CONFIRMED BLOCK #9921
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Card Visualization */}
                        <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 relative overflow-hidden perspective-1000">
                            <div className="absolute inset-0 grid-bg opacity-10"></div>
                            
                            <div className="relative w-full aspect-[1.586/1] bg-gradient-to-br from-gray-900 to-black border border-cyber/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col justify-between transform transition-transform hover:rotate-y-2 hover:rotate-x-2">
                                <div className="flex justify-between items-start">
                                    <Zap className="text-cyber" size={32} />
                                    <span className="text-white font-bold italic text-xl">SAT<span className="text-cyber">.uz</span></span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-8 bg-yellow-500/20 rounded border border-yellow-500/50"></div>
                                        <div className="w-12 h-8 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="font-mono text-xl text-white tracking-widest shadow-black drop-shadow-md">
                                        •••• •••• •••• 8821
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest">
                                        <span>Card Holder</span>
                                        <span>Expires</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-white font-bold uppercase tracking-wider">
                                        <span>AZIZBEK TOLIPOV</span>
                                        <span>12/28</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>Subtotal (Pro AI)</span>
                                    <span className="text-white font-bold">$99.00</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>Tax (VAT)</span>
                                    <span className="text-white font-bold">$0.00</span>
                                </div>
                                <div className="h-px bg-white/10"></div>
                                <div className="flex items-center justify-between text-lg text-white font-bold">
                                    <span>Total</span>
                                    <span className="text-cyber">$99.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 flex flex-col">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <Lock size={18} className="text-cyber" /> Secure Checkout
                            </h3>

                            <div className="flex bg-black rounded-xl p-1 mb-6 border border-white/10">
                                <button 
                                    onClick={() => setSelectedMethod('card')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${selectedMethod === 'card' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                                >
                                    <CreditCard size={16} /> Card
                                </button>
                                <button 
                                    onClick={() => setSelectedMethod('crypto')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${selectedMethod === 'crypto' ? 'bg-cyber text-black' : 'text-gray-500 hover:text-white'}`}
                                >
                                    <Zap size={16} /> Crypto
                                </button>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Card Number</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyber outline-none font-mono" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Expiry</label>
                                        <input type="text" placeholder="MM/YY" className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyber outline-none font-mono" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-500 font-bold uppercase block mb-2">CVC</label>
                                        <input type="text" placeholder="123" className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyber outline-none font-mono" />
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handlePayment}
                                disabled={processing}
                                className="w-full bg-cyber text-black font-bold py-4 rounded-xl mt-8 hover:bg-white transition-all flex items-center justify-center gap-2"
                            >
                                {processing ? <Loader2 className="animate-spin" /> : <ShieldCheck size={20} />}
                                {processing ? 'PROCESSING...' : 'PAY SECURELY'}
                            </button>
                            
                            <div className="text-center mt-4 text-[10px] text-gray-600 flex items-center justify-center gap-2">
                                <Lock size={10} /> 256-BIT ENCRYPTION ENABLED
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPortal;
