import { motion, useInView } from 'framer-motion';
import { ArrowDown, Heart, Play, Pause, Home, HelpCircle, Package, Gift, DollarSign, ShieldCheck, Star, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '../interactive/CountdownTimer';
import { AnimatedTitle, AnimatedItalicWord } from '../common/AnimatedTitle';
import { ParticleRipple } from '../effects/ParticleRipple';
import plushBear from '@/assets/images/pelluche_produit.jpg';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
      video.addEventListener('error', () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(e => console.log("Erreur lors de la reprise:", e));
      setIsPlaying(true);
    }
  };

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ position: 'relative' }}>
      {/* Video Background - Utilisateur contrôle le play/pause */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full -z-10"
        playsInline
        preload="auto"
        style={{ opacity: 0.3, transform: 'scale(1.01)' }}
        onError={(e) => console.log("Video error:", e)}
        onLoadStart={() => console.log("Video load start")}
        onCanPlay={() => console.log("Video can play")}
        onCanPlayThrough={() => console.log("Video can play through")}
        onLoadedData={() => console.log("Video loaded data")}
      >
        <source src="/I love you.mp4" type="video/mp4" />
        <source src="/I love you.webm" type="video/webm" />
        Votre navigateur ne supporte pas la vidéo.
      </video>
      
      {/* Indicateur de chargement */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-pink-100/50 -z-5">
          <div className="text-pink-600 font-semibold">Chargement de la vidéo...</div>
        </div>
      )}
      
      {/* Overlay léger pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#FF1493]/10 to-black/20 -z-5" />
      
      {/* Bouton Home avec Menu Navigation */}
      <div className="absolute top-4 left-4 z-20">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 hover:bg-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Menu navigation"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
        </motion.button>

        {/* Menu déroulant - Affiché si menuOpen est true */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 sm:top-16 left-0 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 min-w-max max-w-xs sm:max-w-md border border-pink-200"
          >
            <nav className="space-y-1 sm:space-y-2">
              <button
                onClick={() => {
                  scrollToSection('hero');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Hero</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('why');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Pourquoi l'offrir ?</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('product');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Produit</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('benefits');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Bénéfices</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('pricing');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Pricing</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('reassurance');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Garanties</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('testimonials');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Avis clients</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('cta');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Dernier CTA</span>
              </button>
              <div className="border-t border-pink-200 my-2" />
              <button
                onClick={() => {
                  navigate('/love-message');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:scale-105 hover:shadow-lg animate-pulse border-2 border-pink-300 shadow-md text-sm sm:text-base"
              >
                <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-200 animate-spin" />
                <span>Message d'Amour ✨</span>
              </button>
            </nav>
          </motion.div>
        )}
      </div>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={togglePlay}
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 hover:bg-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Pause la vidéo" : "Jouer la vidéo"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
        ) : (
          <Play className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
        )}
      </motion.button>
      
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-foreground/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          >
            <Heart size={20 + Math.random() * 40} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#F5F5F5]/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-[#FF1493]/20"
            >
              <Heart className="w-4 h-4 text-[#FF1493] heartbeat" fill="#FF1493" />
              <span className="text-sm text-[#DC143C] font-medium">Édition Saint-Valentin 2026</span>
            </motion.div>

             <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-black leading-tight mb-3 sm:mb-6">
               <AnimatedTitle delay={0.3} as="h1" className="inline">
                 Cette peluche gardera votre
               </AnimatedTitle>{' '}
               <AnimatedItalicWord delay={1.2}>étreinte</AnimatedItalicWord>{' '}
               <AnimatedTitle delay={1.8} as="span" className="inline">
                 pour toujours
               </AnimatedTitle>
             </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-black/90 mb-3 sm:mb-6 font-body font-light max-w-xl mx-auto lg:mx-0"
            >
              Le cadeau qui dit "je t'aime" même quand vous êtes loin. 
              Une présence douce et réconfortante qui traverse les distances.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col xs:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start mb-3 sm:mb-6 lg:mb-8"
            >
               <ParticleRipple particleCount={30} spread={80}>
                 <Button
                   className="group text-xs sm:text-sm md:text-base lg:text-lg bg-[#FF1493] hover:bg-[#FF0000] text-white border-2 border-[#FF1493] hover:border-[#FF0000] px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 transition-all duration-300 w-full xs:w-auto"
                   onClick={() => scrollToSection('pricing')}
                 >
                   <Heart className="w-2 h-2 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 group-hover:animate-heartbeat" fill="currentColor" />
                   <span className="hidden xs:inline text-xs md:text-xs lg:text-sm">Offrir l'Étreinte qui Rapproche les Cœurs</span>
                   <span className="xs:hidden text-xs">Offrir</span>
                   <motion.span
                     animate={{ x: [0, 5, 0] }}
                     transition={{ repeat: Infinity, duration: 1.5 }}
                     className="hidden md:inline"
                   >
                     →
                   </motion.span>
                 </Button>
               </ParticleRipple>
              <Button
                className="bg-pink-500 hover:bg-pink-600 text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-full xs:w-auto"
                onClick={() => scrollToSection('product')}
              >
                <span className="text-xs md:text-xs lg:text-sm font-medium">Explorer</span>
              </Button>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-4 sm:mt-0"
            >
              <p className="text-xs sm:text-sm text-black/70 mb-3 sm:mb-4 font-body uppercase tracking-widest text-center lg:text-left">
                Livraison garantie avant le 14 février
              </p>
              <CountdownTimer />
            </motion.div>
          </motion.div>

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="relative lg:ml-8 px-4 xs:px-0"
          >
            <div className="relative mx-auto max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#FF1493]/20 rounded-full blur-3xl opacity-40 scale-110" />
              
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src="/pelluche_produit.jpg"
                  alt="Peluche Étreinte Éternelle - Cadeau Saint-Valentin"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl object-cover"
                />
                
                {/* Decorative Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  className="absolute -top-2 xs:-top-3 sm:-top-4 -right-2 xs:-right-3 sm:-right-4 bg-white rounded-full p-1 xs:p-2 sm:p-3 shadow-lg border-2 border-[#FF1493]"
                >
                  <Heart className="w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-[#FF1493] heartbeat" fill="#FF1493" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => scrollToSection('why')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 scroll-indicator text-white/70 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
      >
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>
    </section>
  );
};
