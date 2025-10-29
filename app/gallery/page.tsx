'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GalleryItem {
  id: number
  filename: string
  category: string
  prompt: string
  path: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { id: 'all', name: '全部作品', icon: '🎨', count: 0 },
    { id: 'portrait', name: '人像摄影', icon: '👤', count: 0 },
    { id: 'landscape', name: '自然风景', icon: '🏔️', count: 0 },
    { id: 'urban', name: '城市场景', icon: '🌃', count: 0 },
    { id: 'abstract', name: '抽象艺术', icon: '🎭', count: 0 },
    { id: 'lifestyle', name: '生活方式', icon: '☕', count: 0 }
  ]

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/gallery/metadata.json')
      if (res.ok) {
        const data = await res.json()
        setImages(data)
      } else {
        // Fallback: 使用showcase图片
        const fallbackImages = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          filename: `${i + 1}.jpg`,
          category: 'showcase',
          prompt: `AI Generated Image ${i + 1}`,
          path: `/showcase/${i + 1}.jpg`
        }))
        setImages(fallbackImages)
      }
    } catch (error) {
      console.error('Failed to load gallery:', error)
      const fallbackImages = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        filename: `${i + 1}.jpg`,
        category: 'showcase',
        prompt: `AI Generated Image ${i + 1}`,
        path: `/showcase/${i + 1}.jpg`
      }))
      setImages(fallbackImages)
    } finally {
      setIsLoading(false)
    }
  }

  // 更新分类计数
  const getCategoryCounts = () => {
    const counts: { [key: string]: number } = {}
    images.forEach(img => {
      counts[img.category] = (counts[img.category] || 0) + 1
    })
    return counts
  }

  const categoryCounts = getCategoryCounts()
  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              AI 作品画廊
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            探索由AI创作的精彩作品 - 共 {images.length} 张独特创作
          </p>
        </div>

        {/* 分类过滤 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const count = category.id === 'all' ? images.length : (categoryCounts[category.id] || 0)
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-sm opacity-75">({count})</span>
              </button>
            )
          })}
        </div>

        {/* 画廊网格 */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white/5 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/5"
                >
                  <Image
                    src={image.path}
                    alt={image.prompt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* 悬停遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white font-semibold text-sm line-clamp-2">
                      {image.prompt}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      {image.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">该分类暂无作品</p>
              </div>
            )}
          </>
        )}

        {/* 图片详情模态框 */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* 图片 */}
                <div className="relative aspect-square bg-black">
                  <Image
                    src={selectedImage.path}
                    alt={selectedImage.prompt}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* 详情 */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm mb-4">
                      {selectedImage.category}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      AI 生成作品 #{selectedImage.id}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {selectedImage.prompt}
                    </p>

                    <div className="space-y-3 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                                <span>🎨</span>
                        <span>模型: Tongyi Wanx-v1</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>📐</span>
                        <span>分辨率: 1024 x 1024</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>⚡</span>
                        <span>生成时间: ~8秒</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={selectedImage.path}
                      download={selectedImage.filename}
                      className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-center font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    >
                      📥 下载图片
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedImage.prompt)
                        alert('提示词已复制')
                      }}
                      className="block w-full py-3 bg-white/10 rounded-lg text-center font-semibold hover:bg-white/20 transition-all"
                    >
                      📋 复制提示词
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

