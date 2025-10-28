'use client'

import Hero from '@/components/Hero'
import VideoUpload from '@/components/VideoUpload'
import Features from '@/components/Features'
import UseCases from '@/components/UseCases'
import Gallery from '@/components/Gallery'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <VideoUpload />
      <Features />
      <UseCases />
      <Gallery />
      <FAQ />
      <CTA />
    </div>
  )
}

