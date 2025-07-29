import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

export const Landing = () => {
  return (
    <div className="bg-gradient-to-br from-[#000428] via-[#1f1c2c] to-[#6a0572] min-h-screen">
      <main>
        <Hero />
        <Features />
      </main>
      <Footer/>
    </div>
  );
};

