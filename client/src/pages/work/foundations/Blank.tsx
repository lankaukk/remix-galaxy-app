import ProjectLayout from "@/components/layout/ProjectLayout";

export default function Blank() {
  return (
    <ProjectLayout
      title="_Blank: A Digital Experience"
      description="_blank is a digital experience that explores contemporary social media consumption. The editorial website was made with video editing, CSS animations, JavaScript, and jQuery. It uses the viewer’s webcam to place their own live video in the space. The ultimate message to the audience is the need to be mindful of their online habits and personal relationships with technology. Over-stimulation leads to overwhelm."
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src="https://mckayla.com/images/projects/blank/walkthrough.gif"
          alt="Walkthrough"
          className="w-full rounded-lg shadow-xl"
        />

        <img
          src="https://mckayla.com/images/projects/blank/install.gif"
          alt="Installation GIF"
          className="w-full rounded-lg shadow-lg"
        />
        <img
          src="https://mckayla.com/images/projects/blank/phones-interaction.gif"
          alt="Phones Interaction"
          className="w-full rounded-lg shadow-lg"
        />
        <img
          src="https://mckayla.com/images/projects/blank/desk-person.jpg"
          alt="Desk with Person"
          className="w-full rounded-lg shadow-lg"
        />
        <img
          src="https://mckayla.com/images/projects/blank/ending.gif"
          alt="Ending"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </ProjectLayout>
  );
}
