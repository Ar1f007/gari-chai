import { title } from "@/components/primitives";
import { routes } from "@/util/routes";
import Image from "next/image";
import Link from "next/link";

type Brand = {
  id: string;
  src: string;
  brandName: string;
};
export const Brand = (props: Brand) => {
  const { src, brandName } = props;

  const path = routes.brands + "/" + brandName;

  return (
    <Link
      href={path}
      className="block rounded-lg shadow-md pb-3 hover:shadow-xl ease-in-out duration-300 overflow-hidden"
    >
      <div className="relative h-80 w-full">
        <Image
          src={src}
          alt={brandName}
          className="object-cover"
          fill
          sizes="100%"
        />
      </div>

      <h3
        className={title({
          size: "xs",
          fullWidth: true,
          className: "text-center mt-2 uppercase",
        })}
      >
        {brandName}
      </h3>
    </Link>
  );
};
