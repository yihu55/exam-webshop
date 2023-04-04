import { useState } from "react";
import ProductList from "../components/ProductList";
import SearchProduct from "../components/SearchProduct";
import { useProduct } from "../context/ProductContext";

export default function Home() {
  const [error, setError] = useState<string>(
    "something wrong when fetching products"
  );
  const { products } = useProduct();

  return (
    <>
      <SearchProduct />
      {products ? <ProductList products={products} /> : <p>{error}</p>}
    </>
  );
}
