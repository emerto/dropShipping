import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "../stores/useAuthStore";
import { supabaseClient } from "../utils/supabaseBrowserClient";
import { useState } from "react";

import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../stores/useCartStore";
import Footer from "./Footer";
import Search from "./Search";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenHandler = () => setIsOpen(!isOpen);
  const { userStore } = useAuthStore();
  const { cart, total } = useCartStore();
  const router = useRouter();
  const user = useUser();

  const navToCart = () => {
    router.push("/cart");
  };

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    useAuthStore.setState({
      userStore: {
        address: "",
        phone_number: "",
        username: "",
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        avatar_url: "",
        balance: 0,
        updated_at: "",
      },
      storeId: null,
    });
    router.push("/");
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className={"drawer-toggle"}
        onChange={isOpenHandler}
      />
      <div className="drawer-content flex flex-col">
        <div className="w-full min-h-[100px] navbar bg-base-300 lg:px-44 p-5">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <Icon
                icon="heroicons:bars-3-center-left-solid"
                className={"w-6 h-6"}
              />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={200} height={200} />
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="flex flex-row gap-3 items-center">
              <li>
                <div className="min-w-[300px]">
                  <Search />
                </div>
              </li>
              <li>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <Icon
                        icon="ic:baseline-shopping-cart"
                        className="w-6 h-6"
                      />
                      <span className="badge badge-sm indicator-item">
                        {cart.length}
                      </span>
                    </div>
                  </label>
                  <div
                    tabIndex={0}
                    className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                    <div className="card-body">
                      <span className="font-bold text-lg">
                        {cart.length} Items
                      </span>
                      <span className="text-info">Subtotal: ${total}</span>
                      <div className="card-actions">
                        <button
                          className="btn btn-primary btn-block"
                          onClick={navToCart}>
                          View cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              {user ? (
                <>
                  <li>
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                          {userStore.avatar_url ? (
                            <Image
                              src={`${userStore.avatar_url}`}
                              alt="Profile Avatar"
                              width={300}
                              height={300}
                            />
                          ) : (
                            <img src="https://i.imgur.com/6S4ZQYg.png" />
                          )}
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                          <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                          <Link href="/orders">Orders</Link>
                        </li>
                        <li>
                          <Link href="/recivedOrders">Recived Orders</Link>
                        </li>
                        <li>
                          <Link href="/manageStore">Manage Store</Link>
                        </li>
                        <li onClick={signOut}>
                          <a>Sign Out</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-row items-center">
                      <Icon
                        icon="ri:money-dollar-circle-fill"
                        className="w-6 h-6 text-primary"
                      />
                      <p>{userStore?.balance}</p>
                    </div>
                  </li>
                </>
              ) : (
                <li className="flex gap-3">
                  <Link href="/signin">
                    <div className="btn btn-primary">Sign In</div>
                  </Link>
                  <Link href="/signup">
                    <div className="btn ">Sign Up</div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* Content */}
        <main>
          <div className="h-full w-full xl:container mx-auto mt-8 px-4">
            {children}
          </div>
          <Footer />
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay" />
        {user ? (
          <ul className="flex flex-col gap-5 p-4 w-80 bg-base-100">
            <label
              htmlFor="my-drawer-3"
              className="btn btn-square btn-ghost absolute top-7 right-4">
              <Icon icon="material-symbols:close-rounded" className="w-6 h-6" />
            </label>
            <li className="flex flex-row py-2 border-b-2 border-primary gap-3 items-center">
              <label tabIndex={0} className="avatar">
                <div className="w-12 rounded-full">
                  {userStore.avatar_url ? (
                    <Image
                      src={`${userStore.avatar_url}`}
                      alt="Profile Avatar"
                      width={300}
                      height={300}
                    />
                  ) : (
                    <img src="https://i.imgur.com/6S4ZQYg.png" />
                  )}
                </div>
              </label>
              <div className="flex flex-col">
                <p className="text-xl font-bold">
                  {userStore?.first_name + " " + userStore?.last_name}
                </p>
                <div className="flex flex-row items-center">
                  <Icon
                    icon="ri:money-dollar-circle-fill"
                    className="w-6 h-6 text-primary"
                  />
                  <p className="text-sm">{userStore?.balance}</p>
                </div>
              </div>
            </li>
            <li>
              <Link href="/profile" className="btn p-4 w-full">
                <div className="flex items-center  h-full">
                  Profile
                  <Icon icon="carbon:user-avatar" className="w-6 h-6 ml-1" />
                </div>
              </Link>
            </li>
            <li>
              <div
                className="btn flex items-center justify-center h-full"
                onClick={() => {
                  router.push("/cart");
                }}>
                Cart
                <Icon
                  icon="ic:baseline-shopping-cart"
                  className="w-6 h-6 ml-1"
                />
              </div>
            </li>
            <li>
              <Link href="/recivedOrders" className="btn p-4 w-full">
                <div className="flex items-center  h-full">
                  Recived Orders
                  <Icon
                    icon="mdi:clipboard-check-multiple-outline"
                    className="w-6 h-6 ml-1"
                  />
                </div>
              </Link>
            </li>
            <li>
              <Link href="/orders" className="btn p-4 w-full">
                <div className="flex items-center h-full">
                  Orders
                  <Icon icon="heroicons:arrow-path" className="w-6 h-6 ml-1" />
                </div>
              </Link>
            </li>
            <li>
              <Link href="/manageStore" className="btn p-4 w-full">
                <div className="flex items-center h-full">
                  Manage Store
                  <Icon icon="mdi:store-edit" className="w-6 h-6 ml-1" />
                </div>
              </Link>
            </li>
            <li className="btn p-4" onClick={signOut}>
              <div className="flex items-center h-full">
                Sign Out
                <Icon icon="mdi:sign-out" className="w-6 h-6 ml-1" />
              </div>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col gap-5 p-4 w-80 bg-base-100">
            <li>
              <Link href="/signin" className="btn p-4 w-full">
                <div className="flex items-center  h-full">Sign In</div>
              </Link>
            </li>
            <li>
              <Link href="/signup" className="btn p-4 w-full btn-primary">
                <div className="flex items-center  h-full">Sign Up</div>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
