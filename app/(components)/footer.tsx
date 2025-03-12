"use client";

import { CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateWhenVisible, fadeIn } from "./animation-utils";

const footerLinks = [
  {
    title: "Product",
    links: [
      "Features",
      "Pricing",
      "Integrations",
      "Documentation",
      "API Reference",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press", "Partners"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Status", "Security", "Legal"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <CreditCard className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                PayU
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 mb-4"
            >
              Secure, fast, and reliable payment solutions for businesses of all
              sizes.
            </motion.p>
            <div className="flex gap-4">
              {["twitter", "facebook", "instagram", "linkedin"].map(
                (social, i) => (
                  <motion.a
                    key={social}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-600 rounded-sm"></div>
                  </motion.a>
                )
              )}
            </div>
          </div>

          {footerLinks.map((column, i) => (
            <AnimateWhenVisible key={i} variants={fadeIn} className="">
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.1 }}
                  >
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </AnimateWhenVisible>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 PayU. All rights reserved.
          </p>
          <div className="flex gap-6">
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="text-gray-500 hover:text-white text-sm"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="text-gray-500 hover:text-white text-sm"
            >
              Terms of Service
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="text-gray-500 hover:text-white text-sm"
            >
              Cookies
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
