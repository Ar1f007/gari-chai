import { cn } from "@/lib/utils"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"

const CarCardSkeleton = () => {
  return (
    <Card className="h-[425px] justify-between border-1 border-slate-200 shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-[3/2] w-full bg-gray-200 animate-pulse" />
      </CardHeader>
      <CardBody className="justify-around px-4 pb-4">
        <div className="h-5 w-3/4 bg-gray-200 animate-pulse mb-4 rounded" />
        <div className="h-6 w-1/2 bg-gray-200 animate-pulse mb-4 rounded" />
        <Button
          disabled
          className={cn(
            'shrink-0',
            'bg-gray-200 animate-pulse',
            'border-none cursor-default text-transparent'
          )}
        >
          Loading...
        </Button>
      </CardBody>
    </Card>
  )
}
export default CarCardSkeleton