'use client'

import { useState } from 'react'
import Image from 'next/image'

// AI生成的图片案例数据 - 使用现有的 showcase 图片
const imageCategories = {
  realistic: [
    {
      id: 'realistic-1',
      url: '/showcase/1.jpg',
      title: '优雅东方美女',
      prompt: 'Beautiful Asian woman with elegant makeup, professional photography, natural lighting, 8K ultra HD, photorealistic portrait',
      likes: 2486,
      category: 'realistic'
    },
    {
      id: 'realistic-2',
      url: '/showcase/2.jpg',
      title: '时尚都市女性',
      prompt: 'Fashion model in modern city, stunning makeup, professional portrait, cinematic lighting, high detail',
      likes: 3421,
      category: 'realistic'
    },
    {
      id: 'realistic-3',
      url: '/showcase/3.jpg',
      title: '自然阳光少女',
      prompt: 'Natural beauty with sun-kissed skin, outdoor portrait, golden hour lighting, photorealistic, ultra detailed',
      likes: 2876,
      category: 'realistic'
    },
    {
      id: 'realistic-4',
      url: '/showcase/4.jpg',
      title: '复古优雅女士',
      prompt: 'Vintage style elegant woman, classic beauty, retro fashion, studio lighting, high detail, professional photography',
      likes: 2154,
      category: 'realistic'
    },
    {
      id: 'realistic-5',
      url: '/showcase/5.jpg',
      title: '运动活力女孩',
      prompt: 'Athletic beautiful woman, fitness style, energetic pose, natural beauty, 8K quality, professional photo',
      likes: 3198,
      category: 'realistic'
    },
    {
      id: 'realistic-6',
      url: '/showcase/6.jpg',
      title: '商务精英女性',
      prompt: 'Professional business woman, confident pose, modern office style, sharp focus, detailed, corporate portrait',
      likes: 2634,
      category: 'realistic'
    },
    {
      id: 'realistic-7',
      url: '/showcase/7.jpg',
      title: '甜美校园女孩',
      prompt: 'Sweet campus girl, youthful beauty, casual fashion, natural smile, photorealistic, soft lighting',
      likes: 3567,
      category: 'realistic'
    },
    {
      id: 'realistic-8',
      url: '/showcase/8.jpg',
      title: '梦幻婚纱美女',
      prompt: 'Bride in dreamy wedding dress, romantic atmosphere, soft focus, elegant pose, professional bridal photography',
      likes: 4123,
      category: 'realistic'
    },
  ],
  anime: [
    {
      id: 'anime-1',
      url: '/showcase/1.jpg',
      title: '可爱学园少女',
      prompt: 'Cute anime schoolgirl, kawaii style, big expressive eyes, school uniform, pastel colors, high quality anime art',
      likes: 5234,
      category: 'anime'
    },
    {
      id: 'anime-2',
      url: '/showcase/2.jpg',
      title: '梦幻魔法少女',
      prompt: 'Adorable magical girl, sparkles and stars, cute pose, soft colors, detailed anime illustration, kawaii aesthetic',
      likes: 4876,
      category: 'anime'
    },
    {
      id: 'anime-3',
      url: '/showcase/3.jpg',
      title: '猫耳萌娘',
      prompt: 'Cute anime girl with cat ears, neko maid, moe style, vibrant colors, detailed character design, kawaii',
      likes: 6123,
      category: 'anime'
    },
    {
      id: 'anime-4',
      url: '/showcase/4.jpg',
      title: '天真烂漫少女',
      prompt: 'Innocent anime girl, cheerful expression, soft lighting, beautiful anime art, cute smile, pastel palette',
      likes: 4321,
      category: 'anime'
    },
    {
      id: 'anime-5',
      url: '/showcase/5.jpg',
      title: '治愈系天使',
      prompt: 'Healing anime angel girl, gentle smile, warm atmosphere, high quality illustration, soft wings, ethereal',
      likes: 5678,
      category: 'anime'
    },
    {
      id: 'anime-6',
      url: '/showcase/6.jpg',
      title: '元气偶像少女',
      prompt: 'Energetic idol anime girl, stage costume, cute pose, vibrant colors, detailed anime style, kawaii idol',
      likes: 5432,
      category: 'anime'
    },
    {
      id: 'anime-7',
      url: '/showcase/7.jpg',
      title: '樱花仙子',
      prompt: 'Cherry blossom fairy anime girl, pink petals, magical atmosphere, soft colors, beautiful illustration',
      likes: 4987,
      category: 'anime'
    },
    {
      id: 'anime-8',
      url: '/showcase/8.jpg',
      title: '甜心公主',
      prompt: 'Sweet princess anime girl, elegant dress, tiara, dreamy background, high quality anime art, royal kawaii',
      likes: 6234,
      category: 'anime'
    },
  ],
  sexy: [
    {
      id: 'sexy-1',
      url: '/showcase/1.jpg',
      title: '性感御姐',
      prompt: 'Attractive mature anime woman, elegant pose, detailed body proportions, sophisticated style, high quality art',
      likes: 7234,
      category: 'sexy'
    },
    {
      id: 'sexy-2',
      url: '/showcase/2.jpg',
      title: '火辣女战士',
      prompt: 'Sexy anime warrior girl, dynamic fighting pose, battle bikini armor, detailed character art, powerful beauty',
      likes: 6876,
      category: 'sexy'
    },
    {
      id: 'sexy-3',
      url: '/showcase/3.jpg',
      title: '魅惑女神',
      prompt: 'Alluring anime goddess, beautiful curvy figure, flowing hair, ethereal lighting, detailed illustration',
      likes: 8123,
      category: 'sexy'
    },
    {
      id: 'sexy-4',
      url: '/showcase/4.jpg',
      title: '泳装美人',
      prompt: 'Sexy anime girl in bikini, beach scene, summer vibes, detailed illustration, beautiful body proportions',
      likes: 8765,
      category: 'sexy'
    },
    {
      id: 'sexy-5',
      url: '/showcase/5.jpg',
      title: '性感秘书OL',
      prompt: 'Sexy anime office lady, tight business suit, professional yet attractive, detailed character design',
      likes: 7543,
      category: 'sexy'
    },
    {
      id: 'sexy-6',
      url: '/showcase/6.jpg',
      title: '妖艳舞娘',
      prompt: 'Seductive anime belly dancer, elegant movement, revealing costume, artistic style, beautiful curves',
      likes: 7891,
      category: 'sexy'
    },
    {
      id: 'sexy-7',
      url: '/showcase/7.jpg',
      title: '性感女仆',
      prompt: 'Sexy anime maid, revealing maid outfit, alluring pose, detailed character art, attractive proportions',
      likes: 8432,
      category: 'sexy'
    },
    {
      id: 'sexy-8',
      url: '/showcase/8.jpg',
      title: '魔性女王',
      prompt: 'Seductive demon queen anime, revealing dark fantasy outfit, powerful presence, detailed illustration',
      likes: 9123,
      category: 'sexy'
    },
  ],
  creative: [
    {
      id: 'creative-1',
      url: '/showcase/1.jpg',
      title: '未来赛博城市',
      prompt: 'Futuristic cyberpunk city at night, neon lights everywhere, flying cars, rain-soaked streets, highly detailed sci-fi scene',
      likes: 4876,
      category: 'creative'
    },
    {
      id: 'creative-2',
      url: '/showcase/2.jpg',
      title: '奇幻魔法森林',
      prompt: 'Magical fantasy forest, glowing mushrooms, fireflies, ethereal atmosphere, detailed environment art',
      likes: 5234,
      category: 'creative'
    },
    {
      id: 'creative-3',
      url: '/showcase/3.jpg',
      title: '蒸汽朋克机械龙',
      prompt: 'Massive mechanical dragon, steampunk style, brass and copper, intricate gears, epic composition',
      likes: 6321,
      category: 'creative'
    },
    {
      id: 'creative-4',
      url: '/showcase/4.jpg',
      title: '云端水晶宫殿',
      prompt: 'Crystal palace floating in the clouds, magnificent architecture, dreamy lighting, fantasy art, ethereal',
      likes: 4987,
      category: 'creative'
    },
    {
      id: 'creative-5',
      url: '/showcase/5.jpg',
      title: '巨型太空站',
      prompt: 'Massive space station orbiting Earth, sci-fi concept art, detailed design, stars and nebula background',
      likes: 5432,
      category: 'creative'
    },
    {
      id: 'creative-6',
      url: '/showcase/6.jpg',
      title: '神秘海底世界',
      prompt: 'Underwater fantasy world, bioluminescent creatures, ancient ruins, mystical atmosphere, deep sea',
      likes: 5123,
      category: 'creative'
    },
    {
      id: 'creative-7',
      url: '/showcase/7.jpg',
      title: '龙骑士决斗',
      prompt: 'Epic dragon and knight battle scene, dramatic lighting, detailed illustration, fantasy warfare',
      likes: 6789,
      category: 'creative'
    },
    {
      id: 'creative-8',
      url: '/showcase/8.jpg',
      title: '时空穿越者',
      prompt: 'Time traveler in multiple dimensions, surreal concept art, mind-bending visuals, portal effects',
      likes: 4765,
      category: 'creative'
    },
    {
      id: 'creative-9',
      url: '/showcase/1.jpg',
      title: '异次元空间',
      prompt: 'Interdimensional space, abstract geometry, cosmic colors, surreal atmosphere, mind-blowing visuals',
      likes: 5678,
      category: 'creative'
    },
    {
      id: 'creative-10',
      url: '/showcase/2.jpg',
      title: '巨型机甲战士',
      prompt: 'Giant mecha robot warrior, detailed mechanical design, action pose, sci-fi military style',
      likes: 6432,
      category: 'creative'
    },
    {
      id: 'creative-11',
      url: '/showcase/3.jpg',
      title: '魔法学院',
      prompt: 'Magical wizard academy, floating islands, mystical towers, fantasy architecture, enchanted atmosphere',
      likes: 5234,
      category: 'creative'
    },
    {
      id: 'creative-12',
      url: '/showcase/4.jpg',
      title: '赛博朋克武士',
      prompt: 'Cyberpunk samurai with neon katana, futuristic armor, rain and neon lights, detailed character art',
      likes: 7123,
      category: 'creative'
    },
  ]
}

const allImages = [
  ...imageCategories.realistic,
  ...imageCategories.anime,
  ...imageCategories.sexy,
  ...imageCategories.creative,
]

export default function ImageShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<typeof allImages[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true)
    setSelectedCategory(categoryId)
    setTimeout(() => setIsLoading(false), 300)
  }

  const categories = [
    { id: 'all', label: '全部作品', count: allImages.length },
    { id: 'realistic', label: '真实肖像', count: imageCategories.realistic.length },
    { id: 'anime', label: '可爱二次元', count: imageCategories.anime.length },
    { id: 'sexy', label: '性感角色', count: imageCategories.sexy.length },
    { id: 'creative', label: '创意作品', count: imageCategories.creative.length },
  ]

  const filteredImages = selectedCategory === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === selectedCategory)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              精选 AI 作品展示
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            探索 AI 创作的无限可能 - 从真实肖像到二次元角色，从创意概念到梦幻场景
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                  : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Image Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedImage(image)}
            >
              {/* Image */}
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-900/30 to-pink-900/30 relative overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-1">{image.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{image.prompt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-pink-500">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{image.likes.toLocaleString()}</span>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                  image.category === 'realistic' ? 'bg-blue-500/80 text-white' :
                  image.category === 'anime' ? 'bg-pink-500/80 text-white' :
                  image.category === 'sexy' ? 'bg-red-500/80 text-white' :
                  'bg-purple-500/80 text-white'
                }`}>
                  {image.category === 'realistic' ? '真实' :
                   image.category === 'anime' ? '二次元' :
                   image.category === 'sexy' ? '性感' : '创意'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-6">
              <svg className="w-24 h-24 text-gray-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">暂无作品</h3>
            <p className="text-gray-400">该分类下暂时没有作品</p>
          </div>
        )}

        {/* Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 relative">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
                      <div className="flex items-center text-pink-500 mb-4">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{selectedImage.likes.toLocaleString()} 点赞</span>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      selectedImage.category === 'realistic' ? 'bg-blue-500/20 text-blue-400' :
                      selectedImage.category === 'anime' ? 'bg-pink-500/20 text-pink-400' :
                      selectedImage.category === 'sexy' ? 'bg-red-500/20 text-red-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {selectedImage.category === 'realistic' ? '真实肖像' :
                       selectedImage.category === 'anime' ? '可爱二次元' :
                       selectedImage.category === 'sexy' ? '性感角色' : '创意作品'}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-gray-400 text-sm mb-2">生成提示词：</h4>
                    <p className="text-white bg-gray-800 p-4 rounded-lg">{selectedImage.prompt}</p>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                      使用相似提示词创作
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                      下载图片
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/text-to-image"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
          >
            开始创作您的专属作品
          </a>
        </div>
      </div>
    </section>
  )
}

