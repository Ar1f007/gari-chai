'use client';

import { Car } from '@/components/car/new-car-card';
import { Section } from '@/components/layout/section';
import SectionTitle from '@/components/section-title';
import { TCarSchema } from '@/schema/car';
import { useEffect, useState } from 'react';

const WishListPage = () => {
  const [wishList, setWishList] = useState<{ car: TCarSchema }[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      const wishlist = JSON.parse(storedWishlist);
      setWishList(wishlist);
    }
  }, []);

  return (
    <Section classNames='py-10'>
      {wishList.length === 0 && <p className='text-center'>Wishlist is empty.</p>}

      <div className='space-y-5'>
        <SectionTitle>Wishlist</SectionTitle>
        <div className='flex flex-col space-y-5'>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {wishList.map(({ car }) => (
              <Car
                car={car}
                key={car._id}
              />
            ))}
          </div>
        </div>

        {/* {res.pagination.totalItems > 0 && <Pagination totalPages={res.pagination.totalPages} />} */}
      </div>
    </Section>
  );
};
export default WishListPage;
