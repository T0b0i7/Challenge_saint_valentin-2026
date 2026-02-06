# Eternal Embrace Maker

Un projet romantique interactif pour la Saint-Valentin avec animations et expériences immersives.

## 📁 Structure du projet

```
src/
├── components/
│   ├── ui/                    # Composants shadcn/ui (inchangé)
│   ├── layout/                # Composants de mise en page
│   │   ├── Footer.tsx
│   │   └── NavLink.tsx
│   ├── sections/              # Sections de la page principale
│   │   ├── HeroSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── ProductSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── WhySection.tsx
│   │   ├── ReassuranceSection.tsx
│   │   ├── FinalCTASection.tsx
│   │   └── HeartSyncSection.tsx
│   ├── valentine/             # Composants thématiques Saint-Valentin
│   │   ├── ValentinePreloader.tsx
│   │   ├── ValentinePrompt.tsx
│   │   ├── ValentineYes.tsx
│   │   └── animations/
│   │       ├── HeartDrawingAnimation.tsx
│   │       └── CurtainOpeningAnimation.tsx
│   ├── effects/               # Effets visuels et animations
│   │   ├── FloatingHearts.tsx
│   │   ├── HeartCascade.tsx
│   │   ├── HeartConfetti.tsx
│   │   ├── CursorHeartTrail.tsx
│   │   ├── ParticleRipple.tsx
│   │   ├── HangingLoveHearts.tsx
│   │   ├── PetalRainBackground.tsx
│   │   └── StarfieldBackground.tsx
│   ├── interactive/           # Composants interactifs
│   │   ├── BreathingPlush.tsx
│   │   ├── HeartbeatCanvas.tsx
│   │   ├── CountdownTimer.tsx
│   │   └── MorphingTransition.tsx
│   └── common/                # Composants réutilisables
│       ├── AnimatedTitle.tsx
│       ├── ParallaxSection.tsx
│       └── LandingPage.tsx
├── pages/                     # Pages de l'application
│   ├── HomePage.tsx
│   └── NotFound.tsx
├── hooks/                     # Hooks personnalisés
│   ├── ui/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   └── valentine/
│       ├── useHeartbeat.ts
│       └── useHeartbeatAudio.ts
├── assets/
│   └── images/                # Images et assets statiques
│       ├── plush-bear.jpg
│       ├── plush-bear-ribbon.jpg
│       └── plush-bunny.jpg
└── lib/                       # Utilitaires et fonctions partagées
    └── utils.ts
```

## 🚀 Technologies utilisées

- **React 18** avec TypeScript
- **Vite** comme bundler
- **Tailwind CSS** pour le style
- **shadcn/ui** pour les composants UI
- **Framer Motion** pour les animations
- **React Router** pour la navigation

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

- **Page d'accueil immersive** avec animations et effets visuels
- **Expérience Saint-Valentin** interactive avec préloader
- **Synchronisation cardiaque** avec effets visuels
- **Compte à rebours** et animations morphing
- **Design responsive** et optimisé

## 🎨 Thème et design

- Palette de couleurs romantique (rose, rouge passion)
- Animations fluides et micro-interactions
- Typographie élégante avec Dancing Script
- Effets de parallaxe et particules

---

*Projet réorganisé avec une structure logique et maintenable*
