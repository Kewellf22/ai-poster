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

export const SceneMusic: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, SCENE_DURATION);

  return (
    <AbsoluteFill style={{ opacity }}>
      <MusicBackground frame={frame} />
      <SoundWaves frame={frame} />

      <Sequence from={5}>
        <MusicTitle frame={frame} />
      </Sequence>

      <Sequence from={20}>
        <EqualizerBars frame={frame} />
      </Sequence>

      <Sequence from={25}>
        <MusicGenreList frame={frame} />
      </Sequence>

      <Sequence from={55}>
        <InstrumentRow frame={frame} />
      </Sequence>

      <Sequence from={70}>
        <DanceFloor frame={frame} />
      </Sequence>
    </AbsoluteFill>
  );
};

const MusicBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const hue = interpolate(frame, [0, SCENE_DURATION], [0, 20]);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            175deg,
            hsl(${210 + hue}, 70%, 12%) 0%,
            hsl(${240 + hue}, 60%, 18%) 40%,
            hsl(${280 + hue}, 50%, 22%) 70%,
            hsl(${200 + hue}, 65%, 10%) 100%
          )`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(156,39,176,0.15) 0%, transparent 60%)",
        }}
      />
    </AbsoluteFill>
  );
};

const SoundWaves: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <AbsoluteFill style={{ opacity: 0.06 }}>
      {[...Array(6)].map((_, i) => {
        const radius = 200 + i * 120 + Math.sin(frame * 0.03 + i) * 30;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 540 - radius,
              top: 960 - radius,
              width: radius * 2,
              height: radius * 2,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const MusicTitle: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 40 } });
  const scale = interpolate(s, [0, 1], [0.5, 1]);

  const bounce = Math.sin(frame * 0.1) * 3;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 100,
        transform: `scale(${scale}) translateY(${bounce}px)`,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            color: COLORS.cyan,
            letterSpacing: 8,
            marginBottom: 10,
          }}
        >
          RHYTHM & SOUL
        </div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 88,
            fontWeight: 900,
            color: COLORS.white,
            textShadow: `0 0 30px rgba(156,39,176,0.5), 0 4px 15px rgba(0,0,0,0.4)`,
          }}
        >
          Music
        </div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 48,
            fontStyle: "italic",
            color: COLORS.purple,
            marginTop: -5,
          }}
        >
          & Dance
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EqualizerBars: React.FC<{ frame: number }> = ({ frame }) => {
  const barCount = 24;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: 200,
      }}
    >
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 100 }}>
        {[...Array(barCount)].map((_, i) => {
          const height =
            20 +
            Math.abs(Math.sin(frame * 0.08 + i * 0.5)) * 70 +
            Math.abs(Math.cos(frame * 0.05 + i * 0.3)) * 30;
          const color = CARNIVAL_COLORS[i % CARNIVAL_COLORS.length];
          return (
            <div
              key={i}
              style={{
                width: 28,
                height,
                borderRadius: 6,
                background: `linear-gradient(180deg, ${color}, ${color}60)`,
                boxShadow: `0 0 8px ${color}40`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const MusicGenreList: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const genres = [
    { name: "Mandó", desc: "Traditional Goan love ballads", color: COLORS.pink },
    { name: "Dekhni", desc: "Folk dance music of temple devotees", color: COLORS.orange },
    { name: "Fugdi", desc: "High-energy circle dance rhythms", color: COLORS.green },
    { name: "Samba & Jazz", desc: "Portuguese-influenced carnival beats", color: COLORS.purple },
  ];

  return (
    <AbsoluteFill style={{ top: 620 }}>
      {genres.map((genre, i) => {
        const s = spring({
          frame: frame - i * 8,
          fps,
          config: { damping: 50, mass: 0.5 },
        });
        const x = interpolate(s, [0, 1], [i % 2 === 0 ? -100 : 100, 0]);
        const opacity = interpolate(s, [0, 1], [0, 1]);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "16px 40px",
              marginBottom: 12,
              marginLeft: 60,
              marginRight: 60,
              transform: `translateX(${x}px)`,
              opacity,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 16,
              borderLeft: `4px solid ${genre.color}`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: genre.color,
                boxShadow: `0 0 10px ${genre.color}80`,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: genre.color,
                }}
              >
                {genre.name}
              </div>
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 20,
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {genre.desc}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const InstrumentRow: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const instruments = ["🥁", "🎺", "🎷", "🪘", "🎻", "🪗"];
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: 600,
      }}
    >
      <div style={{ display: "flex", gap: 30 }}>
        {instruments.map((inst, i) => {
          const s = spring({
            frame: frame - i * 4,
            fps,
            config: { damping: 40 },
          });
          const scale = interpolate(s, [0, 1], [0, 1]);
          const bounce = Math.sin(frame * 0.08 + i * 1.2) * 8;

          return (
            <div
              key={i}
              style={{
                fontSize: 50,
                transform: `scale(${scale}) translateY(${bounce}px)`,
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
              }}
            >
              {inst}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const DanceFloor: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 50 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);

  const tiles = 8;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        paddingBottom: 120,
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          flexWrap: "wrap",
          padding: "0 40px",
        }}
      >
        {[...Array(tiles * 2)].map((_, i) => {
          const pulseDelay = i * 0.3;
          const brightness =
            0.3 + Math.abs(Math.sin(frame * 0.06 + pulseDelay)) * 0.7;
          const color = CARNIVAL_COLORS[i % CARNIVAL_COLORS.length];
          return (
            <div
              key={i}
              style={{
                width: 55,
                height: 55,
                borderRadius: 8,
                backgroundColor: color,
                opacity: brightness,
                boxShadow: `0 0 ${brightness * 15}px ${color}60`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
