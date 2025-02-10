import Hero from "./Hero";
import Features from "./Features";
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}
