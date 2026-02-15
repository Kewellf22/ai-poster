import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { sceneOpacity, COLORS, CARNIVAL_COLORS } from "../utils";

const SCENE_DURATION = 120;

export const SceneParade: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, SCENE_DURATION);

  return (
    <AbsoluteFill style={{ opacity }}>
      <ParadeBackground frame={frame} />
      <StreamerOverlay frame={frame} />

      <Sequence from={5}>
        <ParadeTitle frame={frame} />
      </Sequence>

      <Sequence from={20}>
        <FloatCard
          frame={frame}
          delay={0}
          title="Grand Floats"
          description="Spectacular decorated floats parade through the streets of Panaji with themes of mythology, culture, and celebration"
          icon={<FloatIcon />}
          y={480}
          color={COLORS.orange}
        />
      </Sequence>

      <Sequence from={35}>
        <FloatCard
          frame={frame}
          delay={0}
          title="Dance Troupes"
          description="Hundreds of performers in dazzling costumes dance to the rhythm of drums, brass bands, and traditional Goan music"
          icon={<DancerIcon />}
          y={780}
          color={COLORS.pink}
        />
      </Sequence>

      <Sequence from={50}>
        <FloatCard
          frame={frame}
          delay={0}
          title="Colors Everywhere"
          description="Red, gold, green, and purple paint the streets as revelers throw confetti and spray colored water"
          icon={<ColorIcon />}
          y={1080}
          color={COLORS.purple}
        />
      </Sequence>

      <Sequence from={65}>
        <ParadeRoute frame={frame} />
      </Sequence>
    </AbsoluteFill>
  );
};

const ParadeBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const hue = interpolate(frame, [0, SCENE_DURATION], [0, 25]);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            168deg,
            hsl(${20 + hue}, 80%, 20%) 0%,
            hsl(${35 + hue}, 85%, 30%) 40%,
            hsl(${50 + hue}, 90%, 35%) 70%,
            hsl(${15 + hue}, 75%, 18%) 100%
          )`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,107,53,0.15) 0%, transparent 60%)",
        }}
      />
    </AbsoluteFill>
  );
};

const StreamerOverlay: React.FC<{ frame: number }> = ({ frame }) => {
  const streamers = Array.from({ length: 8 }, (_, i) => ({
    x: 135 * i,
    delay: i * 5,
    color: CARNIVAL_COLORS[i % CARNIVAL_COLORS.length],
  }));

  return (
    <AbsoluteFill style={{ opacity: 0.12 }}>
      {streamers.map((s, i) => {
        const y = interpolate(
          (frame + s.delay) % 80,
          [0, 80],
          [-200, 2100],
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: y,
              width: 4,
              height: 180,
              background: `linear-gradient(180deg, ${s.color}, transparent)`,
              borderRadius: 4,
              transform: `rotate(${Math.sin(frame * 0.02 + i) * 15}deg)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const ParadeTitle: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 40 } });
  const scale = interpolate(s, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 100,
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            color: COLORS.gold,
            letterSpacing: 8,
            marginBottom: 12,
          }}
        >
          THE GRAND
        </div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 88,
            fontWeight: 900,
            color: COLORS.white,
            textShadow: `0 0 30px rgba(255,107,53,0.5), 0 4px 15px rgba(0,0,0,0.4)`,
            letterSpacing: 6,
          }}
        >
          PARADE
        </div>
        <div
          style={{
            width: 200,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
            margin: "15px auto 0",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const FloatCard: React.FC<{
  frame: number;
  delay: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  y: number;
  color: string;
}> = ({ frame, delay, title, description, icon, y, color }) => {
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 50, mass: 0.6 },
  });
  const translateX = interpolate(s, [0, 1], [120, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 55,
        right: 55,
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: 18,
          background: `linear-gradient(135deg, ${color}30, ${color}15)`,
          border: `2px solid ${color}40`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 30,
            fontWeight: 900,
            color,
            marginBottom: 8,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

const ParadeRoute: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 60 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const width = interpolate(s, [0, 1], [0, 800]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 180,
        opacity,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 4,
            marginBottom: 15,
          }}
        >
          PARADE ROUTE
        </div>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 28,
            fontWeight: "bold",
            color: COLORS.gold,
          }}
        >
          Panaji Church Square → 18th June Road → Miramar
        </div>
        <div
          style={{
            width,
            height: 3,
            background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.gold}, ${COLORS.pink})`,
            margin: "15px auto 0",
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// SVG Icons
const FloatIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="6" y="18" width="24" height="12" rx="3" fill="#FF6B35" />
    <circle cx="12" cy="32" r="3" fill="#FFD700" />
    <circle cx="24" cy="32" r="3" fill="#FFD700" />
    <polygon points="10,18 18,6 26,18" fill="#E91E63" />
    <circle cx="18" cy="12" r="3" fill="#FFD700" />
  </svg>
);

const DancerIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="7" r="5" fill="#E91E63" />
    <path d="M18 12 L18 24 M10 16 L26 16 M14 36 L18 24 L22 36" stroke="#E91E63" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const ColorIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="14" cy="14" r="8" fill="#FF6B35" opacity="0.8" />
    <circle cx="22" cy="14" r="8" fill="#E91E63" opacity="0.8" />
    <circle cx="18" cy="22" r="8" fill="#9C27B0" opacity="0.8" />
  </svg>
);
