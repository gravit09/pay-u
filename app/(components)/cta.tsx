"use client";

import { Button2 } from "./Button2";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Cta() {
  const router = useRouter();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557264337-e8a93017fe92?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Payments?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust our platform for their payment
            needs. Experience the future of digital payments today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button2
              onClick={() => router.push("/login")}
              size="lg"
              variant="secondary"
              className="text-lg px-8"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button2>
          </div>
        </div>
      </div>
    </section>
  );
}
