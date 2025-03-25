import ProjectLayout from "@/components/layout/ProjectLayout";
import protestPlatformPic from "@/assets/images/protest-platform/protest-platform-map.gif";

export default function ProtestPlatform() {
  return (
    <ProjectLayout
      title="Protest Platform"
      description="UI Design for a theoretical social media platform for protesters around the world. Activists can post the contents of their picket signs onto a bulletin for their city, connect with each other and organize demonstarations. Users view the posts for other cities around the world, and see what they are experienceing. However to avoid foreign interferance, users can only participate on the bulletins for the city where they are located. True change comes from within."
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src={protestPlatformPic}
          alt="Robot Pigeon Interface"
          className="w-full rounded-lg shadow-xl"
        />
      </div>
      <div className="space-y-24">
        <p>
          Insipiration: Foreign influence operatives got tens of thousands of
          Americans to attend for their phony political events on Facebook, in
          wake of the 2016 US presidential election.
        </p>
      </div>
    </ProjectLayout>
  );
}
