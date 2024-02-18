import prisma from "@/lib/db/prisma";
import { productFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";


async function filterShop(formData: FormData) {
  "use server"

  const values = Object.fromEntries(formData.entries());

  const {q, category, size, brand} = productFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(category && { category}),
    ...(size && { size}),
    ...(brand && { brand}),
  });

  redirect(`/search/?${searchParams.toString()}`);
}

export default async function HeroFilterSidebar() {

  const distinctCategory = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"]
  }).then(categories =>
    categories.map(({ category }) => category).filter(Boolean)
  ) as string[];

  const distinctSize = await prisma.product.findMany({
    select: {size: true},
    distinct: ["size"]
  }).then(sizes => 
    sizes.map(({size}) => size).filter(Boolean)
    ) as string[];

    const distinctBrand = await prisma.product.findMany({
      select: { brand: true },
      distinct: ["brand"]
    }).then(brands =>
      brands.map(({ brand }) => brand).filter(Boolean)
    ) as string[];


  return (
    <aside className=" h-fit rounded-lg border bg-background p-4 md:w-[260px] my-4">
      <form action={filterShop}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="" htmlFor="q">
              Search
            </label>
            <input
              className="input input-bordered border-secondary"
              id="q"
              name="q"
              placeholder="Name, category, size..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="" htmlFor="category">
              Category
            </label>
            <select
              className="select select-bordered"
              id="category"
              name="category"
              defaultValue=""
            >
              <option value="">All category</option>
              {distinctCategory.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="" htmlFor="size">
              Size
            </label>
            <select className="select select-bordered" id="size" defaultValue="" name="size">
              <option value="">All size</option>
              {distinctSize.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="" htmlFor="size">
              Brand
            </label>
            <select className="select select-bordered" defaultValue="" id="brand" name="brand">
              <option value="">All brands</option>
              {distinctBrand.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-ghost rounded-lg bg-secondary p-2 m-auto w-full hover:bg-primary">
            Filter Produts
          </button>
        </div>
      </form>
    </aside>
  );
}
