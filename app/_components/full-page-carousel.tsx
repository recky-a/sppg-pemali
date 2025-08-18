'use client';

import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { Pause, Play } from 'lucide-react';
import { useRef, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FullPageCarouselProps {
  items: ReactNode[];
}

export function FullPageCarousel({ items }: FullPageCarouselProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const autoplayRef = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  const togglePlayPause = () => {
    if (isPlaying) {
      autoplayRef.current.stop();
      setIsPlaying(false);
    } else {
      autoplayRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <main
      className="relative h-[100dvh] w-screen overflow-hidden"
      style={{
        // Ensure backdrop-filter works in carousel context
        isolation: 'isolate',
        transform: 'translateZ(0)',
      }}
    >
      <Carousel
        opts={{ loop: true, align: 'start' }}
        plugins={[autoplayRef.current, Fade()]}
        className="h-[100dvh] w-screen"
      >
        <CarouselContent
          className="m-0 h-[100dvh] w-screen"
          style={{
            // Preserve backdrop-filter context
            isolation: 'isolate',
          }}
        >
          {items.map((item, i) => (
            <CarouselItem
              key={`carouselItem-${i}`}
              className="h-[100dvh] w-screen basis-full p-0"
              style={{
                // Ensure each slide preserves backdrop-filter
                isolation: 'isolate',
                transform: 'translateZ(0)',
              }}
            >
              <div
                className="relative h-[100dvh] w-screen"
                style={{
                  isolation: 'isolate',
                }}
              >
                {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className={cn(
          buttonVariants(),
          'fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105 focus:ring-2 focus:outline-none'
        )}
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 fill-current" />
        ) : (
          <Play className="ml-0.5 h-5 w-5 fill-current" />
        )}
      </button>
    </main>
  );
}
