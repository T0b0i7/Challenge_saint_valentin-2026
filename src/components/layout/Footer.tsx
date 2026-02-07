import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="font-display text-xl font-bold text-primary-foreground">
              Étreinte Éternelle
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              FAQ
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Contact
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              CGV
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Politique de confidentialité
            </a>
          </div>

          <p className="text-primary-foreground/40 text-sm">
            ©2026 Étreinte Éternelle. Créer par Eucher ABATTI avec{' '}
            <Heart className="w-3 h-3 inline text-primary" fill="currentColor" />{' '}
            au Bénin
          </p>
        </div>
      </div>
    </footer>
  );
};
