import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import FadeInSection from "@/components/FadeInSection";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">

        <div className="container">
          <FadeInSection animationClass="animate-fade-in-down-10" threshold={0.05}>
            <SectionTitle
              title="What types of processes can be automated? "
              paragraph="Here are some of the areas where our automation services can make a difference."
              center
            />
          </FadeInSection>

          <FadeInSection animationClass="animate-fade-in-down-20"  threshold={0.25}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 ">
              {featuresData.map((feature) => (
                <SingleFeature key={feature.id} feature={feature} />
              ))}
            </div>
          </FadeInSection>

        </div>
      </section>
    </>
  );
};

export default Features;
