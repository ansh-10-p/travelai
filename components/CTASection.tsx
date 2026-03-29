'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden bg-gradient-to-b from-cream to-off-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-warm-orange/10 rounded-full blur-3xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-soft-brown/10 rounded-full blur-3xl opacity-50"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="rounded-2xl border border-soft-brown/20 bg-gradient-to-br from-orange-50/60 to-white/60 backdrop-blur-xl p-8 sm:p-12 lg:p-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{
            boxShadow: '0 0 50px rgba(255, 125, 92, 0.15)',
          }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-6 text-soft-brown"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Ready to <span className="gradient-text-warm">Start Your Adventure?</span>
          </motion.h2>

          <motion.p
            className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Join thousands of travelers who have transformed their travel planning experience with Travel AI. 
            Get started free today.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(255, 125, 92, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-warm-orange to-orange-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.p
            className="text-gray-600 text-sm mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            No credit card required. Start planning your adventure today.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
