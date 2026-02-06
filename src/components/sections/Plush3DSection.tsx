import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Heart, Volume2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Plush3DSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [heartbeat, setHeartbeat] = useState(72);
  const [audioMessage, setAudioMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Simulate heartbeat detection
  useEffect(() => {
    if (pressed) {
      const interval = setInterval(() => {
        setHeartbeat(72 + Math.sin(Date.now() / 1000) * 8);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [pressed]);

  const handleInteraction = () => {
    setPressed(true);
    setIsRecording(true);
    
    // Simulate recording
    setTimeout(() => {
      setAudioMessage("Je pense à toi chaque seconde...");
      setIsRecording(false);
    }, 3000);
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-[#FFE4E1] via-[#FFB6C1] to-[#FF69B4]" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#DC143C] font-bold text-sm uppercase tracking-widest mb-4">
            Expérience Interactive
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-black mb-6">
            Peluche <span className="text-gradient italic">Magique</span>
          </h2>
          <p className="text-xl text-black/80 max-w-3xl mx-auto">
            Touchez et ressentez la connexion
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* 3D-style Plush (Image transformée en 3D) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto cursor-pointer">
              {/* 3D Container */}
              <motion.div
                className="relative w-full h-full"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                whileHover={{ scale: 1.05, rotateY: 15 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleInteraction}
                animate={{
                  rotateY: pressed ? [0, 360] : [0, 5, 0],
                }}
                transition={{ 
                  duration: pressed ? 2 : 3, 
                  repeat: pressed ? 0 : Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Image de la peluche en 3D */}
                <motion.div
                  className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden"
                  animate={{
                    scale: pressed ? [1, 1.1, 1] : [1, 1.05, 1],
                    rotateZ: pressed ? [0, 5, -5, 0] : 0,
                  }}
                  transition={{ duration: 1.5, repeat: pressed ? 0 : Infinity }}
                >
                  <img
                    src="/plush-bear.jpg"
                    alt="Peluche Étreinte Éternelle"
                    className="w-full h-full object-cover rounded-3xl"
                    style={{ 
                      transform: 'translateZ(20px)',
                      filter: pressed ? 'brightness(1.1) saturate(1.2)' : 'brightness(1) saturate(1)'
                    }}
                  />
                  
                  {/* Overlay gradient pour effet 3D */}
                  <div 
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: pressed 
                        ? 'linear-gradient(135deg, rgba(255,20,147,0.3) 0%, rgba(255,105,180,0.2) 50%, rgba(255,182,193,0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(255,20,147,0.1) 0%, rgba(255,105,180,0.05) 50%, rgba(255,182,193,0.02) 100%)'
                    }}
                  />
                  
                  {/* Heart on Chest Overlay */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: pressed ? [1, 1.3, 1] : [1, 1.1, 1],
                      rotate: pressed ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart 
                      className="w-12 h-12 text-red-500 drop-shadow-lg" 
                      fill="currentColor"
                      style={{ 
                        filter: 'drop-shadow(0 0 20px rgba(220, 20, 60, 0.8))',
                        transform: 'translateZ(30px)'
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Glow Effect */}
                {pressed && (
                  <motion.div
                    className="absolute inset-0 bg-pink-400/40 rounded-3xl blur-2xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ transform: 'translateZ(-10px)' }}
                  />
                )}

                {/* Floating Particles */}
                {pressed && [...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-pink-300 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translateZ(50px)'
                    }}
                    initial={{ 
                      scale: 0,
                      x: 0,
                      y: 0,
                      opacity: 1
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      x: Math.cos(i * 45) * 120,
                      y: Math.sin(i * 45) * 120,
                      opacity: [1, 0.8, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}

                {/* 3D Faces for cube effect */}
                <div className="absolute inset-0" style={{ transform: 'rotateY(90deg) translateZ(160px)' }}>
                  <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-400 rounded-3xl opacity-80" />
                </div>
                <div className="absolute inset-0" style={{ transform: 'rotateY(180deg) translateZ(160px)' }}>
                  <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-500 rounded-3xl opacity-80" />
                </div>
                <div className="absolute inset-0" style={{ transform: 'rotateY(270deg) translateZ(160px)' }}>
                  <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl opacity-80" />
                </div>
              </motion.div>
            </div>

            {/* Instructions */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border-2 border-pink-300"
                animate={{ scale: pressed ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: pressed ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart className="w-5 h-5 text-pink-500" fill="currentColor" />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-700">
                    {pressed ? "Connexion établie..." : "Cliquez sur la peluche"}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Connection Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Heartbeat Display */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
                </motion.div>
                <div>
                  <p className="text-sm text-gray-600">Battement détecté</p>
                  <motion.p
                    className="text-3xl font-bold text-red-500"
                    animate={{ 
                      textShadow: pressed ? '0 0 20px rgba(220, 20, 60, 0.5)' : 'none'
                    }}
                  >
                    {Math.round(heartbeat)} BPM
                  </motion.p>
                </div>
              </div>
              
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 to-red-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: pressed ? "100%" : "0%" }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            {/* Audio Message */}
            {audioMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200"
              >
                <div className="flex items-start gap-3">
                  <Volume2 className="w-5 h-5 text-pink-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Message capturé :</p>
                    <motion.p
                      className="text-lg text-gray-900 italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      "{audioMessage}"
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Product Info */}
            <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-6 border-2 border-pink-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Peluche Étreinte Éternelle
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cette harmonie, c'est ce que la peluche "Étreinte Éternelle" capturera pour toujours.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  Synchronisation cardiaque en temps réel
                </span>
              </div>
              
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4"
                size="lg"
                onClick={handleInteraction}
              >
                Offrir la peluche qui bat à votre rythme
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
