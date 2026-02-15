import { Composition } from "remotion";
import { CarnivalInGoa } from "./CarnivalInGoa";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
