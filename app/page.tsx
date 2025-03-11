"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApiKeyInput from './components/ApiKeyInput';
import TextToSpeechForm from './components/TextToSpeechForm';
import VoiceSelector from './components/VoiceSelector';
import AudioPlayer from './components/AudioPlayer';
import AudioVisualizer from './components/AudioVisualizer';
import Link from 'next/link';

interface Voice {
  name: string;
  gender: string;
  language_code: string;
}

export default function Home() {
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tts_api_key') || '';
    }
    return '';
  });
  
  const [text, setText] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tts_text') || '';
    }
    return '';
  });
  
  const [voices, setVoices] = useState<Voice[]>([]);
  
  const [selectedVoice, setSelectedVoice] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tts_selected_voice') || '';
    }
    return '';
  });
  
  const [audioUrl, setAudioUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tts_audio_url') || '';
    }
    return '';
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tts_api_key', apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tts_text', text);
    }
  }, [text]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tts_selected_voice', selectedVoice);
    }
  }, [selectedVoice]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tts_audio_url', audioUrl);
    }
  }, [audioUrl]);

  useEffect(() => {
    if (!apiKey) return;
    
    const fetchVoices = async () => {
      try {
        const response = await fetch('https://api.verbatik.com/api/v1/voices', {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setVoices(data);
        if (data.length > 0 && !selectedVoice) {
          setSelectedVoice(data[0].name);
        }
      } catch (err) {
        setError('Error fetching voices. Please check your API key.');
        console.error(err);
      }
    };
    
    fetchVoices();
  }, [apiKey, selectedVoice]);

  const handleGenerateSpeech = async () => {
    if (!apiKey || !text || !selectedVoice) {
      setError('Please provide API key, text, and select a voice');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://api.verbatik.com/api/v1/tts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-Voice-ID': selectedVoice,
          'X-Store-Audio': 'true',
          'Content-Type': 'text/plain'
        },
        body: text
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success && data.audio_url) {
        setAudioUrl(data.audio_url);
      } else {
        throw new Error('No audio URL returned');
      }
    } catch (err: any) {
      setError(`Failed to generate speech: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-800">TextToSpeech.ing</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="#features" className="text-gray-600 hover:text-indigo-700">Features</Link></li>
              <li><Link href="#how-it-works" className="text-gray-600 hover:text-indigo-700">How It Works</Link></li>
              <li><Link href="#faq" className="text-gray-600 hover:text-indigo-700">FAQ</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Text to Natural Speech in Seconds</h1>
                <p className="text-xl mb-8">Create professional voice content for videos, podcasts, and more - without any signup required.</p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a href="#converter" className="bg-white text-indigo-700 hover:bg-indigo-100 font-bold py-3 px-6 rounded-lg transition duration-300">
                    Start Converting
                  </a>
                  <a href="#how-it-works" className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                    Learn More
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    <div className="h-4 bg-white/20 rounded"></div>
                    <div className="h-4 bg-white/20 rounded w-5/6"></div>
                    <div className="h-10 bg-white/20 rounded mt-4"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <main id="converter" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">Text to Speech Converter</h2>
          <p className="text-lg text-gray-600">Generate speech from text using your Verbatik API key</p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
            
            {apiKey && (
              <>
                <VoiceSelector 
                  voices={voices} 
                  selectedVoice={selectedVoice} 
                  setSelectedVoice={setSelectedVoice} 
                />
                
                <TextToSpeechForm 
                  text={text} 
                  setText={setText} 
                  onSubmit={handleGenerateSpeech}
                  isLoading={isLoading}
                />
                
                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                  </div>
                )}
                
                {audioUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6"
                  >
                    <AudioPlayer 
                      audioUrl={audioUrl} 
                      onPlayStateChange={handlePlayStateChange}
                    />
                    <AudioVisualizer 
                      audioUrl={audioUrl} 
                      isPlaying={isPlaying} 
                    />
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Our Text-to-Speech Tool?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Generation</h3>
              <p className="text-gray-600">Convert your text to speech in seconds with our lightning-fast API integration.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Signup Required</h3>
              <p className="text-gray-600">Just bring your Verbatik API key and start generating high-quality speech immediately.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Natural-Sounding Voices</h3>
              <p className="text-gray-600">Choose from a variety of high-quality, natural-sounding voices in multiple languages.</p>
            </div>
          </div>
        </div>
      </section>

      

      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">Enter Your API Key</h3>
                <p className="text-gray-600">Paste your Verbatik API key to access the text-to-speech service.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">Select a Voice</h3>
                <p className="text-gray-600">Choose from a variety of natural-sounding voices in different languages and styles.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">Generate & Download</h3>
                <p className="text-gray-600">Enter your text, generate speech, and download the audio file for your projects.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

   

      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Do I need to create an account?</h3>
              <p className="text-gray-600">No, you dont need to create an account. You only need a Verbatik API key to use our service.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">How do I get a Verbatik API key?</h3>
              <p className="text-gray-600">You can obtain a Verbatik API key by visiting the Verbatik website and signing up for their service. Once registered, youll be able to access your API key from your dashboard.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">What file formats are supported?</h3>
              <p className="text-gray-600">Our service generates audio in MP3 format, which is compatible with most devices and platforms.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Is there a limit to how much text I can convert?</h3>
              <p className="text-gray-600">The text limit depends on your Verbatik API plan. Please refer to your Verbatik account for specific limitations.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Can I use the generated audio for commercial purposes?</h3>
              <p className="text-gray-600">Usage rights depend on your Verbatik API agreement. Please review their terms of service for commercial usage guidelines.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Convert Your Text to Speech?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Start generating natural-sounding voice content for your projects in seconds.</p>
          <a href="#converter" className="bg-white text-indigo-700 hover:bg-indigo-100 font-bold py-3 px-8 rounded-lg transition duration-300 inline-block">
            Get Started Now
          </a>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TextToSpeech.ing</h3>
              <p className="text-gray-400">Transform text to natural-sounding speech with our free, no-signup text-to-speech converter.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition">Features</Link></li>
                <li><Link href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</Link></li>
                <li><Link href="#faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
                <li><Link href="#converter" className="text-gray-400 hover:text-white transition">Converter</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://verbatik.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Verbatik API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>Powered by Verbatik API • No signup required</p>
            <p className="mt-2">© {new Date().getFullYear()} TextToSpeech.ing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}