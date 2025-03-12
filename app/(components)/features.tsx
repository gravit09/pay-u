"use client";

import {
  Globe,
  Zap,
  ShieldCheck,
  Lock,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimateWhenVisible, fadeIn } from "./animation-utils";

const features = [
  {
    icon: <Globe className="h-10 w-10 text-purple-500" />,
    title: "Global Payments",
    description:
      "Accept payments in 100+ currencies from customers around the world.",
  },
  {
    icon: <Zap className="h-10 w-10 text-blue-500" />,
    title: "Instant Transfers",
    description:
      "Get paid quickly with our fast settlement options and real-time tracking.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-green-500" />,
    title: "Fraud Protection",
    description:
      "Advanced AI-powered fraud detection to keep your business safe.",
  },
  {
    icon: <Lock className="h-10 w-10 text-yellow-500" />,
    title: "Secure Encryption",
    description:
      "Bank-level encryption and security for all transactions and data.",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-red-500" />,
    title: "Multiple Payment Methods",
    description:
      "Credit cards, bank transfers, digital wallets, and local payment options.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-teal-500" />,
    title: "Easy Integration",
    description:
      "Simple API and pre-built components to integrate payments in minutes.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <AnimateWhenVisible
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl text-white md:text-4xl font-bold mb-4">
            Powerful Features for Modern Businesses
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to accept payments and grow your business
            online.
          </p>
        </AnimateWhenVisible>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimateWhenVisible key={index} variants={fadeIn} className="">
              <motion.div
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "rgba(139, 92, 246, 0.5)", // Purple color with opacity
                }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 h-full"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, 5, 0, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                  className="mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl text-white font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            </AnimateWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
