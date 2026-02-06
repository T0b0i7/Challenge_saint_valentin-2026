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

  useEffect(() => {
    const valentinesDay = new Date('2026-02-14T23:59:59');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = valentinesDay.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Jours' },
    { value: timeLeft.hours, label: 'Heures' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Sec' },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="bg-[#F5F5F5]/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 min-w-[60px] sm:min-w-[80px] border-2 border-[#FF1493]/30">
            <motion.span
              key={unit.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="block text-2xl sm:text-4xl font-bold text-[#DC143C] font-display"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
          </div>
          <span className="text-xs sm:text-sm text-[#FF69B4] mt-2 font-body uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
