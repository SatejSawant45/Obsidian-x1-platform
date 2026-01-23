import Image from "next/image";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Engineering from "@/components/Engineering";
import InsideTheMachine from "@/components/InsideTheMachine";
import DesignSection from "@/components/DesignSection";
import AboutBrand from "@/components/AboutBrand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <section id="engineering">
        <Engineering />
      </section>

      {/* Inside the Machine Section */}
      <InsideTheMachine />


      <DesignSection />

      <section id="about-the-brand">
        <AboutBrand />
      </section>
      <Footer />
    </main>
  );
}
