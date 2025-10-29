'use client'

import Sidebar from '@/components/Sidebar'
import ImageShowcase from '@/components/ImageShowcase'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Pixverse Style Layout */}
      <Sidebar />
      <ImageShowcase />
    </div>
  )
}

