import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Copy, Check, Share2, MessageCircle, Mail, User, ChevronDown } from 'lucide-react';

const LoveMessagePage = () => {
  const navigate = useNavigate();
  const { messageId } = useParams();
  const [step, setStep] = useState<'initial' | 'compose' | 'options' | 'share' | 'view'>('initial');
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMessage, setViewMessage] = useState('');
  const [viewSender, setViewSender] = useState<{ name: string | null; isAnonymous: boolean } | null>(null);
  const [showOfferNotification, setShowOfferNotification] = useState(false);
  
  // Nouvelles options
  const [senderName, setSenderName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showSocialDrawer, setShowSocialDrawer] = useState(false);

  // Encoder le message avec les métadonnées
  const encodeMessage = (msg: string, name: string, anon: boolean): string => {
    const data = {
      message: msg,
      sender: anon ? null : name,
      isAnonymous: anon
    };
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  };

  // Décoder le message depuis Base64
  const decodeMessage = (encoded: string): { message: string; sender: string | null; isAnonymous: boolean } | null => {
    try {
      const decoded = decodeURIComponent(escape(atob(encoded)));
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  };



  const handleSendMessage = () => {
    if (message.trim().length === 0) return;
    setStep('options');
  };



  const handleFinishOptions = () => {
    if (!isAnonymous && senderName.trim().length === 0) {
      alert('Veuillez entrer un nom ou choisir anonyme');
      return;
    }

    const encoded = encodeMessage(message, senderName, isAnonymous);
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

  const handleOfferResponse = (accepted: boolean) => {
    navigate('/landing-page');
  };

  // Vue affichage du message reçu
  if (messageId && !viewMessage) {
    const decodedData = decodeMessage(messageId);
    
    if (!decodedData || !decodedData.message || decodedData.message.trim().length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-3 sm:p-4">
          <div className="text-center text-white">
            <Heart className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 text-pink-300" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Message invalide</h2>
            <p className="text-pink-200 mb-4 sm:mb-6 text-sm sm:text-base">Ce lien ne contient pas un message valide.</p>
            <button
              onClick={() => navigate('/landing-page')}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors text-sm sm:text-base"
            >
              Retour au landing
            </button>
          </div>
        </div>
      );
    }

    setViewMessage(decodedData.message);
    setViewSender({
      name: decodedData.sender,
      isAnonymous: decodedData.isAnonymous
    });
  }

  // Vue lecture du message - Responsive
  if (viewMessage && viewSender) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="text-center mb-6 sm:mb-8">
            <Heart className="w-10 sm:w-12 h-10 sm:h-12 mx-auto text-pink-500 mb-3 sm:mb-4 animate-pulse" />
            <h1 className="text-xl sm:text-3xl font-bold text-pink-600 mb-2">Un message d'amour pour toi 💌</h1>
          </div>



          {/* Nom du sender - Responsive */}
          {!viewSender.isAnonymous && viewSender.name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-pink-600 font-semibold text-base sm:text-lg mb-4 sm:mb-6"
            >
              De la part de: {viewSender.name} 💕
            </motion.p>
          )}

          {viewSender.isAnonymous && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-gray-500 italic text-xs sm:text-sm mb-4 sm:mb-6"
            >
              📮 Message anonyme
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 min-h-32 sm:min-h-48 flex items-center justify-center"
          >
            <p className="text-sm sm:text-lg text-gray-800 text-center leading-relaxed whitespace-pre-wrap">
              {viewMessage}
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setShowOfferNotification(true)}
            className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            J'ai lu ❤️
          </motion.button>

          {showOfferNotification && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 sm:mt-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 sm:p-6 border-2 border-pink-300"
            >
              <p className="text-center text-gray-800 mb-3 sm:mb-4 font-semibold text-sm sm:text-base">
                Voulez-vous lui offrir une peluche pour renforcer votre lien? 🧸
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleOfferResponse(true)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Oui, je veux! 💝
                </button>
                <button
                  onClick={() => handleOfferResponse(false)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
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

  // Vue initiale - demande si envoyer un message - Responsive
  if (step === 'initial') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6 sm:mb-8"
          >
            <Heart className="w-16 sm:w-20 h-16 sm:h-20 mx-auto text-pink-300" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Message d'Amour ✨
          </h1>

          <p className="text-pink-100 text-base sm:text-lg mb-6 sm:mb-8">
            Voulez-vous envoyer un message d'amour à votre partenaire?
          </p>

          <div className="flex flex-col gap-3 sm:gap-4">
            <button
              onClick={() => setStep('compose')}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Oui, je veux! 💌
            </button>

            <button
              onClick={() => navigate('/landing-page')}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-pink-300 text-pink-100 rounded-full font-bold text-base sm:text-lg hover:bg-pink-500/20 transition-all duration-300"
            >
              Non, retour au menu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Vue composition du message - Responsive
  if (step === 'compose') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-2">
              Écrivez votre message d'amour 💕
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Exprimez vos sentiments de manière sincère et touchante.</p>
          </div>

          <div className="mb-6 sm:mb-8">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.substring(0, 500))}
              placeholder="Écris ici ton message d'amour..."
              maxLength={500}
              className="w-full h-48 sm:h-64 p-4 border-2 border-pink-200 rounded-2xl focus:border-pink-500 focus:outline-none resize-none text-gray-700 text-sm sm:text-base bg-pink-50/50"
            />
            <div className="mt-2 flex items-center justify-between">
              <p className={`text-xs sm:text-sm ${
                message.length >= 450 ? 'text-red-500 font-semibold' : 
                message.length >= 400 ? 'text-orange-500' : 
                'text-gray-500'
              }`}>
                {message.length} / 500 caractères
              </p>
              {message.length >= 450 && (
                <p className="text-xs text-red-500">⚠️ Limite approche</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setStep('initial')}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-medium transition-colors text-sm sm:text-base"
            >
              Annuler
            </button>
            <button
              onClick={handleSendMessage}
              disabled={message.trim().length === 0}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              title={message.trim().length === 0 ? 'Écrivez un message pour continuer' : ''}
            >
              <Send className="w-4 h-4" />
              Envoyer
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Vue options du message
  if (step === 'options') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-2">
              Avant d'envoyer... 💭
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Personnalisez votre message d'amour!</p>
          </div>

          {/* Option Anonymat - Responsive */}
          <div className="mb-6 sm:mb-8">
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
              />
              <span className="text-base sm:text-lg text-gray-700 font-medium">📮 Envoyer en anonyme</span>
            </label>

            {!isAnonymous && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Votre nom ou pseudo:
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Entrez votre nom..."
                    className="w-full p-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none text-gray-700 text-sm"
                  />
                </div>
              </motion.div>
            )}
          </div>



          {/* Résumé du message - Responsive */}
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-pink-50 rounded-2xl border-2 border-pink-200">
            <p className="text-xs text-gray-600 mb-2 font-semibold">APERÇU:</p>
            <div className="text-xs sm:text-sm text-gray-700 bg-white rounded-lg p-3 max-h-24 sm:max-h-32 overflow-y-auto">
              {message.substring(0, 150)}{message.length > 150 ? '...' : ''}
            </div>
          </div>

          {/* Boutons action - Responsive */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setStep('compose')}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-medium transition-colors text-sm sm:text-base"
            >
              ← Retour
            </button>
            <button
              onClick={handleFinishOptions}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Send className="w-4 h-4" />
              Continuer
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Vue partage du lien - Responsive
  if (step === 'share') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl text-center max-h-[90vh] overflow-y-auto"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6 sm:mb-8"
          >
            <Heart className="w-12 sm:w-16 h-12 sm:h-16 mx-auto text-pink-500" />
          </motion.div>

          <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-3 sm:mb-4">
            Message créé avec succès! 🎉
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Votre lien est prêt à être partagé. Il sera valide pendant 7 jours.
          </p>

          <div className="mb-6 p-4 bg-pink-50 rounded-2xl border-2 border-pink-200">
            <p className="text-sm text-gray-600 mb-3 font-semibold">Votre lien unique:</p>
            
            {/* Lien - Responsive */}
            <div className="flex gap-2 items-center mb-4 flex-col sm:flex-row">
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 p-3 bg-white border border-pink-300 rounded-lg text-xs sm:text-sm text-pink-600 font-medium hover:bg-pink-50 hover:border-pink-500 transition-colors truncate text-center sm:text-left"
              >
                {generatedLink}
              </a>
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copié!' : 'Copier'}
              </button>
            </div>

            {/* Bouton Partager - Responsive */}
            <button
              onClick={() => setShowSocialDrawer(!showSocialDrawer)}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-3"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Partager sur réseaux</span>
              <span className="sm:hidden">Partager</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSocialDrawer ? 'rotate-180' : ''}`} />
            </button>

            {/* Drawer de partage social - Responsive */}
            <AnimatePresence>
              {showSocialDrawer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-b from-pink-100 to-purple-100 rounded-lg p-4 border-2 border-pink-200"
                >
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold mb-3 text-center">
                    Partager sur vos réseaux favoris:
                  </p>
                  
                  {/* Grille responsive - 2 cols mobile, 3 cols desktop */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent('Regarde ce message d\'amour! 💌 ' + generatedLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:?subject=Un message d'amour&body=Je t'ai créé un message spécial: ${generatedLink}`}
                      className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </a>
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(generatedLink)}&text=Regarde ce message d'amour!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium"
                    >
                      <Send className="w-4 h-4" />
                      <span>Telegram</span>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium"
                    >
                      <span>Facebook</span>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Je t\'ai créé un message d\'amour! 💌')} ${generatedLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium"
                    >
                      <span>Twitter</span>
                    </a>
                    <a
                      href={`https://www.instagram.com/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium"
                    >
                      <span>Instagram</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 text-center">
            💡 Conseil: Utilisez le drawer "Partager" ci-dessus pour diffuser votre message facilement
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setStep('initial');
                setMessage('');
                setGeneratedLink('');
                setShowSocialDrawer(false);
              }}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Envoyer un autre message 💌
            </button>
            <button
              onClick={() => navigate('/landing-page')}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-medium transition-colors text-sm sm:text-base"
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
