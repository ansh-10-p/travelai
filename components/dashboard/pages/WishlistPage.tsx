"use client";

import { motion } from "framer-motion";
import { useDashboard } from "../DashboardContext";
import { Heart, MapPin, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const wishlistItems = [
  { id: 1, destination: "Santorini, Greece", rating: 4.9, price: "$3,200", saved: true, image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=300&q=80" },
  { id: 2, destination: "Maldives", rating: 4.8, price: "$2,500", saved: true, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&q=80" },
  { id: 3, destination: "Iceland", rating: 4.7, price: "$1,800", saved: false, image: "https://images.unsplash.com/photo-1504681869696-d977e13a3082?w=300&q=80" },
  { id: 4, destination: "New Zealand", rating: 4.9, price: "$2,800", saved: true, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
];

export const WishlistPage = () => {
  const { isDarkMode } = useDashboard();
  const [items, setItems] = useState(wishlistItems);

  const toggleSave = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, saved: !item.saved } : item));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBg = isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const subtextClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`space-y-6 sm:space-y-8 ${bgClass}`}
    >
      {/* Header - Enhanced */}
      <motion.div 
        variants={itemVariants}
        className="space-y-2"
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Wishlist</h1>
        <p className={`${subtextClass} text-sm sm:text-base`}>Save your dream destinations and plan future adventures</p>
      </motion.div>

      {/* Wishlist Items Grid - Enhanced */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -12, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
            className={`${cardBg} rounded-xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all flex flex-col h-full group`}
          >
            {/* Image Section */}
            <div className="relative h-40 sm:h-48 flex-shrink-0 overflow-hidden">
              <motion.img 
                src={item.image} 
                alt={item.destination} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              />
              
              {/* Save Button - Enhanced */}
              <motion.button
                layout
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleSave(item.id)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all z-10"
              >
                <motion.div
                  animate={item.saved ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart 
                    size={20} 
                    className={item.saved ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}
                  />
                </motion.div>
              </motion.button>

              {/* Rating Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded-lg text-white text-sm font-semibold"
              >
                <span className="text-yellow-400">★</span> {item.rating}
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
              <motion.h3 
                className={`text-base sm:text-lg font-bold ${textClass} line-clamp-2`}
              >
                {item.destination}
              </motion.h3>

              {/* Stats */}
              <motion.div 
                className="flex items-center gap-3 mt-4 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className={`flex items-center gap-1 ${subtextClass}`}>
                  <MapPin size={16} />
                  <span>Popular</span>
                </div>
              </motion.div>

              {/* Price */}
              <motion.p 
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mt-4"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.price}
              </motion.p>

              {/* Explore Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(249, 115, 22, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-auto py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-all"
              >
                Explore →
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${cardBg} rounded-xl p-12 text-center border`}
        >
          <Heart size={48} className={`mx-auto mb-4 ${subtextClass}`} />
          <p className={`${textClass} text-lg font-semibold`}>Your wishlist is empty</p>
          <p className={`${subtextClass} text-sm mt-1`}>Start exploring destinations to add them to your wishlist</p>
        </motion.div>
      )}

      {/* Saved Count */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${cardBg} p-6 rounded-xl border shadow-lg text-center`}
        >
          <p className={`text-sm ${subtextClass}`}>Saved Destinations</p>
          <motion.p 
            className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mt-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {items.filter(i => i.saved).length}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};
