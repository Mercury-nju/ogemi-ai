import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.TONGYI_API_KEY || 'sk-9bf19547ddbd4be1a87a7a43cf251097'

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
        error: data.output?.message || '处理失败'
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

