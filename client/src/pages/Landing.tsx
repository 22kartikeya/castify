import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#6a0572,_#1f1c2c,_#000428)]">
      <main>
        <Hero />
        <Features />
      </main>
      <Footer/>
    </div>
  );
};

