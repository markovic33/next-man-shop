import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";


export const metadata = {
  title: "Add Product - Man Shop",
};

async function addProduct(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
if(!session) {
  redirect("/api/auth/signin?callbackUrl=/add-product");
}

  const name = formData.get("name")?.toString();
  const brand = formData.get("brand")?.toString();
  const category = formData.get("category")?.toString();
  const description = formData.get("description")?.toString();
  const imgUrl = formData.get("imgUrl")?.toString();
  const size = formData.get("size")?.toString();
  const price = Number(formData.get("price") || 0);

  if (
    !name ||
    !description ||
    !brand ||
    !category ||
    !imgUrl ||
    !size ||
    !price
  ) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, brand, category, description, imgUrl, size, price },
  });

  redirect("/add-product");
}

export default async function AddProductPage() {

const session = await getServerSession(authOptions);
if(!session) {
  redirect("/api/auth/signin?callbackUrl=/add-product");
}

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-neutral my-3 text-2xl font-semibold items-center">
        Add Product
      </h1>
      <form action={addProduct} className=" max-w-3xl ">
        <input
          className="mb-3 w-full input input-bordered"
          required
          name="name"
          placeholder="Name"
        />
        <textarea
          className="mb-3 w-full textarea textarea-bordered"
          required
          name="description"
          placeholder="Description"
        />
        <input
          className="mb-3 w-full input input-bordered"
          required
          name="brand"
          placeholder="Brand"
        />
        <input
          className="mb-3 w-full input input-bordered"
          required
          name="category"
          placeholder="Category"
        />
        <input
          className="mb-3 w-full input input-bordered"
          required
          name="size"
          placeholder="Size"
        />
        <input
          className="mb-3 w-full input input-bordered"
          required
          name="price"
          placeholder="Price"
          type="number"
        />
        <input
          className="mb-3 w-full input input-bordered"
          required
          name="imgUrl"
          placeholder="ImgUrl"
          type="url"
        />
        <FormSubmitButton className="btn-block">Add product</FormSubmitButton>
      </form>
    </div>
  );
}
