'use client'

import { motion } from 'framer-motion'
import { Sparkles, MapPin, Zap, Globe, TrendingUp, MoveRight, Compass } from 'lucide-react'
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
      title: 'Smart Itinerary Creation',
      description: 'AI-powered planning that creates perfect itineraries in seconds.',
      icon: <MapPin className="w-full h-full" />,
    },
    {
      title: 'Destination Intelligence',
      description: 'Discover hidden gems with our advanced recommendation engine.',
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
      className="relative min-h-screen w-full overflow-x-hidden pt-16 pb-20 bg-gradient-to-br from-off-white via-cream to-off-white"
    >
      {/* Vector Graphics - Top Right */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 opacity-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full bg-gradient-to-br from-warm-orange to-soft-brown rounded-full blur-3xl" />
      </motion.div>

      {/* Vector Graphics - Bottom Left */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-80 h-80 opacity-15 pointer-events-none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="w-full h-full bg-gradient-to-tr from-soft-brown to-warm-orange rounded-full blur-3xl" />
      </motion.div>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-20 w-64 h-64 bg-warm-orange/5 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-20 w-72 h-72 bg-soft-brown/5 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

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
          className="mb-12 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Beam />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          className="mx-auto max-w-5xl text-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block text-soft-brown mb-3">Your Travel, </span>
            <motion.span
              className="block gradient-text-warm text-5xl sm:text-6xl lg:text-7xl font-bold"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Perfectly Planned
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Experience the future of travel planning with AI-powered itineraries, smart recommendations, 
            and seamless booking. Your perfect adventure is just one click away.
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
              boxShadow: '0 20px 40px rgba(255, 125, 92, 0.2)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-warm-orange to-orange-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-orange-400/50"
          >
            <Zap className="w-5 h-5" />
            Start Planning Now
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(139, 69, 19, 0.05)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-soft-brown/50 bg-white/40 backdrop-blur-sm text-soft-brown rounded-xl font-semibold text-lg hover:border-soft-brown transition-all duration-300 flex items-center justify-center gap-2"
          >
            Learn More
            <MoveRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Tech Stack / Features Row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="text-sm text-gray-600 font-medium">Trusted by travelers worldwide</span>
          <div className="flex gap-3 flex-wrap justify-center">
            {['Next.js', 'AI Models', 'Real-time Data', 'Verified Reviews'].map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="px-4 py-2 rounded-xl bg-white/60 border border-soft-brown/20 backdrop-blur-sm text-xs text-soft-brown font-medium hover:border-warm-orange/50 transition-all"
              >
                {tech}
              </motion.div>
            ))}
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
          <motion.div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
                  isDark={false}
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
                className="p-4 rounded-xl bg-white/60 border border-soft-brown/20 backdrop-blur-sm text-center"
                whileHover={{ y: -5, borderColor: 'rgba(255, 125, 92, 0.5)' }}
              >
                <div className="text-2xl font-bold gradient-text-warm">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-700 mt-2 font-medium">{stat.label}</div>
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
          <div className="w-6 h-10 border-2 border-soft-brown/50 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-gradient-to-b from-warm-orange to-orange-600 rounded-full"
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
