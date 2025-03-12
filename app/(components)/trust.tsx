"use client";

import { motion } from "framer-motion";
import { AnimateWhenVisible, fadeIn } from "./animation-utils";

export default function TrustedBy() {
  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimateWhenVisible variants={fadeIn} className="">
          <p className="text-center text-gray-400 mb-8">
            Trusted by leading companies worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, opacity: 1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="h-12 w-32 bg-gray-800 rounded-md"
              ></motion.div>
            ))}
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  );
}
