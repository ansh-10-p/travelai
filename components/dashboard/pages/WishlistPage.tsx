"use client";

import { motion } from "framer-motion";
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
  const [items, setItems] = useState(wishlistItems);

  const toggleSave = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, saved: !item.saved } : item));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
        <p className="text-gray-600 mt-2">Save your dream destinations for later</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md"
          >
            <div className="relative h-40">
              <img src={item.image} alt={item.destination} className="w-full h-full object-cover" />
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleSave(item.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <Heart size={20} className={item.saved ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </motion.button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">{item.destination}</h3>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <span className="text-yellow-500">★</span>
                {item.rating}
              </div>
              <p className="text-lg font-bold text-primary mt-3">{item.price}</p>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">Explore</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
