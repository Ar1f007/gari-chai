'use client';

import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import { Button } from '@nextui-org/button';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { title } from '../../../components/primitives';
import { useRouter } from 'next/navigation';
import { TCarCampaign } from '@/schema/campaign';
import { settingsActions, settingsStore } from '@/store';

type CampaignSliderProps = {
  sliders: TCarCampaign[];
};

const CampaignSlider = ({ sliders }: CampaignSliderProps) => {
  const router = useRouter();

  const [showPromo, setShowPromo] = useState(
    settingsStore.notifications.campaigns.isPromoShown ? false : true,
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? sliders.length - 1 : prevSlide - 1));
  };
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === sliders.length - 1 ? 0 : prevSlide + 1));
  };

  const goToSlide = (slideIdx: number) => {
    setCurrentSlide(() => slideIdx);
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
      placement='center'
      onOpenChange={handleClosePromo}
    >
      <ModalContent>
        <>
          <ModalHeader className='flex flex-col gap-1'>
            <span className={title({ color: 'blue', size: 'xs' })}>Special Campaigns On Going</span>
          </ModalHeader>
          <ModalBody>
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
              axis='horizontal'
              onChange={(index) => setCurrentSlide(index)}
              selectedItem={currentSlide}
            >
              {sliders.map((slider, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOnPosterClick(slider.link || routes.campaigns)}
                  className='cursor-pointer'
                >
                  <Image
                    src={slider.posterImage.originalUrl}
                    alt={slider.title}
                    width={400}
                    height={400}
                    priority
                    className='rounded max-h-[70dvh] lg:max-h-[400px] aspect-square object-cover'
                    quality={100}
                  />
                </div>
              ))}
            </Carousel>

            <div className='text-pretty text-center first-letter:capitalize'>
              <h2 className={title({ size: 'xs', color: 'blue' })}>
                {sliders[currentSlide].title}
              </h2>
              {sliders[currentSlide]?.tagline && (
                <p className='text-md font-medium text-default-600'>
                  {sliders[currentSlide].tagline}
                </p>
              )}
            </div>

            {sliders.length > 1 && (
              <Button
                className='mx-auto w-fit text-[12px] font-medium uppercase tracking-wider text-default-50'
                variant='solid'
                color='primary'
                onPress={() => handleOnPosterClick(routes.campaigns)}
                size='sm'
              >
                Go to Campaigns
              </Button>
            )}
          </ModalBody>
          <ModalFooter
            className={cn('justify-between', {
              'justify-center': sliders.length == 1,
            })}
          >
            {sliders.length > 1 ? (
              <Fragment>
                <Button
                  className='text-[12px] uppercase tracking-wider text-default-50'
                  variant='solid'
                  color='primary'
                  onPress={goToPrevSlide}
                  size='sm'
                >
                  Back
                </Button>
                <div className='flex items-center gap-2'>
                  {Array.from({ length: sliders.length }).map((item, idx) => (
                    <Button
                      key={idx}
                      size='sm'
                      className={cn(
                        'h-3 min-w-3 cursor-pointer rounded-full bg-default-300 p-0 hover:bg-primary/70',
                        { 'bg-primary': currentSlide == idx },
                      )}
                      onPress={() => goToSlide(idx)}
                    />
                  ))}
                </div>
                <Button
                  className='text-[12px] uppercase tracking-wider text-default-50'
                  variant='solid'
                  color='primary'
                  onPress={goToNextSlide}
                  size='sm'
                >
                  Next
                </Button>
              </Fragment>
            ) : (
              <Button
                className='text-md uppercase tracking-wider text-default-50'
                variant='solid'
                color='primary'
                onPress={() => handleOnPosterClick(routes.campaigns)}
              >
                Go to Campaigns
              </Button>
            )}
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
export default CampaignSlider;
