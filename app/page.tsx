'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, Bot, User, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatInterface from '@/components/ChatInterface'
import NotificationPopup from '@/components/NotificationPopup'
import Header from '@/components/Header'

export default function Home() {
  const [isRecording, setIsRecording] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  // 模拟通知显示
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotificationMessage('欢迎使用Ogemi AI！我是您的智能助手，随时为您服务。')
      setShowNotification(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleNotificationClose = () => {
    setShowNotification(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl"></div>
      </div>

      <Header />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* 主要内容区域 */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* 左侧内容 */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="gradient-text">Ogemi AI</span>
                  <br />
                  <span className="text-white">智能对话助手</span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  体验最先进的AI对话技术，让智能助手成为您工作和生活的得力伙伴。
                  自然流畅的对话，理解您的每一个需求。
                </p>
              </div>

              {/* 视频预览区域 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="glass-effect rounded-2xl p-6 space-y-4">
                  <div className="aspect-video bg-dark-700 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20"></div>
                    <div className="relative z-10 text-center">
                      <Bot className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                      <p className="text-white font-medium">AI智能对话演示</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button 
                    className="w-full bg-white text-dark-900 font-semibold py-4 px-6 rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>立即体验</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* 右侧聊天界面 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ChatInterface />
            </motion.div>
          </div>
        </div>
      </main>

      {/* 通知弹窗 */}
      <AnimatePresence>
        {showNotification && (
          <NotificationPopup 
            message={notificationMessage}
            onClose={handleNotificationClose}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
