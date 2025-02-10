import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Hero />
      </div>
    </main>
  );
}
