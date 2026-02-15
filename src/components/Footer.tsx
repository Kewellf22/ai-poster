import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Footer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame,
    fps,
    config: { damping: 60 },
  });

  const translateY = interpolate(s, [0, 1], [80, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 60,
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          opacity,
          textAlign: "center",
        }}
      >
        {/* Divider line */}
        <div
          style={{
            width: 600,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent)",
            marginBottom: 25,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        {/* Hashtag */}
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 28,
            fontWeight: "bold",
            color: "#FFD700",
            letterSpacing: 3,
            marginBottom: 12,
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          #GoaCarnival2026
        </div>

        {/* Bottom info */}
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 2,
          }}
        >
          Free Entry for All &bull; Experience the Spirit of Goa
        </div>

        {/* Decorative bottom dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 20,
          }}
        >
          {["#FF6B35", "#FFD700", "#E91E63", "#4CAF50", "#2196F3"].map(
            (color, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}80`,
                }}
              />
            ),
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
