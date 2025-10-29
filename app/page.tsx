'use client'

import ImageShowcase from '@/components/ImageShowcase'
import Hero from '@/components/Hero'
import AIToolsShowcase from '@/components/AIToolsShowcase'
import MassiveGallery from '@/components/MassiveGallery'
import Features from '@/components/Features'
import UseCases from '@/components/UseCases'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="w-full">
      {/* Dashboard 风格的图片展示区 - 置顶 */}
      <section className="min-h-screen pt-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                AI 创作工作台
              </span>
            </h1>
            <p className="text-gray-400 text-xl mb-8">
              探索无限创意，从这里开始你的 AI 艺术之旅
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">10M+</div>
                <div className="text-gray-400 text-sm">生成图片</div>
              </div>
              <div className="w-px h-12 bg-gray-800"></div>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">500K+</div>
                <div className="text-gray-400 text-sm">活跃用户</div>
              </div>
              <div className="w-px h-12 bg-gray-800"></div>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">98%</div>
                <div className="text-gray-400 text-sm">满意度</div>
              </div>
              <div className="w-px h-12 bg-gray-800"></div>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
                <div className="text-gray-400 text-sm">在线服务</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">快速开始</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <a
              href="/text-to-image"
              className="group bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500 transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500/20 p-4 rounded-xl">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <svg className="w-6 h-6 text-gray-600 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">文字生成图片</h3>
              <p className="text-gray-400">输入描述，AI 为您创作精美图片</p>
            </a>

            <a
              href="/image-editor"
              className="group bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500/20 p-4 rounded-xl">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">AI 图片编辑</h3>
              <p className="text-gray-400">智能编辑、扩展、去背景等功能</p>
            </a>

            <a
              href="/gallery"
              className="group bg-gradient-to-br from-pink-900/30 to-purple-900/30 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-8 hover:border-pink-500 transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-pink-500/20 p-4 rounded-xl">
                  <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <svg className="w-6 h-6 text-gray-600 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">作品画廊</h3>
              <p className="text-gray-400">浏览海量 AI 创作的精美作品</p>
            </a>
          </div>
        </div>
      </section>

      {/* 新增的图片展示区 */}
      <ImageShowcase />

      {/* 分割线 */}
      <div className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="border-t border-gray-800"></div>
        </div>
      </div>

      {/* 原有的所有内容保留在下方 */}
      <Hero />
      <AIToolsShowcase />
      <MassiveGallery />
      <Features />
      <UseCases />
      <FAQ />
      <CTA />
    </div>
  )
}

