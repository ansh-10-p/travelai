"use client";

import { motion } from "framer-motion";
import { useDashboard } from "../DashboardContext";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const conversations = [
  { id: 1, name: "Sarah Johnson", message: "Can I join your Paris trip?", time: "2 hours ago", unread: true, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80" },
  { id: 2, name: "Marcus Chen", message: "Thanks for the Tokyo tips!", time: "1 day ago", unread: false, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80" },
  { id: 3, name: "Emma Rodriguez", message: "New York itinerary looks great", time: "3 days ago", unread: false, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&q=80" },
];

export const MessagesPage = () => {
  const { isDarkMode } = useDashboard();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState("");

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`space-y-6 sm:space-y-8 ${bgClass}`}
    >
      {/* Header - Enhanced */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Messages</h1>
        <p className={`${subtextClass} text-sm sm:text-base`}>Connect with other travelers and share experiences</p>
      </motion.div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 h-[400px] sm:h-[500px]`}>
        {/* Conversations List - Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
          className={`${cardBg} rounded-xl border shadow-lg hover:shadow-2xl overflow-y-auto transition-all`}
        >
          {conversations.map((conv, index) => (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedConversation(conv.id)}
              whileHover={{ scale: 1.02 }}
              className={`w-full p-4 sm:p-5 text-left border-b transition-all flex items-start gap-3 relative overflow-hidden group ${
                selectedConversation === conv.id
                  ? `bg-gradient-to-r from-orange-500/10 to-red-500/10 ${isDarkMode ? "border-gray-600 border-l-4 border-l-orange-500" : "border-gray-100 border-l-4 border-l-orange-500"}`
                  : isDarkMode ? "border-gray-700 hover:bg-gray-700/50" : "border-gray-100 hover:bg-gray-50"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="relative"
              >
                <img src={conv.avatar} alt={conv.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0 object-cover shadow-md" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm sm:text-base font-semibold ${conv.unread ? `${textClass} font-bold` : textClass}`}>{conv.name}</p>
                <p className={`text-xs sm:text-sm ${subtextClass} truncate line-clamp-1`}>{conv.message}</p>
                <p className={`text-xs ${subtextClass} mt-1`}>{conv.time}</p>
              </div>
              {conv.unread && (
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex-shrink-0"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Chat Area - Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
          className={`md:col-span-2 ${cardBg} rounded-xl border shadow-lg hover:shadow-2xl transition-all flex flex-col overflow-hidden`}
        >
          {/* Chat Header */}
          <motion.div 
            className={`p-4 sm:p-6 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"} bg-gradient-to-r from-orange-500/10 to-red-500/10`}
          >
            {conversations.map((conv) => (
              selectedConversation === conv.id && (
                <motion.div 
                  key={conv.id} 
                  className="flex items-center gap-3 justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.img 
                      src={conv.avatar} 
                      alt={conv.name} 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-md"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <h3 className={`font-bold text-sm sm:text-base ${textClass}`}>{conv.name}</h3>
                      <p className={`text-xs sm:text-sm ${subtextClass}`}>
                        <motion.span 
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ● Online now
                        </motion.span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </motion.div>

          {/* Messages */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`w-fit max-w-xs sm:max-w-sm p-3 sm:p-4 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} shadow-md`}
            >
              <p className={`text-xs sm:text-base ${subtextClass}`}>Hi! Are you interested in sharing travel experiences?</p>
              <p className={`text-xs ${subtextClass} mt-2`}>10:30 AM</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 w-fit max-w-xs sm:max-w-sm p-3 sm:p-4 rounded-xl ml-auto shadow-md"
            >
              <p className="text-xs sm:text-base text-white">Absolutely! Let's exchange travel tips and recommendations</p>
              <p className="text-xs text-white/80 mt-2">10:35 AM</p>
            </motion.div>
          </div>

          {/* Message Input - Enhanced */}
          <motion.div 
            className={`p-4 sm:p-6 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} bg-gradient-to-r from-orange-500/5 to-red-500/5 flex gap-2 sm:gap-3`}
          >
            <motion.input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              whileFocus={{ boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)" }}
              className={`flex-1 px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none transition-all ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
              }`}
            />
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(249, 115, 22, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-all flex items-center justify-center"
            >
              <Send size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
