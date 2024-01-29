import { TCarSchema } from '@/schema/car';
import ReactPlayer from 'react-player';

type CarVideoGalleryProps = {
  videos: TCarSchema['videos'];
};
const CarVideoGallery = ({ videos }: CarVideoGalleryProps) => {
  return (
    <div className='flex flex-wrap justify-center gap-8'>
      {videos.map((video, idx) => (
        <div
          key={idx}
          className='h-auto w-full max-w-[640px] lg:h-[360px]'
        >
          <ReactPlayer
            url={video.link}
            width='100%'
            height='100%'
            controls
          />
        </div>
      ))}
    </div>
  );
};
export default CarVideoGallery;
