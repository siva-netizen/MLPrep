'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

export function Gallery4({
  title = 'Explore Topics',
  description = 'Discover and master key concepts in machine learning and AI. Navigate through our curated collection of learning materials.',
  items = [],
}) {
  const [carouselApi, setCarouselApi] = useState(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }
    updateSelection()
    carouselApi.on('select', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium text-black md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="max-w-lg text-gray-700">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev()
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5 text-black" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext()
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5 text-black" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a href={item.href} className="group rounded-xl h-full">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl border-2 border-black md:aspect-[5/4] lg:aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-50 flex flex-col justify-between p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
                    {/* Background image if provided, otherwise gradient background */}
                    {item.image && (
                      <>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Dark overlay for text readability with image */}
                        <div className="absolute inset-0 h-full bg-gradient-to-t from-black via-black/50 to-transparent" />
                      </>
                    )}
                    
                    {/* Content wrapper */}
                    <div className={`relative flex flex-col items-start justify-end h-full ${item.image ? 'text-white' : 'text-black'}`}>
                      <div className="mb-2 pt-4 text-xl font-bold md:mb-3 md:pt-4 lg:pt-4 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </div>
                      <div className={`mb-8 line-clamp-2 md:mb-12 lg:mb-9 text-sm md:text-base ${item.image ? 'text-gray-200' : 'text-gray-600'}`}>
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm font-bold gap-2">
                        {item.cta || 'Explore Path'}{' '}
                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-black' : 'bg-gray-300'
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
