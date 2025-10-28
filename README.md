# Wula.ai - AI-Powered Image to Video Platform

A complete clone of Wula.ai, featuring image-to-video generation powered by Tongyi (通义) AI.

## Features

- 🎬 **Image to Video Generation** - Transform static images into dynamic videos using AI
- ✨ **AI-Powered Effects** - Hundreds of viral effects and animations
- 🎨 **Intuitive Interface** - Drag-and-drop upload with real-time preview
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🚀 **High Quality Output** - Export in HD/4K quality
- 💎 **Modern UI/UX** - Beautiful gradients, animations, and interactions
- 🔐 **User Authentication** - Login/Signup with social auth options
- 💰 **Pricing Plans** - Free, Pro, and Business tiers

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom animations
- **AI Integration**: Tongyi (通义) API for image understanding and video generation
- **File Handling**: React Dropzone
- **State Management**: Zustand
- **Icons**: React Icons
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wula-ai-clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
The `.env.local` file has been pre-configured with the Tongyi API key you provided.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
wula-ai-clone/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── generate-video/ # Video generation endpoint
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── pricing/           # Pricing page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Footer
│   ├── Hero.tsx          # Hero section
│   ├── VideoUpload.tsx   # Upload and generation
│   ├── Features.tsx      # Features grid
│   ├── UseCases.tsx      # Use cases section
│   ├── Gallery.tsx       # Inspiration gallery
│   ├── FAQ.tsx           # FAQ accordion
│   └── CTA.tsx           # Call-to-action
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies

```

## Key Features Implementation

### Image Upload & Processing
- Drag-and-drop interface using React Dropzone
- Image preview before processing
- Base64 encoding for API transmission

### AI Video Generation
- Integration with Tongyi API for image understanding
- Prompt-based video generation
- Real-time progress feedback

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

### Authentication
- Login/Signup pages
- Social authentication placeholders (Google, GitHub)
- Password validation

## API Configuration

The Tongyi API is configured in `/app/api/generate-video/route.ts`. The API key is stored in `.env.local`:

```
TONGYI_API_KEY=sk-9bf19547ddbd4be1a87a7a43cf251097
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Colors
Modify the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: '#7c3aed',
  secondary: '#a855f7',
  dark: '#0f0f0f',
}
```

### Gallery Items
Update gallery items in `components/Gallery.tsx` by modifying the `galleryItems` array.

### Pricing Plans
Adjust pricing plans in `app/pricing/page.tsx` by editing the `plans` array.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

## Acknowledgments

- Design inspired by [Wula.ai](https://wula.ai)
- AI powered by Tongyi (通义千问)
- Built with Next.js and Tailwind CSS

