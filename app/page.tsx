'use client'

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

