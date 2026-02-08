import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeartAnimationPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Message romantique qui s'écrira progressivement
  const loveMessage = "Plus qu'un cadeau, une promesse :\nQuand je ne suis pas là, elle te rappellera mes bras autour de toi\nLes nuits où tu rêves, elle gardera tes secrets comme je le fais\nLes moments de doute, elle te rappellera que ton cœur a choisi le mien";

  useEffect(() => {
    // Détecter si l'utilisateur est sur mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                            window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      if (isMobileDevice) {
        // Afficher la notification après 2 secondes
        setTimeout(() => setShowNotification(true), 2000);
        // Masquer la notification après 8 secondes
        setTimeout(() => setShowNotification(false), 10000);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Afficher le message romantique après 3 secondes
    setTimeout(() => setShowLoveMessage(true), 3000);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Effet machine à écrire pour le message romantique
  useEffect(() => {
    if (isTyping) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < loveMessage.length) {
          setTypedText(loveMessage.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50); // Vitesse d'écriture (50ms par caractère)

      return () => clearInterval(typingInterval);
    }
  }, [isTyping, loveMessage]);

  // Fonction pour démarrer l'effet machine à écrire (appelée quand on clique sur play)
  const startTyping = () => {
    setTypedText('');
    setIsTyping(true);
  };

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        // URL du fichier HTML contenant l'animation
        const htmlUrl = '/heart-animation.html';
        
        // Charger le fichier HTML
        fetch(htmlUrl)
          .then(response => response.text())
          .then(htmlContent => {
            iframeDoc.open();
            iframeDoc.write(htmlContent);
            iframeDoc.close();
            
            // Ajouter un écouteur pour détecter le clic sur le bouton play
            setTimeout(() => {
              const playButton = iframeDoc?.querySelector('#play-music');
              if (playButton) {
                playButton.addEventListener('click', () => {
                  startTyping(); // Démarrer l'effet machine à écrire
                });
              }
            }, 1000);
          })
          .catch(error => {
            console.error('Erreur lors du chargement de l\'animation:', error);
            // Contenu de secours simplifié
            const fallbackContent = `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { 
                    margin: 0; 
                    padding: 0; 
                    background: linear-gradient(180deg, #1a0d1a 0%, #2b0f2b 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    font-family: 'Parisienne', cursive;
                    color: #ffccff;
                  }
                  .container {
                    text-align: center;
                  }
                  h1 {
                    font-size: 4rem;
                    margin-bottom: 2rem;
                    text-shadow: 0 0 20px rgba(255, 153, 204, 0.7);
                  }
                  .heart {
                    font-size: 6rem;
                    animation: heartbeat 1.5s ease-in-out infinite;
                  }
                  @keyframes heartbeat {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                  }
                </style>
                <link href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap" rel="stylesheet">
              </head>
              <body>
                <div class="container">
                  <div class="heart">❤️</div>
                  <h1>Pour toi, Une peluche 💖<br/>Plus qu'un cadeau, une promesse :</h1>
                  <p>
                    Quand je ne suis pas là → Elle te rappellera mes bras autour de toi<br/><br/>
                    Les nuits où tu rêves → Elle gardera tes secrets comme je le fais<br/><br/>
                    Les moments de doute → Elle te rappellera que ton cœur a choisi le mien
                  </p>
                </div>
              </body>
              </html>
            `;
            iframeDoc.open();
            iframeDoc.write(fallbackContent);
            iframeDoc.close();
          });
      }
    }
  }, []);

  return (
    <div className={`relative overflow-hidden ${isMobile ? 'w-screen h-screen' : 'w-full h-screen'}`}
         style={{ 
           margin: 0,
           padding: 0,
           width: isMobile ? '100vw' : '100%',
           height: isMobile ? '100vh' : '100%',
           position: 'fixed',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0
         }}>
      {/* Notification responsive pour mobile */}
      {showNotification && (
        <div className="absolute top-4 left-4 right-4 z-50 bg-gradient-to-r from-pink-500/90 to-purple-600/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-pink-300/30 animate-in slide-in-from-top duration-500">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">💕 Expérience optimale recommandée</h3>
              <p className="text-sm opacity-90 mb-3">
                Pour une expérience immersive avec l'animation 3D et la musique, nous vous recommandons de vous connecter sur un ordinateur desktop.
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowNotification(false)}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                >
                  Continuer sur mobile
                </button>
              </div>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Iframe contenant l'animation 3D */}
      <iframe
        ref={iframeRef}
        className={`absolute inset-0 border-0 ${isMobile ? 'w-screen h-screen scale-100' : 'w-full h-full'}`}
        title="Heart Animation"
        sandbox="allow-scripts allow-same-origin allow-forms"
        style={{ 
          transform: isMobile ? 'scale(1)' : 'scale(1)',
          transformOrigin: 'center center',
          width: isMobile ? '100vw' : '100%',
          height: isMobile ? '100vh' : '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />

      {/* Message romantique avec effet machine à écrire */}
      {showLoveMessage && (
        <div className={`absolute z-40 pointer-events-none text-center ${
          isMobile 
            ? 'bottom-40 left-4 right-4' 
            : 'bottom-32 left-1/2 transform -translate-x-1/2'
        }`}>
          {/* Message qui s'écrit progressivement */}
          <div className="min-h-[60px] flex items-center justify-center">
            <p className={`text-white font-serif leading-relaxed drop-shadow-2xl ${
              isMobile ? 'text-base md:text-lg' : 'text-lg md:text-xl'
            }`}>
              {typedText}
              {isTyping && <span className="animate-pulse ml-1">|</span>}
            </p>
          </div>
          
          {/* Indicateur pour cliquer sur play si le message n'a pas encore commencé */}
          {!isTyping && typedText === '' && (
            <div className="text-pink-200 text-sm animate-bounce">
              <p>🎵 Clique sur play pour découvrir mon message...</p>
            </div>
          )}
          
          {/* Petits cœurs décoratifs */}
          <div className="mt-3 flex justify-center gap-2">
            <span className="text-lg animate-pulse" style={{ animationDelay: '0s' }}>❤️</span>
            <span className="text-lg animate-pulse" style={{ animationDelay: '0.3s' }}>💝</span>
            <span className="text-lg animate-pulse" style={{ animationDelay: '0.6s' }}>💖</span>
          </div>
        </div>
      )}
      
      {/* Boutons superposés - Responsive */}
      <div className={`absolute z-50 flex ${
        isMobile 
          ? 'bottom-4 left-4 right-4 gap-2 flex-col-reverse' 
          : 'bottom-8 right-8 gap-3'
      }`}>
        {/* Bouton retour */}
        <button
          onClick={() => navigate('/landing-page')}
          className={`px-6 py-3 bg-transparent border-2 border-[#ff99cc] text-[#ffccff] rounded-full font-medium shadow-lg hover:bg-[rgba(255,153,204,0.2)] transition-all duration-300 backdrop-blur-sm ${
            isMobile ? 'w-full text-center' : ''
          }`}
        >
          ← Retour
        </button>
      </div>
    </div>
  );
};

export default HeartAnimationPage;
