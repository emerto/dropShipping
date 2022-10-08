import Navbar from "../components/Navbar";
import CartProducts from "../components/CartProducts";

const Cart = () => {
  const isEmpty = true;
  return (
    <div className="bg-black mt-24">
      <div>
        <Navbar />
      </div>
      <div className="text-primary ml-8 text-4xl font-semibold">
        <h1>Your Products</h1>
      </div>
      {isEmpty ? (
        <div>
          <h1>Empty</h1>
        </div>
      ) : (
        <div>
          <h1>Full</h1>
        </div>
      )}
      <div>
        <CartProducts />
      </div>
    </div>
  );
};

export default Cart;
