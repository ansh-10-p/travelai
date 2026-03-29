"use client";

import { AnimatedRoadmap } from "@/components/ui/animated-roadmap";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Users, Zap, Filter, X, Send, Search } from "lucide-react";
import { useState, useEffect } from "react";
import CountUp from "react-countup";

const milestonesData = [
  {
    id: 1,
    name: "Kick-off",
    status: "complete" as const,
    position: { top: "70%", left: "5%" },
  },
  {
    id: 2,
    name: "Design",
    status: "complete" as const,
    position: { top: "15%", left: "20%" },
  },
  {
    id: 3,
    name: "Development",
    status: "in-progress" as const,
    position: { top: "45%", left: "55%" },
  },
  {
    id: 4,
    name: "Launch",
    status: "pending" as const,
    position: { top: "10%", right: "10%" },
  },
];

// Statistics data
const statsData = [
  { label: "Active Travelers", value: 50000, icon: Users },
  { label: "Destinations", value: 195, icon: MapPin },
  { label: "Trips Planned", value: 100000, icon: Zap },
  { label: "Avg Rating", value: 49, icon: Star },
];

// Testimonials data
const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Adventure Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    text: "TravelAI transformed how I plan my trips. The roadmap feature is a game-changer!",
  },
  {
    name: "Marcus Chen",
    role: "Business Traveler",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    text: "I can organize my business trips perfectly. Never missed a meeting or milestone.",
  },
  {
    name: "Emma Rodriguez",
    role: "Travel Photographer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    text: "The animations are beautiful and the planning tools are intuitive. Love it!",
  },
];

// Team data
const teamData = [
  {
    name: "Alex Turner",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  },
  {
    name: "Jessica Liu",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    name: "David Kim",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
  },
  {
    name: "Priya Patel",
    role: "Head of Marketing",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
];

// Pricing plans
const pricingPlans = [
  {
    name: "Explorer",
    price: "$9",
    description: "Perfect for casual travelers",
    features: ["Up to 5 trips", "Basic analytics", "Standard support", "5 destinations"],
  },
  {
    name: "Adventurer",
    price: "$29",
    description: "For frequent travelers",
    features: ["Unlimited trips", "Advanced analytics", "Priority support", "50 destinations", "Collaboration tools"],
    popular: true,
  },
  {
    name: "Globetrotter",
    price: "$99",
    description: "For travel professionals",
    features: ["Everything in Adventurer", "Custom roadmaps", "AI recommendations", "API access", "Dedicated manager"],
  },
];

// FAQ data
const faqData = [
  {
    question: "How does the roadmap planning work?",
    answer: "Our AI-powered roadmap breaks down your trip into manageable milestones, tracking progress as you go. You can customize every detail.",
  },
  {
    question: "Can I share my roadmap with others?",
    answer: "Yes! Adventurer and Globetrotter plans include collaboration features. Share with friends and track group progress.",
  },
  {
    question: "Is my travel data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and comply with international data protection regulations.",
  },
  {
    question: "What if I need to change my plans?",
    answer: "Our flexible system allows you to update milestones anytime. Changes are reflected instantly across all views.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.",
  },
];

const AnimationWrapper = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.3 }}
  >
    {children}
  </motion.div>
);

// Counter component that animates numbers in view
const AnimatedCounter = ({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) => {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setIsInView(true)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {isInView ? (
        <CountUp end={value} duration={2.5} separator="," />
      ) : (
        0
      )}
      {value >= 1000 && value <= 50000 && "+"}
      {suffix}
    </motion.div>
  );
};

// Interactive Feature Card
const InteractiveFeatureCard = ({ feature, index }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimationWrapper delay={index * 0.15}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="cursor-pointer h-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div
          animate={{ y: isHovered ? -5 : 0 }}
          className="text-center hover:shadow-2xl transition-shadow rounded-lg p-6 bg-white h-full flex flex-col"
        >
          <img 
            src={feature.image}
            alt={feature.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <motion.h3 
            animate={{ color: isHovered ? "#8B4513" : "#000" }}
            className="text-xl font-bold mb-2"
          >
            {feature.title}
          </motion.h3>
          <motion.p 
            initial={false}
            animate={{ height: isExpanded ? "auto" : 60 }}
            className="text-gray-600 overflow-hidden"
          >
            {feature.desc}
          </motion.p>
          {isExpanded && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 mt-4 pt-4 border-t"
            >
              {feature.details}
            </motion.p>
          )}
          <motion.p className="text-xs text-accent font-semibold mt-4">
            {isExpanded ? "Click to collapse" : "Click to learn more"}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimationWrapper>
  );
};

// Draggable Testimonial Card
const DraggableTestimonialCard = ({ testimonial, index }: any) => {
  const [isDragged, setIsDragged] = useState(false);

  return (
    <motion.div
      key={index}
      drag
      dragElastic={0.2}
      dragMomentum={false}
      onDragStart={() => setIsDragged(true)}
      onDragEnd={() => setIsDragged(false)}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)" }}
      className={`cursor-grab active:cursor-grabbing transition-shadow rounded-lg p-8 ${
        isDragged ? "bg-gray-100" : "bg-gray-50"
      } border border-gray-200 hover:shadow-md h-full`}
    >
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <div className="font-bold text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-600">{testimonial.role}</div>
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} whileHover={{ scale: 1.2 }}>
            <Star className="w-4 h-4 fill-accent text-accent" />
          </motion.div>
        ))}
      </div>
      <p className="text-gray-700 italic">&ldquo;{testimonial.text}&rdquo;</p>
    </motion.div>
  );
};

// Interactive Pricing Card
const InteractivePricingCard = ({ plan, index, selected, onSelect }: any) => {
  return (
    <AnimationWrapper delay={index * 0.15}>
      <motion.div
        onClick={() => onSelect(index)}
        whileHover={{ scale: 1.02 }}
        className="cursor-pointer"
      >
        <motion.div
          layout
          animate={{
            boxShadow: selected === index 
              ? "0 20px 60px rgba(139, 69, 19, 0.3)" 
              : "0 0 0 rgba(0, 0, 0, 0)"
          }}
          className={`rounded-lg p-8 flex flex-col h-full transition-all ${
            selected === index
              ? "bg-gradient-to-b from-primary to-secondary text-white shadow-xl border-2 border-accent" 
              : "bg-white border border-gray-200 hover:border-primary"
          }`}
        >
          {plan.popular && (
            <div className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold w-fit mb-4">
              Most Popular
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <p className={selected === index ? "text-white/80" : "text-gray-600"}>{plan.description}</p>
          <motion.div 
            layout
            className="text-4xl font-bold my-6"
          >
            {plan.price}
            <span className={selected === index ? "text-white/60" : "text-gray-600"}>/mo</span>
          </motion.div>
          <ul className="space-y-3 mb-8 flex-grow">
            {plan.features.map((feature: string, i: number) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="text-accent">✓</span>
                {feature}
              </motion.li>
            ))}
          </ul>
          <Button 
            size="lg" 
            variant={selected === index || plan.popular ? "outline" : "default"}
            className={selected === index || plan.popular ? "bg-white text-primary hover:bg-white/90" : ""}
          >
            {selected === index ? "Selected" : "Get Started"}
          </Button>
        </motion.div>
      </motion.div>
    </AnimationWrapper>
  );
};

// Interactive Trip Planning Form Modal
const TripPlanningModal = ({ isOpen, onClose }: any) => {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Trip planned:", formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Plan Your Trip</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travelers: {formData.travelers}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                <Send size={18} className="mr-2" />
                Plan My Trip
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Team member with hover details
const InteractiveTeamMember = ({ member, index }: any) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <AnimationWrapper delay={index * 0.1}>
      <motion.div
        onHoverStart={() => setShowDetails(true)}
        onHoverEnd={() => setShowDetails(false)}
        className="text-center cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-lg mb-4 h-48">
          <img 
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-primary to-transparent flex items-end justify-center p-4 text-white"
              >
                <div className="text-sm text-center">
                  <p>Click to view more</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.h3 
          animate={{ color: showDetails ? "#8B4513" : "#000" }}
          className="text-lg font-bold text-primary"
        >
          {member.name}
        </motion.h3>
        <p className="text-gray-600">{member.role}</p>
      </motion.div>
    </AnimationWrapper>
  );
};

export default function HeroSectionDemo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPricing, setSelectedPricing] = useState(1);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [testimonialFilter, setTestimonialFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full bg-gradient-to-b from-cream to-off-white text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-24">
        <AnimationWrapper>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl text-primary">
            Stay ahead with a <span className="bg-gradient-to-r from-accent to-secondary px-4 py-2 rounded-lg inline-block font-black text-white">clear roadmap</span>
          </h1>
        </AnimationWrapper>
        <AnimationWrapper delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-gray-600 md:text-xl leading-relaxed">
            Plan your travels with precision. Visualize your journey, track milestones, and hit every destination—faster and smarter.
          </p>
        </AnimationWrapper>
        <AnimationWrapper delay={0.4}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Get started - it&apos;s free!
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              See how it works
            </Button>
          </div>
        </AnimationWrapper>
      </div>

      {/* Statistics Section with Animated Counters */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimationWrapper key={index} delay={index * 0.1}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="text-center cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="w-12 h-12 text-accent mx-auto mb-4 flex items-center justify-center"
                    >
                      <Icon className="w-12 h-12" />
                    </motion.div>
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      <AnimatedCounter 
                        value={stat.value} 
                        suffix={index === 3 ? "★" : ""}
                        delay={0.5 + index * 0.1} 
                      />
                    </div>
                    <div className="text-gray-600 mt-2">{stat.label}</div>
                  </motion.div>
                </AnimationWrapper>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animated Roadmap Component */}
      <div className="relative w-full">
        <AnimatedRoadmap
          milestones={milestonesData}
          mapImageSrc="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
          aria-label="An animated roadmap showing travel milestones from kick-off to launch."
          className="py-16"
        />
      </div>

      {/* Features Section with Click Expansions */}
      <div className="container mx-auto px-4 py-24">
        <AnimationWrapper>
          <h2 className="text-4xl font-bold text-center text-primary mb-16">Why Choose TravelAI?</h2>
        </AnimationWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Interactive Planning",
              desc: "Plan every detail of your journey with our intuitive roadmap tool.",
              details: "Our AI-powered planning system adapts to your preferences and suggests optimal routes, accommodations, and activities.",
              image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&q=80",
            },
            {
              title: "Real-time Updates",
              desc: "Track your progress and stay updated with animated milestones.",
              details: "Get instant notifications for flight updates, booking confirmations, and milestone achievements throughout your journey.",
              image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80",
            },
            {
              title: "Global Coverage",
              desc: "Explore destinations worldwide with our comprehensive database.",
              details: "Access information on 195+ countries, 10,000+ attractions, and real-time local insights from verified travelers.",
              image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&q=80",
            },
          ].map((feature, index) => (
            <InteractiveFeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* Testimonials Section with Drag & Drop */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-4xl font-bold text-center text-primary mb-4">What Travelers Say</h2>
            <p className="text-center text-gray-600 text-lg mb-16">(Drag to reorder)</p>
          </AnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <DraggableTestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section with Interactive Selection */}
      <div className="container mx-auto px-4 py-24">
        <AnimationWrapper>
          <h2 className="text-4xl font-bold text-center text-primary mb-4">Simple Pricing</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">Choose the perfect plan for your travel planning needs (Click to compare)</p>
        </AnimationWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <InteractivePricingCard 
              key={index} 
              plan={plan} 
              index={index}
              selected={selectedPricing}
              onSelect={setSelectedPricing}
            />
          ))}
        </div>
      </div>

      {/* Team Section with Hover Details */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Meet Our Team</h2>
          </AnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {teamData.map((member, index) => (
              <InteractiveTeamMember key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-24">
        <AnimationWrapper>
          <h2 className="text-4xl font-bold text-center text-primary mb-16">Frequently Asked Questions</h2>
        </AnimationWrapper>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <AnimationWrapper key={index} delay={index * 0.05}>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left font-bold text-primary bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  {faq.question}
                  <span className={`transform transition-transform ${openFaq === index ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            </AnimationWrapper>
          ))}
        </div>
      </div>

      {/* Call-to-Action Cards Section */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent py-24">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-4xl font-bold text-center text-white mb-16">Ready to Start Your Journey?</h2>
          </AnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Sign Up Free", desc: "Start planning your first trip today" },
              { title: "Invite Friends", desc: "Collaborate on group travel planning" },
              { title: "Explore Guides", desc: "Learn tips from veteran travelers" },
            ].map((card, index) => (
              <AnimationWrapper key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/10 backdrop-blur border border-white/20 p-8 rounded-lg text-white text-center hover:bg-white/20 transition-all cursor-pointer"
                >
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/80">{card.desc}</p>
                </motion.div>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to plan your adventure?</h2>
            <p className="text-lg mb-8 text-white/90">Join thousands of travelers already using TravelAI</p>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => setIsTripModalOpen(true)}
            >
              Start Planning Now
            </Button>
          </AnimationWrapper>
        </div>
      </div>

      {/* Trip Planning Modal */}
      <TripPlanningModal isOpen={isTripModalOpen} onClose={() => setIsTripModalOpen(false)} />
    </div>
  );
}
