'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload, FiImage, FiLoader } from 'react-icons/fi'
import AnimationPresets from './AnimationPresets'

export default function VideoUpload() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
        setGeneratedVideo(null)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  })

  const handleGenerate = async () => {
    if (!uploadedImage || !prompt) {
      alert('请上传图片并输入提示词')
      return
    }

    setIsGenerating(true)
    
    try {
      // 调用API生成视频
      const formData = new FormData()
      const blob = await fetch(uploadedImage).then(r => r.blob())
      formData.append('image', blob)
      formData.append('prompt', prompt)

      const response = await fetch('/api/generate-video', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('生成视频失败')
      }

      const data = await response.json()
      setGeneratedVideo(data.videoUrl)
    } catch (error) {
      console.error('Error generating video:', error)
      alert('生成视频时出错，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section id="upload" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Transform Image To Video in Seconds with AI
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            AI-powered animation that brings your photos to life. Professional results, zero experience needed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-purple-500 hover:bg-purple-500/5'
              }`}
            >
              <input {...getInputProps()} />
              {uploadedImage ? (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setUploadedImage(null)
                      setGeneratedVideo(null)
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <FiUpload className="text-6xl text-purple-500 mx-auto" />
                  <div>
                    <p className="text-white font-semibold mb-2">Upload Image</p>
                    <p className="text-gray-400 text-sm">Click or drag to upload</p>
                    <p className="text-gray-500 text-xs mt-2">Supports JPG/PNG/WEBP</p>
                  </div>
                </div>
              )}
            </div>

            {/* Animation Presets */}
            <AnimationPresets onSelectPreset={(presetPrompt) => setPrompt(presetPrompt)} />

            {/* Prompt Input */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe how you want the image to move... e.g., 'They walk slowly and then kiss.'"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                rows={4}
                maxLength={2000}
              />
              <div className="text-right text-gray-500 text-sm mt-1">
                {prompt.length}/2000
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!uploadedImage || !prompt || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Video</span>
              )}
            </button>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-white font-semibold text-xl mb-4">Preview</h3>
            
            {generatedVideo ? (
              <div className="space-y-4">
                <video
                  src={generatedVideo}
                  controls
                  autoPlay
                  loop
                  className="w-full rounded-lg"
                />
                <div className="flex space-x-4">
                  <a
                    href={generatedVideo}
                    download
                    className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-full text-center font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Download Video
                  </a>
                  <button
                    onClick={() => {
                      setGeneratedVideo(null)
                      setUploadedImage(null)
                      setPrompt('')
                    }}
                    className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Create New
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-700 rounded-lg">
                <div className="text-center text-gray-500">
                  <FiImage className="text-5xl mx-auto mb-4" />
                  <p>Your generated video will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

