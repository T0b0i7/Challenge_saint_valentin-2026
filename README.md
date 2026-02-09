# 🎁 Eternal Embrace Maker - E-commerce Saint-Valentin

Une landing page e-commerce premium pour la Saint-Valentin avec animations sophistiquées, modal de paiement et génération de factures PDF.

## 📁 Structure du projet

```
src/
├── components/
│   ├── common/                # Composants partagés
│   │   ├── AnimatedTitle.tsx  # Titres animés avec typewriter
│   │   ├── LandingPage.tsx    # Page d'accueil principale
│   │   └── TransitionManager.tsx
│   ├── sections/              # Sections de la landing page
│   │   ├── HeroSection.tsx          # Vidéo + hero principal (autoplay/pause)
│   │   ├── WhySection.tsx           # Animation wave sur titres
│   │   ├── ProductSection.tsx       # Présentation produit
│   │   ├── BenefitsSection.tsx      # Avantages émotionnels
│   │   ├── PricingSection.tsx       # Pricing avec modal
│   │   ├── ReassuranceSection.tsx   # Garanties
│   │   ├── TestimonialsSection.tsx  # Avis clients
│   │   └── FinalCTASection.tsx      # Dernier CTA
│   ├── interactive/           # Composants interactifs
│   │   ├── OfferModal.tsx      # Modal d'offre + PDF
│   │   ├── CountdownTimer.tsx  # Compte à rebours
│   │   └── HeartbeatCanvas.tsx
│   ├── effects/               # Effets visuels
│   │   ├── FloatingHearts.tsx
│   │   ├── HeartCascade.tsx
│   │   ├── PetalRainBackground.tsx
│   │   └── ParticleRipple.tsx
│   └── ui/                    # Composants shadcn/ui
├── pages/
│   ├── Index.tsx              # Landing page
│   ├── HeartAnimationPage.tsx # Page d'animation cœur
│   └── ValentineQuestionPage.tsx
├── hooks/
│   ├── valentine/             # Hooks Valentine
│   └── ui/
├── lib/
│   └── utils.ts
└── assets/
    └── images/
        └── pelluche_produit.jpg
```

## 🚀 Technologies utilisées

- **React 18** + TypeScript
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations avancées
- **jsPDF v2.5.1** - Génération de factures PDF
- **Radix UI** + **shadcn/ui** - Composants UI accessibles
- **Lucide React** - Icônes
- **React Router v6** - Navigation

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Lancer les tests
npm run test
```

## 🎯 Fonctionnalités principales

### 🎬 Hero Section Dynamique
- **Vidéo d'arrière-plan** avec contrôle utilisateur
- **Démarrage en pause** - L'utilisateur décide quand jouer
- **Bouton Play/Pause** pour contrôle full video
- **Menu Navigation (Home icon)** avec 8 raccourcis :
  - ▶️ Hero
  - ❓ Pourquoi l'offrir ?
  - 📦 Produit
  - 🎁 Bénéfices
  - 💰 Pricing
  - ✅ Garanties
  - ⭐ Avis clients
  - ⚡ Dernier CTA
- **Icônes Lucide React** pour chaque menu item
- Vidéo réduite en opacité (0.6) et légèrement zoomée pour meilleure lisibilité

### 🛍️ Modal d'Offre avec PDF
- **2 offres** : Standard (45k FCFA) et Ultimate (75k FCFA)
- **Génération facture PDF** avec tousles détails
- Code de vérification alphanumérique unique
- Formulaire client complet
- Photos produit intégrées

### ✨ Animations de Titres (Wave Effect)
Les 7 sections principales ont des titres animés identiques :
- **Entrée** : Flip 3D (rotateX) avec stagger par mot
- **Glow continu** : Pulse rose/magenta autour des mots
- **Hover** : Ondulation fluide par lettre
- **Sortie** : Retour lisse à la position initiale

### 📱 Design Responsive
- Optimisé mobile, tablette et desktop
- Layout fluide et adaptatif
- Boutons et formulaires responsive

## 🎨 Thème et design

- Palette de couleurs romantique (Deep Pink #FF1493, Crimson #DC143C)
- Animations fluides avec Framer Motion
- Typographie élégante avec Dancing Script
- Effets de parallaxe et particules animées
- **Hero video** avec contrôle pause/play au scroll

## 🔧 Configuration Importante

### Fichiers vidéo Hero
- Localisation : `/public/` (racine du projet)
- Formats requis : MP4 + WebM (fallback)
- Noms : `I love you.mp4`, `I love you.webm`
- Contrôle : Autoplay avec son activé (muted=false)

### Modal d'Offre
- Intégrée dans PricingSection.tsx
- Génère PDF avec jsPDF
- Stockage client temporaire
- Téléchargement automatique

## 🌟 Sections animées avec Wave Effect

Tous les titres suivent le même pattern d'animation :

✨ **WhySection** - "Pourquoi l'offrir ?"
✨ **ProductSection** - "Chaque détail pensé avec amour"
✨ **BenefitsSection** - "Plus qu'une peluche, un témoin de votre histoire"
✨ **PricingSection** - "L'investissement le plus précieux : votre bonheur"
✨ **ReassuranceSection** - "Nous prenons soin de votre cœur comme du nôtre"
✨ **TestimonialsSection** - "Ils ont fait le choix de l'amour, et vous ?"
✨ **FinalCTASection** - "Parce que certaines étreintes ne devraient jamais s'arrêter"

## 💌 Message d'Amour - Messages d'Amour Interactifs

### Nouvelle Fonctionnalité (v3.0)

Une expérience unique pour envoyer des messages d'amour personnalisés à votre partenaire!

#### 🎯 Fonctionnalités:

1. **Menu Landing Page** - Accès via lien "Message d'Amour" dans le menu Home
2. **Composition** - Zone texte pour rédiger un message personnalisé
3. **Partage Intelligent** :
   - 🔗 **Lien unique** encodé en Base64 (pas de dépendance serveur)

   - 📤 **Partage natif** - Envoyer via WhatsApp, SMS, Mail en un clic

4. **Lecture du Message** :
   - Page dédiée avec interface romantique
   - Affichage élégant du message
   - Animation de présentation

5. **Proposition d'Offre** :
   - Après lecture → Question "Voulez-vous offrir une peluche?"
   - Réponse Oui/Non → Redirection vers landing page

#### 📋 Routes Ajoutées:
- `/love-message` - Interface de composition
- `/love-message/:messageId` - Affichage du message reçu

#### 💾 Système de Stockage:
- **Base64 encoding** pour URL compacte
- Aucune dépendance à localStorage ou serveur
- Fonction de décodage intégrée
- URL courte et partageable

#### 🛣️ Flux Utilisateur:
```
Landing Page (Menu) 
  ↓
Message d'Amour (demande)
  ↓
Composition du message
  ↓
Génération du lien partageable
  ↓
Partage (Copie/WhatsApp/Email/Réseaux sociaux)
  ↓
Destinataire clique le lien
  ↓
Lecture du message
  ↓
Proposition peluche
  ↓
Redirection landing page
```

---

*Mise à jour : 8 Février 2026 - Version 3.0 avec Message d'Amour et messages partagés*
