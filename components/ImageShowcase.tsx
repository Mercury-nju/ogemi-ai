'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// AI生成的图片案例数据 - 每个都使用不同的图片
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
  ],
  anime: [
    // 可爱萌系
    {
      id: 'anime-1',
      url: '/showcase/5.jpg',
      title: '可爱学园少女',
      prompt: 'Cute anime schoolgirl, kawaii style, big expressive eyes, school uniform, pastel colors, high quality anime art',
      likes: 8234,
      category: 'anime'
    },
    {
      id: 'anime-2',
      url: '/showcase/6.jpg',
      title: '梦幻魔法少女',
      prompt: 'Adorable magical girl, sparkles and stars, cute pose, soft colors, detailed anime illustration, kawaii aesthetic',
      likes: 7876,
      category: 'anime'
    },
    {
      id: 'anime-3',
      url: '/gallery/abstract_31.jpg',
      title: '粉色长发少女',
      prompt: 'Pink hair anime girl, gentle smile, beautiful eyes, soft lighting, detailed character design, kawaii',
      likes: 9543,
      category: 'anime'
    },
    {
      id: 'anime-4',
      url: '/gallery/abstract_32.jpg',
      title: '制服美少女',
      prompt: 'School uniform anime girl, elegant pose, classic beauty, high quality illustration, detailed face',
      likes: 8897,
      category: 'anime'
    },
    {
      id: 'anime-5',
      url: '/gallery/abstract_33.jpg',
      title: '银发精灵',
      prompt: 'Silver hair anime elf girl, mystical atmosphere, detailed fantasy character, beautiful eyes',
      likes: 10234,
      category: 'anime'
    },
    {
      id: 'anime-6',
      url: '/gallery/abstract_34.jpg',
      title: '甜美偶像',
      prompt: 'Sweet idol anime girl, cute expression, stage outfit, vibrant colors, kawaii aesthetic',
      likes: 9123,
      category: 'anime'
    },
    {
      id: 'anime-7',
      url: '/gallery/abstract_35.jpg',
      title: '优雅公主',
      prompt: 'Elegant anime princess, royal dress, sophisticated design, beautiful illustration, detailed',
      likes: 8678,
      category: 'anime'
    },
    {
      id: 'anime-8',
      url: '/gallery/abstract_36.jpg',
      title: '猫耳萌娘',
      prompt: 'Cute anime cat girl with cat ears, neko maid, moe style, vibrant colors, detailed character design',
      likes: 11543,
      category: 'anime'
    },
    {
      id: 'anime-9',
      url: '/gallery/abstract_37.jpg',
      title: '星空女神',
      prompt: 'Anime goddess with star theme, cosmic background, ethereal beauty, detailed illustration',
      likes: 9876,
      category: 'anime'
    },
    {
      id: 'anime-10',
      url: '/gallery/abstract_38.jpg',
      title: '机械少女',
      prompt: 'Cyberpunk anime girl, mechanical parts, futuristic design, detailed sci-fi character',
      likes: 10123,
      category: 'anime'
    },
    {
      id: 'anime-11',
      url: '/gallery/abstract_39.jpg',
      title: '樱花仙子',
      prompt: 'Cherry blossom fairy anime girl, pink petals, magical atmosphere, soft colors, beautiful',
      likes: 9234,
      category: 'anime'
    },
    {
      id: 'anime-12',
      url: '/gallery/abstract_40.jpg',
      title: '元气少女',
      prompt: 'Energetic anime girl, cheerful expression, vibrant pose, colorful outfit, high energy',
      likes: 8765,
      category: 'anime'
    },
    // 帅气男性角色
    {
      id: 'anime-13',
      url: '/gallery/urban_25.jpg',
      title: '冷峻剑士',
      prompt: 'Cool anime swordsman, serious expression, detailed armor, action pose, shounen style',
      likes: 12345,
      category: 'anime'
    },
    {
      id: 'anime-14',
      url: '/gallery/urban_26.jpg',
      title: '神秘魔法师',
      prompt: 'Mysterious anime wizard boy, magical staff, dark robe, dramatic lighting, fantasy style',
      likes: 10987,
      category: 'anime'
    },
    {
      id: 'anime-15',
      url: '/gallery/urban_27.jpg',
      title: '热血主角',
      prompt: 'Hot-blooded anime protagonist, determined eyes, spiky hair, action stance, shounen hero',
      likes: 13456,
      category: 'anime'
    },
    // 不同风格
    {
      id: 'anime-16',
      url: '/gallery/urban_28.jpg',
      title: '双马尾少女',
      prompt: 'Twin tail anime girl, cute hairstyle, school uniform, cheerful smile, moe character',
      likes: 9654,
      category: 'anime'
    },
    {
      id: 'anime-17',
      url: '/gallery/urban_29.jpg',
      title: '酷帅女骑士',
      prompt: 'Cool female knight anime, silver armor, sword, strong pose, heroic character',
      likes: 11234,
      category: 'anime'
    },
    {
      id: 'anime-18',
      url: '/gallery/urban_30.jpg',
      title: '温柔治愈系',
      prompt: 'Gentle healing anime girl, soft smile, warm atmosphere, pastel colors, soothing character',
      likes: 8901,
      category: 'anime'
    },
  ],
  sexy: [
    {
      id: 'sexy-1',
      url: '/showcase/7.jpg',
      title: '性感女王',
      prompt: 'Seductive anime queen, revealing dark fantasy outfit, powerful presence, detailed illustration',
      likes: 9123,
      category: 'sexy'
    },
    {
      id: 'sexy-2',
      url: '/gallery/lifestyle_45.jpg',
      title: '妖艳舞者',
      prompt: 'Alluring anime dancer, elegant movement, beautiful costume, artistic character design',
      likes: 8456,
      category: 'sexy'
    },
    {
      id: 'sexy-3',
      url: '/gallery/lifestyle_46.jpg',
      title: '魅惑女神',
      prompt: 'Charming anime goddess, beautiful figure, ethereal lighting, detailed illustration',
      likes: 8901,
      category: 'sexy'
    },
    {
      id: 'sexy-4',
      url: '/gallery/lifestyle_47.jpg',
      title: '性感御姐',
      prompt: 'Sexy mature anime woman, confident pose, sophisticated style, high quality art',
      likes: 7834,
      category: 'sexy'
    },
    {
      id: 'sexy-5',
      url: '/gallery/lifestyle_48.jpg',
      title: '火辣战士',
      prompt: 'Hot anime warrior girl, battle outfit, dynamic pose, detailed character art',
      likes: 8234,
      category: 'sexy'
    },
  ],
  creative: [
    {
      id: 'creative-1',
      url: '/showcase/8.jpg',
      title: '时空穿越者',
      prompt: 'Time traveler in multiple dimensions, surreal concept art, mind-bending visuals, portal effects',
      likes: 4765,
      category: 'creative'
    },
  ]
}

// 添加更多作品以充分利用所有图片
const additionalImages = [
  // 森林小径
  {
    id: 'nature-1',
    url: '/gallery/landscape_11.jpg',
    title: '梦幻森林小径',
    prompt: 'Magical forest path with sunlight rays, mystical atmosphere, detailed nature scene',
    likes: 3421,
    category: 'creative'
  },
  {
    id: 'nature-2',
    url: '/gallery/landscape_12.jpg',
    title: '神秘森林',
    prompt: 'Enchanted forest with fog, mysterious lighting, fantasy landscape',
    likes: 2987,
    category: 'creative'
  },
  {
    id: 'nature-3',
    url: '/gallery/landscape_13.jpg',
    title: '山间风光',
    prompt: 'Mountain landscape at sunset, dramatic clouds, cinematic view',
    likes: 4123,
    category: 'creative'
  },
  {
    id: 'nature-4',
    url: '/gallery/landscape_14.jpg',
    title: '海滨日落',
    prompt: 'Beach sunset with couple silhouette, romantic atmosphere, golden hour',
    likes: 5234,
    category: 'realistic'
  },
  {
    id: 'nature-5',
    url: '/gallery/landscape_15.jpg',
    title: '壮丽山河',
    prompt: 'Epic mountain range, majestic landscape, nature photography',
    likes: 3876,
    category: 'creative'
  },
  // 城市风光
  {
    id: 'urban-1',
    url: '/gallery/urban_21.jpg',
    title: '未来都市',
    prompt: 'Futuristic cityscape at night, neon lights, cyberpunk aesthetic',
    likes: 6543,
    category: 'creative'
  },
  {
    id: 'urban-2',
    url: '/gallery/urban_22.jpg',
    title: '赛博街道',
    prompt: 'Cyberpunk street with reflections, rain-soaked pavement, neon signs',
    likes: 7234,
    category: 'creative'
  },
  {
    id: 'urban-3',
    url: '/gallery/urban_23.jpg',
    title: '霓虹之夜',
    prompt: 'Neon city night, vibrant colors, urban landscape',
    likes: 5678,
    category: 'creative'
  },
  {
    id: 'urban-4',
    url: '/gallery/urban_24.jpg',
    title: '城市倒影',
    prompt: 'City reflection in water, mirror effect, stunning visual',
    likes: 4321,
    category: 'creative'
  },
  // 抽象艺术
  {
    id: 'abstract-1',
    url: '/gallery/abstract_31.jpg',
    title: '抽象几何',
    prompt: 'Abstract geometric patterns, colorful design, modern art',
    likes: 3456,
    category: 'creative'
  },
  {
    id: 'abstract-2',
    url: '/gallery/abstract_32.jpg',
    title: '流体艺术',
    prompt: 'Fluid art with vibrant colors, abstract composition',
    likes: 4123,
    category: 'creative'
  },
  {
    id: 'abstract-3',
    url: '/gallery/abstract_33.jpg',
    title: '色彩爆发',
    prompt: 'Color explosion, dynamic abstract art, energetic visual',
    likes: 3789,
    category: 'creative'
  },
  {
    id: 'abstract-4',
    url: '/gallery/abstract_34.jpg',
    title: '几何幻想',
    prompt: 'Geometric fantasy, surreal patterns, artistic design',
    likes: 2987,
    category: 'creative'
  },
  // 生活方式
  {
    id: 'lifestyle-1',
    url: '/gallery/lifestyle_41.jpg',
    title: '浪漫时刻',
    prompt: 'Romantic couple moment, beautiful lighting, emotional scene',
    likes: 5432,
    category: 'realistic'
  },
  {
    id: 'lifestyle-2',
    url: '/gallery/lifestyle_42.jpg',
    title: '日常美好',
    prompt: 'Beautiful daily life moment, warm atmosphere, lifestyle photography',
    likes: 4567,
    category: 'realistic'
  },
  {
    id: 'lifestyle-3',
    url: '/gallery/lifestyle_43.jpg',
    title: '温馨场景',
    prompt: 'Cozy lifestyle scene, warm lighting, comfortable atmosphere',
    likes: 3890,
    category: 'realistic'
  },
  {
    id: 'lifestyle-4',
    url: '/gallery/lifestyle_44.jpg',
    title: '活力瞬间',
    prompt: 'Energetic lifestyle moment, dynamic composition, vibrant scene',
    likes: 4234,
    category: 'realistic'
  },
  // 亚洲美女人像
  {
    id: 'asian-beauty-1',
    url: '/gallery/portrait_1.jpg',
    title: '优雅东方佳人',
    prompt: 'Elegant Asian woman portrait, professional photography, natural beauty, 8K ultra HD',
    likes: 6789,
    category: 'realistic'
  },
  {
    id: 'asian-beauty-2',
    url: '/gallery/portrait_2.jpg',
    title: '时尚亚洲模特',
    prompt: 'Fashion Asian model, modern style, high-end photography, stunning makeup',
    likes: 7432,
    category: 'realistic'
  },
  {
    id: 'asian-beauty-3',
    url: '/gallery/portrait_3.jpg',
    title: '清纯校园女神',
    prompt: 'Pure Asian schoolgirl beauty, soft lighting, authentic expression, youthful charm',
    likes: 8567,
    category: 'realistic'
  },
  {
    id: 'asian-beauty-4',
    url: '/gallery/portrait_4.jpg',
    title: '都市气质美女',
    prompt: 'Urban Asian beauty, city background, modern aesthetic, confident pose',
    likes: 7123,
    category: 'realistic'
  },
  {
    id: 'asian-beauty-5',
    url: '/gallery/portrait_5.jpg',
    title: '经典东方美人',
    prompt: 'Classic Asian beauty, timeless elegance, studio lighting, refined features',
    likes: 8234,
    category: 'realistic'
  },
  {
    id: 'asian-beauty-6',
    url: '/gallery/lifestyle_49.jpg',
    title: '甜美邻家女孩',
    prompt: 'Sweet Asian girl next door, natural smile, casual fashion, warm atmosphere',
    likes: 6890,
    category: 'realistic'
  },
  {
    id: 'asian-beauty-7',
    url: '/gallery/lifestyle_50.jpg',
    title: '职业白领丽人',
    prompt: 'Professional Asian businesswoman, office style, sophisticated beauty, sharp focus',
    likes: 5987,
    category: 'realistic'
  },
  {
    id: 'asian-beauty-8',
    url: '/gallery/landscape_16.jpg',
    title: '浪漫海滨美女',
    prompt: 'Romantic Asian woman at beach, sunset lighting, dreamy atmosphere, natural beauty',
    likes: 7654,
    category: 'realistic'
  },
  {
    id: 'asian-beauty-9',
    url: '/gallery/landscape_17.jpg',
    title: '古典旗袍佳人',
    prompt: 'Asian woman in traditional qipao, elegant pose, cultural beauty, detailed photography',
    likes: 8901,
    category: 'realistic'
  },
  {
    id: 'asian-beauty-10',
    url: '/gallery/landscape_18.jpg',
    title: '运动活力女孩',
    prompt: 'Athletic Asian girl, fitness style, energetic pose, healthy beauty, dynamic shot',
    likes: 6543,
    category: 'realistic'
  },
]

const allImages = [
  ...imageCategories.realistic,
  ...imageCategories.anime,
  ...imageCategories.sexy,
  ...imageCategories.creative,
  ...additionalImages,
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

  const realisticCount = allImages.filter(img => img.category === 'realistic').length
  const animeCount = allImages.filter(img => img.category === 'anime').length
  const sexyCount = allImages.filter(img => img.category === 'sexy').length
  const creativeCount = allImages.filter(img => img.category === 'creative').length

  const categories = [
    { id: 'all', label: '全部作品', count: allImages.length },
    { id: 'anime', label: '二次元角色', count: animeCount },
    { id: 'realistic', label: '真实肖像', count: realisticCount },
    { id: 'sexy', label: '性感角色', count: sexyCount },
    { id: 'creative', label: '创意作品', count: creativeCount },
  ]

  const filteredImages = selectedCategory === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black pl-48">
      {/* Top Navigation Tabs - Pixverse Style */}
      <div className="sticky top-0 z-40 bg-black border-b border-gray-800">
        <div className="flex items-center gap-6 px-6 py-3">
          <button className="text-white font-medium border-b-2 border-purple-600 pb-3 -mb-px">
            Gallery
          </button>
          <a href="/text-to-image" className="text-gray-400 hover:text-white font-medium pb-3">
            Text to Image
          </a>
          <a href="/image-editor" className="text-gray-400 hover:text-white font-medium pb-3">
            Image Editor
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative px-4 py-6">
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Masonry Grid - Pixverse Style */}
        <div className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 transition-opacity duration-300 pb-24 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative rounded-lg overflow-hidden cursor-pointer break-inside-avoid mb-3 hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(image)}
            >
              {/* Image - Variable aspect ratio for masonry effect */}
              <div className={`bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden ${
                index % 5 === 0 ? 'aspect-[3/4]' :
                index % 5 === 1 ? 'aspect-[4/5]' :
                index % 5 === 2 ? 'aspect-[9/16]' :
                index % 5 === 3 ? 'aspect-[2/3]' :
                'aspect-square'
              }`}>
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                
                {/* Title Label - Always visible like Pixverse */}
                <div className="absolute top-2 left-2">
                  <div className="flex items-center gap-1 bg-purple-600/90 backdrop-blur-sm px-2 py-1 rounded">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                    </svg>
                    <span className="text-white text-xs font-medium">{image.title}</span>
                  </div>
                </div>

                {/* Hover Actions - Top Right */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button className="p-1.5 bg-black/60 hover:bg-black/80 rounded backdrop-blur-sm transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>

                {/* Hover Overlay - Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3 text-xs">
                      <button className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span>{(image.likes / 1000).toFixed(1)}k</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{(image.likes * 1.5 / 1000).toFixed(1)}k</span>
                      </button>
                    </div>
                    <button className="p-1 hover:bg-white/20 rounded transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
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

        {/* Bottom Input Box - Pixverse Style */}
        <div className="fixed bottom-0 left-48 right-0 bg-black border-t border-gray-800 p-4 z-30">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-gray-900 rounded-lg border border-gray-700 p-2">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Describe the content you want to create"
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

