"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { revalidatePath } from "next/cache";

export async function setProductQuantitu(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const artticleIncart = cart.items.find(
    (item) => item.productId === productId,
  );

  if (quantity === 0) {
    if (artticleIncart) {
      await prisma?.cartItem.delete({
        where: { id: artticleIncart.id },
      });
    }
  } else {
    if (artticleIncart) {
      await prisma?.cartItem.update({
        where: { id: artticleIncart.id },
        data: { quantity },
      });
    } else {
      prisma?.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
  }

  revalidatePath("/cart");
}
