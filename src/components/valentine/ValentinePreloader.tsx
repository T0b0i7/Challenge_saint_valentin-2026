import { useEffect, useState } from 'react';
import { ValentinePrompt } from './ValentinePrompt';

interface ValentinePreloaderProps {
  onAnimationEnd?: () => void;
}

export const ValentinePreloader = ({ onAnimationEnd }: ValentinePreloaderProps = {}) => {
  const [showFlow, setShowFlow] = useState(true);

  useEffect(() => {
    // Marquer la visite d'aujourd'hui (toujours)
    const today = new Date().toDateString();
    localStorage.setItem('valentine-visit', today);
  }, []);

  const handleFlowComplete = () => {
    setShowFlow(false);
    onAnimationEnd?.();
  };

  // Afficher l'animation en plein écran au-dessus de tout
  return showFlow ? (
    <ValentinePrompt onYesClick={handleFlowComplete} />
  ) : null;
};
