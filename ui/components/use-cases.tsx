'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Button } from './ui/button';

interface UseCase {
  title: string;
  description: string;
  image: string;
  link: string;
}

const useCases: UseCase[] = [
  {
    title: 'Portfolio Tracking',
    description: 'Track and manage your crypto portfolio across multiple chains.',
    image: '/images/use-cases/portfolio.png',
    link: '#',
  },
  {
    title: 'DeFi Analytics',
    description: 'Get deep insights into your DeFi positions and yields.',
    image: '/images/use-cases/defi.png',
    link: '#',
  },
  {
    title: 'NFT Dashboard',
    description: 'Monitor your NFT collection value and trading activity.',
    image: '/images/use-cases/nft.png',
    link: '#',
  },
  {
    title: 'Protocol Metrics',
    description: 'Analyze key metrics across different DeFi protocols.',
    image: '/images/use-cases/metrics.png',
    link: '#',
  },
  {
    title: 'Smart Alerts',
    description: 'Get notified about important portfolio movements and opportunities.',
    image: '/images/use-cases/alerts.png',
    link: '#',
  },
];

export function UseCases() {
  return (
    <section className="flex justify-center py-20 w-full">
      <div className="text-center max-w-5xl px-4">
        <h2 className="text-3xl font-semibold mb-10">Use Cases</h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.button-next-slide',
            prevEl: '.button-prev-slide',
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="!py-10"
        >
          {useCases.map((useCase, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-3xl border bg-card p-4 h-full flex flex-col">
                <div className="relative aspect-square mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground flex-grow">
                  {useCase.description}
                </p>
                <button className="mt-4 rounded-lg p-2 hover:bg-accent self-end">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="relative flex justify-center gap-4">
          <Button className="button-prev-slide">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button className="button-next-slide">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>        
      </div>
    </section>
  );
} 