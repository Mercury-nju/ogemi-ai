import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // 验证密码强度
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // 这里应该创建新用户
    // 现在返回模拟的成功响应
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    // 返回模拟的用户数据和token
    return NextResponse.json({
      success: true,
      user: {
        id: Date.now().toString(),
        name: name,
        email: email,
        plan: 'free',
      },
      token: 'mock-jwt-token-' + Date.now(),
    })

  } catch (error) {
    console.error('Error in signup API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

