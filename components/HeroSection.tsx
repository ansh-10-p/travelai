'use client'

import { motion } from 'framer-motion'
import { Sparkles, MapPin, Zap, Globe, TrendingUp, MoveRight } from 'lucide-react'
import { HomeBadge } from '@/components/ui/HomeBadge'
import { Beam } from '@/components/ui/Beam'
import { PremiumCard } from '@/components/ui/PremiumCard'

export function HeroSection() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const featureCards = [
    {
      title: 'Smart Travel Planning',
      description: 'Create and manage personalized itineraries with AI assistance.',
      icon: <MapPin className="w-full h-full" />,
    },
    {
      title: 'Intelligent Recommendations',
      description: 'Get destination suggestions tailored to your preferences and budget.',
      icon: <Sparkles className="w-full h-full" />,
    },
  ]

  const stats = [
    {
      number: '1000+',
      label: 'Destinations',
      icon: <Globe className="w-full h-full" />,
    },
    {
      number: 'AI-Powered',
      label: 'Recommendations',
      icon: <TrendingUp className="w-full h-full" />,
    },
  ]

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full overflow-x-hidden pt-20 pb-20"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Vector graphics (optional - you can add images here) */}
      <motion.div
        className="absolute top-0 right-0 z-0 pointer-events-none opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HomeBadge />
        </motion.div>

        {/* Beam Effect */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Beam />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          className="mx-auto max-w-4xl text-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block text-white mb-3">Discover Your Next</span>
            <span className="block gradient-text text-5xl sm:text-6xl lg:text-7xl font-bold">
              Adventure With AI
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Experience personalized travel planning powered by artificial intelligence.
            Beautiful itineraries, smart recommendations, and seamless booking—all in one place.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-cyan-400/50"
          >
            <Zap className="w-5 h-5" />
            Start Planning Now
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-cyan-500/50 bg-white/5 backdrop-blur-sm text-cyan-300 rounded-xl font-semibold text-lg hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Learn More
            <MoveRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Tech Stack / Features Row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="text-sm text-gray-400">Powered by</span>
          <div className="flex gap-3">
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
              Next.js
            </div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
              AI Models
            </div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
              Real-time Data
            </div>
          </div>
        </motion.div>

        {/* Feature Cards Section */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Stat Cards with absolute positioning (desktop only) */}
          <motion.div
            className="hidden lg:block absolute top-32 left-0 z-20"
            variants={itemVariants}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <PremiumCard
              title={stats[0].label}
              description="Global Destinations"
              icon={stats[0].icon}
              number={stats[0].number}
            />
          </motion.div>

          <motion.div
            className="hidden lg:block absolute top-32 right-0 z-20"
            variants={itemVariants}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <PremiumCard
              title={stats[1].label}
              description="AI-Powered Suggestions"
              icon={stats[1].icon}
              number={stats[1].number}
            />
          </motion.div>

          {/* Main Feature Cards */}
          <motion.div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {featureCards.map((card, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8 + i * 0.1,
                }}
              >
                <PremiumCard
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Stats */}
          <motion.div className="lg:hidden grid grid-cols-2 gap-4 mt-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-center"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-gradient-to-b from-cyan-400 to-amber-400 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
