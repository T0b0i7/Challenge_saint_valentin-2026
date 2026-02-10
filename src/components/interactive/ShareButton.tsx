import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Facebook, Twitter, Instagram, Link2, Volume2, VolumeX, MessageCircle, Send, Linkedin, Music2, Pin, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonProps {
  className?: string;
}

export const ShareButton = ({ className = "" }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Gérer le son de la vidéo
  const toggleSound = () => {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // URLs de partage
  const shareUrl = "https://huggylove.netlify.app/";
  const shareText = "Découvrez Huggy Love - La peluche qui garde votre étreinte pour toujours ! 🐻💕";

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Twitter", 
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: `https://www.instagram.com/`,
      color: "bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
    },
    {
      name: "Telegram",
      icon: Send,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: "bg-cyan-500 hover:bg-cyan-600"
    },
    {
      name: "TikTok",
      icon: Music2,
      url: `https://www.tiktok.com/`,
      color: "bg-black hover:bg-gray-800"
    },
    {
      name: "Pinterest",
      icon: Pin,
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`,
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "bg-blue-800 hover:bg-blue-900"
    },
    {
      name: "Copier le lien",
      icon: Link2,
      url: shareUrl,
      color: "bg-gray-600 hover:bg-gray-700",
      action: "copy"
    }
  ];

  const handleShare = async (link: typeof shareLinks[0]) => {
    if (link.action === "copy") {
      try {
        await navigator.clipboard.writeText(link.url);
        toast.success("Lien copié avec succès !", {
          description: "Vous pouvez maintenant partager le lien",
          duration: 3000,
        });
      } catch (err) {
        console.error("Erreur lors de la copie:", err);
        toast.error("Erreur lors de la copie", {
          description: "Impossible de copier le lien",
        });
      }
    } else {
      window.open(link.url, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Bouton principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Share2 className="w-6 h-6" />
        
        {/* Badge de notification */}
        <motion.span
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          !
        </motion.span>
      </motion.button>

      {/* Panneau de partage */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-4 min-w-64 border border-pink-200"
          >
            {/* Bouton de contrôle du son */}
            <button
              onClick={toggleSound}
              className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 rounded-lg p-3 mb-3 transition-colors"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">Activer le son</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Couper le son</span>
                </>
              )}
            </button>

            {/* Lien du site */}
            <div className="bg-pink-50 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-600 mb-1">Lien du site :</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 text-xs bg-white border border-pink-200 rounded px-2 py-1 font-mono"
                />
                <button
                  onClick={() => handleShare(shareLinks[8])}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-xs transition-colors"
                >
                  Copier
                </button>
              </div>
            </div>

            {/* Séparateur */}
            <div className="border-t border-gray-200 my-3"></div>

            {/* Réseaux sociaux */}
            <div className="space-y-2">
              <p className="text-xs text-gray-600 font-medium mb-2">Partager sur :</p>
              {shareLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleShare(link)}
                  className={`w-full flex items-center gap-3 text-white rounded-lg p-3 transition-all duration-200 ${link.color}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
