import { ArrowRight, Globe, Shield, Zap } from "lucide-react";
import { StatBadge } from "./stat-badge";
import { Button2 } from "./Button2";

export default function Hero() {
  return (
    <section className="relative  min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cdn2.hubspot.net/hub/4650993/avast-blog/282E464A-CD1B-4970-8A93-A42FC70A8E7D.jpeg#keepProtocol')] bg-cover opacity-15 -z-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto ">
        {/* Stats Banner */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <StatBadge
            icon={<Globe className="h-4 w-4" />}
            value="150+"
            label="Countries"
          />
          <StatBadge
            icon={<Shield className="h-4 w-4" />}
            value="99.9%"
            label="Uptime"
          />
          <StatBadge
            icon={<Zap className="h-4 w-4" />}
            value="2M+"
            label="Users"
          />
        </div>

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto ">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Revolutionizing Digital Payments for Everyone
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Experience lightning-fast transactions, bank-grade security, and
            seamless cross-border payments. All in one platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button2
              size="lg"
              className="hidden cursor-pointer items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button2>
            <Button2
              size="lg"
              variant="outline"
              className="inline-flex items-center justify-center rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              View Live Demo
            </Button2>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-12 text-muted-foreground">
            <div className="text-sm">
              <div className="font-medium text-primary">Enterprise Ready</div>
              SOC2 Type II Certified
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm">
              <div className="font-medium text-primary">Highly Rated</div>
              4.9/5 on G2 Crowd
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm">
              <div className="font-medium text-primary">24/7 Support</div>
              Average Response &lt; 5min
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
