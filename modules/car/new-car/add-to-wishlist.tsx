'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/button';
const AddToWishlist = () => {
  const [wishListed, setWishListed] = useState(false);

  async function handleAddToWishlist() {
    setWishListed(!wishListed);

    if (wishListed) {
      // add to wishlist
    } else {
      // remove from wishlist
    }
  }

  return (
    <div className='-mt-2 flex items-center gap-1'>
      <Button
        isIconOnly
        variant='light'
        color='primary'
        aria-label='Like'
        onPress={handleAddToWishlist}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill={wishListed ? '#1e8667' : 'none'}
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          className='lucide lucide-heart'
        >
          <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
        </svg>
      </Button>

      <p
        className='cursor-pointer select-none text-primary hover:opacity-75'
        onClick={handleAddToWishlist}
      >
        Add to wishlist
      </p>
    </div>
  );
};
export default AddToWishlist;
