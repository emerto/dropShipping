import { useRouter } from "next/router";
import { useState } from "react";
import { Icon } from "@iconify/react";

type Props = {};

const Search = (props: Props) => {
  const [category, setCategory] = useState<string>("products");
  const [search, setSearch] = useState<string>("");

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = e.currentTarget.q.value;

    router.push(`/search?q=${search}&category=${category}`);

    setSearch("");
  };

  const toggleCategory = () => {
    if (category === "products") {
      setCategory("stores");
    } else {
      setCategory("products");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="relative block">
        <input
          className="input input-bordered w-full"
          placeholder={`${
            category === "products"
              ? "Search for Products"
              : "Search for Stores"
          }`}
          name="q"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          {category === "products" ? (
            <Icon
              icon="material-symbols:shopping-bag"
              className="text-2xl hover:cursor-pointer"
              onClick={toggleCategory}
            />
          ) : (
            <Icon
              icon="material-symbols:store"
              className="text-2xl hover:cursor-pointer"
              onClick={toggleCategory}
            />
          )}
        </span>
      </label>
    </form>
  );
};

export default Search;
