'use client';

import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FullPageCarouselProps {
  items: ReactNode[];
}

export function FullPageCarousel({ items }: FullPageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [isPlaying, setIsPlaying] = useState(true);

  const autoplayRef = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  // This useCallback function is still correct for controlling play/pause
  const togglePlayPause = useCallback(() => {
    const autoplay = api?.plugins().autoplay;
    if (!autoplay) return;

    if (autoplay.isPlaying()) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  }, [api]);

  // THIS IS THE CORRECTED PART
  useEffect(() => {
    if (!api) return;

    // Get the autoplay instance to check the initial state
    const autoplay = api.plugins().autoplay;
    if (!autoplay) return;
    setIsPlaying(autoplay.isPlaying());

    // Define listener functions
    const onPlay = () => setIsPlaying(true);
    const onStop = () => setIsPlaying(false);

    // CORRECTED: Listen for events on the main 'api' object
    // using the 'autoplay:play' and 'autoplay:stop' event names.
    api.on('autoplay:play', onPlay);
    api.on('autoplay:stop', onStop);

    // Cleanup listeners on component unmount
    return () => {
      api.off('autoplay:play', onPlay);
      api.off('autoplay:stop', onStop);
    };
  }, [api]);

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
        setApi={setApi}
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
          'fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105 focus:outline-none'
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
