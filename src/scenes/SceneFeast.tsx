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

export const SceneFeast: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, SCENE_DURATION);

  return (
    <AbsoluteFill style={{ opacity }}>
      <FeastBackground frame={frame} />

      <Sequence from={5}>
        <FeastTitle frame={frame} />
      </Sequence>

      <Sequence from={18}>
        <DishShowcase frame={frame} />
      </Sequence>

      <Sequence from={60}>
        <FeastQuote frame={frame} />
      </Sequence>
    </AbsoluteFill>
  );
};

const FeastBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const hue = interpolate(frame, [0, SCENE_DURATION], [0, 15]);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            172deg,
            hsl(${15 + hue}, 75%, 15%) 0%,
            hsl(${30 + hue}, 70%, 22%) 35%,
            hsl(${45 + hue}, 65%, 20%) 70%,
            hsl(${10 + hue}, 70%, 12%) 100%
          )`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255,165,0,0.1) 0%, transparent 60%)",
        }}
      />
    </AbsoluteFill>
  );
};

const FeastTitle: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 40 } });
  const scale = interpolate(s, [0, 1], [0.5, 1]);

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
            color: COLORS.orange,
            letterSpacing: 8,
            marginBottom: 12,
          }}
        >
          TASTE OF GOA
        </div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 82,
            fontWeight: 900,
            color: COLORS.white,
            textShadow: `0 0 25px rgba(255,165,0,0.4), 0 4px 12px rgba(0,0,0,0.4)`,
          }}
        >
          The Feast
        </div>
        <div
          style={{
            width: 180,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.orange}, transparent)`,
            margin: "12px auto 0",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const DishShowcase: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();

  const dishes = [
    {
      emoji: "🍛",
      name: "Vindaloo",
      desc: "Fiery pork curry with Goan spices & vinegar",
      color: "#FF5722",
    },
    {
      emoji: "🦐",
      name: "Xacuti",
      desc: "Aromatic prawn curry with roasted coconut",
      color: "#FF9800",
    },
    {
      emoji: "🍰",
      name: "Bebinca",
      desc: "Seven-layered Goan coconut pudding",
      color: "#F7C948",
    },
    {
      emoji: "🥥",
      name: "Feni",
      desc: "Iconic cashew & coconut palm spirit of Goa",
      color: "#8BC34A",
    },
    {
      emoji: "🐟",
      name: "Fish Curry Rice",
      desc: "The soul of every Goan table — kokum & coconut",
      color: "#2196F3",
    },
    {
      emoji: "🧁",
      name: "Dodol",
      desc: "Sweet sticky treat made with jaggery & coconut",
      color: "#9C27B0",
    },
  ];

  return (
    <AbsoluteFill style={{ top: 380 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: "0 55px",
        }}
      >
        {dishes.map((dish, i) => {
          const s = spring({
            frame: frame - i * 6,
            fps,
            config: { damping: 50, mass: 0.5 },
          });
          const x = interpolate(s, [0, 1], [i % 2 === 0 ? -80 : 80, 0]);
          const opacity = interpolate(s, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "16px 24px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 18,
                borderLeft: `4px solid ${dish.color}`,
                transform: `translateX(${x}px)`,
                opacity,
              }}
            >
              <span style={{ fontSize: 44 }}>{dish.emoji}</span>
              <div>
                <div
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: 26,
                    fontWeight: 900,
                    color: dish.color,
                  }}
                >
                  {dish.name}
                </div>
                <div
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: 20,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.4,
                  }}
                >
                  {dish.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const FeastQuote: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 60 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const y = interpolate(s, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 140,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "20px 40px",
          background: "rgba(255,165,0,0.1)",
          borderRadius: 16,
          border: "1px solid rgba(255,165,0,0.2)",
        }}
      >
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 28,
            fontStyle: "italic",
            color: COLORS.gold,
            lineHeight: 1.5,
          }}
        >
          "No Carnival is complete
          <br />
          without a Goan feast"
        </div>
      </div>
    </AbsoluteFill>
  );
};
