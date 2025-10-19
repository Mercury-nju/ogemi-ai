'use client'

import { motion } from 'framer-motion'
import { X, Bell, Sparkles } from 'lucide-react'

interface NotificationPopupProps {
  message: string
  onClose: () => void
}

export default function NotificationPopup({ message, onClose }: NotificationPopupProps) {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4"
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="glass-effect-strong rounded-2xl p-4 border border-gray-700/50 shadow-2xl">
        <div className="flex items-start space-x-3">
          {/* 通知图标 */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          
          {/* 通知内容 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-semibold text-white">Ogemi AI</h4>
              <span className="text-xs text-gray-400">刚刚</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{message}</p>
          </div>
          
          {/* 关闭按钮 */}
          <motion.button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>
        
        {/* 进度条 */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-2xl"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 5, ease: 'linear' }}
          onAnimationComplete={onClose}
        />
      </div>
    </motion.div>
  )
}
