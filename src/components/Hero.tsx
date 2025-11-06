import { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  'https://raw.githubusercontent.com/Solved-Overnight/arvana-clothing/refs/heads/main/img/hero_png/hero_png1.png',
  'https://raw.githubusercontent.com/Solved-Overnight/arvana-clothing/refs/heads/main/img/hero_png/hero_png2.png',
  'https://raw.githubusercontent.com/Solved-Overnight/arvana-clothing/refs/heads/main/img/hero_png/hero_png3.png',
  'https://raw.githubusercontent.com/Solved-Overnight/arvana-clothing/refs/heads/main/img/hero_png/hero_png4.png'
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [excellenceText, setExcellenceText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const wordToType = 'Excellence';

  // Typing animation for "Excellence"
  useEffect(() => {
    if (excellenceText.length < wordToType.length) {
      const timeout = setTimeout(() => {
        setExcellenceText(wordToType.slice(0, excellenceText.length + 1));
      }, 150); // Typing speed: 150ms per character

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [excellenceText, wordToType]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
  <div className="relative min-h-[60vh] md:min-h-[90vh] overflow-visible bg-white">
      <div className="relative max-w-[1920px] mx-auto">
        {/* Floating Tag Badge - hidden on very small screens */}
        <div className="hidden sm:flex absolute top-8 left-1/2 translate-x-8 lg:top-12 lg:translate-x-16 bg-white rounded-full px-4 py-2 shadow-lg items-center gap-2 animate-pulse z-[120]">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs font-semibold text-gray-800">New Collection</span>
        </div>
        
        {/* Images positioned absolutely above all layouts */}
  {/* Desktop carousel (hidden on small screens) */}
  <div className="hidden md:flex absolute inset-0 flex items-end justify-end overflow-visible pointer-events-none" style={{ zIndex: 100 }}>
          {/* Image Carousel - simplified on small screens */}
          <div className="relative w-full max-w-4xl flex items-end justify-end overflow-visible h-full pointer-events-auto pr-4 sm:pr-6 lg:pr-12 xl:pr-16">
            {/* Images Container - Reduced size on mobile */}
            <div className="relative w-full h-[280px] md:h-[600px] lg:h-[700px] xl:h-[800px] flex items-end justify-end overflow-visible">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-end justify-end transition-opacity duration-1000 overflow-visible ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  style={{ 
                    zIndex: index === currentImageIndex ? 100 : 0,
                    position: 'absolute'
                  }}
                >
                  {/* PNG Image with soft shadow cast on background */}
                  <div className="relative w-full h-full flex items-end justify-end overflow-visible">
                    <img
                      src={image}
                      alt={`ARVANA Fashion Collection ${index + 1}`}
                      className="w-auto h-full max-w-none object-contain object-bottom"
                      style={{
                        filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.12))',
                        zIndex: 100,
                        position: 'relative'
                      }}
                      loading={index === currentImageIndex ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows - hide on small screens */}
            <button
              onClick={prevImage}
              className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 pointer-events-auto"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            
            <button
              onClick={nextImage}
              className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 pointer-events-auto"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[110] flex gap-2 pointer-events-auto">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-white w-8 scale-110'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile simplified hero image to avoid overlapping absolute layers */}
        <div className="block md:hidden relative w-full flex items-center justify-center pt-4 pb-4">
          <div className="w-full max-w-3xl h-80 overflow-hidden rounded-2xl flex items-center justify-center">
            <img
              src={heroImages[currentImageIndex]}
              alt={`ARVANA Fashion Collection ${currentImageIndex + 1}`}
              className="w-auto h-full object-contain object-center"
              style={{ filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.12))' }}
            />
          </div>
        </div>
        
  <div className="grid lg:grid-cols-2 gap-0 min-h-[60vh] md:min-h-[90vh]">
    {/* Left Side - Text Content */}
    <div className="relative bg-gradient-to-br from-purple-50 via-white to-white flex items-center pt-4 md:pt-8 pb-8 md:pb-16 px-4 sm:px-6 lg:px-12 xl:px-16" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)', zIndex: 1 }}>
            
            <div className="relative z-10 max-w-2xl w-full">
              {/* Logo */}
              <div className="flex my-3 pl-12">
                <img
                  src="https://raw.githubusercontent.com/Solved-Overnight/arvana-clothing/refs/heads/main/img/logo/Logo%20only%20png.png"
                  alt="ARVANA Logo"
                  className="w-56 sm:w-64 md:w-72 h-auto"
                />
              </div>
              {/* Pre-headline with animated badge */}
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500"></div>
                <p className="text-xs sm:text-sm font-bold text-orange-500 uppercase tracking-[0.2em]">
                  PREMIUM FASHION COLLECTIONS
                </p>
                <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-orange-500"></div>
              </div>
              
              {/* Main Headline - Professional Typography */}
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-[1.2] mb-4 sm:mb-8 tracking-tight">
                <span className="block whitespace-nowrap">
                  Crafting <span className="relative inline-block">
                    <span className="relative z-10">
                      {excellenceText}
                      {!isTypingComplete && <span className="animate-pulse text-orange-500">|</span>}
                    </span>
                    {/* Brush stroke effect */}
                    <svg 
                      className="absolute -bottom-2 left-0 w-full h-6" 
                      viewBox="0 0 200 30" 
                      preserveAspectRatio="none" 
                      style={{ overflow: 'visible', zIndex: 0 }}
                    >
                      <defs>
                        <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
                          <stop offset="50%" stopColor="#f97316" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 5 20 Q 30 8, 50 12 Q 70 16, 90 14 Q 110 12, 130 15 Q 150 18, 170 16 Q 185 15, 195 14"
                        stroke="url(#brushGradient)"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ 
                          filter: 'drop-shadow(2px 3px 4px rgba(239, 68, 68, 0.25))',
                        }}
                      />
                      {/* Texture layer for depth */}
                      <path
                        d="M 8 22 Q 32 10, 52 13 Q 72 17, 92 15 Q 112 13, 132 16 Q 152 19, 172 17 Q 187 16, 197 15"
                        stroke="#f87171"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.5"
                      />
                    </svg>
                  </span> for the
                </span>
                <span className="block whitespace-nowrap">World's Finest Labels.</span>
              </h1>
              
              {/* Description - Enhanced Readability */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-10 max-w-xl font-normal">
                Innovative RMG manufacturing for modern brands — designed with precision, made with passion.
              </p>
              
              {/* CTA Buttons - Professional Design */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                <button 
                  onClick={() => {
                    const productsSection = document.getElementById('all-products');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/products';
                    }
                  }}
                  className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl shadow-xl flex items-center gap-3 text-sm sm:text-base overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"></div>
                  <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10" />
                  <span className="relative z-10">Shop Now</span>
                </button>
                
                <button 
                  onClick={() => {
                    window.location.href = '/products';
                  }}
                  className="group border-2 border-gray-300 hover:border-gray-400 text-gray-800 px-6 py-3 sm:px-10 sm:py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg text-sm sm:text-base"
                >
                  Explore Collections
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Side - Background */}
          <div className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100 flex items-center justify-center lg:justify-start py-0 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-visible" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)', zIndex: 1 }}>
            
            {/* Decorative Fashion Elements - Moved outside container */}
            <div className="absolute top-8 right-8 lg:top-12 lg:right-12 w-16 h-16 opacity-80 animate-float z-[105]">
              <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            
            <div className="absolute bottom-16 left-8 lg:bottom-20 lg:left-12 w-12 h-12 opacity-80 animate-float-delayed z-[105]">
              <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional styling for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
}
