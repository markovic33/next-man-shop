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
      className="flex flex-col md:flex-row rounded w-full md:h-[200px] bg-neutral border hover:border-secondary hover:shadow-xl"
    >
      <div className="flex-none md:w-1/2">
        <Image
          src={product.imgUrl}
          alt={product.name}
          width={400}
          height={200}
          priority
          className="h-full w-full object-cover rounded-l md:rounded-none md:rounded-l"
        />
      </div>
      <div className="flex flex-col justify-between p-4 md:w-1/2">
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm">{product.category}</p>
          <p className="text-sm">{product.brand}</p>
        </div>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
  
  
}
