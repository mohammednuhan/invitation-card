import React from "react";
import { motion } from "framer-motion";

export default function CoupleAnimation() {
  return (
    <div className="pointer-events-none relative h-[220px] w-[280px] sm:h-[280px] sm:w-[360px] md:h-[320px] md:w-[420px]">
      <svg
        viewBox="0 0 420 320"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="groomGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0d48a" />
            <stop offset="100%" stopColor="#b9832c" />
          </linearGradient>
          <linearGradient id="brideGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0d48a" />
            <stop offset="100%" stopColor="#d4a03c" />
          </linearGradient>
          <radialGradient id="coupleGlow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="rgba(227,181,74,0.15)" />
            <stop offset="100%" stopColor="rgba(227,181,74,0)" />
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <ellipse cx="210" cy="280" rx="160" ry="30" fill="url(#coupleGlow)" />

        {/* Groom silhouette */}
        <g opacity="0.85">
          {/* Groom body - sherwani/long coat */}
          <motion.path
            d="M150,130 L140,135 L125,280 L195,280 L180,135 Z"
            fill="url(#groomGrad)"
            opacity="0.25"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Groom sherwani detail */}
          <motion.path
            d="M140,135 L130,280 L145,280 L155,160 Z"
            fill="rgba(212,160,60,0.15)"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Groom head */}
          <motion.circle
            cx="163"
            cy="115"
            r="22"
            fill="url(#groomGrad)"
            opacity="0.3"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Groom cap/turban */}
          <motion.path
            d="M141,108 C141,93 155,82 163,80 C171,82 185,93 185,108 L180,112 L146,112 Z"
            fill="url(#groomGrad)"
            opacity="0.35"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Groom arm reaching towards bride */}
          <motion.path
            d="M180,155 C195,160 200,170 205,175"
            stroke="url(#groomGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.2"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* Bride silhouette */}
        <g opacity="0.85">
          {/* Bride dress - flowing */}
          <motion.path
            d="M235,140 L220,145 L195,280 L310,280 L285,145 Z"
            fill="url(#brideGrad)"
            opacity="0.25"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Bride dress drape detail */}
          <motion.path
            d="M285,145 L300,280 L310,280 L290,160 Z"
            fill="rgba(240,212,138,0.12)"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Bride dress inner glow */}
          <motion.path
            d="M240,160 L225,280 L270,280 L260,160 Z"
            fill="rgba(212,160,60,0.1)"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Bride head */}
          <motion.circle
            cx="257"
            cy="120"
            r="21"
            fill="url(#brideGrad)"
            opacity="0.3"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Bride dupatta/veil flowing */}
          <motion.path
            d="M237,110 C230,100 228,115 225,140 C222,165 215,200 210,230"
            stroke="url(#brideGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            opacity="0.15"
            animate={{ 
              y: [0, -3, 0],
              d: [
                "M237,110 C230,100 228,115 225,140 C222,165 215,200 210,230",
                "M237,110 C228,102 226,118 223,143 C220,168 213,203 208,233",
                "M237,110 C230,100 228,115 225,140 C222,165 215,200 210,230"
              ]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Bride hand */}
          <motion.path
            d="M235,155 C220,160 215,170 210,175"
            stroke="url(#brideGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.2"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </g>

        {/* Hearts between them */}
        <motion.g
          animate={{ 
            y: [0, -8, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M210,155 C210,150 205,145 200,145 C195,145 190,150 190,155 C190,165 210,175 210,175 C210,175 230,165 230,155 C230,150 225,145 220,145 C215,145 210,150 210,155 Z"
            fill="rgba(227,181,74,0.4)"
          />
        </motion.g>

        {/* Small floating hearts */}
        <motion.g
          animate={{ y: [0, -15, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <path
            d="M195,140 C195,138 193,136 191,136 C189,136 187,138 187,140 C187,144 195,148 195,148 C195,148 203,144 203,140 C203,138 201,136 199,136 C197,136 195,138 195,140 Z"
            fill="rgba(240,212,138,0.3)"
          />
        </motion.g>

        <motion.g
          animate={{ y: [0, -12, 0], opacity: [0, 0.3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
        >
          <path
            d="M225,142 C225,140 223,138 221,138 C219,138 217,140 217,142 C217,146 225,150 225,150 C225,150 233,146 233,142 C233,140 231,138 229,138 C227,138 225,140 225,142 Z"
            fill="rgba(240,212,138,0.25)"
          />
        </motion.g>

        {/* Ground line */}
        <motion.line
          x1="80"
          y1="280"
          x2="340"
          y2="280"
          stroke="rgba(227,181,74,0.15)"
          strokeWidth="1"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}
