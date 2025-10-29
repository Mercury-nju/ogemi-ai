/**
 * 使用通义千问API生成展示图片
 * 用于Hero背景展示
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// API配置
const API_KEY = 'sk-9bf19547ddbd4be1a87a7a43cf251097';
const API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis';

// 确保目录存在
const SHOWCASE_DIR = path.join(__dirname, '../public/showcase');
if (!fs.existsSync(SHOWCASE_DIR)) {
  fs.mkdirSync(SHOWCASE_DIR, { recursive: true });
}

// 定义要生成的图片提示词 - 模仿图片转视频的效果
const prompts = [
  'A couple walking hand in hand on a beach at sunset, romantic atmosphere, cinematic lighting, 4k quality',
  'City street at night with neon lights reflecting on wet pavement, cyberpunk style, vibrant colors',
  'Portrait of a young woman with wind blowing through her hair, natural lighting, photography style',
  'Ocean waves crashing on rocks, dynamic water movement, dramatic seascape, high detail',
  'A dancer mid-motion in an elegant studio, graceful movement, soft lighting, artistic style',
  'Coffee cup with steam rising on a wooden table, cozy cafe atmosphere, warm tones, shallow depth of field',
  'Forest path with sunlight streaming through trees, magical atmosphere, nature photography',
  'Urban rooftop at golden hour with city skyline in background, cinematic composition, vibrant sunset colors'
];

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
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// 调用通义千问API生成图片
async function generateImage(prompt, index) {
  console.log(`\n🎨 [${index + 1}/8] 开始生成图片...`);
  console.log(`📝 提示词: ${prompt.substring(0, 50)}...`);

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
        input: {
          prompt: prompt,
        },
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
      console.log(`⏳ 等待生成完成...`);
      
      // 轮询检查任务状态
      let attempts = 0;
      const maxAttempts = 60; // 最多等待5分钟
      
      while (attempts < maxAttempts) {
        await delay(5000); // 每5秒检查一次
        attempts++;
        
        const statusResponse = await fetch(
          `https://dashscope.aliyuncs.com/api/v1/tasks/${data.output.task_id}`,
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
            }
          }
        );
        
        const statusData = await statusResponse.json();
        
        if (statusData.output?.task_status === 'SUCCEEDED') {
          const imageUrl = statusData.output.results[0].url;
          console.log(`✅ 生成成功! URL: ${imageUrl}`);
          
          // 下载图片
          const filename = `${index + 1}.jpg`;
          const filepath = path.join(SHOWCASE_DIR, filename);
          
          console.log(`📥 下载图片到: ${filepath}`);
          await downloadImage(imageUrl, filepath);
          console.log(`✅ [${index + 1}/8] 完成!`);
          
          return filepath;
        } else if (statusData.output?.task_status === 'FAILED') {
          console.error(`❌ 任务失败:`, statusData.output);
          return null;
        } else {
          console.log(`⏳ 状态: ${statusData.output?.task_status || 'PENDING'} (尝试 ${attempts}/${maxAttempts})`);
        }
      }
      
      console.error(`❌ 超时: 任务未在规定时间内完成`);
      return null;
    } else {
      console.error(`❌ 未获取到任务ID:`, data);
      return null;
    }
  } catch (error) {
    console.error(`❌ 生成失败:`, error.message);
    return null;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始生成展示图片...');
  console.log(`📁 保存目录: ${SHOWCASE_DIR}`);
  console.log(`🎯 将生成 ${prompts.length} 张图片\n`);
  console.log('=' .repeat(60));

  const results = [];
  
  for (let i = 0; i < prompts.length; i++) {
    const result = await generateImage(prompts[i], i);
    results.push(result);
    
    // 每次生成后等待一小段时间，避免API限流
    if (i < prompts.length - 1) {
      console.log(`\n⏸️  等待3秒后继续下一张...\n`);
      await delay(3000);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 生成完成统计:');
  const successCount = results.filter(r => r !== null).length;
  console.log(`✅ 成功: ${successCount}/${prompts.length}`);
  console.log(`❌ 失败: ${prompts.length - successCount}/${prompts.length}`);
  
  if (successCount > 0) {
    console.log(`\n🎉 图片已保存到: ${SHOWCASE_DIR}`);
    console.log(`\n📝 下一步: 运行开发服务器查看效果`);
    console.log(`   npm run dev`);
  } else {
    console.log(`\n⚠️  没有成功生成任何图片，请检查:`);
    console.log(`   1. API密钥是否有效`);
    console.log(`   2. 是否有足够的API额度`);
    console.log(`   3. 网络连接是否正常`);
  }
}

// 运行
main().catch(error => {
  console.error('\n💥 发生错误:', error);
  process.exit(1);
});

