import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, VolumeX, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeartbeat } from '@/hooks/valentine/useHeartbeat';
import { useHeartbeatAudio } from '@/hooks/valentine/useHeartbeatAudio';
import { HeartbeatCanvas } from '../interactive/HeartbeatCanvas';
import plushBear from '@/assets/images/plush-bear.jpg';

const romanticWhispers = [
  "Ton cœur bat pour moi à {bpm} BPM",
  "À ce rythme, on pourrait danser toute la nuit",
  "Chaque battement dit 'je t'aime'",
  "La synchronie parfaite existe",
  "Nos cœurs parlent le même langage",
  "Le temps s'arrête quand nos cœurs battent ensemble",
];

export const HeartSyncSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const sensorRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [isMuted, setIsMuted] = useState(true);
  const [currentWhisper, setCurrentWhisper] = useState<string | null>(null);
  const [showSyncMessage, setShowSyncMessage] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 200 });
  
  const {
    bpm,
    isActive,
    isSynced,
    emotionalState,
    touchDuration,
    startHeartbeat,
    stopHeartbeat,
    beatInterval,
  } = useHeartbeat();

  const { initAudio, playHeartbeat, setMuted, resumeContext } = useHeartbeatAudio();

  // Handle canvas resize
  useEffect(() => {
    const updateSize = () => {
      if (sensorRef.current) {
        const rect = sensorRef.current.getBoundingClientRect();
        setCanvasSize({ 
          width: Math.min(rect.width, 600), 
          height: Math.min(rect.height, 300) 
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Play heartbeat sounds
  useEffect(() => {
    if (!isActive || isMuted) return;

    const interval = setInterval(() => {
      playHeartbeat(bpm);
    }, beatInterval);

    return () => clearInterval(interval);
  }, [isActive, bpm, beatInterval, isMuted, playHeartbeat]);

  // Show romantic whispers
  useEffect(() => {
    if (!isActive) {
      setCurrentWhisper(null);
      return;
    }

    const showWhisper = () => {
      const whisper = romanticWhispers[Math.floor(Math.random() * romanticWhispers.length)];
      setCurrentWhisper(whisper.replace('{bpm}', Math.round(bpm).toString()));
    };

    const interval = setInterval(showWhisper, 3000);
    showWhisper();

    return () => clearInterval(interval);
  }, [isActive, bpm]);

  // Show sync message
  useEffect(() => {
    if (isSynced) {
      setShowSyncMessage(true);
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      }
    } else {
      setShowSyncMessage(false);
    }
  }, [isSynced]);

  const handleInteractionStart = useCallback(async () => {
    initAudio();
    await resumeContext();
    startHeartbeat();
  }, [initAudio, resumeContext, startHeartbeat]);

  const handleInteractionEnd = useCallback(() => {
    stopHeartbeat();
  }, [stopHeartbeat]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      setMuted(!prev);
      return !prev;
    });
  }, [setMuted]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const getEmotionalGradient = () => {
    switch (emotionalState) {
      case 'calm':
        return 'from-valentine-romantic/20 to-valentine-soft/30';
      case 'moved':
        return 'from-valentine-pink/30 to-valentine-romantic/40';
      case 'passionate':
        return 'from-valentine-passion/40 to-valentine-pink/50';
      default:
        return 'from-valentine-romantic/20 to-valentine-soft/30';
    }
  };

  return (
    <section 
      ref={ref}
      id="heart-sync"
      className={`relative py-24 lg:py-32 overflow-hidden transition-all duration-1000 ${
        isActive ? `bg-gradient-to-b ${getEmotionalGradient()}` : 'bg-muted'
      }`}
    >
      {/* Page pulse effect when synced */}
      <AnimatePresence>
        {isSynced && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: 2,
              ease: "easeInOut" 
            }}
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 20, 147, 0.3) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-primary text-sm font-body uppercase tracking-widest mb-4">
            <Heart className="w-4 h-4 heartbeat" fill="currentColor" />
            Connexion Émotionnelle
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Ressentez la <span className="text-gradient italic">connexion</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Avant de l'offrir, vivez l'expérience. Votre cœur, son cœur, un seul battement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Sensor Zone */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div 
              ref={sensorRef}
              className={`relative aspect-video rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
                isActive 
                  ? 'shadow-glow ring-4 ring-primary/50' 
                  : 'shadow-card hover:shadow-romantic'
              }`}
              onMouseDown={handleInteractionStart}
              onMouseUp={handleInteractionEnd}
              onMouseLeave={handleInteractionEnd}
              onTouchStart={handleInteractionStart}
              onTouchEnd={handleInteractionEnd}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 transition-all duration-500 ${
                isActive 
                  ? 'bg-gradient-to-br from-foreground/95 to-foreground/80' 
                  : 'bg-gradient-to-br from-muted to-background'
              }`} />
              
              {/* Canvas overlay */}
              <HeartbeatCanvas 
                bpm={bpm} 
                isActive={isActive}
                isSynced={isSynced}
                width={canvasSize.width}
                height={canvasSize.height}
              />

              {/* Center heart sensor indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={isActive ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(255, 20, 147, 0.4)',
                      '0 0 0 20px rgba(255, 20, 147, 0)',
                      '0 0 0 0 rgba(255, 20, 147, 0)',
                    ],
                  } : {
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: isActive ? beatInterval / 1000 : 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary shadow-glow' 
                      : 'bg-card border-2 border-primary/30'
                  }`}
                >
                  <Heart 
                    className={`w-12 h-12 transition-colors duration-300 ${
                      isActive ? 'text-primary-foreground' : 'text-primary'
                    }`} 
                    fill="currentColor" 
                  />
                </motion.div>
              </div>

              {/* Instruction text */}
              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-6 left-0 right-0 text-center"
                >
                  <p className="text-muted-foreground font-body text-sm">
                    🎁 Posez votre doigt ici et maintenez
                  </p>
                </motion.div>
              )}

              {/* BPM Display */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-6 left-6 text-left"
                >
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wider mb-1">
                    Votre rythme
                  </p>
                  <p className="text-3xl font-display font-bold text-primary-foreground">
                    {Math.round(bpm)} <span className="text-lg">BPM</span>
                  </p>
                </motion.div>
              )}

              {/* Romantic whisper */}
              <AnimatePresence mode="wait">
                {currentWhisper && isActive && (
                  <motion.div
                    key={currentWhisper}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-6 left-6 right-6 text-center"
                  >
                    <p className="text-primary-foreground/90 font-display italic text-lg">
                      "{currentWhisper}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Audio control */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-card/20 backdrop-blur-sm hover:bg-card/40 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <Volume2 className="w-5 h-5 text-primary-foreground" />
                )}
              </button>
            </div>

            {/* Touch duration indicator */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center"
              >
                <div className="h-2 bg-muted rounded-full overflow-hidden max-w-xs mx-auto">
                  <motion.div
                    className="h-full bg-gradient-cta rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.min((touchDuration / 5) * 100, 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {touchDuration < 5 
                    ? `Maintenez encore ${Math.ceil(5 - touchDuration)}s pour la synchronisation...`
                    : '✨ Synchronisation établie !'}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Plush with sync effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={isActive ? {
                scale: [1, 1.03, 1],
              } : {}}
              transition={{
                duration: beatInterval / 1000,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-8 rounded-full blur-3xl"
                animate={isActive ? {
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                } : { opacity: 0.2 }}
                transition={{
                  duration: beatInterval / 1000,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(255, 20, 147, 0.5) 0%, transparent 70%)',
                }}
              />
              
              <img
                src={plushBear}
                alt="Peluche Étreinte Éternelle"
                className={`relative z-10 w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-3xl shadow-romantic transition-all duration-500 ${
                  isSynced ? 'ring-4 ring-primary shadow-glow' : ''
                }`}
              />

              {/* Heart beat indicator on plush */}
              {isActive && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: beatInterval / 1000,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-16 h-16 text-primary drop-shadow-lg" fill="currentColor" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Sync success message */}
        <AnimatePresence>
          {showSyncMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="mt-16 text-center"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255, 20, 147, 0.4)',
                    '0 0 0 30px rgba(255, 20, 147, 0)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block bg-card rounded-3xl p-8 shadow-romantic"
              >
                <Heart className="w-12 h-12 text-primary mx-auto mb-4 heartbeat" fill="currentColor" />
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  Votre cœur et le sien ne font plus qu'un ❤️
                </h3>
                <p className="text-muted-foreground mb-6">
                  Cette connexion, c'est ce que vous offrez avec la peluche.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="cta"
                    size="lg"
                    onClick={() => scrollToSection('pricing')}
                  >
                    <Heart className="w-5 h-5" fill="currentColor" />
                    Garder cette connexion pour toujours
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final CTA */}
        {!showSyncMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Cette harmonie, c'est ce que la peluche "Étreinte Éternelle" 
              capturera pour toujours.
            </p>
            <Button
              variant="romantic"
              size="lg"
              onClick={() => scrollToSection('pricing')}
            >
              Offrir la peluche qui bat à votre rythme
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
