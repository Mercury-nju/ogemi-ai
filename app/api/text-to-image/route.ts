import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.TONGYI_API_KEY || 'sk-9bf19547ddbd4be1a87a7a43cf251097'
const API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis'

// POST: 创建图片生成任务
export async function POST(request: NextRequest) {
  try {
    const { prompt, negative_prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: '请提供图片描述' },
        { status: 400 }
      )
    }

    // 调用通义千问文生图API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-DashScope-Async': 'enable'
      },
      body: JSON.stringify({
        model: 'wanx-v1',
        input: {
          prompt: prompt,
          negative_prompt: negative_prompt || 'blurry, low quality, distorted'
        },
        parameters: {
          size: '1024*1024',
          n: 1,
        }
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Tongyi API error:', data)
      return NextResponse.json(
        { error: data.message || '图片生成失败' },
        { status: response.status }
      )
    }

    if (!data.output?.task_id) {
      return NextResponse.json(
        { error: '未获取到任务ID' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      task_id: data.output.task_id,
      message: '任务已创建，正在生成中...'
    })

  } catch (error: any) {
    console.error('Text-to-image API error:', error)
    return NextResponse.json(
      { error: error.message || '服务器错误' },
      { status: 500 }
    )
  }
}

// GET: 查询任务状态
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('task_id')

    if (!taskId) {
      return NextResponse.json(
        { error: '缺少任务ID' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: '查询任务失败' },
        { status: response.status }
      )
    }

    const status = data.output?.task_status
    const result = {
      status: status,
      task_id: taskId,
    }

    if (status === 'SUCCEEDED' && data.output?.results?.[0]?.url) {
      return NextResponse.json({
        ...result,
        image_url: data.output.results[0].url
      })
    } else if (status === 'FAILED') {
      return NextResponse.json({
        ...result,
        error: data.output?.message || '生成失败'
      })
    } else {
      return NextResponse.json(result)
    }

  } catch (error: any) {
    console.error('Task status check error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

