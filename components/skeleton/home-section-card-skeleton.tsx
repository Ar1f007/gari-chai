import Sliders from "../slider"
import CarCardSkeleton from "./card-skeleton"

const HomeSectionCardSkeleton = ({ cardCount }: { cardCount: number }) => {
  return (
    <div className="home-section-wrapper">
      {/* Title */}
      <div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />

      {/* Sliders */}
      <div className='mt-5 flex flex-col space-y-5'>
        <Sliders>
          {
            Array.from({ length: cardCount }).map((_, i) => (
              <li
                key={i}
                className='keen-slider__slide'
              >
                <CarCardSkeleton key={i} />
              </li>
            ))
          }
        </Sliders>

        {/* Link Skeleton */}
        <div className="h-5 w-40 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  )
}
export default HomeSectionCardSkeleton