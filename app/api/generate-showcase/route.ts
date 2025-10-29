import { NextResponse } from 'next/server'

// 使用通义千问API生成展示图片
export async function POST() {
  try {
    const apiKey = process.env.TONGYI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // 定义要生成的场景
    const prompts = [
      'A person walking in a modern city street, cinematic style',
      'Ocean waves crashing on a beach at sunset',
      'A couple holding hands in a park',
      'City lights twinkling at night',
      'A dancer performing elegant movements',
      'Forest path with sunlight filtering through trees',
      'Coffee shop scene with steam rising from a cup',
      'Portrait of a person with wind blowing their hair'
    ]

    const results = []

    for (const prompt of prompts) {
      try {
        // 调用通义千问文生图API
        const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'X-DashScope-Async': 'enable'
          },
          body: JSON.stringify({
            model: 'wanx-v1',
            input: {
              prompt: prompt,
            },
            parameters: {
              size: '1024*1024',
              n: 1,
            }
          })
        })

        const data = await response.json()
        
        if (data.output?.task_id) {
          results.push({
            prompt,
            task_id: data.output.task_id,
            status: 'pending'
          })
        }
      } catch (error) {
        console.error(`Error generating image for prompt "${prompt}":`, error)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Image generation tasks created',
      tasks: results
    })

  } catch (error) {
    console.error('Error in generate-showcase API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 查询任务状态
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('task_id')
    
    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.TONGYI_API_KEY
    
    const response = await fetch(`https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    })

    const data = await response.json()
    
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error checking task status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

