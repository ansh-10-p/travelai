'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PremiumCardProps {
  title: string
  description: string
  icon: ReactNode
  number?: string | number
  label?: string
  isDark?: boolean
}

export function PremiumCard({
  title,
  description,
  icon,
  number,
  label,
  isDark = true,
}: PremiumCardProps) {
  const bgColors = isDark
    ? 'from-cyan-950/40 to-slate-900/40'
    : 'from-orange-50/60 to-cream/60'
  const borderColor = isDark ? 'border-cyan-500/20' : 'border-soft-brown/20'
  const hoverBorderColor = isDark ? 'group-hover:border-cyan-500/50' : 'group-hover:border-warm-orange/50'
  const textColor = isDark ? 'text-cyan-400' : 'text-warm-orange'
  const titleColor = isDark ? 'text-white' : 'text-soft-brown'
  const hoverTitleColor = isDark ? 'group-hover:text-cyan-300' : 'group-hover:text-warm-orange'
  const descColor = isDark ? 'text-gray-400' : 'text-gray-700'

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`group relative rounded-2xl border ${borderColor} bg-gradient-to-br ${bgColors} backdrop-blur-xl p-8 overflow-hidden transition-all duration-300 ${hoverBorderColor}`}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${isDark ? 'bg-cyan-500/20' : 'bg-warm-orange/20'} rounded-full blur-3xl`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${isDark ? 'bg-amber-500/20' : 'bg-soft-brown/20'} rounded-full blur-3xl`} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className={`mb-6 inline-flex p-4 rounded-xl ${isDark ? 'bg-gradient-to-br from-cyan-500/20 to-amber-500/20' : 'bg-gradient-to-br from-warm-orange/20 to-orange-200/20'} border ${isDark ? 'border-cyan-500/30' : 'border-warm-orange/30'}`}
          whileHover={{
            scale: 1.1,
            rotate: 5,
          }}
        >
          <div className={`w-8 h-8 ${textColor} group-hover:${isDark ? 'text-amber-400' : 'text-orange-600'} transition-colors`}>
            {icon}
          </div>
        </motion.div>

        {/* Title */}
        <h3 className={`text-xl font-bold ${titleColor} mb-2 ${hoverTitleColor} transition-colors`}>
          {title}
        </h3>

        {/* Description */}
        <p className={`${descColor} text-sm mb-4 leading-relaxed`}>
          {description}
        </p>

        {/* Stats */}
        {number && label && (
          <div className="flex items-end gap-2">
            <motion.span
              className={`text-3xl font-bold ${isDark ? 'bg-gradient-to-r from-cyan-400 to-amber-400' : 'bg-gradient-to-r from-warm-orange to-orange-600'} bg-clip-text text-transparent`}
              whileHover={{ scale: 1.1 }}
            >
              {number}
            </motion.span>
            <span className={`${descColor} text-sm mb-1`}>{label}</span>
          </div>
        )}
      </div>

      {/* Border glow on hover */}
      <motion.div
        className={`absolute inset-0 rounded-2xl border border-transparent ${isDark ? 'group-hover:border-cyan-500/50' : 'group-hover:border-warm-orange/50'} transition-all duration-500 pointer-events-none`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  )
}
