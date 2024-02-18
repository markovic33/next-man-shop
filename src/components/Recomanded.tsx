import prisma from "@/lib/db/prisma";
import RecomendedProductCard from "./RecomendedProductCard";

export default async function Recomanded() {
  const products = await prisma?.product.findMany({
    orderBy: { id: "asc" },
  });

  const shuffledProducts = products.sort(() => Math.random() - 0.5);

  const slicedProducts = shuffledProducts.slice(0, 5);

  return (
    <div className="hidden lg:block border border-orange-400 py-2 px-2 my-10 rounded-lg ">
      <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold  text-orange-400">Recomanded</h1>
      <button className="badge bg-neutral text-xl font-bold uppercase text-orange-400 rounded-full p-4">
        for you
      </button>
      </div>
      
      <div className="">
        {slicedProducts.map((product) => (
          <RecomendedProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
