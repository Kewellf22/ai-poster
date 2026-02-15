import { AbsoluteFill, Sequence } from "remotion";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneHistory } from "./scenes/SceneHistory";
import { SceneParade } from "./scenes/SceneParade";
import { SceneMusic } from "./scenes/SceneMusic";
import { SceneFeast } from "./scenes/SceneFeast";
import { SceneDetails } from "./scenes/SceneDetails";
import { SceneOutro } from "./scenes/SceneOutro";

/**
 * Carnival in Goa — Full Video
 *
 * Scene timeline (at 30fps):
 *   0–119   (4s)  Intro — Title reveal with mask & confetti
 * 100–219   (4s)  History — Origins & legacy of Goa Carnival
 * 200–319   (4s)  Parade — Grand parade highlights
 * 300–419   (4s)  Music — Rhythm, dance & instruments
 * 400–519   (4s)  Feast — Goan cuisine showcase
 * 500–619   (4s)  Details — Event info & schedule
 * 600–749   (5s)  Outro — Call to action & closing
 *
 * Total: 750 frames = 25 seconds at 30fps
 * Scenes overlap by 20 frames for smooth cross-fades.
 */

const SCENE_GAP = 100; // frames between scene starts (with 20-frame overlap for crossfade)

export const CarnivalVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <Sequence from={0} durationInFrames={120} layout="none">
        <SceneIntro />
      </Sequence>

      <Sequence from={SCENE_GAP} durationInFrames={120} layout="none">
        <SceneHistory />
      </Sequence>

      <Sequence from={SCENE_GAP * 2} durationInFrames={120} layout="none">
        <SceneParade />
      </Sequence>

      <Sequence from={SCENE_GAP * 3} durationInFrames={120} layout="none">
        <SceneMusic />
      </Sequence>

      <Sequence from={SCENE_GAP * 4} durationInFrames={120} layout="none">
        <SceneFeast />
      </Sequence>

      <Sequence from={SCENE_GAP * 5} durationInFrames={120} layout="none">
        <SceneDetails />
      </Sequence>

      <Sequence from={SCENE_GAP * 6} durationInFrames={150} layout="none">
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
