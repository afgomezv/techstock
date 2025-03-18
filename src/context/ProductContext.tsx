import { useReducer, createContext, ReactNode } from "react";
import {
  initialState,
  ProductAction,
  productReducer,
  ProductState,
} from "../reducer/product-reducer";

type ProductContextProps = {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
};

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductContext = createContext<ProductContextProps>(null!);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
