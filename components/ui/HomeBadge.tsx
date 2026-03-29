'use client'

import { motion } from 'framer-motion'

export function HomeBadge() {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 border border-warm-orange/30 backdrop-blur-sm"
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 20px rgba(255, 125, 92, 0.3)',
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="w-2 h-2 bg-warm-orange rounded-full animate-pulse" />
      <span className="text-sm font-semibold text-warm-orange">
        ✨ Explore. Plan. Travel Smarter
      </span>
    </motion.div>
  )
}
