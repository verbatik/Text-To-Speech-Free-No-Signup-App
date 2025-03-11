"use client";

import { motion } from 'framer-motion';

interface Voice {
  name: string;
  gender: string;
  language_code: string;
}

interface VoiceSelectorProps {
  voices: Voice[];
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
}

export default function VoiceSelector({ voices, selectedVoice, setSelectedVoice }: VoiceSelectorProps) {
  if (voices.length === 0) {
    return (
      <div className="mb-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select Voice
      </label>
      <select
        id="voice-select"
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.gender}, {voice.language_code})
          </option>
        ))}
      </select>
    </motion.div>
  );
}