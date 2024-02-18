import Image from "next/image";
import Link from "next/link";
import React from "react";
import prisma from "@/lib/db/prisma";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";


export default async function Navbar() {
  const session = await getServerSession(authOptions)
  const cart = await getCart();

  return (
    <div className="">
      <div className="navbar  m-auto flex-col sm:flex-row gap-2  border-b-2 border-b-secondary">
        <div className="flex-1 px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full object-fill "
            />
            <span className="text-xl font-bold tracking-tight text-secondary">
              Mens wardrobe
            </span>
          </Link>
        </div>
        <div className="flex justify-center gap-2 px-4 items-center">
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}

{
  /*export default async function Navbar() {
  return (
    <header className="w-full border-b-2 border-b-secondary shadow-sm">
      <nav className="m-auto my-2 flex max-w-5xl items-center justify-between px-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full object-fill "
          />
          <span className="text-xl font-bold tracking-tight text-secondary">
            men's wardrobe
          </span>
        </Link>

        <div className="flex justify-center items-center gap-4">
          <div className="">user</div>
          <div className="">cart</div>
        </div>
      </nav>
    </header>
  );
}*/
}
