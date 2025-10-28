'use client'

import { useState } from 'react'

const galleryItems = [
  {
    id: 1,
    title: 'Couple Walking',
    description: 'Romantic scene with natural movement',
    thumbnail: '/gallery/couple-walking.jpg',
    video: '/gallery/couple-walking.mp4',
    prompt: 'They walk slowly and then kiss',
  },
  {
    id: 2,
    title: 'Ocean Waves',
    description: 'Serene beach scene',
    thumbnail: '/gallery/ocean-waves.jpg',
    video: '/gallery/ocean-waves.mp4',
    prompt: 'Waves gently crashing on the shore',
  },
  {
    id: 3,
    title: 'City Lights',
    description: 'Urban nightscape in motion',
    thumbnail: '/gallery/city-lights.jpg',
    video: '/gallery/city-lights.mp4',
    prompt: 'Lights twinkling and traffic moving',
  },
  {
    id: 4,
    title: 'Dancing Girl',
    description: 'Elegant dance performance',
    thumbnail: '/gallery/dancing.jpg',
    video: '/gallery/dancing.mp4',
    prompt: 'She spins gracefully in slow motion',
  },
  {
    id: 5,
    title: 'Forest Path',
    description: 'Mystical forest journey',
    thumbnail: '/gallery/forest.jpg',
    video: '/gallery/forest.mp4',
    prompt: 'Camera slowly moves through the trees',
  },
  {
    id: 6,
    title: 'Sunset Timelapse',
    description: 'Beautiful golden hour',
    thumbnail: '/gallery/sunset.jpg',
    video: '/gallery/sunset.mp4',
    prompt: 'Sun setting with clouds moving',
  },
]

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<typeof galleryItems[0] | null>(null)

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Inspiration Gallery
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Explore amazing videos created by our community. Get inspired and start creating your own stunning visual stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedVideo(item)}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                {/* Placeholder for thumbnail */}
                <div className="text-center">
                  <svg className="w-16 h-16 text-purple-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white text-sm">{item.title}</p>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                  <p className="text-gray-400 text-xs italic">&quot;{item.prompt}&quot;</p>
                </div>
              </div>

              <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                Play
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white text-4xl hover:text-purple-500 transition-colors"
              >
                ×
              </button>
              
              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg">Video Preview: {selectedVideo.title}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-400 mb-4">{selectedVideo.description}</p>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Prompt used:</p>
                    <p className="text-purple-400 italic">&quot;{selectedVideo.prompt}&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

