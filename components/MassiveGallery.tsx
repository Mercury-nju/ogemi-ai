'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MassiveGallery() {
  const [images, setImages] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { id: 'all', name: '全部', icon: '🎨' },
    { id: 'portrait', name: '人像', icon: '👤' },
    { id: 'landscape', name: '风景', icon: '🏔️' },
    { id: 'urban', name: '城市', icon: '🌃' },
    { id: 'abstract', name: '抽象', icon: '🎭' },
    { id: 'lifestyle', name: '生活', icon: '☕' }
  ]

  useEffect(() => {
    // 加载画廊图片
    const loadImages = async () => {
      setIsLoading(true)
      try {
        // 尝试加载metadata.json
        const res = await fetch('/gallery/metadata.json')
        if (res.ok) {
          const data = await res.json()
          const paths = data.map((item: any) => item.path)
          setImages(paths)
        } else {
          // 如果没有metadata，尝试加载showcase图片
          const showcaseImages = Array.from({ length: 8 }, (_, i) => `/showcase/${i + 1}.jpg`)
          setImages(showcaseImages)
        }
      } catch (error) {
        console.error('Failed to load gallery:', error)
        // 使用showcase图片作为后备
        const showcaseImages = Array.from({ length: 8 }, (_, i) => `/showcase/${i + 1}.jpg`)
        setImages(showcaseImages)
      } finally {
        setIsLoading(false)
      }
    }

    loadImages()
  }, [])

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.includes(selectedCategory))

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              AI 创作画廊
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            探索由AI创作的精彩作品 - 每一张都是独一无二的艺术品
          </p>

          {/* 分类筛选 */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 画廊网格 */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white/5 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.slice(0, 24).map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={image}
                  alt={`AI Generated ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* 悬停遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <p className="font-semibold">AI 生成</p>
                    <p className="text-sm text-gray-300">点击查看详情</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 查看更多按钮 */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
          >
            查看完整画廊 →
          </Link>
        </div>

        {/* 特色说明 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">快速生成</h3>
            <p className="text-gray-400">平均8秒即可生成高质量图片</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-white mb-2">多样风格</h3>
            <p className="text-gray-400">支持写实、动漫、艺术等多种风格</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-white mb-2">高清输出</h3>
            <p className="text-gray-400">1024x1024高分辨率，细节丰富</p>
          </div>
        </div>
      </div>
    </section>
  )
}

