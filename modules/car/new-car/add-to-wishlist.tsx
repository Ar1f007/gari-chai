'use client';

import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { TCarSchema } from '@/schema/car';

type WishlistItem = {
  car: TCarSchema;
};

const AddToWishlist = ({ car }: { car: TCarSchema }) => {
  const [wishListed, setWishListed] = useState(false);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      const wishlist: WishlistItem[] = JSON.parse(storedWishlist);
      setWishListed(wishlist.some((item) => item.car._id === car._id));
    }
  }, [car]);

  async function handleAddToWishlist() {
    const updatedWishlist: WishlistItem[] = wishListed
      ? removeFromWishlist(car)
      : addToWishlist(car);

    setWishListed(!wishListed);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  }

  function addToWishlist(car: TCarSchema): WishlistItem[] {
    const storedWishlist = localStorage.getItem('wishlist');
    const wishlist: WishlistItem[] = storedWishlist ? JSON.parse(storedWishlist) : [];
    wishlist.push({ car });
    return wishlist;
  }

  function removeFromWishlist(carId: TCarSchema): WishlistItem[] {
    const storedWishlist = localStorage.getItem('wishlist');
    if (!storedWishlist) return [];
    const wishlist: WishlistItem[] = JSON.parse(storedWishlist);
    const updatedWishlist = wishlist.filter((item) => item.car._id !== car._id);
    return updatedWishlist;
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
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
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
