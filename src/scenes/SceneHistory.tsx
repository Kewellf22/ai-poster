import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { sceneOpacity, COLORS } from "../utils";

const SCENE_DURATION = 120;

export const SceneHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, SCENE_DURATION);

  return (
    <AbsoluteFill style={{ opacity }}>
      <HistoryBackground frame={frame} />

      <Sequence from={5}>
        <SectionTitle frame={frame} />
      </Sequence>

      <Sequence from={15}>
        <TimelineItem
          frame={frame}
          delay={0}
          year="18th Century"
          text="Portuguese settlers bring the tradition of Carnival to Goa, blending European festivities with local culture"
          y={520}
          color={COLORS.orange}
        />
      </Sequence>

      <Sequence from={30}>
        <TimelineItem
          frame={frame}
          delay={0}
          year="King Momo"
          text="The mythical King of Chaos opens the Carnival, commanding everyone to forget their worries and celebrate life"
          y={760}
          color={COLORS.pink}
        />
      </Sequence>

      <Sequence from={45}>
        <TimelineItem
          frame={frame}
          delay={0}
          year="Today"
          text="India's biggest Carnival draws millions with parades, music, dance, and the spirit of Susegad — the Goan art of contentment"
          y={1000}
          color={COLORS.green}
        />
      </Sequence>

      <Sequence from={60}>
        <QuoteBanner frame={frame} />
      </Sequence>
    </AbsoluteFill>
  );
};

const HistoryBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const hue = interpolate(frame, [0, SCENE_DURATION], [0, 15]);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            175deg,
            hsl(${270 + hue}, 60%, 15%) 0%,
            hsl(${290 + hue}, 50%, 22%) 40%,
            hsl(${310 + hue}, 55%, 18%) 100%
          )`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(255,215,0,0.08) 0%, transparent 60%)",
        }}
      />
      {/* Vintage overlay dots */}
      <AbsoluteFill style={{ opacity: 0.03 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="histDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#histDots)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SectionTitle: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 15], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 100,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 80,
              height: 2,
              background: "linear-gradient(90deg, transparent, #FFD700)",
            }}
          />
          <span
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 22,
              color: COLORS.gold,
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            A Legacy of Joy
          </span>
          <div
            style={{
              width: 80,
              height: 2,
              background: "linear-gradient(90deg, #FFD700, transparent)",
            }}
          />
        </div>
        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 72,
            fontWeight: 900,
            color: COLORS.white,
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            margin: 0,
          }}
        >
          The Story
        </h2>
      </div>
    </AbsoluteFill>
  );
};

const TimelineItem: React.FC<{
  frame: number;
  delay: number;
  year: string;
  text: string;
  y: number;
  color: string;
}> = ({ frame, delay, year, text, y, color }) => {
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 50, mass: 0.6 },
  });
  const translateX = interpolate(s, [0, 1], [-100, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 70,
        right: 70,
        display: "flex",
        gap: 20,
        transform: `translateX(${translateX}px)`,
        opacity,
      }}
    >
      {/* Timeline dot & line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 30,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}80`,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: 2,
            flexGrow: 1,
            background: `linear-gradient(180deg, ${color}60, transparent)`,
            marginTop: 4,
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)",
          padding: "22px 28px",
          borderRadius: 18,
          borderLeft: `4px solid ${color}`,
          flex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 26,
            fontWeight: 900,
            color,
            marginBottom: 8,
            letterSpacing: 2,
          }}
        >
          {year}
        </div>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 24,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.5,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

const QuoteBanner: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 60 } });
  const scale = interpolate(s, [0, 1], [0.8, 1]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 200,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "25px 50px",
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(233,30,99,0.2))",
          borderRadius: 20,
          border: "1px solid rgba(255,215,0,0.2)",
        }}
      >
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 32,
            fontStyle: "italic",
            color: COLORS.gold,
            lineHeight: 1.6,
          }}
        >
          "Eat, drink, and be merry —
          <br />
          for tomorrow we fast!"
        </div>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            marginTop: 10,
          }}
        >
          — The Spirit of Carnival
        </div>
      </div>
    </AbsoluteFill>
  );
};
