"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  AnimateWhenVisible,
  fadeIn,
  fadeInFromLeft,
  fadeInFromRight,
} from "./animation-utils";

const steps = [
  {
    step: "01",
    title: "Create Account",
    description: "Sign up for PayU and complete your business verification.",
  },
  {
    step: "02",
    title: "Integrate Payments",
    description:
      "Add our SDK to your website or mobile app with just a few lines of code.",
  },
  {
    step: "03",
    title: "Start Accepting Payments",
    description: "Begin receiving payments from customers worldwide instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimateWhenVisible
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl text-white md:text-4xl font-bold mb-4">
            How PayU Works
          </h2>
          <p className="text-gray-400 text-lg">
            Get started in minutes with our simple integration process.
          </p>
        </AnimateWhenVisible>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <AnimateWhenVisible
              key={index}
              variants={index % 2 === 0 ? fadeInFromLeft : fadeInFromRight}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0.5, x: 0 }}
                whileHover={{ opacity: 1, x: 5 }}
                className="text-5xl font-bold text-white"
              >
                {step.step}
              </motion.div>
              <div className="mt-4">
                <h3 className="text-xl text-white font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              {index < 2 && (
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="hidden md:block absolute top-8 right-0 transform translate-x-1/2"
                >
                  <ArrowRight className="h-8 w-8 text-gray-700" />
                </motion.div>
              )}
            </AnimateWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
