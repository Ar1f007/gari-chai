import Image from "next/image";

const Hero = () => {
  return (
    <div className="h-[70vh] relative container mx-auto max-w-screen-2xl">
      <Image
        src="/hero.webp"
        alt="Lady standing by a car"
        priority
        className="absolute inset-0 object-cover"
        draggable={false}
        fill
        sizes="100vw"
      />
    </div>
  );
};

export default Hero;
