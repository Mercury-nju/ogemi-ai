# 如何添加更多展示图片

## 快速指南

### 1. 准备图片

将您的 AI 生成图片保存到 `public/showcase/` 目录下。

**建议规格**:
- 格式: JPG 或 PNG
- 分辨率: 至少 1024x1024
- 文件大小: 1-3MB
- 比例: 3:4 纵向比例最佳

### 2. 命名规则

可以使用以下命名方式：
```
realistic-beauty-1.jpg
realistic-beauty-2.jpg
anime-cute-1.jpg
anime-cute-2.jpg
sexy-anime-1.jpg
sexy-anime-2.jpg
creative-1.jpg
creative-2.jpg
```

或者简单使用数字：
```
9.jpg
10.jpg
11.jpg
...
```

### 3. 更新 ImageShowcase 组件

编辑 `components/ImageShowcase.tsx` 文件，在对应的分类数组中添加新图片数据：

#### 添加真实肖像美女

```typescript
realistic: [
  // ... 现有图片
  {
    id: 'realistic-9',
    url: '/showcase/realistic-beauty-9.jpg',
    title: '您的图片标题',
    prompt: '这里写生成这张图片的提示词',
    likes: 2000,
    category: 'realistic'
  },
]
```

#### 添加可爱二次元少女

```typescript
anime: [
  // ... 现有图片
  {
    id: 'anime-9',
    url: '/showcase/anime-cute-9.jpg',
    title: '您的动漫角色名',
    prompt: 'cute anime girl, kawaii style, ...',
    likes: 3000,
    category: 'anime'
  },
]
```

#### 添加性感二次元角色

```typescript
sexy: [
  // ... 现有图片
  {
    id: 'sexy-9',
    url: '/showcase/sexy-anime-9.jpg',
    title: '性感角色名',
    prompt: 'sexy anime character, ...',
    likes: 5000,
    category: 'sexy'
  },
]
```

#### 添加创意作品

```typescript
creative: [
  // ... 现有图片
  {
    id: 'creative-13',
    url: '/showcase/creative-13.jpg',
    title: '创意作品标题',
    prompt: 'amazing sci-fi scene, ...',
    likes: 4000,
    category: 'creative'
  },
]
```

### 4. 提示词编写建议

#### 真实肖像类
```
Beautiful [Asian/European/African] woman, [age description], 
professional photography, natural lighting, 8K ultra HD, 
photorealistic portrait, [specific details]
```

#### 可爱二次元类
```
Cute anime girl, kawaii style, [specific features],
pastel colors, high quality anime art, detailed illustration,
[mood/theme]
```

#### 性感角色类
```
Attractive anime [character type], [pose description],
detailed body proportions, [outfit description],
high quality character art, professional illustration
```

#### 创意作品类
```
[Scene description], [art style], highly detailed,
[lighting description], [atmosphere], concept art,
[specific elements]
```

### 5. 自动更新分类计数

分类按钮的数量会自动更新，无需手动修改。

### 6. 批量添加图片示例

如果您有很多图片要添加，可以使用循环：

```typescript
// 生成 20 张真实肖像图片
const realisticImages = Array.from({ length: 20 }, (_, i) => ({
  id: `realistic-${i + 1}`,
  url: `/showcase/realistic-beauty-${i + 1}.jpg`,
  title: `美女肖像 ${i + 1}`,
  prompt: `Beautiful woman portrait ${i + 1}, professional photography, 8K HD`,
  likes: Math.floor(Math.random() * 5000) + 1000,
  category: 'realistic'
}))
```

## 图片来源建议

### AI 图片生成工具推荐

1. **真实肖像**:
   - Midjourney
   - Stable Diffusion
   - DALL-E 3
   - Leonardo.ai

2. **二次元角色**:
   - NovelAI
   - Waifu Labs
   - Stable Diffusion (Anime models)
   - Niji Journey

3. **创意作品**:
   - Midjourney
   - Stable Diffusion XL
   - Adobe Firefly
   - Leonardo.ai

### 提示词资源

- [PromptHero](https://prompthero.com/)
- [Lexica](https://lexica.art/)
- [OpenArt](https://openart.ai/)
- [Civitai](https://civitai.com/)

## 注意事项

1. **版权**: 确保您有权使用这些图片
2. **内容审核**: 确保图片内容符合使用场景
3. **文件大小**: 压缩图片以优化加载速度
4. **图片质量**: 保持一致的高质量
5. **多样性**: 展示不同风格和主题的作品

## 性能优化

如果添加了大量图片（超过 100 张），考虑：

1. **分页加载**: 实现分页或无限滚动
2. **懒加载**: 使用 Next.js Image 的懒加载特性
3. **CDN**: 将图片托管到 CDN
4. **WebP 格式**: 转换为 WebP 以减小文件大小

## 测试

添加图片后，请检查：

- ✅ 图片是否正确显示
- ✅ 悬停效果是否正常
- ✅ 点击打开详情是否正常
- ✅ 分类筛选是否正确
- ✅ 响应式布局是否正常
- ✅ 加载速度是否合理

## 快速添加脚本

创建 `scripts/add-images.js`:

```javascript
const fs = require('fs');
const path = require('path');

// 扫描 showcase 目录下的所有图片
const showcaseDir = path.join(__dirname, '../public/showcase');
const images = fs.readdirSync(showcaseDir)
  .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

console.log(`找到 ${images.length} 张图片：`);
images.forEach((img, i) => {
  console.log(`${i + 1}. ${img}`);
});

// 生成图片数据模板
console.log('\n可复制到 ImageShowcase.tsx 的数据：\n');
images.forEach((img, i) => {
  console.log(`{
  id: 'image-${i + 1}',
  url: '/showcase/${img}',
  title: '作品标题 ${i + 1}',
  prompt: '在这里填写提示词',
  likes: ${Math.floor(Math.random() * 5000) + 1000},
  category: 'realistic' // 修改为对应分类
},`);
});
```

运行脚本：
```bash
node scripts/add-images.js
```

## 需要帮助？

如果在添加图片时遇到问题，请检查：

1. 图片路径是否正确
2. 文件名是否包含特殊字符
3. 浏览器控制台是否有错误
4. Next.js 开发服务器是否需要重启

