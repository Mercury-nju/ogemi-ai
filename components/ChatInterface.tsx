'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, Bot, User, Sparkles, Loader2, MoreVertical, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '您好！我是Ogemi AI，您的智能助手。有什么我可以帮助您的吗？',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // 直接调用OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-9bf19547ddbd4be1a87a7a43cf251097`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: '你是Ogemi AI，一个友好、智能的AI助手。你能够帮助用户解决各种问题，提供有用的建议和信息。请用中文回复，保持友好和专业的语调。'
            },
            {
              role: 'user',
              content: inputValue
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      })

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.choices?.[0]?.message?.content || '抱歉，我现在无法回应。请稍后再试。',
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '抱歉，发生了错误。请检查网络连接后重试。',
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // 这里可以添加语音录制逻辑
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div 
        className="glass-effect-strong rounded-3xl h-[700px] flex flex-col overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* 现代化聊天头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Ogemi AI</h3>
              <p className="text-sm text-gray-400">在线 · 智能助手</p>
            </div>
          </div>
          <motion.button 
            className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>

        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6 scrollbar-thin">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex items-start space-x-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* 头像 */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-gray-700 to-gray-800'
                  }`}>
                    {message.isUser ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  {/* 消息内容 */}
                  <div className="flex flex-col space-y-2">
                    <div className={`chat-bubble ${
                      message.isUser ? 'chat-bubble-user' : 'chat-bubble-ai'
                    }`}>
                      <p className="text-sm leading-relaxed text-white">{message.content}</p>
                    </div>
                    
                    {/* 消息操作 */}
                    {!message.isUser && (
                      <motion.div 
                        className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.button 
                          className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => copyToClipboard(message.content)}
                        >
                          <Copy className="w-3 h-3 text-gray-400" />
                        </motion.button>
                        <motion.button 
                          className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ThumbsUp className="w-3 h-3 text-gray-400" />
                        </motion.button>
                        <motion.button 
                          className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ThumbsDown className="w-3 h-3 text-gray-400" />
                        </motion.button>
                      </motion.div>
                    )}
                    
                    {/* 时间戳 */}
                    <p className={`text-xs ${
                      message.isUser ? 'text-blue-300/70 text-right' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('zh-CN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* 加载状态 */}
          {isLoading && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="chat-bubble chat-bubble-ai">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-300">正在思考...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 现代化输入区域 */}
        <div className="p-6 border-t border-gray-800/50">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入您的消息..."
                className="input-modern w-full resize-none rounded-2xl px-4 py-3 pr-12"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-xs text-gray-500">Enter 发送</span>
              </div>
            </div>
            
            {/* 语音按钮 */}
            <motion.button
              onClick={toggleRecording}
              className={`p-3 rounded-2xl transition-all duration-200 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25' 
                  : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRecording ? (
                <MicOff className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>
            
            {/* 发送按钮 */}
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={`p-3 rounded-2xl transition-all duration-200 ${
                inputValue.trim() && !isLoading
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800/50 border border-gray-700/50 cursor-not-allowed'
              }`}
              whileHover={inputValue.trim() && !isLoading ? { scale: 1.05 } : {}}
              whileTap={inputValue.trim() && !isLoading ? { scale: 0.95 } : {}}
            >
              <Send className={`w-5 h-5 ${inputValue.trim() && !isLoading ? 'text-white' : 'text-gray-500'}`} />
            </motion.button>
          </div>
          
          {/* 快捷操作 */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">快捷操作：</span>
              <motion.button 
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                清除对话
              </motion.button>
              <span className="text-gray-600">·</span>
              <motion.button 
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                导出记录
              </motion.button>
            </div>
            <div className="text-xs text-gray-500">
              {messages.length} 条消息
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
