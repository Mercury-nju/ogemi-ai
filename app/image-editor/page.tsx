'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

type EditorTool = 'upscale' | 'remove-bg' | 'outpaint' | 'variations'

export default function ImageEditorPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedTool, setSelectedTool] = useState<EditorTool>('upscale')
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const tools = [
    {
      id: 'upscale' as EditorTool,
      name: '图片增强',
      icon: '🔍',
      description: '提升图片分辨率和质量',
      available: true
    },
    {
      id: 'remove-bg' as EditorTool,
      name: '去除背景',
      icon: '✂️',
      description: '自动移除图片背景',
      available: true
    },
    {
      id: 'outpaint' as EditorTool,
      name: '图片扩展',
      icon: '↔️',
      description: 'AI扩展图片边界',
      available: true
    },
    {
      id: 'variations' as EditorTool,
      name: '生成变体',
      icon: '🎨',
      description: '创建相似风格的图片',
      available: true
    }
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('请上传图片文件')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string)
      setProcessedImage(null)
      setError(null)
    }
    reader.readAsDataURL(file)
  }

  const handleProcess = async () => {
    if (!uploadedImage) {
      setError('请先上传图片')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // 根据选择的工具调用不同的API
      const endpoint = `/api/image-editor/${selectedTool}`
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: uploadedImage })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '处理失败')
      }

      if (data.task_id) {
        // 轮询任务状态
        await pollTaskStatus(data.task_id)
      } else if (data.image_url) {
        setProcessedImage(data.image_url)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const pollTaskStatus = async (taskId: string) => {
    let attempts = 0
    const maxAttempts = 40

    const check = async (): Promise<void> => {
      attempts++
      
      const res = await fetch(`/api/image-editor/status?task_id=${taskId}`)
      const data = await res.json()

      if (data.status === 'SUCCEEDED' && data.image_url) {
        setProcessedImage(data.image_url)
      } else if (data.status === 'FAILED') {
        throw new Error('处理失败')
      } else if (attempts < maxAttempts) {
        setTimeout(() => check(), 3000)
      } else {
        throw new Error('处理超时')
      }
    }

    await check()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              AI 图片编辑器
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            强大的AI工具 - 增强、去背景、扩展、生成变体
          </p>
        </div>

        {/* 工具选择 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              disabled={!tool.available || isProcessing}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedTool === tool.id
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-white/20 bg-white/5 hover:border-purple-500/50'
              } ${!tool.available || isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-4xl mb-2">{tool.icon}</div>
              <div className="text-white font-semibold mb-1">{tool.name}</div>
              <div className="text-sm text-gray-400">{tool.description}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：原图 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4 text-lg">原始图片</h3>
            <div className="aspect-square bg-black/50 rounded-xl flex items-center justify-center overflow-hidden mb-4">
              {uploadedImage ? (
                <Image
                  src={uploadedImage}
                  alt="Original"
                  width={500}
                  height={500}
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <svg
                    className="w-24 h-24 mx-auto text-gray-600 mb-4"
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
                  <p>点击下方上传图片</p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📤 上传图片
            </button>
          </div>

          {/* 右侧：处理后 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4 text-lg">处理结果</h3>
            <div className="aspect-square bg-black/50 rounded-xl flex items-center justify-center overflow-hidden mb-4">
              {processedImage ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={processedImage}
                    alt="Processed"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={processedImage}
                      download
                      className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      📥 下载
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  {isProcessing ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto" />
                      <p>AI处理中...</p>
                    </div>
                  ) : (
                    <div>
                      <p>上传图片后点击处理</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <button
              onClick={handleProcess}
              disabled={!uploadedImage || isProcessing}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? '处理中...' : `✨ ${tools.find(t => t.id === selectedTool)?.name}`}
            </button>
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-400 text-center">❌ {error}</p>
          </div>
        )}

        {/* 功能说明 */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-white font-semibold mb-6 text-xl">🛠️ 工具说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <h4 className="text-white font-semibold">图片增强</h4>
                  <p className="text-gray-400 text-sm">提升图片分辨率和清晰度，适合模糊照片修复</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">✂️</span>
                <div>
                  <h4 className="text-white font-semibold">去除背景</h4>
                  <p className="text-gray-400 text-sm">自动识别主体并移除背景，生成透明PNG</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">↔️</span>
                <div>
                  <h4 className="text-white font-semibold">图片扩展</h4>
                  <p className="text-gray-400 text-sm">AI智能扩展图片边界，填充合理内容</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <h4 className="text-white font-semibold">生成变体</h4>
                  <p className="text-gray-400 text-sm">基于原图创建多个相似风格的变体</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

