import Image from 'next/image';

const Hero = () => {
  return (
    <div className='container relative mx-auto h-[70vh] max-w-screen-2xl'>
      <Image
        src='/hero.webp'
        alt='Lady standing by a car'
        priority
        className='absolute inset-0 object-cover'
        draggable={false}
        fill
        sizes='100vw'
      />
    </div>
  );
};

export default Hero;
