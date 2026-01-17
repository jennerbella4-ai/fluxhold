'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'

// Import your logos or use placeholder SVGs
// For now, we'll use placeholder SVGs. Replace with actual images later.
const clientLogos = [
  { id: 1, name: 'Binance', color: '#F0B90B' },
  { id: 2, name: 'Coinbase', color: '#0052FF' },
  { id: 3, name: 'Kraken', color: '#7443BC' },
  { id: 4, name: 'FTX Demo', color: '#02AB6C' },
  { id: 5, name: 'Uniswap', color: '#FF007A' },
  { id: 6, name: 'Aave', color: '#B6509E' },
  { id: 7, name: 'Compound', color: '#00D395' },
  { id: 8, name: 'MakerDAO', color: '#1AAB9B' },
  { id: 9, name: 'Chainlink', color: '#375BD2' },
  { id: 10, name: 'Polygon', color: '#8247E5' },
  { id: 11, name: 'Solana', color: '#00FFA3' },
  { id: 12, name: 'Avalanche', color: '#E84142' },
  { id: 13, name: 'Cardano', color: '#0033AD' },
  { id: 14, name: 'Polkadot', color: '#E6007A' },
]

export default function ClientLogoCarousel() {
  return (
    <div className="section_space py-16 md:py-20">
      <div className="heading_block text-center mb-12">
        <h2 className="subtitle_text mb-0 uppercase border-b-2 border-[#0EF2C2] pb-4 inline-block">
          Trusted by <mark className="bg-gradient-to-r from-[#4C6FFF] to-[#0EF2C2] bg-clip-text text-transparent font-bold">100k+ Investors</mark>
        </h2>
      </div>

      <div className="clients_logo_carousel relative">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={30}
          slidesPerView={2}
          freeMode={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={5000}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 60,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 70,
            },
          }}
          className="!py-4"
        >
          {clientLogos.map((logo) => (
            <SwiperSlide key={logo.id} className="!flex !items-center !justify-center">
              <div className="image_block bg-[#0B1C2D] border border-gray-800 rounded-2xl p-6 w-40 h-32 flex items-center justify-center hover:border-[#0EF2C2]/30 transition-all duration-300 group">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Placeholder SVG - Replace with actual logo images */}
                  <div 
                    className="text-2xl font-bold opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ color: logo.color }}
                  >
                    {logo.name.split(' ')[0]}
                  </div>
                  
                  {/* For actual images, use:
                  <Image
                    src={`/assets/images/clients/client_logo_${logo.id}.webp`}
                    alt={`${logo.name} Logo`}
                    width={120}
                    height={48}
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#060B14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060B14] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Static text logos below carousel */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <p className="text-center text-[#9BA3AF] text-sm uppercase tracking-wider">
          Used by top exchanges & DeFi platforms for demo purposes
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 mt-6 opacity-60">
          {['Binance', 'Coinbase', 'Uniswap', 'Kraken', 'FTX Demo', 'Aave', 'Compound'].map((platform) => (
            <div key={platform} className="text-lg font-medium text-gray-400 hover:text-gray-300 transition-colors">
              {platform}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}