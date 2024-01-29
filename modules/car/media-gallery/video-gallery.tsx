import { TCarSchema } from '@/schema/car';
import ReactPlayer from 'react-player';

type CarVideoGalleryProps = {
  videos: TCarSchema['videos'];
};
const CarVideoGallery = ({ videos }: CarVideoGalleryProps) => {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      {videos.map((video, idx) => (
        <div
          key={idx}
          className='md:h-[360px] md:w-[640px]'
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
