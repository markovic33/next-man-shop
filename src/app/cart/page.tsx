import { getCart } from "@/lib/db/cart";
import CartItemEntry from "./CartItemEntry";
import { setProductQuantitu } from "./actions";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Your Shopping Cart - Man's Shop",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="">
      <h1 className="my-4 text-3xl font-bold">Your Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartItemEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantitu}
        />
      ))}
      {!cart?.items.length && (
        <p className=" text-gray-300 ">Your cart is empty.</p>
      )}
      <div className="flex flex-col items-end sm:items-center">
        <p className="my-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[100px]">Checkout</button>
      </div>
    </div>
  );
}
