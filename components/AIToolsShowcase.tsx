'use client'

import Link from 'next/link'

export default function AIToolsShowcase() {
  const tools = [
    {
      id: 'text-to-image',
      title: '文字生成图片',
      description: '只需描述，AI就能创作出惊艳的图片',
      icon: '✍️',
      gradient: 'from-purple-600 to-blue-600',
      href: '/text-to-image',
      features: ['多种风格', '高清输出', '快速生成']
    },
    {
      id: 'image-editor',
      title: 'AI 图片编辑',
      icon: '🎨',
      description: '强大的AI工具让图片编辑变得简单',
      gradient: 'from-pink-600 to-purple-600',
      href: '/image-editor',
      features: ['去除背景', '图片增强', '智能扩展']
    },
    {
      id: 'variations',
      title: '风格变换',
      icon: '🎭',
      description: '一键生成多种风格的图片变体',
      gradient: 'from-orange-600 to-pink-600',
      href: '/image-editor',
      features: ['多样化', '保持主题', '创意无限']
    },
    {
      id: 'upscale',
      title: '图片增强',
      icon: '🔍',
      description: 'AI超分辨率技术提升图片质量',
      gradient: 'from-green-600 to-teal-600',
      href: '/image-editor',
      features: ['4K增强', '细节还原', '模糊修复']
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              强大的 AI 创作工具
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            从文字到图片，从编辑到增强，一站式AI图片创作平台
          </p>
        </div>

        {/* 工具卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* 背景渐变 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              {/* 内容 */}
              <div className="relative p-6 h-full flex flex-direction justify-between">
                <div>
                  {/* 图标 */}
                  <div className="text-5xl mb-4">{tool.icon}</div>
                  
                  {/* 标题和描述 */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    {tool.description}
                  </p>
                  
                  {/* 特性标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CTA */}
                <div className="flex items-end">
                  <span className="text-purple-400 font-semibold group-hover:text-pink-400 transition-colors flex items-center">
                    立即体验
                    <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 统计数据 */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: '生成图片', value: '100K+', icon: '🎨' },
            { label: '活跃用户', value: '50K+', icon: '👥' },
            { label: '平均生成', value: '8秒', icon: '⚡' },
            { label: '用户满意度', value: '98%', icon: '⭐' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

