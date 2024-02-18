import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={"/products/" + product.id}
      className="flex flex-row items-center gap-2 bg-neutral rounded-lg my-3 w-full h-[100px]"
    >
      <div className="flex justify-center items-center py-2 px-4 gap-4">
        <Image
          src={product.imgUrl}
          alt={product.name}
          width={50}
          height={50}
          className="h-30 object-contain rounded"
        />
        <h2 className="font-bold text-lg">{product.name}</h2>

        <PriceTag price={product.price} />
      </div>
    </Link>
  );
}
