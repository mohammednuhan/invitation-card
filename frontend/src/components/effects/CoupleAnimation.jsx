import React from "react";
import { motion } from "framer-motion";

export default function CoupleAnimation() {
  return (
    <div className="relative flex items-end justify-center gap-0 overflow-hidden py-8">
      <svg
        viewBox="0 0 400 320"
        className="h-[280px] w-[350px] md:h-[340px] md:w-[420px]"
        fill="none"
      >
        <defs>
          <linearGradient id="groomSuit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a1a2e" />
            <stop offset="1" stopColor="#0d0d1a" />
          </linearGradient>
          <linearGradient id="brideDress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff9f0" />
            <stop offset="0.5" stopColor="#f5efe3" />
            <stop offset="1" stopColor="#ebe3d4" />
          </linearGradient>
          <linearGradient id="goldAccent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0d48a" />
            <stop offset="1" stopColor="#d4a03c" />
          </linearGradient>
          <radialGradient id="skinTone" cx="0.5" cy="0.4" r="0.5">
            <stop offset="0" stopColor="#f5d0a9" />
            <stop offset="1" stopColor="#e0b68a" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === GROOM === */}
        <g>
          {/* Groom head */}
          <motion.g
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "148px 85px" }}
          >
            <circle cx="148" cy="70" r="22" fill="url(#skinTone)" />
            {/* Hair */}
            <path
              d="M126 62 Q126 46 148 44 Q170 46 170 62 Q170 54 148 52 Q126 54 126 62Z"
              fill="#1a1a1a"
            />
            {/* Eyes */}
            <ellipse cx="140" cy="68" rx="2.5" ry="3" fill="#1a1a1a" />
            <ellipse cx="156" cy="68" rx="2.5" ry="3" fill="#1a1a1a" />
            {/* Smile */}
            <path
              d="M141 78 Q148 84 155 78"
              stroke="#8b6344"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Nose */}
            <path
              d="M147 72 Q148 75 149 72"
              stroke="#c9a07a"
              strokeWidth="1"
              fill="none"
            />
          </motion.g>

          {/* Groom suit body */}
          <motion.g
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Suit jacket */}
            <path
              d="M120 95 L120 190 Q120 195 125 195 L171 195 Q176 195 176 190 L176 95 Z"
              fill="url(#groomSuit)"
            />
            {/* Suit lapels */}
            <path
              d="M135 95 L148 130 L138 130 Z"
              fill="#252545"
            />
            <path
              d="M161 95 L148 130 L158 130 Z"
              fill="#252545"
            />
            {/* White shirt */}
            <path
              d="M142 95 L148 130 L154 95 Z"
              fill="#f8f8ff"
            />
            {/* Tie */}
            <path
              d="M146 100 L148 140 L150 100 Z"
              fill="url(#goldAccent)"
            />
            {/* Tie knot */}
            <circle cx="148" cy="98" r="3" fill="#d4a03c" />
            {/* Suit buttons */}
            <circle cx="148" cy="140" r="2" fill="#d4a03c" />
            <circle cx="148" cy="155" r="2" fill="#d4a03c" />
            {/* Left arm */}
            <path
              d="M120 95 Q108 120 110 165 Q111 175 120 178"
              stroke="#1a1a2e"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="112" cy="175" r="8" fill="url(#skinTone)" />
            {/* Right arm */}
            <path
              d="M176 95 Q188 120 186 165 Q185 175 176 178"
              stroke="#1a1a2e"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="184" cy="175" r="8" fill="url(#skinTone)" />
            {/* Groom holding bride's hand */}
            <motion.g
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "184px 175px" }}
            >
              <circle cx="184" cy="172" r="6" fill="url(#skinTone)" />
            </motion.g>
          </motion.g>

          {/* Groom legs */}
          <rect x="128" y="192" width="16" height="80" rx="4" fill="#0d0d1a" />
          <rect x="154" y="192" width="16" height="80" rx="4" fill="#0d0d1a" />
          {/* Shoes */}
          <rect x="126" y="268" width="20" height="10" rx="5" fill="#111" />
          <rect x="152" y="268" width="20" height="10" rx="5" fill="#111" />

          {/* Pocket square */}
          <rect x="160" y="108" width="8" height="6" rx="1" fill="url(#goldAccent)" />
        </g>

        {/* === BRIDE === */}
        <g>
          {/* Bride head */}
          <motion.g
            animate={{ rotate: [1, -1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ transformOrigin: "252px 80px" }}
          >
            <circle cx="252" cy="68" r="22" fill="url(#skinTone)" />
            {/* Hair */}
            <path
              d="M230 60 Q230 42 252 40 Q274 42 274 60 Q274 50 252 48 Q230 50 230 60Z"
              fill="#2d1810"
            />
            {/* Long hair */}
            <path
              d="M230 58 Q224 80 226 120 Q228 130 232 120 Q230 85 232 60Z"
              fill="#2d1810"
            />
            <path
              d="M274 58 Q280 80 278 120 Q276 130 272 120 Q274 85 272 60Z"
              fill="#2d1810"
            />
            {/* Eyes */}
            <ellipse cx="244" cy="66" rx="2.5" ry="3" fill="#1a1a1a" />
            <ellipse cx="260" cy="66" rx="2.5" ry="3" fill="#1a1a1a" />
            {/* Eyelashes */}
            <path d="M240 64 L242 63" stroke="#1a1a1a" strokeWidth="0.8" />
            <path d="M247 64 L246 63" stroke="#1a1a1a" strokeWidth="0.8" />
            <path d="M256 64 L258 63" stroke="#1a1a1a" strokeWidth="0.8" />
            <path d="M263 64 L262 63" stroke="#1a1a1a" strokeWidth="0.8" />
            {/* Smile */}
            <path
              d="M243 76 Q252 83 261 76"
              stroke="#c47a6a"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Nose */}
            <path
              d="M251 70 Q252 73 253 70"
              stroke="#c9a07a"
              strokeWidth="1"
              fill="none"
            />
            {/* Bindi */}
            <circle cx="252" cy="58" r="1.8" fill="#cc3333" />
            {/* Earrings */}
            <motion.g
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "230px 70px" }}
            >
              <circle cx="228" cy="74" r="2.5" fill="url(#goldAccent)" />
              <circle cx="228" cy="79" r="1.5" fill="#d4a03c" />
            </motion.g>
            <motion.g
              animate={{ rotate: [5, -5, 5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              style={{ transformOrigin: "274px 70px" }}
            >
              <circle cx="276" cy="74" r="2.5" fill="url(#goldAccent)" />
              <circle cx="276" cy="79" r="1.5" fill="#d4a03c" />
            </motion.g>
          </motion.g>

          {/* Veil */}
          <motion.path
            animate={{ d: [
              "M240 48 Q220 60 218 100 Q216 140 222 180 L232 180 Q228 140 230 100 Q232 60 244 50Z",
              "M240 48 Q218 62 216 102 Q214 142 220 182 L232 182 Q226 142 228 102 Q230 62 244 50Z",
              "M240 48 Q220 60 218 100 Q216 140 222 180 L232 180 Q228 140 230 100 Q232 60 244 50Z"
            ]}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            fill="rgba(255,255,255,0.15)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />

          {/* Bride dress body */}
          <motion.g
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            {/* Dress top */}
            <path
              d="M228 90 L252 88 L276 90 L280 130 L224 130 Z"
              fill="url(#brideDress)"
            />
            {/* Neckline detail */}
            <path
              d="M236 90 Q252 100 268 90"
              stroke="url(#goldAccent)"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Necklace */}
            <path
              d="M238 88 Q252 96 266 88"
              stroke="url(#goldAccent)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="252" cy="94" r="2" fill="#d4a03c" />
            {/* Dress skirt - flowing */}
            <motion.path
              animate={{ d: [
                "M224 130 Q210 200 195 280 Q230 290 252 285 Q274 290 309 280 Q294 200 280 130Z",
                "M224 130 Q208 202 193 282 Q230 292 252 287 Q274 292 311 282 Q296 202 280 130Z",
                "M224 130 Q210 200 195 280 Q230 290 252 285 Q274 290 309 280 Q294 200 280 130Z"
              ]}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              fill="url(#brideDress)"
            />
            {/* Dress lace detail */}
            <path
              d="M228 160 Q240 155 252 160 Q264 155 276 160"
              stroke="url(#goldAccent)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M226 180 Q239 175 252 180 Q265 175 278 180"
              stroke="url(#goldAccent)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />

            {/* Left arm */}
            <path
              d="M228 90 Q216 115 218 155 Q219 165 222 168"
              stroke="#f5efe3"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="220" cy="165" r="7" fill="url(#skinTone)" />
            {/* Right arm */}
            <path
              d="M276 90 Q288 115 286 155 Q285 165 282 168"
              stroke="#f5efe3"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="284" cy="165" r="7" fill="url(#skinTone)" />
            {/* Bride holding groom's hand */}
            <motion.g
              animate={{ rotate: [3, -3, 3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              style={{ transformOrigin: "220px 165px" }}
            >
              <circle cx="218" cy="162" r="5" fill="url(#skinTone)" />
            </motion.g>
          </motion.g>

          {/* Bride shoes peeking */}
          <ellipse cx="210" cy="286" rx="10" ry="4" fill="#f5efe3" />
          <ellipse cx="294" cy="286" rx="10" ry="4" fill="#f5efe3" />

          {/* Flower bouquet */}
          <motion.g
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "218px 165px" }}
          >
            <circle cx="210" cy="158" r="8" fill="#f8c4d4" opacity="0.9" />
            <circle cx="222" cy="155" r="7" fill="#f4a4c0" opacity="0.9" />
            <circle cx="215" cy="162" r="6" fill="#ffb6c1" opacity="0.8" />
            <circle cx="225" cy="160" r="5" fill="#f8c4d4" opacity="0.8" />
            <circle cx="218" cy="152" r="4" fill="#e8879e" opacity="0.7" />
            {/* Stems */}
            <path d="M218 162 L218 175" stroke="#5a8a4a" strokeWidth="1.5" />
            <path d="M214 160 L216 175" stroke="#5a8a4a" strokeWidth="1" />
            <path d="M222 158 L220 175" stroke="#5a8a4a" strokeWidth="1" />
          </motion.g>
        </g>

        {/* Heart between them */}
        <motion.g
          animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "200px 100px" }}
          filter="url(#glow)"
        >
          <path
            d="M200 115 C200 115 190 105 190 98 C190 90 200 88 200 95 C200 88 210 90 210 98 C210 105 200 115 200 115Z"
            fill="#e3b54a"
            opacity="0.8"
          />
        </motion.g>

        {/* Sparkles around couple */}
        {[
          { x: 100, y: 60, delay: 0 },
          { x: 300, y: 55, delay: 0.5 },
          { x: 110, y: 140, delay: 1 },
          { x: 290, y: 130, delay: 1.5 },
          { x: 200, y: 40, delay: 0.8 },
          { x: 160, y: 30, delay: 1.2 },
          { x: 240, y: 35, delay: 0.3 },
        ].map((s, i) => (
          <motion.g
            key={i}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            <path
              d={`M${s.x} ${s.y - 4} L${s.x + 1.5} ${s.y - 1.5} L${s.x + 4} ${s.y} L${s.x + 1.5} ${s.y + 1.5} L${s.x} ${s.y + 4} L${s.x - 1.5} ${s.y + 1.5} L${s.x - 4} ${s.y} L${s.x - 1.5} ${s.y - 1.5}Z`}
              fill="#f0d48a"
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
