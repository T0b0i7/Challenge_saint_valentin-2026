import { useState, useEffect } from 'react';

interface ValentinePromptProps {
  onYesClick?: () => void;
}

export const ValentinePrompt: React.FC<ValentinePromptProps> = ({ onYesClick }) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showBear, setShowBear] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Show question after 3 seconds
    const timer = setTimeout(() => {
      setShowQuestion(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleNoButtonHover = () => {
    // Move No button to a random position within button container
    const buttonContainer = document.getElementById('button-container');
    if (buttonContainer) {
      const rect = buttonContainer.getBoundingClientRect();
      const isMobile = window.innerWidth <= 640;
      const maxX = rect.width - (isMobile ? 80 : 100); // smaller on mobile
      const maxY = rect.height - (isMobile ? 40 : 50); // smaller on mobile
      
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    setNoButtonPosition({ x: 0, y: 0 });
  };

  const handleYesClick = () => {
    setShowBear(false);
    setTimeout(() => {
      window.location.href = '/landing-page'; // Go to landing page
    }, 1000);
  };

  const handleHeartClick = () => {
    setShowMessage(true);
  };

  useEffect(() => {
    // Animation de plusieurs cœurs et pétales qui suivent la souris
    const createFloatingElement = (x: number, y: number, type: 'heart' | 'petal') => {
      const element = document.createElement('div');
      element.className = 'fixed pointer-events-none z-50 transition-all duration-1000';
      
      if (type === 'heart') {
        element.innerHTML = ['❤️', '💖', '💕', '💗', '💓'][Math.floor(Math.random() * 5)];
        element.className += ' text-lg animate-pulse';
        element.style.left = `${x + Math.random() * 40 - 20}px`;
        element.style.top = `${y + Math.random() * 40 - 20}px`;
      } else {
        element.innerHTML = '🌹';
        element.className += ' text-xl';
        element.style.left = `${x + Math.random() * 60 - 30}px`;
        element.style.top = `${y + Math.random() * 60 - 30}px`;
        element.style.transform = `rotate(${Math.random() * 360}deg)`;
      }
      
      element.style.opacity = '0.8';
      document.body.appendChild(element);
      
      // Animation de disparition
      setTimeout(() => {
        element.style.opacity = '0';
        element.style.transform = `translateY(-50px) scale(0) rotate(${type === 'petal' ? Math.random() * 720 : 0}deg)`;
      }, 100);
      
      // Suppression de l'élément
      setTimeout(() => {
        element.remove();
      }, 1100);
    };

    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime > 100) { // Limiter la création d'éléments
        const type = Math.random() > 0.5 ? 'heart' : 'petal';
        createFloatingElement(e.clientX, e.clientY, type);
        lastTime = currentTime;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Create particles
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;

    const isMobile = window.innerWidth <= 600;
    const particleCount = isMobile ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = isMobile ? Math.random() * 60 + 20 : Math.random() * 150 + 50; 
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = Math.random() * 100 + 'vw';
      
      const duration = Math.random() * 8 + 5;
      const delay = Math.random() * -10;
      
      particle.style.animation = `move-particles ${duration}s linear ${delay}s infinite`;

      particlesContainer.appendChild(particle);
    }

    // Create falling petals
    const petalFallContainer = document.getElementById('rose-petals-fall-container');
    const roseElement = document.querySelector('.rose');
    let petalFallDirection = 0;

    const createFallingRosePetal = () => {
      if (!roseElement || !petalFallContainer) return;
      const petal = document.createElement('div');
      petal.classList.add('falling-rose-petal');
      if (petalFallDirection % 2 === 0) { 
        petal.classList.add('fall-left'); 
      } else { 
        petal.classList.add('fall-right'); 
      }
      petalFallDirection++;
      const rect = roseElement.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + 80;
      petal.style.left = `${startX}px`;
      petal.style.top = `${startY}px`;
      petalFallContainer.appendChild(petal);
      petal.addEventListener('animationend', () => { 
        petal.remove(); 
      });
    };
    
    setTimeout(() => { 
      const interval = setInterval(createFallingRosePetal, 4500);
      return () => clearInterval(interval);
    }, 4000);

    return () => {
      particlesContainer.innerHTML = '';
      if (petalFallContainer) {
        petalFallContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          height: 100vh;
          width: 100vw;
          background: linear-gradient(45deg, #fbb3ff, #ffffff, #fbb3ff);
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #particles-container {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 1;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          background-color: rgba(255, 105, 180, 0.3);
          border-radius: 50%;
          filter: blur(15px);
          bottom: -200px;
          animation: move-particles linear infinite;
        }

        @keyframes move-particles {
          from { transform: translateY(0); }
          to { transform: translateY(-120vh); }
        }

        .scene-container {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          padding-top: 10vh;
          padding-bottom: 5vh;
        }

        .text {
          position: relative;
          color: #c9204b;
          font-size: clamp(3rem, 10vw, 5rem);
          font-family: 'Great Vibes', cursive;
          font-weight: bold;
          text-shadow: 0 0 15px rgba(245, 148, 184, 1);
          animation: fadeInText 3s ease-in 2.5s forwards;
          opacity: 0;
          z-index: 20;
          text-align: center;
        }
        
        #rose-petals-fall-container {
          position: absolute;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          pointer-events: none;
          overflow: hidden;
          z-index: 5;
        }

        .falling-rose-petal {
          position: absolute;
          background: #d52d58;
          width: 60px; height: 75px;
          border-radius: 15px 50%;
          opacity: 0.9;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
        }
        .falling-rose-petal.fall-left { animation: petalFallLeft 12s linear forwards; }
        .falling-rose-petal.fall-right { animation: petalFallRight 12s linear forwards; }

        .rose {
          position: relative;
          width: 300px;
          height: 500px;
          z-index: 10;
          animation: grow 3s cubic-bezier(0.4, 0, 0.2, 1) forwards, 
                     swayTheWholeRose 8s ease-in-out infinite 3.2s;
          transform-origin: bottom;
          clip-path: inset(100% 0 0 0);
        }
        
        .petals {
          position: relative;
          width: 100%;
          height: 200px;
          animation: gentleSway 6s ease-in-out infinite 3.5s;
          transform-origin: bottom center;
          z-index: 10;
        }
        
        .petals > div { position: absolute; background: #d52d58; width: 60px; height: 80px; transition: all 0.5s ease-out; }
        .petals > div:nth-child(1) { border-radius: 10px; box-shadow: 0 0 20px rgba(245, 148, 184, 0.6); left: calc(50% - 30px); top: 40px; background: #d52d58; z-index: 3; animation: bloom-center 2s ease-out 1.5s forwards, glowing 2.5s ease-in-out infinite 2s; }
        .petals > div:nth-child(2), .petals > div:nth-child(4) { background: #b81b43; left: calc(50% - 50px); border-radius: 0 30px 0 30px; transform-origin: bottom right; }
        .petals > div:nth-child(3), .petals > div:nth-child(5) { background: #b81b43; left: calc(50% - 10px); border-radius: 30px 0 30px 0; transform-origin: bottom left; }
        .petals > div:nth-child(2) { top: 45px; height: 85px; z-index: 5; animation: bloom2 3s ease-in-out 1.7s forwards, glowing 2.5s ease-in-out infinite 2.2s; }
        .petals > div:nth-child(3) { top: 45px; height: 85px; z-index: 5; animation: bloom3 3s ease-in-out 1.7s forwards, glowing 2.5s ease-in-out infinite 2.2s; }
        .petals > div:nth-child(4) { top: 45px; height: 90px; z-index: 4; animation: bloom4 3s ease-in-out 1.9s forwards, glowing 2.5s ease-in-out infinite 2.4s; }
        .petals > div:nth-child(5) { top: 45px; height: 90px; z-index: 4; animation: bloom5 3s ease-in-out 1.9s forwards, glowing 2.5s ease-in-out infinite 2.4s; }
        .petals > div:nth-child(6) { top: 40px; height: 85px; z-index: 2; animation: bloom6 3s ease-in-out 2.1s forwards, glowing 2.5s ease-in-out infinite 2.6s; background: #c9204b; left: calc(50% - 40px); border-radius: 0 20px 0 20px; transform-origin: bottom right; }
        .petals > div:nth-child(7) { top: 40px; height: 85px; z-index: 2; animation: bloom7 3s ease-in-out 2.1s forwards, glowing 2.5s ease-in-out infinite 2.6s; background: #c9204b; left: calc(50% - 20px); border-radius: 20px 0 20px 0; transform-origin: bottom left; }
        
        .calyx {
          position: absolute;
          top: 109px;
          left: calc(50% - 5px);
          transform: translateX(-50%);
          z-index: 15;
        }
        .calyx > div { position: absolute; width: 25px; height: 55px; background: linear-gradient(to top, #054c05, #228b22); transform-origin: bottom center; clip-path: polygon(50% 0%, 100% 70%, 75% 100%, 25% 100%, 0% 70%); box-shadow: 0 0 5px rgba(0,0,0,0.3); }
        .calyx > div:nth-child(1) { transform: rotate(-60deg); left: -22px; top: -5px; }
        .calyx > div:nth-child(2) { transform: rotate(-20deg); left: -12px; }
        .calyx > div:nth-child(3) { transform: rotate(18deg); left: 2px; }
        .calyx > div:nth-child(4) { transform: rotate(55deg); left: 12px; top: -5px; }

        .stem-bundle {
          position: absolute;
          width: 100%; height: 100%;
          bottom: 0; left: 0;
          z-index: 4;
        }
        .stem { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 10px; height: calc(100% - 120px); background: #054c05; border-radius: 0 0 50px 50px; }
        .leaves > div:nth-child(1) { position: absolute; width: 40px; height: 70px; border-radius: 5px 40px 20px 40px; background: #054c05; transform-origin: bottom; transform: rotate(-30deg); top: 265px; left: calc(51% - 40px); box-shadow: inset 5px 5px #066406; }
        .leaves > div:nth-child(2) { position: absolute; width: 40px; height: 70px; border-radius: 40px 0 40px 20px; background: #054c05; transform-origin: bottom; transform: rotate(30deg); top: 220px; left: 48%; box-shadow: inset -5px 5px #066406; }
        .thorns > div { position: absolute; width: 0; height: 0; }
        .thorns > div:nth-child(odd) { border: 5px solid transparent; border-left: 5px solid #054c05; left: calc(50% + 5px); }
        .thorns > div:nth-child(even) { border: 5px solid transparent; border-right: 5px solid #054c05; left: calc(50% - 15px); }
        .thorns > div:nth-child(1) { top: 300px; }
        .thorns > div:nth-child(2) { top: 250px; }
        
        @keyframes grow { 
          0% { clip-path: inset(100% 0 0 0); opacity: 0; transform: translateY(50px); } 
          70% { opacity: 1; } 
          100% { clip-path: inset(0 0 0 0); opacity: 1; transform: translateY(0); } 
        }
        @keyframes fadeInText { to { opacity: 1; } }
        @keyframes bloom-center { from { transform: scale(0.5); } to { transform: scale(1); } }
        @keyframes bloom2 { 100% { transform: rotate(-25deg); } }
        @keyframes bloom3 { 100% { transform: rotate(25deg); } }
        @keyframes bloom4 { 100% { transform: rotate(-15deg); } }
        @keyframes bloom5 { 100% { transform: rotate(15deg); } }
        @keyframes bloom6 { 100% { transform: rotate(-10deg); } }
        @keyframes bloom7 { 100% { transform: rotate(10deg); } }
        @keyframes glowing { 50% { background: #e6426d; box-shadow: 0 0 30px rgba(245, 148, 184, 0.8); } }
        @keyframes gentleSway { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(2deg); } }
        
        @keyframes swayTheWholeRose {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(0) rotate(4deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(0) rotate(-4deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }

        @keyframes petalFallLeft { 0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 1; } 50%  { transform: translateY(50vh) rotate(180deg) translateX(-10vw); } 100% { transform: translateY(110vh) rotate(360deg) translateX(-15vw); opacity: 0; } }
        @keyframes petalFallRight { 0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 1; } 50%  { transform: translateY(50vh) rotate(-180deg) translateX(10vw); } 100% { transform: translateY(110vh) rotate(-360deg) translateX(15vw); opacity: 0; } }
        
        @media (max-width: 600px) {
          .scene-container {
            padding-bottom: 20vh;
          }
          .rose { width: 250px; height: 400px; }
          .petals > div { width: 50px; height: 70px; }
          
          .petals > div:nth-child(1) { top: 20px; }
          .petals > div:nth-child(2), 
          .petals > div:nth-child(3),
          .petals > div:nth-child(4),
          .petals > div:nth-child(5) { top: 25px; }
          .petals > div:nth-child(6),
          .petals > div:nth-child(7) { top: 20px; }

          .calyx { 
            top: 88px;
          }
          .stem-bundle .stem { height: calc(100% - 100px); }
          .stem-bundle .leaves > div:nth-child(1) { top: 180px; }
          .stem-bundle .leaves > div:nth-child(2) { top: 160px; }
          .stem-bundle .thorns > div:nth-child(1) { top: 220px; }
          .stem-bundle .thorns > div:nth-child(2) { top: 190px; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        @keyframes heartBeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.3); }
          70% { transform: scale(1); }
        }

        @keyframes pulse {
          0% { 
            filter: drop-shadow(0 0 20px rgba(255, 20, 147, 0.8)) brightness(1);
            transform: scale(1);
          }
          50% { 
            filter: drop-shadow(0 0 40px rgba(255, 20, 147, 1)) brightness(1.3);
            transform: scale(1.05);
          }
          100% { 
            filter: drop-shadow(0 0 20px rgba(255, 20, 147, 0.8)) brightness(1);
            transform: scale(1);
          }
        }

        .heart-beat {
          animation: heartBeat 1.3s infinite, pulse 2s infinite;
          display: inline-block;
        }
      `}</style>

      <link 
        rel="preconnect" 
        href="https://fonts.googleapis.com"
      />
      <link 
        rel="preconnect" 
        href="https://fonts.gstatic.com" 
        crossOrigin="anonymous"
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" 
        rel="stylesheet"
      />

      <div className="fixed inset-0 z-50 overflow-hidden" style={{ background: 'linear-gradient(45deg, #fbb3ff, #ffffff, #fbb3ff)' }}>
        <div id="particles-container"></div>
        <div id="rose-petals-fall-container"></div>
        
        <div className="scene-container">
          <div className="text flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-4 lg:gap-8">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-center leading-relaxed max-w-2xl">Une peluche pour la Saint-Valentin ?<br/>Parce que l'amour mérite plus qu'un souvenir éphémère.<br/>Clique sur ce cœur pour découvrir si tu acceptes d'être ma Valentine</span> 
            <span className="heart-beat cursor-pointer text-6xl sm:text-7xl lg:text-8xl transition-all duration-500 hover:scale-150 hover:rotate-12 hover:drop-shadow-2xl hover:filter hover:brightness-125 active:scale-125 relative z-30 animate-bounce mt-4 sm:mt-0" onClick={handleHeartClick} style={{
          filter: 'drop-shadow(0 0 30px rgba(255, 20, 147, 1))',
          animation: 'heartBeat 1.3s infinite, pulse 2s infinite, bounce 2s infinite'
        }}>❤️</span>
          </div>
          
          <div className="rose">
            <div className="petals">
              <div></div> <div></div> <div></div>
              <div></div> <div></div> <div></div> <div></div>
            </div>
            <div className="calyx">
              <div></div> <div></div> <div></div> <div></div>
            </div>
            <div className="stem-bundle">
              <div className="stem"></div>
              <div className="leaves">
                <div></div> <div></div>
              </div>
              <div className="thorns">
                <div></div> <div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Box */}
        {showMessage && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div id="message-box" className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-8 mx-2 sm:mx-4 max-w-sm sm:max-w-md animate-fade-in shadow-2xl border-3 border-pink-300 relative">
              {/* Bouton de fermeture */}
              <button
                onClick={handleCloseMessage}
                className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors z-20"
              >
                ✕
              </button>
              
              <p className="text-pink-600 text-sm sm:text-lg mb-4 sm:mb-6 leading-relaxed mt-2 sm:mt-4" style={{ fontFamily: 'cursive', fontSize: '16px', lineHeight: '1.6' }}>
                Depuis que je t'ai rencontré(e), chaque jour semble plus lumineux. 
                Ton sourire illumine ma journée et ta présence rend tout plus beau. 
                Tu es la personne la plus incroyable que je connaisse, et je me demande...
              </p>
              
              <p className="text-red-500 text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center" style={{ fontFamily: 'cursive' }}>
                Veux-tu être ma Valentin (e) ? 💕
              </p>
              
              <div id="button-container" className="flex gap-4 sm:gap-6 justify-center relative h-16 sm:h-20">
                <button
                  onClick={handleYesClick}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 z-10 text-sm sm:text-base"
                >
                  OUI ! 💖
                </button>
                
                <button
                  onMouseEnter={handleNoButtonHover}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-all duration-300 shadow-lg text-sm sm:text-base"
                  style={{
                    position: 'absolute',
                    left: noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'auto' : `${noButtonPosition.x}px`,
                    top: noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'auto' : `${noButtonPosition.y}px`,
                  }}
                >
                  Non
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rose at bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
          <div className="rose scale-50">
            <div className="petals">
              <div></div> <div></div> <div></div>
              <div></div> <div></div> <div></div> <div></div>
            </div>
            <div className="calyx">
              <div></div> <div></div> <div></div> <div></div>
            </div>
            <div className="stem-bundle">
              <div className="stem"></div>
              <div className="leaves">
                <div></div> <div></div>
              </div>
              <div className="thorns">
                <div></div> <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 