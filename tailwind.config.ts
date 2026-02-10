import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    screens: {
      "xs": "375px",    // Extra small phones (galaxy s8)
      "sm": "640px",    // Small phones
      "md": "768px",    // Tablets
      "lg": "1024px",   // Small laptops
      "xl": "1280px",   // Laptops
      "2xl": "1400px",  // Large screens
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "xs": "475px",    // Extra small phones
        "sm": "640px",    // Small phones
        "md": "768px",    // Tablets
        "lg": "1024px",   // Small laptops
        "xl": "1280px",   // Laptops
        "2xl": "1400px",  // Large screens
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Valentine Brief Colors - Exact HEX values
        valentine: {
          "red-vivid": "#FF0000",        // Rouge vif
          "valentine-pink": "#FF1493",   // Rose Saint-Valentin  
          "romantic-pink": "#FF69B4",    // Rose romantique
          "passion-red": "#DC143C",      // Rouge passion
          "white-pure": "#FFFFFF",       // Blanc pur
          "white-off": "#F5F5F5",       // Blanc cassé
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: {
            opacity: "0",
            transform: "scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.1)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.1)" },
          "70%": { transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "gradient-romantic": "var(--gradient-romantic)",
        "gradient-soft": "var(--gradient-soft)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-cta": "var(--gradient-cta)",
      },
      boxShadow: {
        romantic: "var(--shadow-romantic)",
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
        hover: "var(--shadow-hover)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
