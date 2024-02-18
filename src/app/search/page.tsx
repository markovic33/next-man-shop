import ProductCard from "@/components/ProductCart";
import prisma from "@/lib/db/prisma"

interface SearchPageProps {
    searchParams: {q: string, category: string, size: string, brand: string}
}

export default async function SearchPage({searchParams: {q, category, brand, size}}: SearchPageProps) {
    const products = await prisma?.product.findMany({
        where: {
            AND: [
                {name: {contains: q, mode: "insensitive"}},
                {description: {contains: q, mode: "insensitive"}},
                {category},
                {brand},
                {size},    
            ],
           
        
        }
    });

    if(products.length === 0) {
        return <div className="text-center">No Products Found</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    )
}
