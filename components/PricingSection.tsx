'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  icon?: string
}

export function PricingSection() {
  const plans: PricingPlan[] = [
    {
      name: 'Explorer',
      price: '$9',
      description: 'Perfect for casual travelers',
      features: [
        'Up to 5 destinations/month',
        'Basic itinerary planning',
        'Email support',
        'Offline map access',
        'Community tips',
      ],
    },
    {
      name: 'Adventurer',
      price: '$29',
      description: 'For frequent travelers',
      features: [
        'Unlimited destinations',
        'AI-powered itineraries',
        'Priority support',
        'Advanced analytics',
        'Group planning tools',
        'Booking discounts',
        'Real-time recommendations',
      ],
      highlighted: true,
    },
    {
      name: 'Nomad',
      price: '$79',
      description: 'For travel professionals',
      features: [
        'Everything in Adventurer',
        'Dedicated AI assistant',
        'Custom workflows',
        '24/7 phone support',
        'API access',
        'Team management',
        'White-label options',
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-warm-orange/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-soft-brown/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-soft-brown">Pricing Plans for </span>
            <span className="gradient-text-warm">Every Explorer</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your travel adventures. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? 'ring-2 ring-warm-orange shadow-2xl shadow-warm-orange/20 scale-105'
                  : 'border border-soft-brown/20'
              }`}
            >
              {/* Card Background */}
              <div
                className={`p-8 sm:p-10 rounded-2xl backdrop-blur-sm ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-warm-orange/10 to-orange-200/20'
                    : 'bg-white/50'
                }`}
              >
                {/* Badge */}
                {plan.highlighted && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [-5, 0, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="bg-gradient-to-r from-warm-orange to-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular ⭐
                    </span>
                  </motion.div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-soft-brown mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold gradient-text-warm">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-xl font-semibold mb-8 transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-warm-orange to-orange-600 text-white hover:shadow-lg hover:shadow-warm-orange/30'
                      : 'border-2 border-soft-brown text-soft-brown hover:bg-soft-brown/5'
                  }`}
                >
                  Get Started
                </motion.button>

                {/* Features List */}
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.05 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <Check className="w-5 h-5 text-warm-orange font-bold" />
                      </motion.div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Glow Effect */}
              {plan.highlighted && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-warm-orange/0 to-orange-600/0"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(255,125,92,0.1) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(255,125,92,0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(255,125,92,0.1) 0%, transparent 70%)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  pointer-events="none"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-700 mb-4">
            Need a custom plan? {' '}
            <motion.span
              className="text-warm-orange font-semibold cursor-pointer hover:underline inline-block"
              whileHover={{ scale: 1.05 }}
            >
              Contact our team
            </motion.span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
