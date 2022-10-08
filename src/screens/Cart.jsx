import ProductCard from "../components/ProductCard";

const Cart = () => {
  const isEmpty = false;
  return (
    <div>
      {isEmpty ? (
        <div>
          <h1>Empty</h1>
        </div>
      ) : (
        <div>
          <h1>Full</h1>
        </div>
      )}
    </div>
  );
};

export default Cart;
