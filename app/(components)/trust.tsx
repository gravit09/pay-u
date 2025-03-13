"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AnimateWhenVisible, fadeIn } from "./animation-utils";

const companies = [
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { name: "Facebook", logo: "https://logo.clearbit.com/facebook.com" },
  { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com" },
  { name: "Tesla", logo: "https://logo.clearbit.com/tesla.com" },
];

export default function TrustedBy() {
  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimateWhenVisible variants={fadeIn} className="">
          <p className="text-center text-white mb-8 text-lg">
            Trusted by leading companies worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                whileHover={{ y: -5, opacity: 1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-12 w-32 flex items-center justify-center"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  width={60}
                  height={38}
                  className="object-contain"
                  unoptimized
                />
              </motion.div>
            ))}
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  );
}
