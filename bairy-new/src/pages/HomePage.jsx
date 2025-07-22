import React from "react";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/HeroSection/HeroSection";
import AboutSection from "../components/AboutSection/AboutSection";
import Accommodation from "../components/Accommodation/Accommodation";
import Activities from "../components/Activities/Activities";
import Gallery from "../components/Gallery/Gallery";
import Directions from "../components/Directions/Directions";
import Contacts from "../components/Contacts/Contacts";

export default function HomePage() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f9fbf9] group/design-root overflow-x-hidden"
      style={{
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      }}
    >
    <Layout>
      
      <HeroSection />
      <AboutSection />
      <Accommodation />
      <Activities />
      <Gallery />
      <Directions />
      <Contacts />
      
    </Layout>
    </div>
  );
}
