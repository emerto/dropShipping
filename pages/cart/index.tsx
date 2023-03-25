import Image from "next/image";
import { useCartStore } from "../../stores/useCartStore";
import { Icon } from "@iconify/react";

type Props = {};

const Cart = (props: Props) => {
  const { cart, total, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartStore();

  if (cart.length === 0)
    return <p className="text-2xl font-bold">Your cart is empty</p>;

  return (
    <div>
      <p>Total: {total}</p>

      <main className="bg-base-300 rounded-xl p-5 flex flex-col gap-10">
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex flex-col lg:flex-row justify-between items-center"
          >
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-center">
              <Image
                src={product.supplier_prod_image}
                width={200}
                height={200}
                alt={product.name}
                className="rounded-md object-cover lg:h-40 lg:w-40 w-full"
              />
              <div className="flex flex-col">
                <p className="text-lg font-bold">{product.name}</p>
                <p className="text-md text-primary">${product.price}</p>
              </div>
            </div>
            <div className="flex lg:flex-col w-full lg:w-fit justify-between">
              <div className="flex gap-2 items-center justify-center lg:flex-col">
                <button
                  onClick={() => {
                    increaseQuantity(product);
                  }}
                >
                  <Icon
                    icon="material-symbols:add"
                    className="w-8 h-8 hover:text-primary cursor-pointer transition duration-300 ease-in-out"
                  />
                </button>
                <p>{product.quantity}</p>
                <button
                  onClick={() => {
                    decreaseQuantity(product);
                  }}
                >
                  <Icon
                    icon="material-symbols:remove"
                    className="w-8 h-8 hover:text-primary cursor-pointer transition duration-300 ease-in-out"
                  />
                </button>
              </div>
              <button
                onClick={() => {
                  removeFromCart(product);
                }}
                className="btn btn-primary btn-sm mt-3"
              >
                Remove from cart
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Cart;
