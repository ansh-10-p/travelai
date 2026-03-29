'use client'

import { motion } from 'framer-motion'

export function HomeBadge() {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-amber-500/20 border border-cyan-500/30 backdrop-blur-sm"
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
      <span className="text-sm font-medium text-cyan-300">
        ✨ Explore the World Smarter
      </span>
    </motion.div>
  )
}
