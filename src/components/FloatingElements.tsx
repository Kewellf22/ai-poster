import { AbsoluteFill, useCurrentFrame, random } from "remotion";

const ELEMENTS = [
  { emoji: "🎶", x: 80, y: 500, size: 40, seed: "m1" },
  { emoji: "🥁", x: 950, y: 550, size: 38, seed: "m2" },
  { emoji: "💃", x: 100, y: 900, size: 42, seed: "m3" },
  { emoji: "🕺", x: 920, y: 950, size: 42, seed: "m4" },
  { emoji: "🎺", x: 60, y: 1300, size: 36, seed: "m5" },
  { emoji: "🌺", x: 970, y: 1350, size: 34, seed: "m6" },
  { emoji: "🎵", x: 130, y: 1600, size: 36, seed: "m7" },
  { emoji: "🪘", x: 900, y: 1650, size: 38, seed: "m8" },
  { emoji: "✨", x: 50, y: 200, size: 28, seed: "m9" },
  { emoji: "✨", x: 1000, y: 250, size: 28, seed: "m10" },
];

export const FloatingElements: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {ELEMENTS.map((el, i) => {
        const floatY = Math.sin(frame * 0.04 + random(el.seed) * 10) * 15;
        const floatX = Math.cos(frame * 0.03 + random(el.seed) * 10) * 8;
        const pulse = 1 + Math.sin(frame * 0.06 + i) * 0.1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: el.x + floatX,
              top: el.y + floatY,
              fontSize: el.size,
              transform: `scale(${pulse})`,
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
              opacity: 0.8,
            }}
          >
            {el.emoji}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
