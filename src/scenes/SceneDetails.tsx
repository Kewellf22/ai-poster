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

export const SceneDetails: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, SCENE_DURATION);

  return (
    <AbsoluteFill style={{ opacity }}>
      <DetailsBackground frame={frame} />

      <Sequence from={5}>
        <DetailsTitle frame={frame} />
      </Sequence>

      <Sequence from={15}>
        <DetailBlock
          frame={frame}
          delay={0}
          icon="📅"
          label="WHEN"
          value="February 22 - 25, 2026"
          sub="Four spectacular days & nights"
          y={400}
          color={COLORS.orange}
        />
      </Sequence>

      <Sequence from={25}>
        <DetailBlock
          frame={frame}
          delay={0}
          icon="📍"
          label="WHERE"
          value="Panaji, Goa"
          sub="18th June Road & across the city"
          y={610}
          color={COLORS.pink}
        />
      </Sequence>

      <Sequence from={35}>
        <DetailBlock
          frame={frame}
          delay={0}
          icon="🎭"
          label="HIGHLIGHTS"
          value="Parade • Music • Dance • Feast"
          sub="King Momo crowning & Float competition"
          y={820}
          color={COLORS.purple}
        />
      </Sequence>

      <Sequence from={45}>
        <DetailBlock
          frame={frame}
          delay={0}
          icon="🎟️"
          label="ENTRY"
          value="Free for Everyone"
          sub="Open to all — celebrate together!"
          y={1030}
          color={COLORS.green}
        />
      </Sequence>

      <Sequence from={55}>
        <ScheduleGrid frame={frame} />
      </Sequence>
    </AbsoluteFill>
  );
};

const DetailsBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const hue = interpolate(frame, [0, SCENE_DURATION], [0, 15]);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            170deg,
            hsl(${350 + hue}, 70%, 16%) 0%,
            hsl(${10 + hue}, 75%, 24%) 40%,
            hsl(${30 + hue}, 80%, 30%) 70%,
            hsl(${0 + hue}, 70%, 14%) 100%
          )`,
        }}
      />
    </AbsoluteFill>
  );
};

const DetailsTitle: React.FC<{ frame: number }> = ({ frame }) => {
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
            marginBottom: 10,
          }}
        >
          PLAN YOUR VISIT
        </div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 80,
            fontWeight: 900,
            color: COLORS.white,
            textShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          Event Info
        </div>
        <div
          style={{
            width: 160,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
            margin: "12px auto 0",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const DetailBlock: React.FC<{
  frame: number;
  delay: number;
  icon: string;
  label: string;
  value: string;
  sub: string;
  y: number;
  color: string;
}> = ({ frame, delay, icon, label, value, sub, y, color }) => {
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 50, mass: 0.6 },
  });
  const translateY = interpolate(s, [0, 1], [60, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 55,
        right: 55,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "22px 30px",
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(12px)",
          borderRadius: 22,
          borderLeft: `5px solid ${color}`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        <span style={{ fontSize: 48 }}>{icon}</span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 16,
              fontWeight: 900,
              color,
              letterSpacing: 4,
              marginBottom: 4,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 28,
              fontWeight: "bold",
              color: COLORS.white,
              marginBottom: 4,
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 19,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {sub}
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleGrid: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 60 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);

  const days = [
    { day: "Day 1", event: "King Momo\nCrowning", color: COLORS.orange },
    { day: "Day 2", event: "Grand\nParade", color: COLORS.pink },
    { day: "Day 3", event: "Float\nCompetition", color: COLORS.purple },
    { day: "Day 4", event: "Red & Black\nDance", color: COLORS.green },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 140,
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 18,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: 4,
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        SCHEDULE
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        {days.map((d, i) => {
          const ds = spring({
            frame: frame - i * 5,
            fps,
            config: { damping: 50 },
          });
          const scale = interpolate(ds, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                width: 200,
                padding: "16px 10px",
                background: `linear-gradient(180deg, ${d.color}20, ${d.color}08)`,
                borderRadius: 16,
                border: `1.5px solid ${d.color}40`,
                textAlign: "center",
                transform: `scale(${scale})`,
              }}
            >
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 16,
                  fontWeight: 900,
                  color: d.color,
                  letterSpacing: 2,
                  marginBottom: 6,
                }}
              >
                {d.day}
              </div>
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 18,
                  color: "rgba(255,255,255,0.8)",
                  whiteSpace: "pre-line",
                  lineHeight: 1.3,
                }}
              >
                {d.event}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
