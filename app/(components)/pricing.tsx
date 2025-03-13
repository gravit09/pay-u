"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { AnimateWhenVisible, fadeIn } from "./animation-utils";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small businesses just getting started.",
    features: [
      "2.9% + 30¢ per transaction",
      "Accept credit & debit cards",
      "24/7 email support",
      "Basic fraud protection",
      "Standard payouts (2-3 days)",
    ],
  },
  {
    name: "Business",
    price: "$79",
    description: "Ideal for growing businesses with higher volume.",
    features: [
      "2.5% + 30¢ per transaction",
      "All payment methods",
      "24/7 priority support",
      "Advanced fraud protection",
      "Faster payouts (1-2 days)",
      "Detailed analytics",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large businesses.",
    features: [
      "Custom pricing",
      "Dedicated account manager",
      "Custom integration support",
      "Enterprise-grade security",
      "Instant payouts",
      "Advanced reporting & API access",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimateWhenVisible
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl text-white md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg">
            No hidden fees. Choose the plan that works for your business.
          </p>
        </AnimateWhenVisible>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <AnimateWhenVisible key={index} variants={fadeIn} className="">
              <motion.div
                whileHover={{ y: -10 }}
                className={`bg-gray-950 border ${
                  plan.popular ? "border-purple-500" : "border-gray-800"
                } rounded-xl p-8 relative ${
                  plan.popular ? "shadow-lg shadow-purple-500/20" : ""
                }`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full"
                  >
                    Most Popular
                  </motion.div>
                )}
                <h3 className="text-xl text-white font-semibold mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="text-4xl text-white font-bold"
                  >
                    {plan.price}
                  </motion.span>
                  {plan.price !== "Custom" && (
                    <span className="text-gray-400">/month</span>
                  )}
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </motion.div>
            </AnimateWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
