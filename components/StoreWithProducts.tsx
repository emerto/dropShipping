import { Database } from "../types/supabase";
import ProductCard from "./ProductCard";
import Image from "next/image";
import Link from "next/link";

type store = Database["public"]["Tables"]["stores"]["Row"];
type products = Database["public"]["Tables"]["products"]["Row"];

type Props = {
  storeWithProducts: store & { products: products[] };
};

const StoreWithProducts = ({ storeWithProducts }: Props) => {
  return (
    <div className="flex items-center bg-base-300 p-5 rounded-xl shadow-2xl">
      {/* Left */}
      <Link href={`/store/${storeWithProducts.store_name}`} scroll={true}>
        <div className="flex min-w-[300px] flex-col">
          <Image
            src={
              storeWithProducts.store_image
                ? storeWithProducts.store_image
                : "https://via.placeholder.com/400"
            }
            alt="store image"
            width={300}
            height={300}
            className="object-cover"
          />
          <h1 className="text-2xl font-bold text-center p-1">
            {storeWithProducts.store_name}
          </h1>
        </div>
      </Link>
      {/* Right */}
      <div className="hidden lg:grid grid-rows-1 grid-cols-3 gap-5 place-items-center ml-0 lg:ml-10">
        {storeWithProducts.products.map((product) => (
          <ProductCard key={product.id} product={product} edit={false} />
        ))}
      </div>
    </div>
  );
};

export default StoreWithProducts;
