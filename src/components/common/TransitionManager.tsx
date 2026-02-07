import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

// Import de toutes les animations de transition
import { Realistic3DCurtain } from '@/components/valentine/animations/Realistic3DCurtain';
import { HyperRealisticCurtainAnimation } from '@/components/valentine/animations/HyperRealisticCurtainAnimation';
import { FlowerBloomTransition } from '@/components/valentine/animations/FlowerBloomTransition';
import { MagicalPortalTransition } from '@/components/valentine/animations/MagicalPortalTransition';

// Types de transitions disponibles
export type TransitionType = 
  | 'curtain-3d'
  | 'curtain-hyper'
  | 'flower-bloom'
  | 'butterfly-wings'
  | 'magical-portal'
  | 'crystal-fracture'
  | 'holographic'
  | 'dna-unwind'
  | 'water-drop'
  | 'flames'
  | 'gift-unbox'
  | 'love-letter'
  | 'heart-lock'
  | 'circles'
  | 'geometric'
  | 'rainbow';

interface Transition {
  id: TransitionType;
  name: string;
  description: string;
  duration: number;
  component: React.ComponentType<any>;
}

// Configuration de toutes les transitions
export const TRANSITIONS: Transition[] = [
  {
    id: 'curtain-3d',
    name: 'Rideau 3D Réaliste',
    description: 'Rideau velours qui s\'ouvre en 3D depuis le centre',
    duration: 2800,
    component: Realistic3DCurtain
  },
  {
    id: 'curtain-hyper',
    name: 'Rideau Hyper-Réaliste',
    description: 'Version améliorée avec effets avancés',
    duration: 2200,
    component: HyperRealisticCurtainAnimation
  },
  {
    id: 'flower-bloom',
    name: 'Fleur qui s\'épanouit',
    description: 'Pétales de rose qui s\'ouvrent depuis le centre avec pollen doré',
    duration: 2500,
    component: FlowerBloomTransition
  },
  {
    id: 'magical-portal',
    name: 'Portail Magique',
    description: 'Vortex dimensionnel avec runes énergétiques et éclairs',
    duration: 3000,
    component: MagicalPortalTransition
  }
  // Les autres transitions seront ajoutées progressivement
];

interface TransitionManagerProps {
  isActive: boolean;
  transitionType?: TransitionType;
  onComplete: () => void;
  customProps?: Record<string, any>;
}

export const TransitionManager = ({ 
  isActive, 
  transitionType = 'curtain-3d', 
  onComplete,
  customProps = {}
}: TransitionManagerProps) => {
  const [currentTransition, setCurrentTransition] = useState<Transition | null>(null);

  // Trouver la transition appropriée
  useEffect(() => {
    const transition = TRANSITIONS.find(t => t.id === transitionType);
    if (transition) {
      setCurrentTransition(transition);
    }
  }, [transitionType]);

  // Gérer la complétion de l'animation
  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  if (!currentTransition || !isActive) return null;

  const TransitionComponent = currentTransition.component;

  return (
    <AnimatePresence onExitComplete={handleComplete}>
      <TransitionComponent 
        isActive={isActive} 
        onComplete={handleComplete}
        {...customProps}
      />
    </AnimatePresence>
  );
};

// Hook pour gérer les transitions entre pages
export const usePageTransitions = () => {
  const [currentTransition, setCurrentTransition] = useState<TransitionType>('curtain-3d');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback((transitionType?: TransitionType) => {
    if (transitionType) {
      setCurrentTransition(transitionType);
    }
    setIsTransitioning(true);
  }, []);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return {
    currentTransition,
    isTransitioning,
    startTransition,
    endTransition
  };
};

// Système de transitions aléatoires pour la variété
export const useRandomTransition = () => {
  const getRandomTransition = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * TRANSITIONS.length);
    return TRANSITIONS[randomIndex].id;
  }, []);

  return { getRandomTransition };
};
