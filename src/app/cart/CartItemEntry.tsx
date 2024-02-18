"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartItemEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartItemEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartItemEntryProps) {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 10; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return (
    <div className="">
      <div className="flex flex-wrap items-center gap-3 left-0">
        <Image
          src={product.imgUrl}
          width={200}
          height={200}
          alt={product.name}
          className="rounded-lg"
        />
        <div className="">
          <Link href={"/products/" + product.id} className="font-bold text-xl">
            {product.name}
          </Link>
          <div className="text-gray-300">
            Price: {formatPrice(product.price)}
          </div>
          <div className="my-1 flex items-center gap-2 text-gray-300">
            Quantity:
            <select
              className="rounded-lg  px-2 w-full max-w-[80px] text-black"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            Total: {formatPrice(product.price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
