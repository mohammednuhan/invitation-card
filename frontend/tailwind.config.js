/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdf9ee",
          100: "#faf0d7",
          200: "#f4e0ac",
          300: "#eccb77",
          400: "#e3b54a",
          500: "#d4a03c",
          600: "#b9832c",
          700: "#946427",
          800: "#7a5226",
          900: "#684524"
        },
        cream: {
          50: "#fffefa",
          100: "#fdf9ee",
          200: "#f8f0dc",
          300: "#efe2c6"
        },
        rosegold: {
          300: "#ecc4b3",
          400: "#dfa890",
          500: "#cc8f75"
        },
        ink: {
          600: "#1d5945",
          700: "#164734",
          800: "#123f30",
          900: "#0b2a20",
          950: "#062018"
        }
      },
      fontFamily: {
        script: ["'Great Vibes'", "cursive"],
        display: ["'Playfair Display'", "serif"],
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["'Poppins'", "sans-serif"]
      },
      boxShadow: {
        gold: "0 10px 40px -10px rgba(212,160,60,0.45)",
        luxury: "0 20px 60px -15px rgba(11,42,32,0.35)",
        glow: "0 0 60px -10px rgba(227,181,74,0.55)"
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #d4a03c 0%, #f0d48a 50%, #b9832c 100%)"
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        "couple-sway": "coupleSway 11s ease-in-out infinite",
        "veil-flutter": "veilFlutter 6s ease-in-out infinite",
        "heart-pulse": "heartPulse 4.5s ease-in-out infinite",
        bokeh: "bokehTwinkle 8s ease-in-out infinite",
        kenburns: "kenburns 26s ease-in-out infinite alternate"
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.06) translate3d(0, -1.5%, 0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" }
        },
        coupleSway: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-2px) scale(1.004)" }
        },
        veilFlutter: {
          "0%, 100%": { transform: "rotate(0deg) skewX(0deg)" },
          "50%": { transform: "rotate(0.4deg) skewX(-0.4deg)" }
        },
        heartPulse: {
          "0%, 100%": { opacity: 0.35, transform: "scale(1)" },
          "50%": { opacity: 0.7, transform: "scale(1.08)" }
        },
        bokehTwinkle: {
          "0%, 100%": { opacity: 0.22 },
          "50%": { opacity: 0.5 }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        },
        pulseGold: {
          "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.08)" }
        }
      }
    }
  },
  plugins: []
};
