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
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
