// API endpoints
export const API_ENDPOINTS = {
  GENERATE_VIDEO: '/api/generate-video',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_SIGNUP: '/api/auth/signup',
} as const

// Supported image formats
export const SUPPORTED_IMAGE_FORMATS = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
} as const

// Video generation settings
export const VIDEO_SETTINGS = {
  MAX_PROMPT_LENGTH: 2000,
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  GENERATION_TIMEOUT: 120000, // 2 minutes
} as const

// Plan limits
export const PLAN_LIMITS = {
  FREE: {
    videosPerMonth: 3,
    maxDuration: 5,
    quality: 'HD',
    watermark: true,
  },
  PRO: {
    videosPerMonth: 100,
    maxDuration: 30,
    quality: '4K',
    watermark: false,
  },
  BUSINESS: {
    videosPerMonth: -1, // unlimited
    maxDuration: 60,
    quality: '4K',
    watermark: false,
  },
} as const

// Animation presets
export const ANIMATION_PRESETS = [
  {
    id: 'walk',
    name: 'Walking',
    prompt: 'The person walks forward naturally',
    icon: '🚶',
  },
  {
    id: 'zoom',
    name: 'Zoom In',
    prompt: 'Camera slowly zooms in on the subject',
    icon: '🔍',
  },
  {
    id: 'pan',
    name: 'Pan',
    prompt: 'Camera pans from left to right',
    icon: '📹',
  },
  {
    id: 'waves',
    name: 'Water Movement',
    prompt: 'Water ripples and waves gently',
    icon: '🌊',
  },
  {
    id: 'wind',
    name: 'Wind Effect',
    prompt: 'Hair and clothes move in the wind',
    icon: '💨',
  },
  {
    id: 'clouds',
    name: 'Moving Clouds',
    prompt: 'Clouds drift across the sky',
    icon: '☁️',
  },
] as const

