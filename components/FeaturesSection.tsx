'use client'

import { motion } from 'framer-motion'
import { Brain, MapPin, Zap, BarChart3 } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI Travel Assistant',
      description: 'Get intelligent recommendations powered by machine learning algorithms.',
    },
    {
      icon: MapPin,
      title: '1000+ Destinations',
      description: 'Explore curated travel destinations across the globe.',
    },
    {
      icon: Zap,
      title: 'Smart Planning',
      description: 'Automated itinerary generation tailored to your preferences.',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track your travel plans with comprehensive insights and analytics.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Why Choose Travel </span>
            <span className="gradient-text">AI</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the features that make your travel planning effortless and enjoyable
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 40px rgba(6, 182, 212, 0.2)',
                }}
                className="group p-6 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300"
              >
                <motion.div
                  className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-amber-500/20"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                >
                  <Icon className="w-6 h-6 text-cyan-400 group-hover:text-amber-400 transition-colors" />
                </motion.div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
