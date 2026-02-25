import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import CV from '../components/CV';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { api } from '../api/client';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.getProjects()
      .then(d => setProjects(d.projects || []))
      .catch(() => {});

    api.getSkills()
      .then(d => setSkills(d.skills || []))
      .catch(() => {});
  }, []);

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
