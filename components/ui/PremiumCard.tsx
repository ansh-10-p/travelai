'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PremiumCardProps {
  title: string
  description: string
  icon: ReactNode
  number?: string | number
  label?: string
}

export function PremiumCard({
  title,
  description,
  icon,
  number,
  label,
}: PremiumCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 to-slate-900/40 backdrop-blur-xl p-8 overflow-hidden"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-amber-500/20 border border-cyan-500/30"
          whileHover={{
            scale: 1.1,
            rotate: 5,
          }}
        >
          <div className="w-8 h-8 text-cyan-400 group-hover:text-amber-400 transition-colors">
            {icon}
          </div>
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Stats */}
        {number && label && (
          <div className="flex items-end gap-2">
            <motion.span
              className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.1 }}
            >
              {number}
            </motion.span>
            <span className="text-gray-400 text-sm mb-1">{label}</span>
          </div>
        )}
      </div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-500/50 transition-all duration-500 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  )
}
