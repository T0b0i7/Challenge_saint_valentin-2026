import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Play, HelpCircle, Package, Gift, DollarSign, ShieldCheck, Star, Zap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSectionRouting } from '@/hooks/useSectionRouting';

export const FloatingMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { scrollToSection } = useSectionRouting();

  return (
    <>
      {/* Bouton flottant TOUJOURS visible */}
      <div className="fixed top-4 left-4 z-[9999]">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-pink-200"
          aria-label="Menu navigation"
        >
          <Home className="w-5 h-5 text-pink-600" />
        </button>
      </div>

      {/* Menu déroulant */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 min-w-max max-w-xs sm:max-w-md border border-pink-200 z-[9999]"
          >
            <nav className="space-y-2">
              <button
                onClick={() => {
                  scrollToSection('hero');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3 text-sm"
              >
                <Play className="w-4 h-4" />
                <span>Hero</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('why');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3 text-sm"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Pourquoi l'offrir ?</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('product');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3 text-sm"
              >
                <Package className="w-4 h-4" />
                <span>Produit</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('benefits');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3 text-sm"
              >
                <Gift className="w-4 h-4" />
                <span>Bénéfices</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('pricing');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3 text-sm"
              >
                <DollarSign className="w-4 h-4" />
                <span>Pricing</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('reassurance');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3 text-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Garanties</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('testimonials');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3 text-sm"
              >
                <Star className="w-4 h-4" />
                <span>Avis clients</span>
              </button>
              <button
                onClick={() => {
                  scrollToSection('cta');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-100 transition-colors text-pink-600 font-medium flex items-center gap-3 text-sm"
              >
                <Zap className="w-4 h-4" />
                <span>Dernier CTA</span>
              </button>
              <div className="border-t border-pink-200 my-2" />
              <button
                onClick={() => {
                  navigate('/love-message');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold flex items-center gap-3 transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:scale-105 hover:shadow-lg animate-pulse border-2 border-pink-300 shadow-md text-sm"
              >
                <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" />
                <span>Message d'Amour ✨</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
