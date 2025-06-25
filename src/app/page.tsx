'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// Loading Screen Component
const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 mx-auto mb-8 bg-white/20 rounded-full border-4 border-white flex items-center justify-center"
        >
          <div className="text-3xl">🏝️</div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Loading Your Next Adventure...
        </motion.h1>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-1 bg-white/30 rounded-full mx-auto max-w-xs"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="h-full bg-white rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Custom hook for generating images
const useImageGeneration = () => {
  const [images, setImages] = useState<{[key: string]: string}>({})
  const [loading, setLoading] = useState<{[key: string]: boolean}>({})

  const generateImage = React.useCallback(async (key: string, prompt: string) => {
    setLoading(prev => ({ ...prev, [key]: true }))
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, size: '1920x1080' }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setImages(prev => ({ ...prev, [key]: data.image_url }))
      } else {
        // Fallback to beautiful placeholder
        setImages(prev => ({ ...prev, [key]: `https://picsum.photos/1920/1080?random=${Math.random()}` }))
      }
    } catch (error) {
      // Fallback to beautiful placeholder
      setImages(prev => ({ ...prev, [key]: `https://picsum.photos/1920/1080?random=${Math.random()}` }))
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }))
    }
  }, [])

  return { images, loading, generateImage }
}

// Define phrases outside component to avoid dependency issues
const phrases = ["Tobago", "Your Paradise", "Your Adventure", "Your Getaway", "Tobago"]

export default function TobagoSplashPage() {
  const [showLoading, setShowLoading] = useState(true)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const { images, loading, generateImage } = useImageGeneration()

  useEffect(() => {
    // Show loading screen for 3 seconds
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 3000)

    // Generate all needed images with detailed, realistic prompts - only once on mount
    generateImage('hero', 'aerial drone shot of Englishmans Bay in Tobago, turquoise crystal clear waters, pristine white sand beach, swaying palm trees, lush tropical green hills, golden hour cinematic lighting, paradise beach, dramatic sky, ultra-detailed, professional photography')
    generateImage('sunset', 'breathtaking sunset over Store Bay beach in Tobago, distant fishing boats silhouetted against golden sky, fishermen as small distant figures on shoreline, dramatic orange and pink clouds, warm golden light reflecting on calm waters, peaceful Caribbean evening, cinematic composition, ultra-detailed')
    generateImage('nylon', 'Nylon Pool Tobago with colorful fishing boats anchored in crystal-clear shallow turquoise water, aerial drone view, pristine white sand bottom clearly visible through transparent water, traditional Caribbean fishing vessels, tropical paradise, bright sunny day, ultra-detailed, professional photography')
    generateImage('food', 'vibrant display of authentic Tobago cuisine, fresh crab and dumpling dishes beautifully plated, colorful Caribbean spices in wooden bowls, tropical fruits, traditional cooking pots, warm restaurant lighting, food photography, no people visible, ultra-detailed, appetizing presentation')
    generateImage('culture', 'traditional Tobago steel pan drums arrangement at nighttime village setting, glowing fairy lights strung between palm trees, colorful costumes displayed on stands, musical instruments in focus, warm ambient lighting, cultural celebration setup, no people visible, ultra-detailed, atmospheric photography')

    return () => clearTimeout(timer)
  }, []) // Empty dependency array - only run once on mount

  // Cycling text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
    }, 2000) // 2 seconds per word
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!showLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen"
        >
          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax */}
            <motion.div 
              style={{ 
                y,
                backgroundImage: images.hero ? `url(${images.hero})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundAttachment: 'fixed'
              }}
              className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-relaxed"
              >
                <div className="mb-4 min-h-[1.2em] flex items-center justify-center">
                  <span 
                    key={phraseIndex}
                    className={`inline-block transition-all duration-500 ease-in-out bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent
                      ${phrases[phraseIndex] === "Tobago" 
                        ? "drop-shadow-2xl scale-110 filter brightness-125" 
                        : "drop-shadow-md scale-100"
                      }`}
                  >
                    {phrases[phraseIndex]}
                  </span>
                </div>
                <div className="text-white drop-shadow-lg">in Your Hands</div>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Discover the hidden treasures of paradise. From secret beaches to authentic local flavors, 
                experience Tobago through the eyes of those who call it home.
              </motion.p>
              
              {/* App Download Buttons - Main Focus */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-12 py-6 rounded-2xl font-bold text-lg flex items-center gap-4 shadow-2xl hover:shadow-3xl transition-all"
                >
                  <div className="text-3xl">📱</div>
                  <div className="text-left">
                    <div className="text-sm opacity-80">Download on the</div>
                    <div>App Store</div>
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-12 py-6 rounded-2xl font-bold text-lg flex items-center gap-4 shadow-2xl hover:shadow-3xl transition-all"
                >
                  <div className="text-3xl">🤖</div>
                  <div className="text-left">
                    <div className="text-sm opacity-80">Get it on</div>
                    <div>Google Play</div>
                  </div>
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-white/70 text-lg"
              >
                Free download • Works offline • Updated by locals daily
              </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
            >
              <div className="flex flex-col items-center">
                <span className="text-sm mb-2">Explore More</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
                >
                  <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-6">
                  Your Perfect Travel Companion
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  More than just a guide—your key to authentic experiences and connections that transform visitors into family.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: "🏝️",
                    title: "Discover Hidden Gems",
                    description: "Uncover secret beaches, hidden waterfalls, and local spots that guidebooks never mention. Experience Tobago&apos;s best-kept secrets."
                  },
                  {
                    icon: "🗺️",
                    title: "Plan Like a Local",
                    description: "Smart itineraries crafted by islanders. From sunrise hikes to sunset dinners, make every moment count with insider knowledge."
                  },
                  {
                    icon: "🍽️",
                    title: "Authentic Food & Culture",
                    description: "Taste real Tobago through family recipes and cultural celebrations. Connect with traditions passed down through generations."
                  },
                  {
                    icon: "💬",
                    title: "Real-Time Local Tips",
                    description: "Chat with friendly locals who share live updates, weather insights, and personal recommendations just for you."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Visual Story Section */}
          <section className="relative">
            {/* Sunset Bay Story */}
            <div className="relative h-screen flex items-center">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: images.sunset ? `url(${images.sunset})` : 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="max-w-2xl text-white"
                >
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    Where Every Sunset Tells a Story
                  </h3>
                  <p className="text-xl leading-relaxed mb-8">
                    Watch fishermen return with the day&apos;s catch as golden light dances on gentle waves. 
                    This is Store Bay—where time slows down and magic happens every evening.
                  </p>
                  <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all">
                    Explore Store Bay
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Nylon Pool Story */}
            <div className="relative h-screen flex items-center">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: images.nylon ? `url(${images.nylon})` : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
                }}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="max-w-2xl ml-auto text-white text-right"
                >
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    Nature&apos;s Swimming Pool
                  </h3>
                  <p className="text-xl leading-relaxed mb-8">
                    Float in crystal-clear waters over white sand in the middle of the ocean. 
                    The legendary Nylon Pool—where reality feels like a dream.
                  </p>
                  <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all">
                    Visit Nylon Pool
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Food Culture Story */}
            <div className="relative h-screen flex items-center">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: images.food ? `url(${images.food})` : 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="max-w-2xl mx-auto text-center text-white"
                >
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    Flavors That Tell Our Story
                  </h3>
                  <p className="text-xl leading-relaxed mb-8">
                    Taste traditions in every bite. From roadside stalls to family kitchens, 
                    discover the recipes and stories that make our island&apos;s soul.
                  </p>
                  <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all">
                    Taste Tobago
                  </button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Community Mission Section */}
          <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center max-w-4xl mx-auto"
              >
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
                  Connecting Hearts, Building Dreams
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed mb-12">
                  Every download creates connections. Every visit supports families. Every story shared builds bridges 
                  between cultures. This isn&apos;t just tourism—it&apos;s about creating lasting bonds that uplift our island community 
                  and enrich every soul who experiences our paradise.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🤝</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Local Partnerships</h3>
                    <p className="text-gray-600">Supporting island families and businesses through authentic connections</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🌱</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Sustainable Tourism</h3>
                    <p className="text-gray-600">Preserving our natural beauty for generations to come</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">❤️</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Cultural Exchange</h3>
                    <p className="text-gray-600">Sharing our heritage while celebrating diversity</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Final Download CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
              <div className="absolute bottom-32 right-32 w-40 h-40 border border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10 container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Ready to Explore?
                </h2>
                <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                  Join thousands who&apos;ve discovered the real Tobago. Download now and start your adventure 
                  with authentic experiences, local connections, and endless wonder.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black text-white px-12 py-6 rounded-2xl font-bold text-lg flex items-center gap-4 shadow-2xl hover:shadow-3xl transition-all"
                  >
                    <div className="text-3xl">📱</div>
                    <div className="text-left">
                      <div className="text-sm opacity-80">Download on the</div>
                      <div>App Store</div>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black text-white px-12 py-6 rounded-2xl font-bold text-lg flex items-center gap-4 shadow-2xl hover:shadow-3xl transition-all"
                  >
                    <div className="text-3xl">🤖</div>
                    <div className="text-left">
                      <div className="text-sm opacity-80">Get it on</div>
                      <div>Google Play</div>
                    </div>
                  </motion.button>
                </div>
                
                <p className="text-white/70">
                  Free download • Works offline • Updated by locals daily
                </p>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-2xl font-bold mb-4">Xplore Tobago</h3>
              <p className="text-gray-400 mb-6">Your gateway to authentic Caribbean experiences</p>
              <div className="flex justify-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                © 2024 Xplore Tobago. Made with ❤️ in paradise.
              </p>
            </div>
          </footer>
        </motion.div>
      )}
    </>
  )
} 