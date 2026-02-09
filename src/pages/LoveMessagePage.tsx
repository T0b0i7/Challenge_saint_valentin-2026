import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Copy, Check, Share2, MessageCircle, Mail, User, ChevronDown } from 'lucide-react';
import * as LZ from 'lz-string';

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

  // Encoder le message avec les métadonnées - Compressé
  const encodeMessage = (msg: string, name: string, anon: boolean): string => {
    const data = {
      message: msg,
      sender: anon ? null : name,
      isAnonymous: anon
    };
    return LZ.compressToBase64(JSON.stringify(data));
  };

  // Décoder le message depuis Base64 compressé
  const decodeMessage = (encoded: string): { message: string; sender: string | null; isAnonymous: boolean } | null => {
    try {
      const decompressed = LZ.decompressFromBase64(encoded);
      if (!decompressed) return null;
      return JSON.parse(decompressed);
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
    const encodedForUrl = encodeURIComponent(encoded);
    const link = `${window.location.origin}/love-message/${encodedForUrl}`;
    console.log('Message encodé:', encoded);
    console.log('Message encodé pour URL:', encodedForUrl);
    console.log('Lien généré:', link);
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
    console.log('MessageId trouvé:', messageId);
    const decodedForUrl = decodeURIComponent(messageId);
    console.log('Message décodé de l\'URL:', decodedForUrl);
    const decodedData = decodeMessage(decodedForUrl);
    console.log('Données décodées:', decodedData);
    
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

  // Vue lecture du message - Responsive avec direction Saint-Valentin
  if (viewMessage && viewSender) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ background: 'linear-gradient(135deg, #FF1493 0%, #DC143C 100%)' }}>
        
        {/* Décoration de cœurs en arrière-plan (non flous) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.15, y: -50 }}
              animate={{ opacity: 0.15, y: 20, x: Math.sin(i) * 30 }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.5
              }}
              className="absolute text-6xl sm:text-8xl"
              style={{ 
                left: `${(i * 12.5)}%`,
                top: `${(i * 10)}%`
              }}
            >
              💗
            </motion.div>
          ))}
        </div>

        {/* Contenu principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-2xl relative z-10"
        >
          {/* En-tête avec titre */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-3 sm:mb-4"
            >
              <Heart className="w-12 h-12 sm:w-16 sm:h-16" style={{ color: '#FF1493' }} fill="#FF1493" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg"
            >
              Message d'amour 💌
            </motion.h1>
          </motion.div>

          {/* Lettres/Enveloppe principale */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="rounded-3xl shadow-2xl overflow-hidden backdrop-blur-0"
            style={{ background: '#FFFFFF' }}
          >
            {/* En-tête de la lettre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-5 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10 relative"
              style={{ background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)' }}
            >
              {/* Décoration coin */}
              <div className="absolute top-3 right-4 text-3xl sm:text-4xl opacity-30">💝</div>
              <div className="absolute bottom-3 left-4 text-2xl sm:text-3xl opacity-30">💕</div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-center relative z-10"
              >
                <h2 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-2">
                  Pour Toi ✨
                </h2>
                
                {!viewSender.isAnonymous && viewSender.name && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-white text-xs sm:text-sm lg:text-base italic font-light"
                  >
                    De: <span className="font-bold not-italic text-lg sm:text-xl">{viewSender.name}</span> 💕
                  </motion.p>
                )}
                
                {viewSender.isAnonymous && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-white/90 text-xs sm:text-sm italic"
                  >
                    📮 Message anonyme
                  </motion.p>
                )}
              </motion.div>
            </motion.div>

            {/* Séparateur décoratif */}
            <div style={{ background: 'linear-gradient(90deg, transparent, #FF1493, transparent)', height: '2px' }} />

            {/* Contenu du message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 min-h-64 sm:min-h-72 lg:min-h-80 flex items-center justify-center"
              style={{ background: '#F5F5F5' }}
            >
              <p className="text-gray-800 text-sm sm:text-base lg:text-lg font-light leading-relaxed sm:leading-loose text-center whitespace-pre-wrap break-words" style={{ maxWidth: '100%' }}>
                {viewMessage}
              </p>
            </motion.div>

            {/* Pied de lettre */}
            <div style={{ background: 'linear-gradient(90deg, transparent, #FF69B4, transparent)', height: '2px' }} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="px-5 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10"
              style={{ background: '#FFFFFF' }}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(255, 20, 147, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowOfferNotification(true)}
                className="w-full px-6 py-3 sm:py-4 lg:py-4 font-bold text-white rounded-full text-base sm:text-lg lg:text-lg transition-all duration-300 transform"
                style={{ background: 'linear-gradient(135deg, #FF1493 0%, #DC143C 100%)' }}
              >
                J'ai lu ❤️
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Notification de l'offre */}
          <AnimatePresence>
            {showOfferNotification && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.8 }}
                className="mt-6 sm:mt-8 lg:mt-10"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl p-5 sm:p-7 lg:p-8 shadow-2xl text-center"
                  style={{ background: '#FFFFFF' }}
                >
                  <motion.p
                    className="text-gray-800 mb-5 sm:mb-6 lg:mb-8 font-bold text-sm sm:text-base lg:text-lg leading-snug"
                  >
                    Voulez-vous lui offrir une peluche 🧸 pour renforcer votre lien?
                  </motion.p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOfferResponse(true)}
                      className="flex-1 px-5 sm:px-6 py-3 sm:py-4 text-white rounded-lg font-bold text-sm sm:text-base lg:text-base transition-all shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #FF1493 0%, #DC143C 100%)' }}
                    >
                      Oui, je veux! 💝
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOfferResponse(false)}
                      className="flex-1 px-5 sm:px-6 py-3 sm:py-4 text-white rounded-lg font-bold text-sm sm:text-base lg:text-base transition-all shadow-lg"
                      style={{ background: '#DC143C' }}
                    >
                      Non merci
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // Vue initiale - demande si envoyer un message - Responsive
  if (step === 'initial') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{ background: 'linear-gradient(135deg, #FF1493 0%, #DC143C 100%)' }}>
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
            <Heart className="w-16 sm:w-20 h-16 sm:h-20 mx-auto" style={{ color: '#FFFFFF' }} fill="#FFFFFF" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Galerie d'Amour 💌
          </h1>

          <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8 font-light">
            Voulez-vous envoyer un message d'amour à votre partenaire?
          </p>

          <div className="flex flex-col gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('compose')}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 text-white rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-lg"
              style={{ background: '#FFFFFF', color: '#FF1493' }}
            >
              Oui, je veux! 💌
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/landing-page')}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 border-2 text-white rounded-full font-bold text-base sm:text-lg transition-all duration-300"
              style={{ borderColor: '#FFFFFF', backgroundColor: 'transparent' }}
            >
              Non, retour au menu
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Vue composition du message - Responsive
  if (step === 'compose') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{ background: 'linear-gradient(135deg, #FF1493 0%, #DC143C 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          style={{ background: '#FFFFFF' }}
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#FF1493' }}>
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
              className="w-full h-48 sm:h-64 p-4 border-2 rounded-2xl focus:outline-none resize-none text-gray-700 text-sm sm:text-base"
              style={{ borderColor: '#FF1493', backgroundColor: '#F5F5F5' }}
            />
            <div className="mt-2 flex items-center justify-between">
              <p className={`text-xs sm:text-sm ${
                message.length >= 450 ? 'font-semibold' : ''
              }`}
              style={{ color: message.length >= 450 ? '#FF0000' : message.length >= 400 ? '#FF1493' : '#666666' }}>
                {message.length} / 500 caractères
              </p>
              {message.length >= 450 && (
                <p style={{ color: '#FF0000' }} className="text-xs">⚠️ Limite approche</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('initial')}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-gray-800 rounded-full font-medium transition-colors text-sm sm:text-base"
              style={{ backgroundColor: '#F5F5F5' }}
            >
              Annuler
            </motion.button>
            <motion.button
              whileHover={{ scale: message.trim().length > 0 ? 1.05 : 1 }}
              whileTap={{ scale: message.trim().length > 0 ? 0.95 : 1 }}
              onClick={handleSendMessage}
              disabled={message.trim().length === 0}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-white rounded-full font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              style={{ 
                background: message.trim().length > 0 ? 'linear-gradient(135deg, #FF1493 0%, #DC143C 100%)' : '#CCCCCC',
                opacity: message.trim().length > 0 ? 1 : 0.5,
                cursor: message.trim().length > 0 ? 'pointer' : 'not-allowed'
              }}
              title={message.trim().length === 0 ? 'Écrivez un message pour continuer' : ''}
            >
              <Send className="w-4 h-4" />
              Envoyer
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Vue options du message
  if (step === 'options') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{ background: 'linear-gradient(135deg, #FF1493 0%, #DC143C 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          style={{ background: '#FFFFFF' }}
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#FF1493' }}>
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
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{ background: 'linear-gradient(135deg, #FF1493 0%, #DC143C 100%)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl text-center max-h-[90vh] overflow-y-auto"
          style={{ background: '#FFFFFF' }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6 sm:mb-8"
          >
            <Heart className="w-12 sm:w-16 h-12 sm:h-16 mx-auto" style={{ color: '#FF1493' }} fill="#FF1493" />
          </motion.div>

          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#FF1493' }}>
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
