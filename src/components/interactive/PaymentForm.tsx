import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, QrCode, Check, ArrowLeft, Shield, Truck, Gift, ChevronDown, ArrowUp, Download, FileText, Image, AlertCircle, Info, Globe } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

// Icônes personnalisées pour les méthodes de paiement
const MoovMoneyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FF6B35"/>
    <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const WaveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#00D4AA"/>
    <path d="M6 12c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4-1-4-3z" fill="white"/>
    <path d="M14 12c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4-1-4-3z" fill="white" opacity="0.7"/>
  </svg>
);

const OrangeMoneyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#FF6900"/>
    <path d="M12 6l6 6-6 6-6-6 6-6z" fill="white"/>
    <circle cx="12" cy="12" r="3" fill="#FF6900"/>
  </svg>
);

const MTNMoneyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#FFB900"/>
    <path d="M12 4L8 8v4l4 4 4-4V8l-4-4z" fill="white"/>
    <path d="M12 8v4" stroke="#FFB900" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="10" r="1" fill="#FFB900"/>
  </svg>
);

const StripeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#635BFF"/>
    <path d="M6 12h12M8 10v4M12 10v4M16 10v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PayPalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#00457C"/>
    <path d="M8 8h8l-1 4H7l1-4z" fill="white"/>
    <path d="M7 12h8l-1 4H6l1-4z" fill="#FFB900"/>
  </svg>
);

interface PaymentFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'moov-money' | 'wave' | 'orange-money' | 'mtn-money' | 'stripe' | 'paypal';
  cardNumber?: string;
  cardExpiry?: string;
  cardCVV?: string;
}

interface PaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  productName: string;
}

export const PaymentForm = ({ isOpen, onClose, amount, productName }: PaymentFormProps) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'moov-money'
  });
  
  const [showInvoice, setShowInvoice] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Marquer le champ comme touché
    setTouchedFields(prev => new Set(prev).add(name));
  };

  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
  };

  const getFieldError = (fieldName: string) => {
    if (!touchedFields.has(fieldName)) return '';
    
    switch (fieldName) {
      case 'fullName':
        return !formData.fullName.trim() ? 'Le nom complet est requis' : '';
      case 'email':
        if (!formData.email.trim()) return 'L\'adresse email est requise';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'L\'adresse email n\'est pas valide';
        return '';
      case 'phone':
        if (!formData.phone.trim()) return 'Le numéro de téléphone est requis';
        
        // Nettoyer le numéro (garder seulement les chiffres)
        const cleanPhone = formData.phone.replace(/\D/g, '');
        
        // Vérifier le minimum de 8 chiffres (très souple)
        if (cleanPhone.length < 8) return 'Minimum 8 chiffres requis';
        
        return '';
      case 'address':
        return !formData.address.trim() ? 'L\'adresse de livraison est requise' : '';
      default:
        return '';
    }
  };

  const generateInvoice = () => {
    const invoiceNumber = `FAC-${Date.now()}`;
    const currentDate = new Date().toLocaleDateString('fr-FR');
    
    return {
      invoiceNumber,
      date: currentDate,
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      productName,
      amount,
      paymentMethod: formData.paymentMethod,
      status: 'En attente de paiement'
    };
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.fullName.trim()) {
      errors.push('Le nom complet est requis');
    }
    
    if (!formData.email.trim()) {
      errors.push('L\'adresse email est requise');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('L\'adresse email n\'est pas valide');
    }
    
    if (!formData.phone.trim()) {
      errors.push('Le numéro de téléphone est requis');
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.push('Le numéro de téléphone n\'est pas valide');
    }
    
    if (!formData.address.trim()) {
      errors.push('L\'adresse de livraison est requise');
    }
    
    return errors;
  };

  const handlePayment = async () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      // Afficher les erreurs avec des notifications professionnelles
      errors.forEach((error, index) => {
        setTimeout(() => {
          toast.error(error, {
            duration: 4000,
            position: 'top-right',
            icon: <AlertCircle className="w-4 h-4" />,
            description: 'Veuillez corriger cette information pour continuer'
          });
        }, index * 200); // Délai entre chaque notification
      });
      
      // Mettre en évidence les champs invalides
      const firstErrorField = document.querySelector('input[name="fullName"], input[name="email"], input[name="phone"], textarea[name="address"]') as HTMLInputElement | HTMLTextAreaElement;
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
      return;
    }

    setIsProcessing(true);
    
    // Notification de début de traitement
    toast.info('Traitement du paiement en cours...', {
      duration: 2000,
      position: 'top-right',
      icon: <Info className="w-4 h-4" />,
    });
    
    // Simuler le traitement du paiement
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setShowInvoice(true);
      
      // Notification de succès
      toast.success('Paiement traité avec succès !', {
        duration: 5000,
        position: 'top-right',
        description: 'Votre facture a été générée ci-dessous',
      });
    }, 2000);
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      paymentMethod: 'moov-money'
    });
    setShowInvoice(false);
    setPaymentSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const downloadInvoice = async (format: 'pdf' | 'image') => {
    const invoiceElement = document.getElementById('invoice-content');
    if (!invoiceElement) return;

    try {
      if (format === 'pdf') {
        // Générer PDF avec html2canvas + jsPDF
        const canvas = await html2canvas(invoiceElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`facture-${invoice.invoiceNumber}.pdf`);
      } else {
        // Générer image avec html2canvas
        const canvas = await html2canvas(invoiceElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const link = document.createElement('a');
        link.download = `facture-${invoice.invoiceNumber}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    }
  };

  if (!isOpen) return null;

  const invoice = generateInvoice();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-h-[95vh] overflow-hidden mx-4 sm:mx-auto sm:max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">Paiement Sécurisé</h2>
                  <p className="text-xs sm:text-sm opacity-90">Protection 256-bit SSL</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-slate-100 relative">
            {/* Navigation rapide */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 p-2 sm:p-3 z-10 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 sm:gap-2">
                  <button
                    onClick={() => scrollToSection('personal-info')}
                    className="px-2 py-1 sm:px-3 sm:py-1 text-xs bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition-colors"
                  >
                    Infos
                  </button>
                  <button
                    onClick={() => scrollToSection('payment-method')}
                    className="px-2 py-1 sm:px-3 sm:py-1 text-xs bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition-colors"
                  >
                    Paiement
                  </button>
                  <button
                    onClick={() => scrollToSection('payment-button')}
                    className="px-2 py-1 sm:px-3 sm:py-1 text-xs bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition-colors"
                  >
                    Valider
                  </button>
                </div>
                <button
                  onClick={() => scrollToSection('top')}
                  className="p-1 sm:p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Formulaire de paiement */}
            <div className="p-4 sm:p-6" id="top">
              <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-2 sm:gap-3 bg-amber-100 text-amber-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Paiement 100% Sécurisé</span>
                    <span className="sm:hidden">Sécurisé</span>
                  </div>
                </div>

                {/* Scroll indicator - seulement sur mobile */}
                <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mb-4 sm:hidden">
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                  <span>Faites défiler</span>
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>

                {/* Informations personnelles */}
                <div className="space-y-3 sm:space-y-4" id="personal-info">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">Informations Personnelles</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nom Complet *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          onBlur={() => handleFieldBlur('fullName')}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-sm ${
                            getFieldError('fullName') 
                              ? 'border-red-300 bg-red-50' 
                              : touchedFields.has('fullName') && formData.fullName.trim()
                              ? 'border-green-300 bg-green-50'
                              : 'border-slate-300'
                          }`}
                          placeholder="Jean Dupont"
                        />
                        {getFieldError('fullName') && (
                          <div className="absolute right-3 top-3">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          </div>
                        )}
                      </div>
                      {getFieldError('fullName') && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {getFieldError('fullName')}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={() => handleFieldBlur('email')}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-sm ${
                            getFieldError('email') 
                              ? 'border-red-300 bg-red-50' 
                              : touchedFields.has('email') && !getFieldError('email')
                              ? 'border-green-300 bg-green-50'
                              : 'border-slate-300'
                          }`}
                          placeholder="jean.dupont@email.com"
                        />
                        {getFieldError('email') && (
                          <div className="absolute right-3 top-3">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          </div>
                        )}
                      </div>
                      {getFieldError('email') && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {getFieldError('email')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={() => handleFieldBlur('phone')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-sm ${
                          getFieldError('phone') 
                            ? 'border-red-300 bg-red-50' 
                            : touchedFields.has('phone') && !getFieldError('phone')
                            ? 'border-green-300 bg-green-50'
                            : 'border-slate-300'
                        }`}
                        placeholder="🇧🇯 +229 01 90 12 34 56 (Bénin)"
                      />
                      {getFieldError('phone') && (
                        <div className="absolute right-3 top-3">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {getFieldError('phone') && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {getFieldError('phone')}
                      </p>
                    )}
                    {!getFieldError('phone') && touchedFields.has('phone') && (
                      <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Numéro valide
                      </p>
                    )}
                    {!touchedFields.has('phone') && (
                      <p className="mt-1 text-xs text-slate-500">
                        Format: 🇧🇯 +229 01 90 12 34 56 (Bénin)
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Adresse de Livraison *
                    </label>
                    <div className="relative">
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        onBlur={() => handleFieldBlur('address')}
                        rows={3}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all resize-none text-sm ${
                          getFieldError('address') 
                            ? 'border-red-300 bg-red-50' 
                            : touchedFields.has('address') && !getFieldError('address')
                            ? 'border-green-300 bg-green-50'
                            : 'border-slate-300'
                        }`}
                        placeholder="123 Rue de l'Amour, Abidjan, Côte d'Ivoire"
                      />
                      {getFieldError('address') && (
                        <div className="absolute right-3 top-3">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {getFieldError('address') && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {getFieldError('address')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Méthode de paiement */}
                <div id="payment-method">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">Méthode de Paiement</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'moov-money', name: 'Moov Money', color: 'orange', icon: <MoovMoneyIcon />, gradient: 'from-orange-400 to-orange-600' },
                      { id: 'wave', name: 'Wave', color: 'green', icon: <WaveIcon />, gradient: 'from-teal-400 to-cyan-600' },
                      { id: 'orange-money', name: 'Orange Money', color: 'orange', icon: <OrangeMoneyIcon />, gradient: 'from-orange-500 to-red-600' },
                      { id: 'mtn-money', name: 'MTN Money', color: 'yellow', icon: <MTNMoneyIcon />, gradient: 'from-yellow-400 to-amber-600' },
                      { id: 'stripe', name: 'Stripe', color: 'purple', icon: <StripeIcon />, gradient: 'from-purple-500 to-indigo-600' },
                      { id: 'paypal', name: 'PayPal', color: 'blue', icon: <PayPalIcon />, gradient: 'from-blue-500 to-blue-700' }
                    ].map((method) => (
                      <motion.button
                        key={method.id}
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id as any }))}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 overflow-hidden group ${
                          formData.paymentMethod === method.id
                            ? 'border-transparent shadow-lg scale-105'
                            : 'border-slate-200 hover:border-slate-300 hover:shadow-md hover:scale-102'
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        
                        {/* Selection indicator */}
                        {formData.paymentMethod === method.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                        
                        <div className="relative flex flex-col items-center gap-2">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center shadow-lg`}>
                            {method.icon}
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-slate-800 text-sm">{method.name}</div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Bouton de paiement */}
                <div id="payment-button">
                  <motion.button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Button content */}
                    <div className="relative flex items-center justify-center gap-3">
                      {isProcessing ? (
                        <>
                          <motion.div 
                            className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="text-sm sm:text-base">Traitement...</span>
                        </>
                      ) : (
                        <>
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          >
                            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                          <span>Payer {amount.toLocaleString()} FCFA</span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </div>

                {/* Sécurité */}
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-4">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs">Vos données protégées SSL 256-bit</span>
                </div>
              </div>
            </div>

            {/* Facture générée */}
            {showInvoice && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto p-4 sm:p-6"
              >
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 sm:p-6 border border-slate-200" id="invoice-content">
                  {/* En-tête facture avec boutons de téléchargement */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 pb-4 border-b border-slate-200 gap-4 sm:gap-0">
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800">Facture Proforma</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="text-xs sm:text-sm text-slate-500 font-mono">
                        {invoice.invoiceNumber}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadInvoice('pdf')}
                          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                          title="Télécharger en PDF"
                        >
                          <FileText className="w-5 h-5" />
                          <span className="hidden sm:inline">PDF</span>
                        </button>
                        <button
                          onClick={() => downloadInvoice('image')}
                          className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                          title="Télécharger en image"
                        >
                          <Image className="w-5 h-5" />
                          <span className="hidden sm:inline">Image</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Informations client et produit */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-700 mb-3 text-sm sm:text-base">Informations Client</h4>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Nom:</span>
                          <span className="text-slate-800 font-medium">{formData.fullName || '---'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Email:</span>
                          <span className="text-slate-800 font-medium">{formData.email || '---'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Téléphone:</span>
                          <span className="text-slate-800 font-medium">{formData.phone || '---'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Adresse:</span>
                          <span className="text-slate-800 font-medium text-right">{formData.address || '---'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-700 mb-3 text-sm sm:text-base">Détails Commande</h4>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Produit:</span>
                          <span className="text-slate-800 font-medium">{productName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Quantité:</span>
                          <span className="text-slate-800 font-medium">1 unité</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Montant:</span>
                          <span className="text-slate-800 font-bold text-base sm:text-lg">{amount.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Méthode:</span>
                          <span className="text-slate-800 font-medium capitalize">
                            {formData.paymentMethod === 'moov-money' ? 'Moov Money' : 
                             formData.paymentMethod === 'wave' ? 'Wave' : 
                             formData.paymentMethod === 'orange-money' ? 'Orange Money' :
                             formData.paymentMethod === 'mtn-money' ? 'MTN Money' :
                             formData.paymentMethod === 'stripe' ? 'Stripe' :
                             formData.paymentMethod === 'paypal' ? 'PayPal' : 'Inconnu'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statut et QR Code */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-3 text-sm sm:text-base">Statut Paiement</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                              paymentSuccess ? 'bg-green-500' : 'bg-amber-500 animate-pulse'
                            }`}></div>
                            <span className={`text-sm font-medium ${
                              paymentSuccess ? 'text-green-700' : 'text-amber-700'
                            }`}>
                              {paymentSuccess ? 'Paiement réussi' : 'En attente'}
                            </span>
                          </div>
                          
                          {paymentSuccess && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-2 text-green-600 text-sm"
                            >
                              <Check className="w-4 h-4" />
                              <span>Transaction validée</span>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <h4 className="font-semibold text-slate-700 mb-3 text-sm sm:text-base">Scanner pour Payer</h4>
                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg border-2 border-slate-200 w-full max-w-xs">
                          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                            <QrCode className="w-12 h-12 sm:w-16 sm:h-16 text-slate-700" />
                          </div>
                          <div className="text-xs text-slate-600 space-y-1 text-center">
                            <p className="font-medium">Référence: ETERNAL-LOVE-2026</p>
                            <div className="space-y-1">
                              <p>• Moov Money disponible</p>
                              <p>• Wave disponible</p>
                              <p>• Orange Money disponible</p>
                              <p>• MTN Money disponible</p>
                              <p>• Stripe disponible</p>
                              <p>• PayPal disponible</p>
                            </div>
                          </div>
                        </div>
                        
                        {!paymentSuccess && (
                          <button
                            onClick={handlePayment}
                            className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base w-full max-w-xs"
                          >
                            <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />
                            Confirmer le Paiement
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer facture */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 text-center">
                    <p className="text-xs sm:text-sm text-slate-500 mb-2">
                      Merci pour votre commande ! Cette peluche symbolise un amour éternel.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-slate-400">
                      <span>© 2026 Peluche Éternelle</span>
                      <span>•</span>
                      <span>support@peluche-eternelle.com</span>
                      <span>•</span>
                      <span>+221 123 456 789</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
