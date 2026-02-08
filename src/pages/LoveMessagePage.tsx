import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Send, Copy, Check, Share2, MessageCircle, Mail } from 'lucide-react';

const LoveMessagePage = () => {
  const navigate = useNavigate();
  const { messageId } = useParams();
  const [step, setStep] = useState<'initial' | 'compose' | 'share' | 'view'>('initial');
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMessage, setViewMessage] = useState('');
  const [showOfferNotification, setShowOfferNotification] = useState(false);

  // Encoder le message en Base64
  const encodeMessage = (msg: string): string => {
    return btoa(unescape(encodeURIComponent(msg)));
  };

  // Décoder le message depuis Base64
  const decodeMessage = (encoded: string): string => {
    try {
      return decodeURIComponent(escape(atob(encoded)));
    } catch (e) {
      return '';
    }
  };

  const handleSendMessage = () => {
    if (message.trim().length === 0) return;

    const encoded = encodeMessage(message);
    const link = `${window.location.origin}/love-message/${encoded}`;
    setGeneratedLink(link);
    setStep('share');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const messageText = 'J\'ai créé un message spécial pour toi! 💌';
    const shareText = `${messageText} ${generatedLink}`;

    // Options de partage
    const shareOptions = [
      {
        name: 'WhatsApp',
        action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
      },
      {
        name: 'Telegram',
        action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(generatedLink)}&text=${encodeURIComponent(messageText)}`, '_blank')
      },
      {
        name: 'Email',
        action: () => window.location.href = `mailto:?subject=${encodeURIComponent('Un message d\'amour pour toi 💌')}&body=${encodeURIComponent(shareText)}`
      },
      {
        name: 'Facebook',
        action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink)}`, '_blank')
      },
      {
        name: 'Twitter',
        action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(messageText)}&url=${encodeURIComponent(generatedLink)}`, '_blank')
      }
    ];

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Un message d\'amour pour toi 💌',
          text: messageText,
          url: generatedLink,
        });
      } catch (err) {
        console.log('Partage annulé:', err);
      }
    } else {
      // Menu de sélection du réseau social
      const selected = shareOptions[0]; // Défaut WhatsApp
      selected.action();
    }
  };

  const generateQRCode = (url: string): string => {
    const encodedUrl = encodeURIComponent(url);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`;
  };

  const handleOfferResponse = (accepted: boolean) => {
    navigate('/landing-page');
  };

  // Vue affichage du message reçu
  if (messageId && !viewMessage) {
    const decodedMsg = decodeMessage(messageId);
    
    if (!decodedMsg || decodedMsg.trim().length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <Heart className="w-16 h-16 mx-auto mb-4 text-pink-300" />
            <h2 className="text-2xl font-bold mb-2">Message invalide</h2>
            <p className="text-pink-200 mb-6">Ce lien ne contient pas un message valide.</p>
            <button
              onClick={() => navigate('/landing-page')}
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors"
            >
              Retour au landing
            </button>
          </div>
        </div>
      );
    }

    setViewMessage(decodedMsg);
  }

  // Vue lecture du message
  if (viewMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 mx-auto text-pink-500 mb-4 animate-pulse" />
            <h1 className="text-3xl font-bold text-pink-600 mb-2">Un message d'amour pour toi 💌</h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 mb-8 min-h-48 flex items-center justify-center"
          >
            <p className="text-lg text-gray-800 text-center leading-relaxed whitespace-pre-wrap">
              {viewMessage}
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setShowOfferNotification(true)}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
          >
            J'ai lu ❤️
          </motion.button>

          {showOfferNotification && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-300"
            >
              <p className="text-center text-gray-800 mb-4 font-semibold">
                Voulez-vous lui offrir une peluche pour renforcer votre lien? 🧸
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleOfferResponse(true)}
                  className="flex-1 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors"
                >
                  Oui, je veux! 💝
                </button>
                <button
                  onClick={() => handleOfferResponse(false)}
                  className="flex-1 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
                >
                  Non merci
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // Vue initiale - demande si envoyer un message
  if (step === 'initial') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <Heart className="w-20 h-20 mx-auto text-pink-300" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Galerie d'Amour ✨
          </h1>

          <p className="text-pink-100 text-lg mb-8">
            Voulez-vous envoyer un message d'amour à votre partenaire?
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setStep('compose')}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Oui, je veux! 💌
            </button>

            <button
              onClick={() => navigate('/landing-page')}
              className="px-8 py-4 bg-transparent border-2 border-pink-300 text-pink-100 rounded-full font-bold text-lg hover:bg-pink-500/20 transition-all duration-300"
            >
              Non, retour au menu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Vue composition du message
  if (step === 'compose') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-2">
              Écrivez votre message d'amour 💕
            </h2>
            <p className="text-gray-600">Exprimez vos sentiments de manière sincère et touchante.</p>
          </div>

          <div className="mb-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écris ici ton message d'amour..."
              className="w-full h-64 p-4 border-2 border-pink-200 rounded-2xl focus:border-pink-500 focus:outline-none resize-none text-gray-700 bg-pink-50/50"
            />
            <p className="mt-2 text-sm text-gray-500">
              {message.length} caractères
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('initial')}
              className="flex-1 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-medium transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSendMessage}
              disabled={message.trim().length === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Envoyer
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Vue partage du lien
  if (step === 'share') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <Heart className="w-16 h-16 mx-auto text-pink-500" />
          </motion.div>

          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            Message créé avec succès! 🎉
          </h2>

          <p className="text-gray-600 mb-6">
            Votre lien est prêt à être partagé. Il sera valide pendant 7 jours.
          </p>

          <div className="mb-6 p-4 bg-pink-50 rounded-2xl border-2 border-pink-200">
            <p className="text-sm text-gray-600 mb-3 font-semibold">Votre lien unique:</p>
            <div className="flex gap-2 items-center mb-4">
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 bg-white border border-pink-300 rounded-lg text-sm text-pink-600 font-medium hover:bg-pink-50 hover:border-pink-500 transition-colors truncate"
              >
                {generatedLink}
              </a>
              <button
                onClick={handleCopyLink}
                className="px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors flex items-center gap-2 flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* QR Code */}
            {generatedLink && (
              <div className="mb-4 flex flex-col items-center">
                <p className="text-xs text-gray-600 mb-2">Ou scannez ce QR code:</p>
                <img 
                  src={generateQRCode(generatedLink)}
                  alt="QR Code"
                  className="w-32 h-32 border-2 border-pink-300 rounded-lg p-2 bg-white"
                />
              </div>
            )}

            {/* Bouton Partager natif */}
            <button
              onClick={handleShare}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-3"
            >
              <Share2 className="w-4 h-4" />
              Partager directement
            </button>

            {/* Boutons de partage réseaux sociaux */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent('Regarde ce message d\'amour! 💌 ' + generatedLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:?subject=Un message d'amour&body=Je t'ai créé un message spécial: ${generatedLink}`}
                className="flex items-center justify-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(generatedLink)}&text=Regarde ce message d'amour!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <span>Facebook</span>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Je t\'ai créé un message d\'amour! 💌')} ${generatedLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <span>Twitter</span>
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(generatedLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Partagez votre message sur vos réseaux sociaux favoris:
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setStep('initial');
                setMessage('');
                setGeneratedLink('');
              }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              Envoyer un autre message 💌
            </button>
            <button
              onClick={() => navigate('/landing-page')}
              className="flex-1 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-medium transition-colors"
            >
              Retour au landing
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
};

export default LoveMessagePage;
