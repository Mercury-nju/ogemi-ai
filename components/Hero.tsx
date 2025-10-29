'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// AI生成的展示图片列表
const showcaseImages = [
  '/showcase/1.jpg',
  '/showcase/2.jpg',
  '/showcase/3.jpg',
  '/showcase/4.jpg',
  '/showcase/5.jpg',
  '/showcase/6.jpg',
  '/showcase/7.jpg',
  '/showcase/8.jpg',
]

export default function Hero() {
  const [loadedImages, setLoadedImages] = useState<string[]>([])

  useEffect(() => {
    // 预加载图片
    const loadImages = async () => {
      const loaded: string[] = []
      for (const img of showcaseImages) {
        try {
          const response = await fetch(img, { method: 'HEAD' })
          if (response.ok) {
            loaded.push(img)
          }
        } catch {
          // 图片不存在，使用渐变占位
        }
      }
      setLoadedImages(loaded)
    }
    loadImages()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image Grid - 使用AI生成的真实案例图片 */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-0 opacity-25">
        {showcaseImages.map((img, i) => (
          <div key={i} className="relative w-full aspect-square overflow-hidden">
            {loadedImages.includes(img) ? (
              <Image
                src={img}
                alt={`AI Generated Showcase ${i + 1}`}
                fill
                className="object-cover"
                style={{ 
                  filter: 'brightness(0.8) contrast(1.1)',
                  animation: `fadeIn 0.5s ease-in-out ${i * 0.1}s both`
                }}
                priority={i < 4}
              />
            ) : (
              <div 
                className="w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/75" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            AI 图片创作平台
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up">
          从文字到图片，从想象到现实 - 让AI实现您的创意
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-medium">免费创作</span>
          </div>
          <div className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-medium">文字生图</span>
          </div>
          <div className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 7H7v6h6V7z" />
              <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-medium">智能编辑</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="/text-to-image"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
          >
            立即开始创作
          </a>
          <a
            href="/gallery"
            className="border-2 border-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-500/10 transition-all"
          >
            浏览作品画廊
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}


