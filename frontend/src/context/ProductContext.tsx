import axios from "axios";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import Product from "../interfaces/Product";

type ProductProviderProps = {
  children: ReactNode;
};

type ProductContext = {
  products: Product[];
  // product: Product | undefined;
};

const ProductContext = createContext({} as ProductContext);

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await axios.get<Product[]>(`/product`);

      setProducts(response.data);

      // return cart;
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchProducts();
    // fetchProduct();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        // product,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
