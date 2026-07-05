"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import ApiPlayground from "@/components/ApiPlayground";
import Contact from "@/components/Contact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Setup global scroll reveals
    const elements = gsap.utils.toArray<HTMLElement>(".reveal");
    
    elements.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

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
