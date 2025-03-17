import {
  Globe,
  Lock,
  CreditCard,
  Shield,
  Wallet,
  ChartBar,
} from "lucide-react";

import { Card } from "./card";

const features = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Bank-Grade Security",
    description:
      "Enterprise-level encryption and advanced fraud protection systems safeguard every transaction.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Global Payments",
    description:
      "Send and receive money instantly across 150+ countries with competitive exchange rates.",
  },
  {
    icon: <Wallet className="h-8 w-8" />,
    title: "Smart Wallet",
    description:
      "Manage multiple currencies, track expenses, and earn rewards with our intelligent digital wallet.",
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Virtual Cards",
    description:
      "Create virtual cards for online purchases with customizable spending limits and controls.",
  },
  {
    icon: <ChartBar className="h-8 w-8" />,
    title: "Advanced Analytics",
    description:
      "Gain insights into your spending patterns with detailed financial analytics and reports.",
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Secure Authentication",
    description:
      "Multi-factor authentication and biometric security keep your account protected.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Why Millions Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of digital payments with our
            comprehensive feature set
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-start">
                <div className="p-3 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
