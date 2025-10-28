'use client'

import { useState } from 'react'

const useCases = [
  {
    id: 'influencers',
    title: 'Influencers',
    heading: 'Grow your audience 5x faster',
    description: 'Wula.ai turns your images into dynamic videos effortlessly. Create trendy content that keeps followers engaged and your social media profile fresh.',
    icon: '🎬',
  },
  {
    id: 'creators',
    title: 'Content Creators',
    heading: 'Never run out of content ideas',
    description: 'Transform your photo library into endless video content. Turn every image into a story that captivates your audience and boosts engagement.',
    icon: '✨',
  },
  {
    id: 'marketers',
    title: 'Product Marketers',
    heading: 'Make products come alive',
    description: 'Showcase your products in motion with stunning AI-generated videos. Increase conversions with dynamic visuals that grab attention.',
    icon: '🚀',
  },
  {
    id: 'artists',
    title: 'Artists & Animators',
    heading: 'Bring your art to life',
    description: 'Give your artwork movement and personality. Create mesmerizing animations from still images in seconds, no animation skills required.',
    icon: '🎨',
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
              Why Top Creators Never Run Out Of Viral Content
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

