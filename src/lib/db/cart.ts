import { cookies } from "next/headers";
import prisma from "./prisma";
import { Cart, Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  cartSize: number;
  subtotal: number;
};

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma?.cart.create({
    data: {},
  });

  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    cartSize: 0,
    subtotal: 0,
  };
}

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartid = cookies().get("localCartId")?.value;
  const cart = localCartid
    ? await prisma.cart.findUnique({
        where: { id: localCartid },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    cartSize: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}
