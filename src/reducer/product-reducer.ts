import { Product } from "../types";

export type ProductAction =
  | { type: "add-product"; payload: { product: Product } }
  | {
      type: "sort-products";
      payload: { field: keyof Product; order: "asc" | "desc" };
    }
  | { type: "delete-product"; payload: { code: Product["code"] } }
  | { type: "show-modal" }
  | { type: "close-modal" };

export type ProductState = {
  products: Product[];
  isShow: boolean;
};

export const initialProduct = (): Product[] => {
  const products = localStorage.getItem("products");
  return products
    ? JSON.parse(products).map((p: Product) => ({
        ...p,
        code: Number(p.code),
        quantity: Number(p.quantity),
        createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
      }))
    : [];
};

export const initialState: ProductState = {
  products: initialProduct(),
  isShow: false,
};

export const productReducer = (
  state: ProductState = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "add-product": {
      const products = [...state.products, action.payload.product];

      const updatedProduct = products.map((p: Product) => ({
        ...p,
        code: Number(p.code),
        quantity: Number(p.quantity),
        createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
      }));

      localStorage.setItem("products", JSON.stringify(updatedProduct));

      return {
        ...state,
        products: updatedProduct,
      };
    }

    case "sort-products": {
      const { field, order } = action.payload;

      const sortedProducts = [...state.products].sort((a, b) => {
        console.log(state.products);

        const aValue = a[field];
        const bValue = b[field];

        if (field === "createdAt") {
          return order === "asc"
            ? new Date(aValue!).getTime() - new Date(bValue!).getTime()
            : new Date(bValue!).getTime() - new Date(aValue!).getTime();
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "asc" ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });

      localStorage.setItem("products", JSON.stringify(sortedProducts));

      return { ...state, products: sortedProducts };
    }
    case "delete-product":
      const filteredProducts = state.products.filter(
        (product) => product.code !== action.payload.code
      );
      localStorage.setItem("products", JSON.stringify(filteredProducts));

      return {
        ...state,
        products: filteredProducts,
      };

    case "show-modal":
      return { ...state, isShow: true };
    case "close-modal":
      return { ...state, isShow: false };
    default:
      return state;
  }
};
