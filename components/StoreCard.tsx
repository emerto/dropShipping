import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Database } from "../types/supabase";

type storeType = Database["public"]["Tables"]["stores"]["Row"];

type Props = {
  store: storeType;
};

const StoreCard = ({ store }: Props) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="max-h-[300px]">
        <Image
          src={`${store.store_image || "https://via.placeholder.com/400"}`}
          alt={store.store_name}
          className="w-full object-cover bg-gray-300/10"
          width={500}
          height={500}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{store.store_name}</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <Icon icon="mdi:address-marker" className="text-primary w-6 h-6" />
            <p>{store.store_address}</p>
          </div>
          <div className="flex items-center">
            <Icon icon="mdi:phone" className="text-primary w-6 h-6" />
            <p>{store.store_phone}</p>
          </div>
        </div>

        <div className="card-actions justify-end">
          <Link href={`/store/${store.store_name}`} className="btn btn-primary">
            View Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
