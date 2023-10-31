import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";

import { subtitle } from "../primitives";
import { Button } from "@nextui-org/button";
import { TabItem } from "@/types";

type Slide = TabItem;

export const Slide = (props: Slide) => {
  const { name, src, priceMin, priceMax } = props;

  return (
    <li className="keen-slider__slide">
      <Card className="shadow-md border-1 border-slate-200">
        <CardHeader className="relative h-[200px]">
          <Image
            src={src}
            alt="cars"
            fill
            sizes="100%"
            className="object-cover"
          />
        </CardHeader>
        <CardBody>
          <h2 className={subtitle()}>{name}</h2>

          <p className="text-base mb-3">
            {priceMin} &mdash; {priceMax}
          </p>

          <Button
            color="primary"
            variant="bordered"
          >
            Check September Offers
          </Button>
        </CardBody>
      </Card>
    </li>
  );
};
