/**
 * 批量生成画廊展示图片 - 50张高质量AI作品
 * 用于首页和Gallery页面展示
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'sk-9bf19547ddbd4be1a87a7a43cf251097';
const API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis';

// 确保目录存在
const GALLERY_DIR = path.join(__dirname, '../public/gallery');
if (!fs.existsSync(GALLERY_DIR)) {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });
}

// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 下载图片
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// 50个不同风格和主题的提示词
const prompts = [
  // 人像系列 (10张)
  { text: 'Professional portrait of a confident businesswoman in modern office, natural lighting, 4k quality', category: 'portrait' },
  { text: 'Close-up portrait of a young man with striking blue eyes, dramatic lighting, cinematic style', category: 'portrait' },
  { text: 'Fashion portrait of elegant woman in red dress, studio lighting, vogue style photography', category: 'portrait' },
  { text: 'Portrait of elderly man with wisdom in his eyes, black and white photography, fine art style', category: 'portrait' },
  { text: 'Young woman with colorful hair and creative makeup, vibrant colors, artistic portrait', category: 'portrait' },
  { text: 'Professional headshot of smiling Asian woman, soft lighting, corporate photography', category: 'portrait' },
  { text: 'Portrait of athlete in action pose, dynamic lighting, sports photography style', category: 'portrait' },
  { text: 'Artistic portrait with double exposure effect, nature and face combined, creative photography', category: 'portrait' },
  { text: 'Child laughing with pure joy, candid moment, natural outdoor lighting', category: 'portrait' },
  { text: 'Mysterious portrait with shadow play, noir style, high contrast black and white', category: 'portrait' },
  
  // 自然风景 (10张)
  { text: 'Majestic mountain landscape at golden hour, dramatic clouds, epic vista, 8k quality', category: 'landscape' },
  { text: 'Serene lake reflection with mountains, misty morning, peaceful atmosphere', category: 'landscape' },
  { text: 'Dramatic seascape with crashing waves, stormy sky, powerful ocean scene', category: 'landscape' },
  { text: 'Autumn forest path with colorful leaves, soft sunlight filtering through trees', category: 'landscape' },
  { text: 'Desert dunes at sunset, golden sand waves, minimalist landscape photography', category: 'landscape' },
  { text: 'Northern lights over snowy landscape, aurora borealis, magical night sky', category: 'landscape' },
  { text: 'Tropical beach paradise, crystal clear water, white sand, palm trees', category: 'landscape' },
  { text: 'Misty valley with river flowing through, ethereal morning fog, dreamy landscape', category: 'landscape' },
  { text: 'Cherry blossom trees in full bloom, pink petals falling, spring in Japan', category: 'landscape' },
  { text: 'Grand canyon vista at sunrise, layered rock formations, epic scale', category: 'landscape' },
  
  // 城市场景 (10张)
  { text: 'Futuristic cyberpunk city at night, neon lights, flying cars, sci-fi metropolis', category: 'urban' },
  { text: 'New York City skyline at sunset, iconic skyscrapers, urban photography', category: 'urban' },
  { text: 'Cozy European street café, outdoor seating, charming old town atmosphere', category: 'urban' },
  { text: 'Modern architecture with glass and steel, minimalist design, contemporary building', category: 'urban' },
  { text: 'Busy Tokyo street crossing at night, neon signs, urban energy', category: 'urban' },
  { text: 'Venice canal with gondola, romantic Italian architecture, golden hour', category: 'urban' },
  { text: 'Graffiti street art on urban wall, vibrant colors, contemporary art', category: 'urban' },
  { text: 'Aerial view of city at night, illuminated streets, urban landscape from above', category: 'urban' },
  { text: 'Modern subway station with futuristic design, clean lines, architectural photography', category: 'urban' },
  { text: 'Rain-soaked city street at night, reflections on pavement, moody urban scene', category: 'urban' },
  
  // 艺术创意 (10张)
  { text: 'Abstract digital art with flowing colors, fluid dynamics, contemporary abstract', category: 'abstract' },
  { text: 'Geometric patterns in vibrant colors, modern graphic design, minimalist art', category: 'abstract' },
  { text: 'Surreal dreamscape with floating islands, fantasy art, imaginative composition', category: 'abstract' },
  { text: 'Watercolor painting of flowers, soft colors, artistic illustration style', category: 'abstract' },
  { text: '3D render of futuristic object, metallic surface, product design visualization', category: 'abstract' },
  { text: 'Mandala pattern with intricate details, sacred geometry, symmetrical design', category: 'abstract' },
  { text: 'Space nebula with stars and cosmic dust, astronomy photography, deep space', category: 'abstract' },
  { text: 'Liquid metal abstract sculpture, reflective surface, modern art installation', category: 'abstract' },
  { text: 'Paper art with origami animals, layered design, crafted aesthetic', category: 'abstract' },
  { text: 'Glowing particles forming abstract shape, light painting, long exposure effect', category: 'abstract' },
  
  // 生活方式 (10张)
  { text: 'Minimalist home interior with natural light, scandinavian design, cozy living room', category: 'lifestyle' },
  { text: 'Delicious gourmet meal plated beautifully, food photography, restaurant quality', category: 'lifestyle' },
  { text: 'Yoga pose at sunrise on mountain top, wellness and fitness, peaceful meditation', category: 'lifestyle' },
  { text: 'Fresh coffee and pastry on wooden table, morning routine, cozy café atmosphere', category: 'lifestyle' },
  { text: 'Modern workspace with laptop and plants, home office, productivity setup', category: 'lifestyle' },
  { text: 'Spa treatment setup with candles and stones, relaxation and wellness theme', category: 'lifestyle' },
  { text: 'Fashion accessories flatlay, designer items, luxury lifestyle photography', category: 'lifestyle' },
  { text: 'Healthy breakfast bowl with fruits and granola, food styling, nutritious meal', category: 'lifestyle' },
  { text: 'Cozy reading nook with books and blanket, hygge lifestyle, comfortable space', category: 'lifestyle' },
  { text: 'Outdoor camping scene with tent and campfire, adventure lifestyle, nature escape', category: 'lifestyle' }
];

// 生成单张图片
async function generateImage(promptObj, index) {
  const { text, category } = promptObj;
  console.log(`\n🎨 [${index + 1}/50] 生成图片...`);
  console.log(`📝 类别: ${category}`);
  console.log(`📝 提示词: ${text.substring(0, 60)}...`);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-DashScope-Async': 'enable'
      },
      body: JSON.stringify({
        model: 'wanx-v1',
        input: { prompt: text },
        parameters: {
          size: '1024*1024',
          n: 1,
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error(`❌ API请求失败:`, data);
      return null;
    }

    if (data.output?.task_id) {
      console.log(`⏳ 任务ID: ${data.output.task_id}`);
      
      let attempts = 0;
      const maxAttempts = 60;
      
      while (attempts < maxAttempts) {
        await delay(5000);
        attempts++;
        
        const statusResponse = await fetch(
          `https://dashscope.aliyuncs.com/api/v1/tasks/${data.output.task_id}`,
          { headers: { 'Authorization': `Bearer ${API_KEY}` } }
        );
        
        const statusData = await statusResponse.json();
        
        if (statusData.output?.task_status === 'SUCCEEDED') {
          const imageUrl = statusData.output.results[0].url;
          console.log(`✅ 生成成功!`);
          
          const filename = `${category}_${index + 1}.jpg`;
          const filepath = path.join(GALLERY_DIR, filename);
          
          console.log(`📥 下载图片...`);
          await downloadImage(imageUrl, filepath);
          console.log(`✅ [${index + 1}/50] 完成! 保存为: ${filename}`);
          
          return { filename, category, prompt: text };
        } else if (statusData.output?.task_status === 'FAILED') {
          console.error(`❌ 任务失败`);
          return null;
        } else {
          process.stdout.write(`⏳ ${attempts}/${maxAttempts}\r`);
        }
      }
      
      console.error(`❌ 超时`);
      return null;
    }
  } catch (error) {
    console.error(`❌ 错误:`, error.message);
    return null;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始批量生成画廊图片...');
  console.log(`📁 保存目录: ${GALLERY_DIR}`);
  console.log(`🎯 总共生成: 50 张图片`);
  console.log(`⏱️  预计耗时: ~20分钟\n`);
  console.log('='.repeat(70));

  const results = [];
  const metadata = [];
  
  for (let i = 0; i < prompts.length; i++) {
    const result = await generateImage(prompts[i], i);
    results.push(result);
    
    if (result) {
      metadata.push({
        id: i + 1,
        filename: result.filename,
        category: result.category,
        prompt: result.prompt,
        path: `/gallery/${result.filename}`
      });
    }
    
    // 每生成一张后等待，避免API限流
    if (i < prompts.length - 1) {
      console.log(`\n⏸️  等待3秒...\n`);
      await delay(3000);
    }
    
    // 每10张保存一次元数据
    if ((i + 1) % 10 === 0) {
      fs.writeFileSync(
        path.join(GALLERY_DIR, 'metadata.json'),
        JSON.stringify(metadata, null, 2)
      );
      console.log(`\n💾 已保存元数据 (${metadata.length}条)\n`);
    }
  }

  // 最终保存
  fs.writeFileSync(
    path.join(GALLERY_DIR, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  console.log('\n' + '='.repeat(70));
  console.log('\n📊 生成完成统计:');
  const successCount = results.filter(r => r !== null).length;
  console.log(`✅ 成功: ${successCount}/50`);
  console.log(`❌ 失败: ${50 - successCount}/50`);
  console.log(`\n📁 图片保存在: ${GALLERY_DIR}`);
  console.log(`📄 元数据文件: ${GALLERY_DIR}/metadata.json`);
  console.log(`\n🎉 完成！`);
}

main().catch(error => {
  console.error('\n💥 错误:', error);
  process.exit(1);
});

