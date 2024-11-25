'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon, XIcon } from 'lucide-react';
import { Modal, ModalContent, ModalBody } from '@nextui-org/modal';
import { Carousel } from 'react-responsive-carousel';
import { useRouter } from 'next/navigation';
import { TCarCampaign } from '@/schema/campaign';
import { routes } from '@/config/routes';
import { settingsActions, settingsStore } from '@/store';
import { title } from '@/components/primitives';

type CampaignSliderProps = {
  sliders: TCarCampaign[];
};

const CampaignSlider = ({ sliders }: CampaignSliderProps) => {
  const router = useRouter();

  const [showPromo, setShowPromo] = useState(
    () => settingsStore.notifications.campaigns.isPromoShown ? false : true,
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? sliders.length - 1 : prevSlide - 1));
  };
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === sliders.length - 1 ? 0 : prevSlide + 1));
  };

  const handleRouting = (link: string) => {
    router.push(link);
  };

  function handleClosePromo() {
    settingsActions.toggleProperty('notifications.campaigns.isPromoShown', true);
    setShowPromo(false);
  }

  const handleOnPosterClick = (link: string | undefined) => {
    handleClosePromo();
    handleRouting(link || '/');
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      settingsActions.toggleProperty('notifications.campaigns.isPromoShown', true);
    }, 3500);

    return () => clearTimeout(timerId);
  }, []);

  if (sliders.length == 0) {
    return null;
  }

  return (
    <Modal
      isOpen={showPromo}
      placement="center"
      onOpenChange={handleClosePromo}
      hideCloseButton
    >
      <ModalContent>
        <ModalBody className="p-0 gap-0 bg-default-100">

          {/* Close Button */}
          <Button
            className="absolute top-2 right-2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition z-50"
            onPress={handleClosePromo}
            isIconOnly
            aria-label="Close"
          >
            <XIcon className='size-6' />
          </Button>

          <div className="relative">
            <Carousel
              autoPlay
              dynamicHeight
              stopOnHover
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              showIndicators={false}
              interval={4000}
              axis="horizontal"
              onChange={(index) => setCurrentSlide(index)}
              selectedItem={currentSlide}
            >
              {sliders.map((slider, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOnPosterClick(slider.link || routes.campaigns)}
                  className="cursor-pointer relative"
                >
                  {/* Image with overlay */}
                  <div className="relative">
                    <Image
                      src={slider.posterImage.originalUrl}
                      alt={slider.title}
                      width={400}
                      height={400}
                      priority
                      className="rounded rounded-bl-none rounded-br-none w-full max-h-[70dvh] lg:max-h-[400px] aspect-square object-cover"
                      quality={100}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                </div>
              ))}
            </Carousel>

            {/* Left Navigation Button */}
            {
              sliders.length > 1 &&
              <>
                <Button
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
                  onPress={goToPrevSlide}
                  isIconOnly
                  aria-label='previous'
                >
                  <ChevronLeftIcon className="size-6" />
                </Button>

                {/* Right Navigation Button */}
                <Button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
                  onClick={goToNextSlide}
                  isIconOnly
                  aria-label='next'
                >
                  <ChevronRightIcon className="size-6" />
                </Button>
              </>
            }

          </div>

          {/* Title Section */}
          <div className="flex flex-col justify-center items-center gap-4 px-4 pt-3 pb-6 text-center">
            <h2 className={title({ size: "xs", color: "blue" })}>
              {sliders[currentSlide].title}
            </h2>

            <Button
              className="bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium w-fit mx-auto shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
              endContent={<SparklesIcon className="h-4 w-4" />}
              onPress={() => handleOnPosterClick(routes.campaigns)}
              size="lg"
            >
              Go to Campaign
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>

  );
};
export default CampaignSlider;
