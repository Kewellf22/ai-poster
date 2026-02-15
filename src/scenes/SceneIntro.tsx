import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { sceneOpacity, COLORS, CARNIVAL_COLORS } from "../utils";
import { Confetti } from "../components/Confetti";

const SCENE_DURATION = 120;

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneOpacity(frame, SCENE_DURATION, 10, 15);

  return (
    <AbsoluteFill style={{ opacity }}>
      <IntroBackground frame={frame} />
      <Confetti />

      {/* Burst circle */}
      <Sequence from={0}>
        <BurstCircle frame={frame} fps={fps} />
      </Sequence>

      {/* Carnival Mask */}
      <Sequence from={8}>
        <CentralMask frame={frame} fps={fps} />
      </Sequence>

      {/* "GOA TOURISM PRESENTS" */}
      <Sequence from={15}>
        <PresentsText frame={frame} fps={fps} />
      </Sequence>

      {/* Big CARNIVAL title */}
      <Sequence from={25}>
        <CarnivalTitle frame={frame} fps={fps} />
      </Sequence>

      {/* "in GOA" */}
      <Sequence from={40}>
        <InGoaTitle frame={frame} fps={fps} />
      </Sequence>

      {/* Year badge */}
      <Sequence from={55}>
        <YearBadge frame={frame} fps={fps} />
      </Sequence>

      {/* Bottom decorative line */}
      <Sequence from={50}>
        <BottomDecor frame={frame} />
      </Sequence>
    </AbsoluteFill>
  );
};

const IntroBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const hue = interpolate(frame, [0, SCENE_DURATION], [0, 30]);
  const rotate = interpolate(frame, [0, SCENE_DURATION], [0, 5]);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            ${170 + rotate}deg,
            hsl(${340 + hue}, 85%, 18%) 0%,
            hsl(${15 + hue}, 85%, 28%) 35%,
            hsl(${40 + hue}, 90%, 40%) 65%,
            hsl(${25 + hue}, 85%, 22%) 100%
          )`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255,180,50,0.2) 0%, transparent 70%)",
        }}
      />
    </AbsoluteFill>
  );
};

const BurstCircle: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const s = spring({ frame, fps, config: { damping: 30, mass: 1.2 } });
  const scale = interpolate(s, [0, 1], [0, 1]);
  const opacity = interpolate(frame, [0, 60, 100], [0.4, 0.15, 0.08], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,107,53,0.2) 40%, transparent 70%)",
          transform: `scale(${scale})`,
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};

const CentralMask: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const s = spring({ frame, fps, config: { damping: 40, mass: 0.6 } });
  const scale = interpolate(s, [0, 1], [0.2, 1]);
  const rotate = interpolate(s, [0, 1], [-20, 0]);
  const floatY = Math.sin(frame * 0.04) * 6;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: -220,
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotate}deg) translateY(${floatY}px)`,
          filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.4))",
        }}
      >
        <svg width="320" height="230" viewBox="0 0 320 230" fill="none">
          <defs>
            <linearGradient id="imask" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#E91E63" />
            </linearGradient>
            <linearGradient id="if1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#8BC34A" />
            </linearGradient>
            <linearGradient id="if2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2196F3" />
              <stop offset="100%" stopColor="#00BCD4" />
            </linearGradient>
            <linearGradient id="if3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E91E63" />
              <stop offset="100%" stopColor="#FF5722" />
            </linearGradient>
            <linearGradient id="if4" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#9C27B0" />
              <stop offset="100%" stopColor="#FF9800" />
            </linearGradient>
          </defs>
          {/* Feathers */}
          <ellipse cx="70" cy="35" rx="20" ry="60" transform="rotate(-30,70,35)" fill="url(#if1)" />
          <ellipse cx="120" cy="15" rx="16" ry="55" transform="rotate(-10,120,15)" fill="url(#if4)" />
          <ellipse cx="160" cy="8" rx="14" ry="52" fill="url(#if2)" />
          <ellipse cx="200" cy="15" rx="16" ry="55" transform="rotate(10,200,15)" fill="url(#if3)" />
          <ellipse cx="250" cy="35" rx="20" ry="60" transform="rotate(30,250,35)" fill="url(#if1)" />
          {/* Mask body */}
          <path
            d="M40 120 Q40 70, 100 62 Q160 50, 160 62 Q160 50, 220 62 Q280 70, 280 120 Q280 175, 220 185 Q195 190, 175 178 Q160 168, 160 168 Q160 168, 145 178 Q125 190, 100 185 Q40 175, 40 120Z"
            fill="url(#imask)" stroke="#FFD700" strokeWidth="3"
          />
          {/* Eyes */}
          <ellipse cx="118" cy="122" rx="34" ry="24" fill="#1a0a2e" />
          <ellipse cx="118" cy="122" rx="34" ry="24" fill="none" stroke="#FFD700" strokeWidth="2.5" />
          <ellipse cx="202" cy="122" rx="34" ry="24" fill="#1a0a2e" />
          <ellipse cx="202" cy="122" rx="34" ry="24" fill="none" stroke="#FFD700" strokeWidth="2.5" />
          {/* Decorations */}
          <circle cx="160" cy="110" r="6" fill="#FFD700" opacity="0.8" />
          <circle cx="80" cy="110" r="3.5" fill="#FFF" opacity="0.6" />
          <circle cx="240" cy="110" r="3.5" fill="#FFF" opacity="0.6" />
          <circle cx="160" cy="80" r="3" fill="#FFF" opacity="0.5" />
          <circle cx="130" cy="85" r="2.5" fill="#FFF" opacity="0.4" />
          <circle cx="190" cy="85" r="2.5" fill="#FFF" opacity="0.4" />
          {/* Smile */}
          <path d="M135 155 Q160 170 185 155" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

const PresentsText: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: 50,
        opacity,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #FF6B35, #F7C948)",
          padding: "12px 48px",
          borderRadius: 50,
          boxShadow: "0 4px 20px rgba(255,107,53,0.5)",
        }}
      >
        <span
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 26,
            fontWeight: "bold",
            color: "#fff",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Goa Tourism Presents
        </span>
      </div>
    </AbsoluteFill>
  );
};

const CarnivalTitle: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const letters = "CARNIVAL".split("");

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: 160,
      }}
    >
      <div style={{ display: "flex", gap: 3 }}>
        {letters.map((letter, i) => {
          const delay = i * 3;
          const s = spring({
            frame: frame - delay,
            fps,
            config: { damping: 35, mass: 0.5 },
          });
          const scale = interpolate(s, [0, 1], [0, 1]);
          const rotate = interpolate(s, [0, 1], [25, 0]);
          const color = CARNIVAL_COLORS[i % CARNIVAL_COLORS.length];

          return (
            <span
              key={i}
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: 115,
                fontWeight: 900,
                color,
                textShadow: `0 0 20px ${color}80, 0 4px 8px rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.2)`,
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                display: "inline-block",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const InGoaTitle: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const s = spring({ frame, fps, config: { damping: 30, mass: 0.8 } });
  const scale = interpolate(s, [0, 1], [0.4, 1]);
  const glow = interpolate(frame, [0, 40, 80], [10, 35, 10]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: 340,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
        <span
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 50,
            fontStyle: "italic",
            color: COLORS.white,
            textShadow: "0 2px 10px rgba(0,0,0,0.4)",
            opacity: interpolate(frame, [0, 10], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          in
        </span>
        <span
          style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontSize: 155,
            fontWeight: 900,
            color: COLORS.gold,
            letterSpacing: 18,
            transform: `scale(${scale})`,
            display: "inline-block",
            textShadow: `
              0 0 ${glow}px rgba(255,215,0,0.8),
              0 0 ${glow * 2}px rgba(255,215,0,0.4),
              0 6px 12px rgba(0,0,0,0.4),
              3px 3px 0 #FF6B35
            `,
          }}
        >
          GOA
        </span>
      </div>
    </AbsoluteFill>
  );
};

const YearBadge: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const s = spring({ frame, fps, config: { damping: 50 } });
  const scale = interpolate(s, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", top: 530 }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
          padding: "10px 40px",
          borderRadius: 30,
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <span
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 28,
            color: COLORS.white,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          February 2026
        </span>
      </div>
    </AbsoluteFill>
  );
};

const BottomDecor: React.FC<{ frame: number }> = ({ frame }) => {
  const width = interpolate(frame, [0, 30], [0, 700], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 120,
      }}
    >
      <div
        style={{
          width,
          height: 3,
          background:
            "linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
