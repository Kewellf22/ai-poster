import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        top: 420,
      }}
    >
      {/* "CARNIVAL" - main word */}
      <CarnivalText frame={frame} fps={fps} />

      {/* "in" connector */}
      <InText frame={frame} fps={fps} />

      {/* "GOA" */}
      <GoaText frame={frame} fps={fps} />

      {/* Tagline */}
      <Tagline frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};

const CarnivalText: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const letters = "CARNIVAL".split("");

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {letters.map((letter, i) => {
        const delay = i * 3;
        const s = spring({
          frame: frame - delay,
          fps,
          config: { damping: 40, mass: 0.5 },
        });
        const scale = interpolate(s, [0, 1], [0, 1]);
        const rotate = interpolate(s, [0, 1], [20, 0]);

        const colors = [
          "#FF6B35",
          "#FFD700",
          "#E91E63",
          "#4CAF50",
          "#2196F3",
          "#FF6B35",
          "#9C27B0",
          "#F7C948",
        ];

        return (
          <span
            key={i}
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 120,
              fontWeight: 900,
              color: colors[i % colors.length],
              textShadow: `
                0 0 20px ${colors[i % colors.length]}80,
                0 4px 8px rgba(0,0,0,0.4),
                2px 2px 0 rgba(0,0,0,0.2)
              `,
              transform: `scale(${scale}) rotate(${rotate}deg)`,
              display: "inline-block",
              letterSpacing: 2,
            }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

const InText: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        fontSize: 48,
        fontStyle: "italic",
        color: "#FFFFFF",
        opacity,
        marginTop: -10,
        marginBottom: -10,
        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      in
    </div>
  );
};

const GoaText: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const s = spring({
    frame: frame - 12,
    fps,
    config: { damping: 30, mass: 0.8 },
  });

  const scale = interpolate(s, [0, 1], [0.5, 1]);
  const glow = interpolate(frame, [0, 50, 100], [10, 30, 10]);

  return (
    <div
      style={{
        fontFamily: "'Arial Black', 'Impact', sans-serif",
        fontSize: 160,
        fontWeight: 900,
        color: "#FFD700",
        letterSpacing: 20,
        transform: `scale(${scale})`,
        textShadow: `
          0 0 ${glow}px rgba(255, 215, 0, 0.8),
          0 0 ${glow * 2}px rgba(255, 215, 0, 0.4),
          0 6px 12px rgba(0,0,0,0.4),
          3px 3px 0 #FF6B35
        `,
      }}
    >
      GOA
    </div>
  );
};

const Tagline: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        marginTop: 20,
        opacity,
        background: "rgba(0,0,0,0.25)",
        padding: "10px 40px",
        borderRadius: 30,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <span
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 30,
          color: "#FFFFFF",
          letterSpacing: 8,
          textTransform: "uppercase",
        }}
      >
        A Celebration of Life & Color
      </span>
    </div>
  );
};
