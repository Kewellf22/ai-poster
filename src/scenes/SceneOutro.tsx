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

const SCENE_DURATION = 150;

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, SCENE_DURATION, 15, 25);

  return (
    <AbsoluteFill style={{ opacity }}>
      <OutroBackground frame={frame} />
      <Confetti />

      <Sequence from={5}>
        <MaskReprise frame={frame} />
      </Sequence>

      <Sequence from={15}>
        <CallToAction frame={frame} />
      </Sequence>

      <Sequence from={35}>
        <Hashtag frame={frame} />
      </Sequence>

      <Sequence from={45}>
        <SocialRow frame={frame} />
      </Sequence>

      <Sequence from={55}>
        <ClosingDecor frame={frame} />
      </Sequence>
    </AbsoluteFill>
  );
};

const OutroBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const hue = interpolate(frame, [0, SCENE_DURATION], [0, 30]);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            170deg,
            hsl(${340 + hue}, 80%, 18%) 0%,
            hsl(${15 + hue}, 85%, 28%) 35%,
            hsl(${40 + hue}, 90%, 40%) 65%,
            hsl(${25 + hue}, 80%, 20%) 100%
          )`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,215,0,0.15) 0%, transparent 60%)",
        }}
      />
    </AbsoluteFill>
  );
};

const MaskReprise: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 40, mass: 0.8 } });
  const scale = interpolate(s, [0, 1], [0.3, 0.7]);
  const rotate = interpolate(s, [0, 1], [-15, 0]);
  const floatY = Math.sin(frame * 0.04) * 5;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: -350,
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotate}deg) translateY(${floatY}px)`,
          filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.4))",
          opacity: 0.5,
        }}
      >
        <svg width="320" height="230" viewBox="0 0 320 230" fill="none">
          <defs>
            <linearGradient id="omask" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#E91E63" />
            </linearGradient>
          </defs>
          <ellipse cx="70" cy="35" rx="20" ry="60" transform="rotate(-30,70,35)" fill="#4CAF50" opacity="0.7" />
          <ellipse cx="160" cy="8" rx="14" ry="52" fill="#2196F3" opacity="0.7" />
          <ellipse cx="250" cy="35" rx="20" ry="60" transform="rotate(30,250,35)" fill="#E91E63" opacity="0.7" />
          <path
            d="M40 120 Q40 70, 100 62 Q160 50, 160 62 Q160 50, 220 62 Q280 70, 280 120 Q280 175, 220 185 Q195 190, 175 178 Q160 168, 160 168 Q160 168, 145 178 Q125 190, 100 185 Q40 175, 40 120Z"
            fill="url(#omask)"
          />
          <ellipse cx="118" cy="122" rx="34" ry="24" fill="#1a0a2e" />
          <ellipse cx="202" cy="122" rx="34" ry="24" fill="#1a0a2e" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

const CallToAction: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();

  // "CARNIVAL" letters
  const letters = "CARNIVAL".split("");

  const subSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 50 },
  });
  const subScale = interpolate(subSpring, [0, 1], [0.5, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: -120,
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* "Join the" */}
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 40,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.8)",
            marginBottom: 5,
            opacity: interpolate(frame, [0, 15], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Join the
        </div>

        {/* CARNIVAL */}
        <div style={{ display: "flex", justifyContent: "center", gap: 3 }}>
          {letters.map((letter, i) => {
            const s = spring({
              frame: frame - i * 2,
              fps,
              config: { damping: 30, mass: 0.5 },
            });
            const scale = interpolate(s, [0, 1], [0, 1]);
            const color = CARNIVAL_COLORS[i % CARNIVAL_COLORS.length];
            const bounce = Math.sin(frame * 0.06 + i * 0.8) * 4;

            return (
              <span
                key={i}
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: 100,
                  fontWeight: 900,
                  color,
                  textShadow: `0 0 20px ${color}60, 0 4px 8px rgba(0,0,0,0.3)`,
                  transform: `scale(${scale}) translateY(${bounce}px)`,
                  display: "inline-block",
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* "in GOA" */}
        <div
          style={{
            transform: `scale(${subScale})`,
            marginTop: -5,
          }}
        >
          <span
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 40,
              fontStyle: "italic",
              color: COLORS.white,
            }}
          >
            in{" "}
          </span>
          <span
            style={{
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontSize: 120,
              fontWeight: 900,
              color: COLORS.gold,
              letterSpacing: 15,
              textShadow: `0 0 25px rgba(255,215,0,0.6), 3px 3px 0 ${COLORS.orange}`,
            }}
          >
            GOA
          </span>
        </div>

        {/* Feb 2026 */}
        <div
          style={{
            marginTop: 20,
            fontFamily: "Arial, sans-serif",
            fontSize: 32,
            color: COLORS.white,
            letterSpacing: 6,
            opacity: interpolate(frame, [15, 30], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          February 22 - 25, 2026
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Hashtag: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 50 } });
  const scale = interpolate(s, [0, 1], [0.6, 1]);
  const glow = 8 + Math.sin(frame * 0.08) * 5;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: 400,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
          padding: "14px 50px",
          borderRadius: 40,
          border: "1px solid rgba(255,215,0,0.3)",
          boxShadow: `0 0 ${glow}px rgba(255,215,0,0.2)`,
        }}
      >
        <span
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 34,
            fontWeight: 900,
            color: COLORS.gold,
            letterSpacing: 3,
          }}
        >
          #GoaCarnival2026
        </span>
      </div>
    </AbsoluteFill>
  );
};

const SocialRow: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const items = [
    { text: "goatourism.gov.in", color: COLORS.blue },
    { text: "@GoaCarnival", color: COLORS.pink },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: 510,
      }}
    >
      <div style={{ display: "flex", gap: 20 }}>
        {items.map((item, i) => {
          const s = spring({
            frame: frame - i * 6,
            fps,
            config: { damping: 50 },
          });
          const opacity = interpolate(s, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                opacity,
                fontFamily: "Arial, sans-serif",
                fontSize: 22,
                color: item.color,
                letterSpacing: 1,
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const ClosingDecor: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 60 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 80,
        opacity,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 500,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)",
            marginBottom: 20,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 18,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: 3,
            marginBottom: 15,
          }}
        >
          Experience the Spirit of Goa
        </div>
        {/* Dot row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {CARNIVAL_COLORS.slice(0, 5).map((color, i) => (
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
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
