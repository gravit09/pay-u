import Cta from "./(components)/cta";
import Features from "./(components)/features";
import { Footer } from "./(components)/footer";
import Hero from "./(components)/hero";
import { Navbar } from "./(components)/navbar";
import { PricingSection } from "./(components)/pricing";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <PricingSection />
      <Cta />
      <Footer />
    </div>
  );
}
