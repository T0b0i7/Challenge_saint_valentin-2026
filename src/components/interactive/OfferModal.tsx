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
  name: string;
  email: string;
  phone: string;
  address: string;
  delivery: string;
  offer: string;
  paymentMethod: string;
}

interface Offer {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  features: string[];
  badge?: string;
  popular?: boolean;
  image: string;
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
    badge: 'POPULAIRE',
    image: '/src/assets/images/pelluche_produit.jpg'
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
    popular: true,
    image: '/src/assets/images/pelluche_produit.jpg'
  }
];

interface OfferModalProps {
  isOpen: boolean;
  selectedOfferId: string | null;
  onClose: () => void;
}

export const OfferModal = ({ isOpen, selectedOfferId, onClose }: OfferModalProps) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    delivery: '',
    offer: '',
    paymentMethod: 'card'
  });

  const handleSelectOffer = (offerId: string) => {
    setShowCheckout(true);
    setFormData(prev => ({ ...prev, offer: offerId }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation de traitement
    const selectedOfferData = offers.find(offer => offer.id === selectedOfferId);
    const offerName = selectedOfferData?.name || 'Standard';
    const totalPrice = selectedOfferData?.price || 45000;
    const generatedOrderNumber = `PEL-${Date.now()}`;
    
    setOrderNumber(generatedOrderNumber);
    
    alert(`Commande confirmée!\n\nOffre: ${offerName}\nTotal: ${totalPrice.toLocaleString('fr-FR')} FCFA\n\nUn email de confirmation vous sera envoyé à ${formData.email}`);
    
    // Téléchargement de la facture
    downloadInvoice(generatedOrderNumber);
    
    // Fermer le modal et réinitialiser
    setTimeout(() => {
      onClose();
      setShowCheckout(false);
      setOrderNumber(null);
    }, 500);
  };

  const downloadInvoice = async (orderId: string) => {
    const selectedOfferData = offers.find(offer => offer.id === selectedOfferId);
    const offerName = selectedOfferData?.name || 'Standard';
    const totalPrice = selectedOfferData?.price || 45000;
    const imageUrl = selectedOfferData?.image || '';
    
    const invoiceData: InvoiceData = {
      offer: offerName,
      price: `${totalPrice.toLocaleString('fr-FR')} FCFA`,
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      date: new Date().toLocaleDateString('fr-FR'),
      orderNumber: orderId,
      paymentMethod: formData.paymentMethod
    };

    // Générer le contenu du QR code (données de commande)
    const qrContent = `Commande: ${invoiceData.orderNumber}\nMontant: ${invoiceData.price}\nClient: ${invoiceData.customerName}\nEmail: ${invoiceData.email}`;

    // Créer un document PDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Titre
    doc.setFontSize(18);
    doc.setTextColor(255, 20, 147); // Rose
    doc.text('FACTURE ÉTERNITÉ AMOUR', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Ligne de séparation
    doc.setDrawColor(255, 20, 147);
    doc.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 10;

    // Numéro de commande et date
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Commande: ${invoiceData.orderNumber}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Date: ${invoiceData.date}`, 20, yPosition);
    yPosition += 15;

    // Section Client
    doc.setFontSize(12);
    doc.setTextColor(255, 20, 147);
    doc.text('CLIENT:', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nom: ${invoiceData.customerName}`, 25, yPosition);
    yPosition += 6;
    doc.text(`Email: ${invoiceData.email}`, 25, yPosition);
    yPosition += 6;
    doc.text(`Téléphone: ${invoiceData.phone}`, 25, yPosition);
    yPosition += 6;
    doc.text(`Adresse: ${invoiceData.address}`, 25, yPosition);
    yPosition += 12;

    // Section Article avec Image
    doc.setFontSize(12);
    doc.setTextColor(255, 20, 147);
    doc.text('ARTICLE:', 20, yPosition);
    yPosition += 8;
    
    // Essayer d'ajouter l'image
    try {
      const img = new Image();
      img.onload = () => {
        doc.addImage(img, 'JPEG', 25, yPosition, 30, 30);
      };
      img.src = imageUrl;
      yPosition += 35;
    } catch (error) {
      console.log('Erreur chargement image');
      yPosition += 5;
    }
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(invoiceData.offer, 25, yPosition);
    yPosition += 6;
    doc.text(`Prix: ${invoiceData.price}`, 25, yPosition);
    yPosition += 12;

    // Section Livraison
    doc.setFontSize(12);
    doc.setTextColor(255, 20, 147);
    doc.text('LIVRAISON:', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Avant le 14 février 2026', 25, yPosition);
    yPosition += 12;

    // Section Paiement
    doc.setFontSize(12);
    doc.setTextColor(255, 20, 147);
    doc.text('PAIEMENT:', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const paymentText = invoiceData.paymentMethod === 'card' ? 'Carte bancaire' : 'Espèces';
    doc.text(paymentText, 25, yPosition);
    yPosition += 15;

    // Code QR
    doc.setFontSize(10);
    doc.setTextColor(255, 20, 147);
    doc.text('Code de vérification:', 20, yPosition);
    yPosition += 8;

    // Générer le code QR et l'ajouter au PDF
    const qrElement = document.createElement('div');
    qrElement.style.padding = '10px';
    qrElement.style.backgroundColor = 'white';
    
    // Créer temporairement le QR code hors de l'écran
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    
    // Utiliser ReactDOM pour créer le QR code - mais on va utiliser la méthode simple avec jsPDF
    // On va créer un code QR en utilisant une API externe ou une approche alternative
    // Pour simplifier, on va utiliser une version texte encodée en base64
    
    // En attendant, on va ajouter au moins le numéro de commande
    doc.setFontSize(9);
    doc.text(`Réf: ${invoiceData.orderNumber}`, 25, yPosition);
    yPosition += 8;
    doc.text(`Email: ${invoiceData.email}`, 25, yPosition);

    // Ligne de séparation finale
    yPosition = pageHeight - 30;
    doc.setDrawColor(255, 20, 147);
    doc.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 10;

    // Message de remerciement
    doc.setFontSize(11);
    doc.setTextColor(255, 20, 147);
    doc.text('MERCI POUR VOTRE CONFIANCE !', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("L'amour est le plus beau des cadeaux", pageWidth / 2, yPosition, { align: 'center' });

    // Télécharger le PDF
    doc.save(`facture_${invoiceData.orderNumber}.pdf`);
  };

  const selectedOfferData = offers.find(offer => offer.id === selectedOfferId);

  return (
    <AnimatePresence>
      {isOpen && selectedOfferId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {showCheckout ? 'Finaliser votre commande' : 'Choisissez votre offre'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {!showCheckout ? (
                /* Sélection des offres */
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {offers.map((offer) => (
                    <motion.div
                      key={offer.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSelectOffer(offer.id)}
                      className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        selectedOfferId === offer.id
                          ? 'border-[#FF1493] bg-[#FF1493]/5'
                          : 'border-gray-200 hover:border-[#FF1493] bg-white'
                      }`}
                    >
                      {offer.badge && (
                        <div className="absolute -top-3 -right-3">
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            offer.badge === 'LIMITÉE'
                              ? 'bg-red-500 text-white'
                              : 'bg-orange-500 text-white'
                          }`}>
                            {offer.badge}
                          </span>
                        </div>
                      )}

                      {offer.popular && (
                        <div className="absolute -top-3 -left-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        </div>
                      )}

                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-3">
                          {offer.name}
                        </h3>
                        
                        {/* Image de l'offre */}
                        {offer.image && (
                          <div className="mb-4">
                            <img 
                              src={offer.image} 
                              alt={offer.name}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="text-2xl font-bold text-[#FF1493]">
                            {offer.price.toLocaleString('fr-FR')} FCFA
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {offer.originalPrice.toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {offer.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3"
                          >
                            <Heart className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        type="button"
                        className="w-full mt-4"
                        onClick={() => handleSelectOffer(offer.id)}
                      >
                        {offer.popular ? 'CHOISIR CETTE OFFRE' : 'Sélectionner'}
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
                    
                    {/* Image du produit */}
                    {selectedOfferData?.image && (
                      <div className="mb-6 text-center">
                        <img 
                          src={selectedOfferData.image} 
                          alt={selectedOfferData.name}
                          className="w-full max-w-xs h-auto rounded-lg shadow-md mx-auto"
                        />
                      </div>
                    )}
                    
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

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF1493] focus:border-transparent"
                        placeholder="Votre nom et prénom"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF1493] focus:border-transparent"
                        placeholder="votre.email@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF1493] focus:border-transparent"
                        placeholder="+226 XX XX XX XX XX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse de livraison *
                      </label>
                      <textarea
                        required
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF1493] focus:border-transparent"
                        placeholder="Votre adresse complète"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Voulez-vous être livré ? *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="delivery"
                            value="yes"
                            checked={formData.delivery === 'yes'}
                            onChange={(e) => setFormData(prev => ({ ...prev, delivery: e.target.value }))}
                            className="mr-2"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="delivery"
                            value="no"
                            checked={formData.delivery === 'no'}
                            onChange={(e) => setFormData(prev => ({ ...prev, delivery: e.target.value }))}
                            className="mr-2"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-[#FF1493] hover:bg-[#FF0000] text-white"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Confirmer la commande
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => orderNumber && downloadInvoice(orderNumber)}
                      className="flex-1"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Télécharger la facture
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfferModal;
