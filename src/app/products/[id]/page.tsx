import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";
import Recomanded from "@/components/Recomanded";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma?.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + " - Man Shop",
    description: product.description,
    openGraph: {
      images: [{ url: product.imgUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col md:flex-row my-10 gap-4 px-10">
        <Image
          src={product.imgUrl}
          alt={product.name}
          width={400}
          height={300}
          className="h-30 object-cover rounded-lg"
          priority
        />
        <div className="flex-col justify-center items-center p-4">
          <h1 className="font-bold text-2xl my-4">{product.name}</h1>
          <p className="text-xl  my-2">
            Category:{" "}
            <span className="text-gray-300 font-bold">{product.category}</span>
          </p>
          <p className="text-xl  my-2">
            Brand:{" "}
            <span className="text-gray-300 font-bold">{product.brand}</span>
          </p>
          <p className="text-xl  my-2">
            Size:{" "}
            <span className="text-gray-300 font-bold">{product.size}</span>
          </p>
          <p className="text-xl  my-2">{product.description}</p>
          <PriceTag className="bg-gray-300 " price={product.price} />
          <AddCartButton
            productId={product.id}
            incrementProductQuantity={incrementProductQuantity}
          />
        </div>
      </div>
      <div className="w-[350px] px-2">
        <Recomanded />
      </div>
    </div>
  );
}
