import BrandSkeleton from './brand-skeleton';

const PopularBrandsSkeleton = ({ count }: { count: number }) => {
  const skeletonArray = Array.from({ length: count });

  return (
    <section className="pt-8 md:pt-16">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />

      <ul className="mt-6 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:mt-8">
        {skeletonArray.map((_, index) => (
          <li key={index}>
            <BrandSkeleton />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularBrandsSkeleton;
