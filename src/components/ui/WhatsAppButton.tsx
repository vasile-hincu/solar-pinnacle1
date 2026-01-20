import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/37378901362"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full" />
    </motion.a>
  );
};
