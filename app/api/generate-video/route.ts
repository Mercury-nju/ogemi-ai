import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const prompt = formData.get('prompt') as string

    if (!image || !prompt) {
      return NextResponse.json(
        { error: 'Image and prompt are required' },
        { status: 400 }
      )
    }

    // 将图片转换为base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    // 调用通义千问API（图片转视频功能）
    const apiKey = process.env.TONGYI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // 通义千问视觉API调用
    // 注意：这里使用通义千问的图像理解能力，实际的图片转视频可能需要其他服务
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen-vl-plus',
        input: {
          messages: [
            {
              role: 'user',
              content: [
                {
                  image: `data:image/jpeg;base64,${base64Image}`
                },
                {
                  text: `Based on this image, generate a video description with the following prompt: ${prompt}. Please provide detailed motion and animation instructions.`
                }
              ]
            }
          ]
        },
        parameters: {
          result_format: 'message'
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Tongyi API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to generate video description' },
        { status: 500 }
      )
    }

    const result = await response.json()
    
    // 模拟视频生成过程
    // 实际应用中，这里应该调用真正的视频生成服务
    // 现在我们返回一个模拟的视频URL
    
    // 等待一段时间模拟处理
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 返回模拟的视频URL
    // 在生产环境中，这应该是实际生成的视频文件URL
    return NextResponse.json({
      success: true,
      videoUrl: '/demo-videos/generated-sample.mp4',
      description: result.output?.choices?.[0]?.message?.content || 'Video generated successfully',
      metadata: {
        prompt,
        timestamp: new Date().toISOString(),
      }
    })

  } catch (error) {
    console.error('Error in generate-video API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

