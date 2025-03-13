"use client";

import { motion } from "framer-motion";
import { AnimateWhenVisible, fadeIn, pulseAnimation } from "./animation-utils";

const testimonials = [
  {
    quote:
      "PayU has transformed how we handle payments. The integration was seamless and our conversion rates have improved by 25%.",
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
  },
  {
    quote:
      "The global payment options have allowed us to expand to new markets we couldn't reach before. Customer support is also excellent.",
    name: "Michael Chen",
    role: "CFO, Global Retail",
  },
  {
    quote:
      "We've reduced payment fraud by 90% since switching to PayU. Their security features are unmatched in the industry.",
    name: "Jessica Williams",
    role: "CTO, SecureShop",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <AnimateWhenVisible
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl text-white md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 text-lg">
            Join thousands of satisfied businesses using PayU.
          </p>
        </AnimateWhenVisible>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimateWhenVisible key={index} variants={fadeIn} className="">
              <motion.div
                whileHover={{ y: -10 }}
                animate={pulseAnimation.animate}
                initial={pulseAnimation.initial}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 h-full"
              >
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.span
                      key={star}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: star * 0.1 }}
                      className="text-yellow-500 inline-block"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600"
                  ></motion.div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimateWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
