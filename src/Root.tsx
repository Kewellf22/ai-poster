import { Composition } from "remotion";
import { CarnivalInGoa } from "./CarnivalInGoa";
import { CarnivalVideo } from "./CarnivalVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full animated video — 25 seconds, 7 scenes */}
      <Composition
        id="CarnivalVideo"
        component={CarnivalVideo}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Original poster composition */}
      <Composition
        id="CarnivalInGoa"
        component={CarnivalInGoa}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
