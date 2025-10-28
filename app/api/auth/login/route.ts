import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // 这里应该验证用户凭据
    // 现在返回模拟的成功响应
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    // 返回模拟的用户数据和token
    return NextResponse.json({
      success: true,
      user: {
        id: '1',
        name: 'John Doe',
        email: email,
        plan: 'pro',
      },
      token: 'mock-jwt-token-' + Date.now(),
    })

  } catch (error) {
    console.error('Error in login API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

