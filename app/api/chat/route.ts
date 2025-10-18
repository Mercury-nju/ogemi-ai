import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-9bf19547ddbd4be1a87a7a43cf251097',
})

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: '消息内容不能为空' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是Ogemi AI，一个友好、智能的AI助手。你能够帮助用户解决各种问题，提供有用的建议和信息。请用中文回复，保持友好和专业的语调。'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || '抱歉，我现在无法回应。'

    return NextResponse.json({ response })
  } catch (error) {
    console.error('OpenAI API Error:', error)
    
    // 如果API调用失败，返回一个友好的错误消息
    return NextResponse.json(
      { 
        response: '抱歉，我现在遇到了一些技术问题。请稍后再试，或者检查您的网络连接。' 
      },
      { status: 200 } // 返回200状态码，避免前端显示错误
    )
  }
}
