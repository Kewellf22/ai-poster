import { interpolate, spring } from "remotion";

/** Fade in from 0 to 1 */
export const fadeIn = (frame: number, start: number, duration = 20): number =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Fade out from 1 to 0 */
export const fadeOut = (frame: number, start: number, duration = 20): number =>
  interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Combined scene opacity: fade in at start, fade out at end */
export const sceneOpacity = (
  frame: number,
  sceneDuration: number,
  fadeInDur = 15,
  fadeOutDur = 15,
): number => {
  const enter = fadeIn(frame, 0, fadeInDur);
  const exit = fadeOut(frame, sceneDuration - fadeOutDur, fadeOutDur);
  return Math.min(enter, exit);
};

/** Slide in from a direction */
export const slideIn = (
  frame: number,
  fps: number,
  delay = 0,
  from: "left" | "right" | "top" | "bottom" = "bottom",
  distance = 120,
): { transform: string } => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 60, mass: 0.6 } });
  const offset = interpolate(s, [0, 1], [distance, 0]);
  const axis = from === "left" || from === "right" ? "X" : "Y";
  const sign = from === "right" || from === "bottom" ? 1 : -1;
  return { transform: `translate${axis}(${offset * sign}px)` };
};

/** Pulsing scale effect */
export const pulse = (frame: number, speed = 0.06, amount = 0.05): number =>
  1 + Math.sin(frame * speed) * amount;

/** Color palette for Carnival */
export const COLORS = {
  gold: "#FFD700",
  orange: "#FF6B35",
  pink: "#E91E63",
  green: "#4CAF50",
  blue: "#2196F3",
  purple: "#9C27B0",
  red: "#FF5722",
  cyan: "#00BCD4",
  yellow: "#F7C948",
  lime: "#8BC34A",
  deepPurple: "#1a0a2e",
  white: "#FFFFFF",
};

export const CARNIVAL_COLORS = [
  COLORS.orange,
  COLORS.gold,
  COLORS.pink,
  COLORS.green,
  COLORS.blue,
  COLORS.purple,
  COLORS.red,
  COLORS.cyan,
];
