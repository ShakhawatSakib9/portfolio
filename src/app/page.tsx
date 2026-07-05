import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import ApiPlayground from "@/components/ApiPlayground";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Work />
        <ApiPlayground />
        <Contact />
      </main>
    </>
  );
}
