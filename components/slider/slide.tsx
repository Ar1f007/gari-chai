import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";

import { subtitle } from "../primitives";
import { Button } from "@nextui-org/button";

type Item = {
  src: string;
  name: string;
  price: string;
};

export const Slide = (props: Item) => {
  const { price, name, src } = props;

  return (
    <div className="keen-slider__slide">
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
          <p className="text-base mb-3">{price}</p>

          <Button
            color="primary"
            variant="bordered"
          >
            Check September Offers
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
