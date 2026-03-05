import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import CV from "../components/CV";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const skills = [
      {
        category: "Frontend",
        icon: "🎨",
        skills: ["React", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
      },
      {
        category: "Backend",
        icon: "⚙️",
        skills: ["Node.js", "Express", "JWT Auth"],
      },

      {
        category: "Databases",
        icon: "🗄️",
        skills: ["MongoDB"],
      },
      {
        category: "Tools",
        icon: "🛠️",
        skills: ["VS Code", "Figma", "Postman"],
      },
      {
        id: "ecf7d5e0-d492-4b75-bf2f-10f2fe575b66",
        category: "Machine Learning",
        icon: "🤖",
        skills: [
          "Python 3",
          "Sklearn",
          "Data Cleaning",
          "Features Engineering",
          "Data Visualization",
          "numpy",
          "scipy",
        ],
      },
    ],
    projects = [
      {
        id: "0330871a-6394-4d5e-b02b-63706be0c304",
        title: "TV Advertising vs Sales",
        description:
          "🎉 This is my first Machine Learning project, where I explore how TV advertising affects product sales using Linear Regression.",
        tech: ["Python", "pandas", "matplotlib", "scikit-learn"],
        github: "https://github.com/ahmed-elhdad/Advertising-Sales",
        live: null,
        emoji: "🤖",
        thumbnail: null,
        createdAt: "2026-03-01T21:47:22.764Z",
        updatedAt: "2026-03-01T21:47:22.764Z",
      },
      {
        id: "ee2b4f19-ee57-4167-ab79-97e94aa145cd",
        title: "House Price",
        description:
          "A professional Machine Learning project that predicts house prices based on size, number of bedrooms, and house age using regression models.",
        tech: ["Python", "pandas", "matplotlib", "scikit-learn"],
        github: "https://github.com/ahmed-elhdad/Houses-Prices",
        live: null,
        emoji: "🤖",
        thumbnail: null,
        createdAt: "2026-03-01T21:46:36.132Z",
        updatedAt: "2026-03-01T21:46:36.132Z",
      },
      {
        id: "82d1f5ce-e46d-482d-a7c3-5c58fc3bb875",
        title: "Fuel Efficiency",
        description:
          "A professional Machine Learning project that predicts miles per gallon (MPG) based on horsepower using regression models.\r\n\r\n",
        tech: ["Python", "pandas", "matplotlib", "scikit-learn"],
        github: "https://github.com/ahmed-elhdad/Fuel-Efficiency",
        live: null,
        emoji: "🤖",
        thumbnail: null,
        createdAt: "2026-03-01T21:45:23.380Z",
        updatedAt: "2026-03-01T21:45:23.380Z",
      },
    ];

  return (
    <>
      <Navbar />
      <main>
        <Hero projectCount={projects.length} />
        <About />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience />
        <CV />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
