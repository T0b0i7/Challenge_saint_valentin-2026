import { useEffect } from 'react';

const ValentineQuestionPage = () => {
  useEffect(() => {
    // Rediriger vers le fichier HTML directement
    window.location.href = '/valentine-question.html';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-pink-600">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl">Chargement de la question Saint-Valentin...</p>
      </div>
    </div>
  );
};

export default ValentineQuestionPage;
