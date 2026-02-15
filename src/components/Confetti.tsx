import { AbsoluteFill, interpolate, useCurrentFrame, random } from "remotion";

const NUM_PIECES = 40;

const COLORS = [
  "#FF6B35",
  "#FFD700",
  "#E91E63",
  "#4CAF50",
  "#2196F3",
  "#9C27B0",
  "#FF5722",
  "#00BCD4",
  "#F7C948",
  "#8BC34A",
];

interface ConfettiPiece {
  x: number;
  startY: number;
  size: number;
  color: string;
  speed: number;
  wobbleSpeed: number;
  wobbleAmount: number;
  rotation: number;
  rotationSpeed: number;
  shape: "rect" | "circle" | "triangle";
  opacity: number;
}

const pieces: ConfettiPiece[] = Array.from({ length: NUM_PIECES }, (_, i) => ({
  x: random(`confetti-x-${i}`) * 1080,
  startY: -50 - random(`confetti-sy-${i}`) * 400,
  size: 8 + random(`confetti-sz-${i}`) * 16,
  color: COLORS[Math.floor(random(`confetti-c-${i}`) * COLORS.length)],
  speed: 2 + random(`confetti-sp-${i}`) * 4,
  wobbleSpeed: 0.02 + random(`confetti-ws-${i}`) * 0.04,
  wobbleAmount: 20 + random(`confetti-wa-${i}`) * 40,
  rotation: random(`confetti-r-${i}`) * 360,
  rotationSpeed: 2 + random(`confetti-rs-${i}`) * 6,
  shape: (["rect", "circle", "triangle"] as const)[
    Math.floor(random(`confetti-sh-${i}`) * 3)
  ],
  opacity: 0.5 + random(`confetti-o-${i}`) * 0.5,
}));

export const Confetti: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      {pieces.map((piece, i) => {
        const y = piece.startY + frame * piece.speed;
        const wobbleX =
          Math.sin(frame * piece.wobbleSpeed) * piece.wobbleAmount;
        const rot = piece.rotation + frame * piece.rotationSpeed;

        // Wrap around vertically
        const wrappedY = ((y % 2100) + 2100) % 2100 - 100;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: piece.x + wobbleX,
              top: wrappedY,
              width: piece.size,
              height: piece.shape === "circle" ? piece.size : piece.size * 1.5,
              backgroundColor:
                piece.shape !== "triangle" ? piece.color : "transparent",
              borderRadius: piece.shape === "circle" ? "50%" : 2,
              transform: `rotate(${rot}deg)`,
              opacity: piece.opacity,
              borderLeft:
                piece.shape === "triangle"
                  ? `${piece.size / 2}px solid transparent`
                  : undefined,
              borderRight:
                piece.shape === "triangle"
                  ? `${piece.size / 2}px solid transparent`
                  : undefined,
              borderBottom:
                piece.shape === "triangle"
                  ? `${piece.size}px solid ${piece.color}`
                  : undefined,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
