import { motion, useInView } from 'framer-motion';
import { ArrowDown, Heart, Play, Pause, Home, HelpCircle, Package, Gift, DollarSign, ShieldCheck, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '../interactive/CountdownTimer';
import { AnimatedTitle, AnimatedItalicWord } from '../common/AnimatedTitle';
import { ParticleRipple } from '../effects/ParticleRipple';
import plushBear from '@/assets/images/pelluche_produit.jpg';
import { useRef, useEffect, useState } from 'react';

export const HeroSection = () => {
  const sectionRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Définir le vidéo comme chargé quand possible
    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      console.log("Vidéo prête à jouer (utilisateur contrôle)");
      // Assurer que la vidéo est en pause au chargement
      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    };

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background - Utilisateur contrôle le play/pause */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full -z-10"
        playsInline
        preload="auto"
        style={{ opacity: 0.6, transform: 'scale(1.05)' }}
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
          className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Menu navigation"
        >
          <Home className="w-5 h-5 text-pink-600" />
        </motion.button>

        {/* Menu déroulant */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 min-w-max border border-pink-200"
          >
            <nav className="space-y-2">
              <button
                onClick={() => {
                  scrollToSection('hero');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3"
              >
                <Play className="w-4 h-4" />
                Hero
              </button>
              <button
                onClick={() => {
                  scrollToSection('why');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3"
              >
                <HelpCircle className="w-4 h-4" />
                Pourquoi l'offrir ?
              </button>
              <button
                onClick={() => {
                  scrollToSection('product');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3"
              >
                <Package className="w-4 h-4" />
                Produit
              </button>
              <button
                onClick={() => {
                  scrollToSection('benefits');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3"
              >
                <Gift className="w-4 h-4" />
                Bénéfices
              </button>
              <button
                onClick={() => {
                  scrollToSection('pricing');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3"
              >
                <DollarSign className="w-4 h-4" />
                Pricing
              </button>
              <button
                onClick={() => {
                  scrollToSection('reassurance');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3"
              >
                <ShieldCheck className="w-4 h-4" />
                Garanties
              </button>
              <button
                onClick={() => {
                  scrollToSection('testimonials');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3"
              >
                <Star className="w-4 h-4" />
                Avis clients
              </button>
              <button
                onClick={() => {
                  scrollToSection('cta');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3"
              >
                <Zap className="w-4 h-4" />
                Dernier CTA
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
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Pause la vidéo" : "Jouer la vidéo"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-pink-600" />
        ) : (
          <Play className="w-5 h-5 text-pink-600" />
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

             <div className="text-4xl xs:text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-black leading-tight mb-6">
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
              className="text-lg xs:text-xl sm:text-xl text-black/90 mb-8 font-body font-light max-w-xl mx-auto lg:mx-0"
            >
              Le cadeau qui dit "je t'aime" même quand vous êtes loin. 
              Une présence douce et réconfortante qui traverse les distances.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
               <ParticleRipple particleCount={30} spread={80}>
                 <Button
                   className="group text-lg bg-[#FF1493] hover:bg-[#FF0000] text-white border-2 border-[#FF1493] hover:border-[#FF0000] px-6 py-3 xs:px-8 xs:py-4 transition-all duration-300"
                   onClick={() => scrollToSection('pricing')}
                 >
                   <Heart className="w-5 h-5 group-hover:animate-heartbeat" fill="currentColor" />
                   Offrir l'Étreinte Éternelle
                   <motion.span
                     animate={{ x: [0, 5, 0] }}
                     transition={{ repeat: Infinity, duration: 1.5 }}
                   >
                     →
                   </motion.span>
                 </Button>
               </ParticleRipple>
              <Button
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 xs:px-5 xs:py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1"
                onClick={() => scrollToSection('product')}
              >
                ❤️
                <span className="hidden xs:inline">Découvrir</span>
              </Button>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-xs sm:text-sm text-black/70 mb-4 font-body uppercase tracking-widest">
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
            className="relative lg:ml-32"
          >
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#FF1493]/20 rounded-full blur-3xl opacity-40 scale-110" />
              
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
                  alt="Deux oursons qui s'embrassent - Peluche Étreinte Éternelle"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
                />
                
                {/* Decorative Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border-2 border-[#FF1493]"
                >
                  <Heart className="w-8 h-8 text-[#FF1493] heartbeat" fill="#FF1493" />
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
        className="absolute bottom-8 left-1/2 scroll-indicator text-white/70 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
};
