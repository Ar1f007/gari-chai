const BrandSkeleton = () => {
  return (
    <div
      className="flex h-[160px] flex-col overflow-hidden rounded-lg pb-3 shadow bg-gray-50 animate-pulse">
      {/* Image Placeholder */}
      <div className="h-full w-full bg-gray-200" />

      {/* Text Placeholder */}
      <div className="ml-2 mt-2 h-8 w-2/4 bg-gray-200 rounded" />
    </div>
  );
};

export default BrandSkeleton;