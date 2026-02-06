import { useEffect, useState } from 'react';
import { ValentinePrompt } from './ValentinePrompt';
import { ValentineYes } from './ValentineYes';

interface ValentinePreloaderProps {
  onAnimationEnd?: () => void;
}

export const ValentinePreloader = ({ onAnimationEnd }: ValentinePreloaderProps = {}) => {
  const [currentView, setCurrentView] = useState<'prompt' | 'yes'>('prompt');

  useEffect(() => {
    // Marquer la visite d'aujourd'hui (toujours)
    const today = new Date().toDateString();
    localStorage.setItem('valentine-visit', today);
  }, []);

  const handleYesClick = () => {
    setCurrentView('yes');
  };

  const handleAnimationComplete = () => {
    onAnimationEnd?.();
  };

  // Afficher l'animation en plein écran au-dessus de tout
  return (
    <div className="fixed inset-0 z-50 bg-white">
      {currentView === 'yes' ? (
        <ValentineYes onAnimationComplete={handleAnimationComplete} />
      ) : (
        <ValentinePrompt onYesClick={handleYesClick} />
      )}
    </div>
  );
};
