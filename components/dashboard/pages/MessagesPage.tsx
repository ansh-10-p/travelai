"use client";

import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const conversations = [
  { id: 1, name: "Sarah Johnson", message: "Can I join your Paris trip?", time: "2 hours ago", unread: true, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80" },
  { id: 2, name: "Marcus Chen", message: "Thanks for the Tokyo tips!", time: "1 day ago", unread: false, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80" },
  { id: 3, name: "Emma Rodriguez", message: "New York itinerary looks great", time: "3 days ago", unread: false, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&q=80" },
];

export const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">Connect with other travelers</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
        {/* Conversations List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-1 bg-white rounded-lg border border-gray-200 shadow-md overflow-y-auto"
        >
          {conversations.map((conv, index) => (
            <motion.button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              whileHover={{ backgroundColor: "#f9fafb" }}
              className={`w-full p-4 text-left border-b border-gray-200 flex items-start gap-3 transition-all ${
                selectedConversation === conv.id ? "bg-blue-50 border-l-4 border-l-primary" : ""
              }`}
            >
              <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${conv.unread ? "text-gray-900 font-bold" : "text-gray-700"}`}>{conv.name}</p>
                <p className="text-sm text-gray-600 truncate">{conv.message}</p>
                <p className="text-xs text-gray-500 mt-1">{conv.time}</p>
              </div>
              {conv.unread && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
            </motion.button>
          ))}
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-white rounded-lg border border-gray-200 shadow-md flex flex-col"
        >
          <div className="p-6 border-b border-gray-200">
            {conversations.map((conv) => (
              selectedConversation === conv.id && (
                <div key={conv.id} className="flex items-center gap-3">
                  <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-bold text-gray-900">{conv.name}</h3>
                    <p className="text-sm text-gray-600">Online now</p>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="bg-gray-100 w-fit max-w-xs p-3 rounded-lg">
              <p className="text-gray-700">Hi! Are you interested in sharing experiences?</p>
            </div>
            <div className="bg-blue-500 w-fit max-w-xs p-3 rounded-lg ml-auto text-white">
              <p>Absolutely! Let's exchange travel tips</p>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Send size={20} />
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
