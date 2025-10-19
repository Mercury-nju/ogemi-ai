'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, Bot, User, Sparkles, Zap, Shield, Globe, MessageCircle, ArrowRight, Play, Star } from 'lucide-react'
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

  const features = [
    {
      icon: Zap,
      title: '极速响应',
      description: '毫秒级响应，流畅对话体验'
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: '企业级安全保障，隐私保护'
    },
    {
      icon: Globe,
      title: '多语言支持',
      description: '支持多种语言，全球通用'
    },
    {
      icon: MessageCircle,
      title: '智能理解',
      description: '深度理解上下文，精准回答'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* 现代化背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 主背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
        
        {/* 动态光效 */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <Header />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* 左侧内容 */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-6">
                  {/* 标签 */}
                  <motion.div 
                    className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">AI驱动的智能对话</span>
                  </motion.div>

                  <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="gradient-text">Ogemi AI</span>
                    <br />
                    <span className="text-white">重新定义</span>
                    <br />
                    <span className="text-gray-300">智能对话</span>
                  </h1>
                  
                  <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                    体验最先进的AI对话技术，让智能助手成为您工作和生活的得力伙伴。
                    自然流畅的对话，理解您的每一个需求。
                  </p>
                </div>

                {/* CTA按钮组 */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.button 
                    className="btn-primary flex items-center justify-center space-x-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    <span>立即体验</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  <motion.button 
                    className="btn-secondary flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Star className="w-5 h-5" />
                    <span>了解更多</span>
                  </motion.button>
                </motion.div>

                {/* 特性列表 */}
                <motion.div 
                  className="grid grid-cols-2 gap-4 pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">{feature.title}</h3>
                        <p className="text-xs text-gray-400">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* 右侧聊天界面 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  {/* 装饰性元素 */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  <ChatInterface />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 特性展示区域 */}
        <section className="py-20 px-4">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div 
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                为什么选择 <span className="gradient-text">Ogemi AI</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                我们致力于提供最先进的AI对话体验，让每一次交互都更加智能和自然
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: '智能理解',
                  description: '深度理解上下文，提供精准回答',
                  icon: MessageCircle,
                  color: 'blue'
                },
                {
                  title: '快速响应',
                  description: '毫秒级响应速度，流畅对话体验',
                  icon: Zap,
                  color: 'purple'
                },
                {
                  title: '安全可靠',
                  description: '企业级安全保障，保护用户隐私',
                  icon: Shield,
                  color: 'green'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="card-modern hover-lift group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
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
