"use client";

import Image from "next/image";
import heroImage from "../../assets/topic-cluster-products-by-searching-online.png";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { fadeIn, fadeInFromRight, staggerContainer } from "./animation-utils";

export default function Hero() {
  return (
    <section className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl text-white font-bold leading-tight"
            >
              Seamless Payments for the Digital Age
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-gray-300">
              PayU provides secure, fast, and reliable payment solutions for
              businesses of all sizes. Accept payments from anywhere in the
              world.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group"
                >
                  Get Started
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              ></motion.div>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-4 text-sm text-gray-400"
            >
              <p>Trusted by 10,000+ businesses worldwide</p>
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInFromRight}
            className="relative"
          >
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-2xl opacity-20"
            ></motion.div>
            <motion.div
              whileHover={{
                y: -5,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative rounded-2xl"
            >
              <div className="aspect-[4/3] mt-9 relative rounded-lg overflow-hidden mb-6">
                <Image
                  src={heroImage}
                  alt="PayU Dashboard"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
