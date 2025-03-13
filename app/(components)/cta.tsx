"use client";

import { motion } from "framer-motion";
import { Button } from "./button";
import { AnimateWhenVisible, fadeIn } from "./animation-utils";

export default function Cta() {
  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden">
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-0"
      ></motion.div>
      <div className="container mx-auto px-4 relative z-10">
        <AnimateWhenVisible
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl text-white md:text-4xl font-bold mb-6">
            Ready to transform your payment experience?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses that trust PayU for their payment
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Create Free Account
              </Button>
            </motion.div>
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  );
}
