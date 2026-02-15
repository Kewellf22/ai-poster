import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle animated gradient shift
  const hueShift = interpolate(frame, [0, 150], [0, 20]);

  return (
    <AbsoluteFill>
      {/* Base gradient - vibrant warm tropical */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            170deg,
            hsl(${340 + hueShift}, 85%, 25%) 0%,
            hsl(${20 + hueShift}, 90%, 35%) 30%,
            hsl(${45 + hueShift}, 95%, 50%) 60%,
            hsl(${30 + hueShift}, 90%, 40%) 100%
          )`,
        }}
      />

      {/* Decorative radial glow - top */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 15%, rgba(255,200,50,0.3) 0%, transparent 60%)",
        }}
      />

      {/* Decorative radial glow - bottom */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 85%, rgba(220,40,80,0.25) 0%, transparent 50%)",
        }}
      />

      {/* Subtle pattern overlay */}
      <PatternOverlay />
    </AbsoluteFill>
  );
};

const PatternOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 0.08], {
    extrapolateRight: "clamp",
  });

  // Create a festive diamond pattern using SVG
  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="festivePattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#festivePattern)" />
      </svg>
    </AbsoluteFill>
  );
};
