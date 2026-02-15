import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const MaskIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame,
    fps,
    config: { damping: 50, mass: 0.8 },
  });

  const scale = interpolate(appear, [0, 1], [0.3, 1]);
  const rotation = interpolate(appear, [0, 1], [-15, 0]);
  const floatY = Math.sin(frame * 0.05) * 5;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: 150,
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg) translateY(${floatY}px)`,
          filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.3))",
        }}
      >
        <svg
          width="280"
          height="200"
          viewBox="0 0 280 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Carnival Mask */}
          <defs>
            <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#E91E63" />
            </linearGradient>
            <linearGradient
              id="featherGrad1"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#8BC34A" />
            </linearGradient>
            <linearGradient
              id="featherGrad2"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#2196F3" />
              <stop offset="100%" stopColor="#00BCD4" />
            </linearGradient>
            <linearGradient
              id="featherGrad3"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#E91E63" />
              <stop offset="100%" stopColor="#FF5722" />
            </linearGradient>
          </defs>

          {/* Feathers */}
          <ellipse
            cx="80"
            cy="30"
            rx="18"
            ry="55"
            transform="rotate(-25, 80, 30)"
            fill="url(#featherGrad1)"
            opacity="0.9"
          />
          <ellipse
            cx="140"
            cy="15"
            rx="15"
            ry="50"
            fill="url(#featherGrad2)"
            opacity="0.9"
          />
          <ellipse
            cx="200"
            cy="30"
            rx="18"
            ry="55"
            transform="rotate(25, 200, 30)"
            fill="url(#featherGrad3)"
            opacity="0.9"
          />

          {/* Main mask shape */}
          <path
            d="M40 100 Q40 60, 90 55 Q140 45, 140 55 Q140 45, 190 55 Q240 60, 240 100 Q240 150, 190 160 Q170 165, 155 155 Q140 145, 140 145 Q140 145, 125 155 Q110 165, 90 160 Q40 150, 40 100 Z"
            fill="url(#maskGrad)"
            stroke="#FFD700"
            strokeWidth="3"
          />

          {/* Left eye hole */}
          <ellipse cx="105" cy="105" rx="30" ry="22" fill="#1a0a2e" />
          <ellipse
            cx="105"
            cy="105"
            rx="30"
            ry="22"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
          />

          {/* Right eye hole */}
          <ellipse cx="175" cy="105" rx="30" ry="22" fill="#1a0a2e" />
          <ellipse
            cx="175"
            cy="105"
            rx="30"
            ry="22"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
          />

          {/* Decorative swirls on mask */}
          <path
            d="M70 90 Q80 80, 90 85"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0.7"
          />
          <path
            d="M190 85 Q200 80, 210 90"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0.7"
          />

          {/* Nose bridge decoration */}
          <circle cx="140" cy="100" r="5" fill="#FFD700" opacity="0.8" />

          {/* Glitter dots */}
          <circle cx="75" cy="95" r="3" fill="#FFF" opacity="0.6" />
          <circle cx="205" cy="95" r="3" fill="#FFF" opacity="0.6" />
          <circle cx="140" cy="70" r="3" fill="#FFF" opacity="0.6" />
          <circle cx="110" cy="75" r="2" fill="#FFF" opacity="0.4" />
          <circle cx="170" cy="75" r="2" fill="#FFF" opacity="0.4" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
