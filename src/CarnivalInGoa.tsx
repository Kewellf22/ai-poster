import {
  AbsoluteFill,
  interpolate,
  spring,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "./components/Background";
import { MaskIcon } from "./components/MaskIcon";
import { Title } from "./components/Title";
import { Details } from "./components/Details";
import { Confetti } from "./components/Confetti";
import { FloatingElements } from "./components/FloatingElements";
import { Footer } from "./components/Footer";

export const CarnivalInGoa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    config: { damping: 80, mass: 0.5 },
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background />
      <Confetti />
      <FloatingElements />

      <AbsoluteFill
        style={{
          opacity: fadeIn,
          transform: `scale(${scale})`,
        }}
      >
        {/* Top decorative banner */}
        <Sequence from={5}>
          <TopBanner />
        </Sequence>

        {/* Mask Icon */}
        <Sequence from={10}>
          <MaskIcon />
        </Sequence>

        {/* Main Title */}
        <Sequence from={15}>
          <Title />
        </Sequence>

        {/* Event Details */}
        <Sequence from={25}>
          <Details />
        </Sequence>

        {/* Footer */}
        <Sequence from={35}>
          <Footer />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const TopBanner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideDown = spring({
    frame,
    fps,
    config: { damping: 60 },
  });

  const y = interpolate(slideDown, [0, 1], [-100, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #FF6B35, #F7C948)",
          padding: "14px 50px",
          borderRadius: 50,
          boxShadow: "0 4px 20px rgba(255, 107, 53, 0.5)",
        }}
      >
        <span
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 28,
            fontWeight: "bold",
            color: "#fff",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Goa Tourism Presents
        </span>
      </div>
    </div>
  );
};
