"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface ParallaxHeroProps {
  image: string | any
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function ParallaxHero({ image, title, subtitle, ctaLabel, ctaHref }: ParallaxHeroProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Determine the image source
  const imageUrl = typeof image === 'string' ? image : image.src

  const scrollToContent = () => {
    const targetPosition = window.innerHeight;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start: number | null = null;
  
    interface AnimationTimestamp {
      timestamp: number;
    }

    const step = (timestamp: number): void => {
      if (!start) start = timestamp;
      const progress: number = timestamp - start;
      const percent: number = Math.min(progress / duration, 1);
      window.scrollTo(0, startPosition + distance * easeInOutQuad(percent));
      if (progress < duration) {
      requestAnimationFrame(step);
      }
    };
  
    // Optional: easing function for smoother animation
    interface EasingFunction {
      (t: number): number;
    }
    
    const easeInOutQuad: EasingFunction = (t: number): number =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  
    requestAnimationFrame(step);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${scrollY * 0.5}px)`,
          // Removed the height adjustment that was scaling the image
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl max-w-3xl mb-8">{subtitle}</p>}

        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className="bg-white text-black border border-white px-8 py-3 rounded-md transition-all text-lg font-medium"
          >
            {ctaLabel}
          </a>
        )}
        
        <button 
          onClick={scrollToContent}
          className="absolute bottom-10 animate-bounce cursor-pointer focus:outline-none"
          aria-label="Scroll down"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5"></path>
            <path d="M7 6l5 5 5-5"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}