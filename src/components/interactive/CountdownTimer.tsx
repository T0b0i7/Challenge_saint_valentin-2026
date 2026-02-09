import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isValentinesDay, setIsValentinesDay] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const valentinesDay = new Date('2026-02-14T00:00:00');
      
      // Vérifier si c'est le jour J
      const isTodayValentinesDay = 
        now.getDate() === valentinesDay.getDate() &&
        now.getMonth() === valentinesDay.getMonth() &&
        now.getFullYear() === valentinesDay.getFullYear();

      setIsValentinesDay(isTodayValentinesDay);

      if (isTodayValentinesDay) {
        // Afficher "000000" le jour J
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const difference = valentinesDay.getTime() - now.getTime();
        
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000  * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Jours', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'Heures', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Secondes', value: String(timeLeft.seconds).padStart(2, '0') }
  ];

  // Si c'est le jour J, afficher la version spéciale
  if (isValentinesDay) {
    return (
      <>
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                textShadow: [
                  "0 0 10px rgba(236, 72, 153, 0.8)",
                  "0 0 20px rgba(236, 72, 153, 1)",
                  "0 0 30px rgba(236, 72, 153, 0.8)",
                  "0 0 10px rgba(236, 72, 153, 0.8)"
                ]
              }}
              transition={{ 
                duration: 1,
                delay: index * 0.2,
                textShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-2xl border-2 border-white/20 backdrop-blur-sm">
                <motion.div 
                  className="text-2xl sm:text-4xl md:text-6xl font-bold tabular-nums"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {unit.value}
                </motion.div>
                <div className="text-xs sm:text-sm md:text-base font-medium mt-1 sm:mt-2 opacity-90">
                  {unit.label}
                </div>
              </div>
              
              {/* Cœurs flottants autour du countdown */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2
                  }}
                  className="absolute text-2xl"
                  style={{ 
                    left: `${Math.random() * 120 - 60}px`, 
                    top: `${Math.random() * 120 - 60}px`,
                    zIndex: -1
                  }}
                >
                  {['💕', '❤️', '💖', '💗', '💝', '🌹'][i]}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border border-gray-200/50"
        >
          <div className="text-2xl sm:text-4xl md:text-6xl font-bold text-gray-800 tabular-nums">
            {unit.value}
          </div>
          <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium mt-1 sm:mt-2">
            <span className="text-xs sm:text-sm text-[#FF69B4] mt-2 font-body uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
