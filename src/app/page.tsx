import Image from "next/image";
import prisma from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCart";
import HeroImageSlider from "@/components/HeroImageSlider";
import HeroFilterSidebar from "@/components/HeroFilterSidebar";

export default async function Home() {
  const products = await prisma?.product.findMany({
    orderBy: { id: "desc" },
  });

  const shuffledProducts = products.sort(() => Math.random() - 0.5);

  const slicedProducts = shuffledProducts.slice(0, 6);

  return (
    <div className="max-w-5xl flex flex-col m-auto  justify-center items-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <HeroFilterSidebar />
        <HeroImageSlider />
      </div>
      <div className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slicedProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
