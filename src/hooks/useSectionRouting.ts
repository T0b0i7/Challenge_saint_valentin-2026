import { useEffect } from 'react';

export const useSectionRouting = () => {
  useEffect(() => {
    // Gérer le scroll au chargement si il y a un hash dans l'URL
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Vérifier au chargement
    handleHashChange();

    // Écouter les changements de hash
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToSection = (id: string) => {
    // Mettre à jour l'URL avec le hash
    window.history.pushState(null, '', `/landing-page#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return { scrollToSection };
};
