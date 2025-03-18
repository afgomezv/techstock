import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductContext debe usarse con el ProductProvider");
  }

  return context;
};
