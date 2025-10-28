'use client'

import { ANIMATION_PRESETS } from '@/lib/constants'

interface AnimationPresetsProps {
  onSelectPreset: (prompt: string) => void
}

export default function AnimationPresets({ onSelectPreset }: AnimationPresetsProps) {
  return (
    <div className="mb-6">
      <label className="block text-white font-semibold mb-3">
        Quick Presets
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ANIMATION_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset.prompt)}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-500 rounded-lg p-3 transition-all text-left group"
          >
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {preset.icon}
              </span>
              <span className="text-white font-semibold text-sm">{preset.name}</span>
            </div>
            <p className="text-gray-400 text-xs">{preset.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

