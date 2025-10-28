'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Video {
  id: string
  thumbnail: string
  title: string
  prompt: string
  createdAt: string
  duration: number
  status: 'completed' | 'processing' | 'failed'
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'videos' | 'settings'>('videos')
  
  // 模拟视频数据
  const [videos] = useState<Video[]>([
    {
      id: '1',
      thumbnail: '/placeholder.jpg',
      title: 'Couple Walking',
      prompt: 'They walk slowly and then kiss',
      createdAt: '2025-10-28T10:30:00',
      duration: 5,
      status: 'completed',
    },
    {
      id: '2',
      thumbnail: '/placeholder.jpg',
      title: 'Ocean Waves',
      prompt: 'Waves gently crashing on the shore',
      createdAt: '2025-10-27T15:20:00',
      duration: 8,
      status: 'completed',
    },
    {
      id: '3',
      thumbnail: '/placeholder.jpg',
      title: 'City Lights',
      prompt: 'Lights twinkling and traffic moving',
      createdAt: '2025-10-26T09:15:00',
      duration: 6,
      status: 'processing',
    },
  ])

  const stats = {
    totalVideos: videos.length,
    videosThisMonth: 3,
    remainingCredits: 97,
    planName: 'Pro',
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-400">Manage your videos and account settings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Total Videos</h3>
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white text-3xl font-bold">{stats.totalVideos}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">This Month</h3>
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white text-3xl font-bold">{stats.videosThisMonth}</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Remaining Credits</h3>
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-white text-3xl font-bold">{stats.remainingCredits}</p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Current Plan</h3>
              <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <p className="text-white text-3xl font-bold">{stats.planName}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('videos')}
            className={`pb-4 px-4 font-semibold transition-colors relative ${
              activeTab === 'videos' ? 'text-purple-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            My Videos
            {activeTab === 'videos' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-4 px-4 font-semibold transition-colors relative ${
              activeTab === 'settings' ? 'text-purple-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            Settings
            {activeTab === 'settings' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'videos' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold">Your Videos</h2>
              <Link
                href="/#upload"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                + Create New Video
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all group">
                  <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center relative">
                    <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    
                    {video.status === 'processing' && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
                        Processing...
                      </div>
                    )}
                    {video.status === 'completed' && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                        Ready
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{video.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">"{video.prompt}"</p>
                    <div className="flex items-center justify-between text-gray-500 text-xs mb-3">
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                      <span>{video.duration}s</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                        Download
                      </button>
                      <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                      <button className="bg-gray-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {videos.length === 0 && (
              <div className="text-center py-16">
                <svg className="w-24 h-24 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 text-lg">No videos yet. Create your first one!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl">
            <h2 className="text-white text-2xl font-bold mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              {/* Profile Settings */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-white font-semibold mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Subscription */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-white font-semibold mb-4">Subscription</h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white font-semibold">Pro Plan</p>
                    <p className="text-gray-400 text-sm">$19/month</p>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">Active</span>
                </div>
                <div className="flex space-x-3">
                  <Link
                    href="/pricing"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold text-center transition-colors"
                  >
                    Upgrade Plan
                  </Link>
                  <button className="border border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-400 px-6 py-2 rounded-lg font-semibold transition-colors">
                    Cancel
                  </button>
                </div>
              </div>

              {/* Security */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-white font-semibold mb-4">Security</h3>
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-left flex items-center justify-between">
                  <span>Change Password</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-red-400 font-semibold mb-4">Danger Zone</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

