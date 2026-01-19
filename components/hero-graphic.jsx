"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Code, Palette, Globe, Database, Server, Smartphone } from "lucide-react";

export function HeroGraphic() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 cursor-pointer"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="relative w-80 h-80">
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-0 -left-10 w-64 h-64 bg-brand-teal/30 rounded-full blur-3xl" 
                 />
                 <motion.div 
                    animate={{ scale: [1, 1.1, 1], x: [0, -30, 0], y: [0, 30, 0] }}
                    transition={{ duration: 7, repeat: Infinity }}
                    className="absolute bottom-0 -right-10 w-64 h-64 bg-brand-orange/30 rounded-full blur-3xl" 
                 />
            </div>
        </div>

      <motion.div
        style={{ rotateX, rotateY, z: 100 }}
        className="relative w-64 h-64 md:w-80 md:h-80 bg-white/5 backdrop-blur-xl border border-[#2A9D8F]/30 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 transform-style-3d group hover:border-[#F4A261]/50 transition-colors duration-500"
      >
        <div className="transform translate-z-20">
             <Code className="w-24 h-24 text-[#2A9D8F] mb-4 drop-shadow-lg" />
        </div>
        
        {/* Mock Interface Lines */}
        <motion.div style={{ z: 20 }} className="w-full space-y-3">
             <div className="w-3/4 h-3 bg-gradient-to-r from-[#2A9D8F] to-[#264653] rounded mx-auto opacity-50" />
             <div className="w-1/2 h-3 bg-gradient-to-r from-[#F4A261] to-[#E76F51] rounded mx-auto opacity-50" />
             <div className="w-2/3 h-3 bg-[#E9C46A] rounded mx-auto opacity-50" />
        </motion.div>

        {/* Floating Icons Orbiting */}
        <FloatingIcon icon={<Palette className="w-6 h-6 text-[#F4A261]" />} delay={0} x={-80} y={-80} />
        <FloatingIcon icon={<Globe className="w-6 h-6 text-[#2A9D8F]" />} delay={1} x={80} y={-60} />
        <FloatingIcon icon={<Database className="w-6 h-6 text-[#E9C46A]" />} delay={2} x={-70} y={70} />
        <FloatingIcon icon={<Smartphone className="w-6 h-6 text-[#E76F51]" />} delay={3} x={80} y={80} />

      </motion.div>
    </motion.div>
  );
}

function FloatingIcon({ icon, x, y, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                y: [y, y - 10, y],
            }}
            transition={{
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: delay },
                opacity: { duration: 0.5 }
            }}
            className="absolute p-3 bg-card/80 backdrop-blur border border-border rounded-xl shadow-lg transform translate-z-30"
            style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
                marginLeft: '-20px', 
                marginTop: '-20px' 
            }}
        >
            {icon}
        </motion.div>
    )
}
