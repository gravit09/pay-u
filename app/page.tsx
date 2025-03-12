import Cta from "./(components)/cta";
import Features from "./(components)/features";
import Footer from "./(components)/footer";
import Hero from "./(components)/hero";
import HowItWorks from "./(components)/how-it-works";
import { Navbar } from "./(components)/navbar";
import Pricing from "./(components)/pricing";
import Testimonials from "./(components)/testimonials";
import TrustedBy from "./(components)/trust";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Cta />
      <Footer />
    </div>
  );
}
