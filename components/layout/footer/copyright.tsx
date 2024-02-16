import { siteConfig } from '@/config/site';

const Copyright = () => {
  return (
    <span className='block text-center text-sm font-semibold'>
      © {new Date().getFullYear()} {siteConfig.name} All Rights Reserved.
    </span>
  );
};
export default Copyright;
