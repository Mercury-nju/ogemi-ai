'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function TextToImagePage() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // 预设风格
  const stylePresets = [
    { id: 'realistic', name: '写实', suffix: ', photorealistic, 4k, detailed' },
    { id: 'anime', name: '动漫', suffix: ', anime style, vibrant colors, manga art' },
    { id: 'digital-art', name: '数字艺术', suffix: ', digital art, artistic, creative' },
    { id: 'oil-painting', name: '油画', suffix: ', oil painting style, classical art' },
    { id: 'watercolor', name: '水彩', suffix: ', watercolor painting, soft colors' },
    { id: 'cyberpunk', name: '赛博朋克', suffix: ', cyberpunk style, neon lights, futuristic' },
  ]

  const [selectedStyle, setSelectedStyle] = useState(stylePresets[0])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入描述文本')
      return
    }

    setIsGenerating(true)
    setError(null)
    setProgress(0)

    try {
      const fullPrompt = prompt + selectedStyle.suffix

      const response = await fetch('/api/text-to-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: fullPrompt,
          negative_prompt: negativePrompt,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '生成失败')
      }

      // 轮询任务状态
      const taskId = data.task_id
      let attempts = 0
      const maxAttempts = 60

      const checkStatus = async () => {
        attempts++
        setProgress(Math.min((attempts / maxAttempts) * 100, 95))

        const statusRes = await fetch(`/api/text-to-image?task_id=${taskId}`)
        const statusData = await statusRes.json()

        if (statusData.status === 'SUCCEEDED') {
          setGeneratedImage(statusData.image_url)
          setProgress(100)
          setIsGenerating(false)
        } else if (statusData.status === 'FAILED') {
          throw new Error('图片生成失败')
        } else if (attempts < maxAttempts) {
          setTimeout(checkStatus, 3000)
        } else {
          throw new Error('生成超时，请重试')
        }
      }

      setTimeout(checkStatus, 3000)
    } catch (err: any) {
      setError(err.message)
      setIsGenerating(false)
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              文字生成图片
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            使用AI将您的想象力变成现实 - 只需描述，AI就能创作
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="space-y-6">
            {/* 提示词输入 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <label className="block text-white font-semibold mb-3">
                描述您想要的图片 *
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：一只可爱的猫咪坐在窗台上，阳光洒在它的身上，温暖的氛围..."
                className="w-full h-32 bg-black/50 text-white rounded-lg p-4 border border-purple-500/30 focus:border-purple-500 focus:outline-none resize-none"
                disabled={isGenerating}
              />
              <p className="text-sm text-gray-400 mt-2">
                💡 提示：描述越详细，生成的图片越符合预期
              </p>
            </div>

            {/* 风格选择 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <label className="block text-white font-semibold mb-3">
                选择艺术风格
              </label>
              <div className="grid grid-cols-3 gap-3">
                {stylePresets.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    disabled={isGenerating}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedStyle.id === style.id
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-purple-500/50'
                    } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 负面提示词（高级） */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <label className="block text-white font-semibold mb-3">
                负面提示词 (可选)
              </label>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="不想要的元素，例如：模糊、低质量、扭曲..."
                className="w-full h-20 bg-black/50 text-white rounded-lg p-4 border border-purple-500/30 focus:border-purple-500 focus:outline-none resize-none"
                disabled={isGenerating}
              />
            </div>

            {/* 生成按钮 */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                isGenerating || !prompt.trim()
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105'
              } text-white`}
            >
              {isGenerating ? '生成中...' : '✨ 生成图片'}
            </button>

            {/* 进度条 */}
            {isGenerating && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>生成进度</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-400">❌ {error}</p>
              </div>
            )}
          </div>

          {/* 右侧：预览区域 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4 text-lg">生成结果</h3>
            <div className="aspect-square bg-black/50 rounded-xl flex items-center justify-center overflow-hidden">
              {generatedImage ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={generatedImage}
                    alt="Generated"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a
                      href={generatedImage}
                      download
                      className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      📥 下载
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedImage)
                        alert('图片链接已复制')
                      }}
                      className="px-6 py-3 bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      🔗 复制链接
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto" />
                      <p>AI正在创作中...</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <svg
                        className="w-24 h-24 mx-auto text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p>输入描述后点击生成</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 示例提示词 */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-white font-semibold mb-4 text-xl">💡 示例提示词</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '一只橙色的猫咪戴着墨镜，坐在海滩上，夏日阳光',
              '未来城市夜景，霓虹灯闪烁，飞行汽车穿梭其中',
              '魔法森林中的精灵，发光的蘑菇，梦幻氛围',
              '宇宙中的巨大星云，绚丽的色彩，深邃的太空',
            ].map((example, i) => (
              <button
                key={i}
                onClick={() => setPrompt(example)}
                className="text-left p-4 bg-white/5 rounded-lg border border-purple-500/20 hover:border-purple-500 hover:bg-white/10 transition-all"
              >
                <p className="text-gray-300">{example}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

