import Image from "next/image";
import { useCartStore } from "../../stores/useCartStore";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useAuthStore } from "../../stores/useAuthStore";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Head from "next/head";

type Props = {};

const Cart = (props: Props) => {
  const {
    cart,
    total,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();
  const { userStore } = useAuthStore();
  const router = useRouter();

  if (cart.length === 0)
    return (
      <div className="h-full min-h-[521px]">
        <p className="text-2xl font-bold">Your cart is empty</p>
      </div>
    );

  const handleConfirmOrder = async () => {
    const res = await fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify({
        products: cart,
        total,
        address: userStore.address,
      }),
    });

    if (!res.ok) {
      toast.error("Something went wrong!");
      return;
    }

    clearCart();
    toast.success("Order placed successfully!");
    router.push("/orders");
  };

  return (
    <main>
      <Head>
        <title>Cart</title>
      </Head>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Total: <span className="text-primary">${total}</span>
          </h1>
          {userStore.id === "" && (
            <Link href="/signin">
              <button className="btn btn-error btn-outline">
                Login to confirm order
              </button>
            </Link>
          )}
          {userStore.id != "" && (
            <button
              className="btn btn-success btn-outline"
              disabled={total > userStore.balance!}
              onClick={handleConfirmOrder}>
              {total > userStore.balance!
                ? "Insufficient balance"
                : "Confirm Order"}
            </button>
          )}
        </div>
        <main className="bg-base-300 rounded-xl p-5 flex flex-col gap-10 mt-5">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex flex-col lg:flex-row justify-between items-center">
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
                    }}>
                    <Icon
                      icon="material-symbols:add"
                      className="w-8 h-8 hover:text-primary cursor-pointer transition duration-300 ease-in-out"
                    />
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    onClick={() => {
                      decreaseQuantity(product);
                    }}>
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
                  className="btn btn-primary btn-sm mt-3">
                  Remove from cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </main>
  );
};

export default Cart;
