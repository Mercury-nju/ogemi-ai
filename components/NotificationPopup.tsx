'use client'

import { motion } from 'framer-motion'
import { X, Bell } from 'lucide-react'

interface NotificationPopupProps {
  message: string
  onClose: () => void
}

export default function NotificationPopup({ message, onClose }: NotificationPopupProps) {
  return (
    <motion.div
      className="notification-popup"
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex items-start space-x-3">
        {/* 通知图标 */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
        </div>
        
        {/* 通知内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold text-dark-800">Ogemi AI</h4>
            <span className="text-xs text-gray-500">刚刚</span>
          </div>
          <p className="text-sm text-dark-700 leading-relaxed">{message}</p>
        </div>
        
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      {/* 进度条 */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-b-2xl"
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
        onAnimationComplete={onClose}
      />
    </motion.div>
  )
}
