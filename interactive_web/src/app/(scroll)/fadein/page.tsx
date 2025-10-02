import GlassBall from "@/app/(3D)/glassball/GlassSphere";
import FadeIn from "./FadeIn";

function Page() {
  return (
    <>
      <FadeIn direction="left" duration={0.5} delay={0}>
        <GlassBall></GlassBall>
      </FadeIn>
    </>
  );
}

export default Page;
