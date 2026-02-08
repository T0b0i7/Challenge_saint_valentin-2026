import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Package, Heart, Gift, Star, Truck, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';

interface InvoiceData {
  offer: string;
  price: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  orderNumber: string;
  paymentMethod: string;
}

interface FormData {
  offer: any;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Offer {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  features: string[];
  badge?: string;
  popular?: boolean;
}

const offers: Offer[] = [
  {
    id: 'standard',
    name: 'Offre Standard',
    price: 45000,
    originalPrice: 55000,
    features: [
      "Peluche premium 40cm",
      "Cœur brodé personnalisé",
      "Emballage cadeau luxe",
      "Carte de vœux calligraphiée",
      "Livraison offerte"
    ],
    badge: 'POPULAIRE'
  },
  {
    id: 'ultimate',
    name: 'Offre Ultime',
    price: 75000,
    originalPrice: 95000,
    features: [
      "Tout inclus dans Standard",
      "Message audio enregistrable",
      "Parfum personnalisé inclus",
      "Livraison express 24h garantie",
      "Coffret premium collector",
      "Certificat d'authenticité"
    ],
    badge: 'LIMITÉE',
    popular: true
  }
];

interface OfferModalProps {
  isOpen: boolean;
  selectedOfferId: string | null;
  onClose: () => void;
}

export const OfferModal = ({ isOpen, selectedOfferId, onClose }: OfferModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSelectOffer = (offerId: string) => {
    // Directement au formulaire de paiement
    setFormData(prev => ({ ...prev, offer: offerId }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      const orderNum = `HL${Date.now()}`;
      setOrderNumber(orderNum);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Fermer la modal après 3 secondes et afficher la demande de facture
      setTimeout(() => {
        setShowSuccess(false);
        setShowInvoiceModal(true);
      }, 3000);
    }, 2000);
  };

  const downloadInvoice = async (orderId: string) => {
    const selectedOfferData = offers.find(offer => offer.id === selectedOfferId);
    const offerName = selectedOfferData?.name || 'Standard';
    const totalPrice = selectedOfferData?.price || 45000;
    
    const invoiceData: InvoiceData = {
      offer: offerName,
      price: `${totalPrice.toLocaleString('fr-FR')} FCFA`,
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      date: new Date().toLocaleDateString('fr-FR'),
      orderNumber: orderId,
      paymentMethod: 'Paiement en ligne sécurisé'
    };

    // Créer le PDF
    const doc = new jsPDF();
    
    // En-tête de la facture
    doc.setFontSize(20);
    doc.setTextColor(255, 20, 147);
    doc.text('FACTURE', 105, 20, { align: 'center' });
    
    // Logo SVG simplifié
    doc.setFontSize(8);
    doc.setTextColor(255, 20, 147);
    doc.text('❤️ HUGGY LOVE ❤️', 105, 30, { align: 'center' });
    
    // Informations de l'entreprise
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Huggy Love', 20, 45);
    doc.text('Site: https://huggylove.netlify.app', 20, 50);
    doc.text('Email: contact@huggylove.com', 20, 55);
    
    // Informations client
    doc.text(`Numéro: ${invoiceData.orderNumber}`, 140, 45);
    doc.text(`Date: ${invoiceData.date}`, 140, 50);
    doc.text(`Client: ${invoiceData.customerName}`, 140, 55);
    
    // Ligne de séparation
    doc.setDrawColor(255, 20, 147);
    doc.line(20, 65, 190, 65);
    
    // Tableau des produits
    doc.setFontSize(12);
    doc.setTextColor(255, 20, 147);
    doc.text('DÉTAILS DE LA COMMANDE', 105, 80, { align: 'center' });
    
    // En-têtes du tableau
    doc.setDrawColor(200, 200, 200);
    doc.rect(20, 90, 170, 10);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Article', 25, 97);
    doc.text('Prix', 165, 97);
    
    // Contenu du tableau
    doc.setDrawColor(200, 200, 200);
    doc.rect(20, 100, 170, 10);
    doc.text(invoiceData.offer, 25, 107);
    doc.text(invoiceData.price, 165, 107);
    
    // Informations de livraison
    doc.setFontSize(12);
    doc.setTextColor(255, 20, 147);
    doc.text('INFORMATIONS DE LIVRAISON', 105, 130, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nom: ${invoiceData.customerName}`, 20, 140);
    doc.text(`Email: ${invoiceData.email}`, 20, 145);
    doc.text(`Téléphone: ${invoiceData.phone}`, 20, 150);
    doc.text(`Adresse: ${invoiceData.address}`, 20, 155);
    
    // Total
    doc.setFontSize(14);
    doc.setTextColor(255, 20, 147);
    doc.text(`TOTAL: ${invoiceData.price}`, 140, 170);
    
    // Méthode de paiement
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Méthode: ${invoiceData.paymentMethod}`, 20, 180);
    
    // Code QR simplifié
    doc.setDrawColor(0, 0, 0);
    doc.rect(150, 185, 40, 40);
    doc.setFontSize(8);
    doc.text('Code QR', 170, 205, { align: 'center' });
    doc.text('Vérification', 170, 210, { align: 'center' });
    
    // Signature
    doc.setFontSize(12);
    doc.setTextColor(255, 20, 147);
    doc.text('Merci pour votre confiance !', 105, 245, { align: 'center' });
    doc.text('Huggy Love - Fabriqué avec ❤️ au Bénin', 105, 255, { align: 'center' });
    
    // Sauvegarder le PDF
    doc.save(`facture-huggylove-${orderId}.pdf`);
  };

  const selectedOfferData = offers.find(offer => offer.id === selectedOfferId);

  return (
    <>
      {/* Modal principal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Choisissez votre offre
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Contenu */}
              {!formData.offer ? (
                /* Sélection des offres */
                <div className="grid md:grid-cols-2 gap-6">
                  {offers.map((offer) => (
                    <motion.div
                      key={offer.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                        offer.popular
                          ? 'border-pink-500 shadow-lg shadow-pink-200/50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                      onClick={() => handleSelectOffer(offer.id)}
                    >
                      {offer.badge && (
                        <div className="absolute -top-3 -right-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {offer.badge}
                        </div>
                      )}

                      {offer.popular && (
                        <div className="absolute -top-3 -left-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        </div>
                      )}

                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                          {offer.name}
                        </h3>
                        
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="text-2xl font-bold text-[#FF1493]">
                            {offer.price.toLocaleString('fr-FR')} FCFA
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {offer.originalPrice.toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {offer.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3"
                        onClick={() => handleSelectOffer(offer.id)}
                      >
                        Choisir cette offre
                      </Button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Formulaire de paiement */
                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  <div className="bg-gradient-to-r from-[#FF1493]/10 to-pink-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Récapitulatif de votre commande
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Offre sélectionnée</p>
                        <p className="font-semibold">{selectedOfferData?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total à payer</p>
                        <p className="text-2xl font-bold text-[#FF1493]">
                          {selectedOfferData?.price.toLocaleString('fr-FR')} FCFA
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Votre nom complet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="+229 XX XX XX XX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse de livraison
                      </label>
                      <textarea
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={3}
                        placeholder="Votre adresse complète"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de succès */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Commande réussie !
              </h3>
              <p className="text-gray-600 mb-4">
                Votre commande a été enregistrée avec succès
              </p>
              <p className="text-sm text-gray-500">
                Préparation de votre facture...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de demande de facture */}
      <AnimatePresence>
        {showInvoiceModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Télécharger votre facture ?
              </h3>
              <p className="text-gray-600 mb-6">
                Votre facture est prête à être téléchargée
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setShowInvoiceModal(false);
                    onClose();
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
                >
                  Non
                </button>
                <button
                  onClick={() => {
                    if (orderNumber) {
                      downloadInvoice(orderNumber);
                    }
                    setShowInvoiceModal(false);
                    onClose();
                  }}
                  className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Oui
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfferModal;
