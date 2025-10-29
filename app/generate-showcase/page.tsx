'use client'

import { useState } from 'react'

interface Task {
  prompt: string
  task_id: string
  status: string
  image_url?: string
}

export default function GenerateShowcase() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-showcase', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTasks(data.tasks)
        alert(`已创建 ${data.tasks.length} 个图片生成任务！`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('生成失败')
    } finally {
      setIsGenerating(false)
    }
  }

  const checkStatus = async (taskId: string) => {
    try {
      const response = await fetch(`/api/generate-showcase?task_id=${taskId}`)
      const data = await response.json()
      
      return data
    } catch (error) {
      console.error('Error checking status:', error)
      return null
    }
  }

  const handleCheckAll = async () => {
    setIsChecking(true)
    
    const updatedTasks = await Promise.all(
      tasks.map(async (task) => {
        const status = await checkStatus(task.task_id)
        
        if (status?.output?.task_status === 'SUCCEEDED') {
          return {
            ...task,
            status: 'completed',
            image_url: status.output.results[0].url
          }
        }
        
        return {
          ...task,
          status: status?.output?.task_status || task.status
        }
      })
    )
    
    setTasks(updatedTasks)
    setIsChecking(false)
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            生成展示图片
          </span>
        </h1>

        <div className="mb-8 space-x-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50"
          >
            {isGenerating ? '生成中...' : '生成 8 张展示图'}
          </button>

          {tasks.length > 0 && (
            <button
              onClick={handleCheckAll}
              disabled={isChecking}
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {isChecking ? '检查中...' : '检查所有任务状态'}
            </button>
          )}
        </div>

        {tasks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-white text-2xl font-bold mb-4">生成任务列表</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task, index) => (
                <div key={task.task_id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="mb-4">
                    <span className="text-gray-400 text-sm">任务 {index + 1}</span>
                    <h3 className="text-white font-semibold mt-1">{task.prompt}</h3>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-gray-400 text-sm">任务 ID:</span>
                    <p className="text-gray-300 text-xs font-mono">{task.task_id}</p>
                  </div>
                  
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      task.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                      task.status === 'RUNNING' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  
                  {task.image_url && (
                    <div>
                      <img src={task.image_url} alt={task.prompt} className="w-full rounded-lg" />
                      <a
                        href={task.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-purple-400 hover:text-purple-300 text-sm"
                      >
                        下载图片
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">使用说明</h3>
          <ol className="text-gray-400 space-y-2 list-decimal list-inside">
            <li>点击"生成 8 张展示图"按钮开始生成</li>
            <li>等待几秒后，点击"检查所有任务状态"查看生成进度</li>
            <li>图片生成完成后会显示在下方</li>
            <li>下载图片并保存到 <code className="bg-gray-800 px-2 py-1 rounded">public/showcase/</code> 目录</li>
            <li>命名为 1.jpg, 2.jpg, ... 8.jpg</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

