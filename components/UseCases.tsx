'use client'

import { useState } from 'react'

const useCases = [
  {
    id: 'designers',
    title: '设计师',
    heading: '快速实现创意构想',
    description: '无需复杂的设计软件，只需描述您的想法，AI就能帮您生成专业级的视觉作品。从概念到成品，只需几秒钟。',
    icon: '🎨',
  },
  {
    id: 'marketers',
    title: '营销人员',
    heading: '打造吸睛营销素材',
    description: '快速生成高质量的营销图片，提升品牌视觉形象。多种风格随心切换，让每次营销活动都与众不同。',
    icon: '🚀',
  },
  {
    id: 'creators',
    title: '内容创作者',
    heading: '源源不断的创作灵感',
    description: '告别创作瓶颈！AI帮您生成各种风格的图片，为您的社交媒体、博客、视频提供丰富的视觉内容。',
    icon: '✨',
  },
  {
    id: 'entrepreneurs',
    title: '创业者',
    heading: '零成本打造品牌形象',
    description: '无需聘请设计师，就能为您的产品、网站、宣传材料生成专业的视觉素材。节省成本，提升效率。',
    icon: '💼',
  },
]

export default function UseCases() {
  const [activeCase, setActiveCase] = useState(useCases[0])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              适合各行各业的AI创作工具
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Tabs */}
          <div className="space-y-4">
            {useCases.map((useCase) => (
              <button
                key={useCase.id}
                onClick={() => setActiveCase(useCase)}
                className={`w-full text-left p-6 rounded-xl transition-all ${
                  activeCase.id === useCase.id
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500'
                    : 'bg-gray-800/50 border-2 border-gray-700 hover:border-purple-500/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{useCase.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-bold">{useCase.title}</h3>
                  </div>
                  {activeCase.id === useCase.id && (
                    <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 lg:p-12">
            <div className="text-6xl mb-6">{activeCase.icon}</div>
            <h3 className="text-3xl font-bold text-white mb-4">{activeCase.heading}</h3>
            <p className="text-gray-300 text-lg leading-relaxed">{activeCase.description}</p>
            
            <div className="mt-8">
              <a
                href="#upload"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                Get Started Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

