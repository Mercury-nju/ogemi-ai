'use client'

import ImageShowcase from '@/components/ImageShowcase'
import Hero from '@/components/Hero'
import AIToolsShowcase from '@/components/AIToolsShowcase'
import MassiveGallery from '@/components/MassiveGallery'
import Features from '@/components/Features'
import UseCases from '@/components/UseCases'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="w-full">
      {/* Pixverse Style - 直接展示瀑布流作品 */}
      <ImageShowcase />

      {/* 分割线 */}
      <div className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="border-t border-gray-800"></div>
        </div>
      </div>

      {/* 原有的所有内容保留在下方 */}
      <Hero />
      <AIToolsShowcase />
      <MassiveGallery />
      <Features />
      <UseCases />
      <FAQ />
      <CTA />
    </div>
  )
}

