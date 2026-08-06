import React from "react";

export function IslamicPattern({
  className = "",
  color = "#d4a03c",
  variant = "arch"
}) {
  if (variant === "arch") {
    return (
      <svg
        className={className}
        viewBox="0 0 200 120"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`islamic-arch-${color.replace("#", "")}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 20 Q10 0 20 20 T40 20"
              stroke={color}
              strokeWidth="1.2"
              fill="none"
            />
            <circle cx="20" cy="6" r="1.6" fill={color} />
          </pattern>
        </defs>
        <rect
          width="200"
          height="120"
          fill={`url(#islamic-arch-${color.replace("#", "")})`}
        />
      </svg>
    );
  }

  if (variant === "star") {
    return (
      <svg
        className={className}
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`islamic-star-${color.replace("#", "")}`}
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <g transform="translate(50 50)">
              <path
                d="M0 -34 L10 -10 L34 0 L10 10 L0 34 L-10 10 L-34 0 L-10 -10 Z"
                stroke={color}
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="0" cy="0" r="4" fill={color} />
            </g>
          </pattern>
        </defs>
        <rect
          width="200"
          height="200"
          fill={`url(#islamic-star-${color.replace("#", "")})`}
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 200 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 50 Q60 0 100 50 T180 50"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M0 50 Q40 30 100 50 T200 50"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.5"
        fill="none"
      />
      <circle cx="100" cy="50" r="5" fill={color} />
    </svg>
  );
}

export function FloralDivider({ className = "", icon = "\u2666" }) {
  return (
    <div className={`divider-floral ${className}`}>
      <span className="font-script text-2xl text-gold-500">{icon}</span>
    </div>
  );
}

export function CornerOrnament({ className = "", color = "#d4a03c" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 120 V40 Q10 10 40 10 H120"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M20 120 V48 Q20 20 48 20 H120"
        stroke={color}
        strokeWidth="1"
        opacity="0.6"
      />
      <circle cx="10" cy="10" r="4" fill={color} />
    </svg>
  );
}
