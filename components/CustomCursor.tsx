
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null); // The main dot
    const ringRef = useRef<HTMLDivElement>(null);   // The fluid ring
    
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Physics State
    const pos = useRef({ x: 0, y: 0 });      // Current Ring Position
    const mouse = useRef({ x: 0, y: 0 });    // Target Mouse Position
    const vel = useRef({ x: 0, y: 0 });      // Velocity
    
    useEffect(() => {
        const cursor = cursorRef.current;
        const ring = ringRef.current;
        
        // Initial placement off-screen
        mouse.current = { x: -100, y: -100 };
        pos.current = { x: -100, y: -100 };

        const onMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
            
            // Instant update for the main dot (Zero Latency)
            if (cursor) {
                cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(${isClicking ? 0.8 : 1})`;
            }
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Advanced interaction detection
            const isInteractive = 
                target.matches('button, a, input, textarea, select, [role="button"], canvas, video') ||
                target.closest('button, a, [role="button"], .group, .cursor-pointer') !== null ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(isInteractive);
        };
        
        const onMouseLeave = (e: MouseEvent) => {
            if (!e.relatedTarget && (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
                setIsVisible(false);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseLeave);

        // PHYSICS LOOP
        let animationFrame: number;
        
        const loop = () => {
            if (!ring) return;

            // Physics Constants
            const friction = 0.15; // Smoothness (Lower = more delay/weight)
            
            // Calculate distance to target
            const dx = mouse.current.x - pos.current.x;
            const dy = mouse.current.y - pos.current.y;

            // Update Velocity
            vel.current.x += dx * friction;
            vel.current.y += dy * friction;
            
            // Apply Damping (Air Resistance)
            vel.current.x *= 0.75; 
            vel.current.y *= 0.75;

            // Update Position
            pos.current.x += vel.current.x;
            pos.current.y += vel.current.y;

            // Calculate Squeeze/Stretch based on velocity
            const velocity = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
            const angle = Math.atan2(vel.current.y, vel.current.x);
            
            // Deformation limits
            const scale = Math.min(1.15, 1 + velocity / 100); // Stretch up to 15%
            const squeeze = Math.max(0.75, 1 - velocity / 100); // Squeeze down to 75%

            const rotation = angle * (180 / Math.PI);

            // Base Styles
            let transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            
            // Apply Physics Deformation if moving fast and not hovering (Hover needs stability)
            if (!isHovering && velocity > 1) {
                transform += ` rotate(${rotation}deg) scale(${scale}, ${squeeze})`;
            } else {
                transform += ` rotate(0deg) scale(1)`;
            }

            ring.style.transform = transform;

            animationFrame = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseLeave);
            cancelAnimationFrame(animationFrame);
        };
    }, [isVisible, isHovering, isClicking]);

    return (
        <>
            {/* CORE: The Quantum Point */}
            <div 
                ref={cursorRef}
                className={`
                    fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -ml-1 -mt-1
                    mix-blend-exclusion transition-opacity duration-300
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}
            />
            
            {/* SHIELD: The Synaptic Ring */}
            <div 
                ref={ringRef}
                className={`
                    fixed top-0 left-0 pointer-events-none z-[9998]
                    rounded-full border border-cyber/80
                    flex items-center justify-center transition-all duration-200 ease-out
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                    ${isHovering 
                        ? 'w-12 h-12 bg-cyber/10 border-cyber shadow-[0_0_30px_rgba(0,240,255,0.4)] -ml-6 -mt-6' 
                        : 'w-8 h-8 -ml-4 -mt-4 shadow-[0_0_10px_rgba(0,240,255,0.2)]'}
                    ${isClicking ? 'scale-75 bg-cyber/30' : 'scale-100'}
                `}
            >
                {/* Target Lock Reticle (Only Visible on Hover) */}
                <div className={`
                    absolute inset-0 rounded-full border border-dashed border-white/50 animate-spin-slow
                    ${isHovering ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}
                    transition-all duration-300
                `} />
            </div>
        </>
    );
};

export default CustomCursor;
