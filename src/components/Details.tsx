import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Details: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 380,
      }}
    >
      {/* Date */}
      <DetailCard
        frame={frame}
        fps={fps}
        delay={0}
        icon="📅"
        line1="February 22 - 25, 2026"
        line2="Four Days of Non-Stop Fun"
        accentColor="#FF6B35"
      />

      {/* Location */}
      <DetailCard
        frame={frame}
        fps={fps}
        delay={5}
        icon="📍"
        line1="Panaji, Goa"
        line2="Grand Parade on 18th June Road"
        accentColor="#E91E63"
      />

      {/* Highlights */}
      <DetailCard
        frame={frame}
        fps={fps}
        delay={10}
        icon="🎭"
        line1="Floats • Music • Dance • Feasts"
        line2="King Momo leads the Grand Parade"
        accentColor="#9C27B0"
      />
    </AbsoluteFill>
  );
};

const DetailCard: React.FC<{
  frame: number;
  fps: number;
  delay: number;
  icon: string;
  line1: string;
  line2: string;
  accentColor: string;
}> = ({ frame, fps, delay, icon, line1, line2, accentColor }) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 60, mass: 0.6 },
  });

  const translateX = interpolate(s, [0, 1], [80, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 18,
        transform: `translateX(${translateX}px)`,
        opacity,
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(12px)",
        padding: "18px 35px",
        borderRadius: 20,
        borderLeft: `4px solid ${accentColor}`,
        width: 800,
        boxShadow: `0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)`,
      }}
    >
      <span style={{ fontSize: 42 }}>{icon}</span>
      <div>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 28,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: 4,
          }}
        >
          {line1}
        </div>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 20,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          {line2}
        </div>
      </div>
    </div>
  );
};
