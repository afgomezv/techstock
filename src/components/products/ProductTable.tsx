import { useState } from "react";
import { useProduct } from "../../hook/useProduct";
import { Product } from "../../types";
import { Trash2 } from "lucide-react";

export default function ProductTable() {
  const { state, dispatch } = useProduct();
  const { products } = state;

  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Product) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    dispatch({ type: "sort-products", payload: { field, order: newOrder } });
  };

  return (
    <>
      {!products.length ? (
        <h1 className="text-center text-xl p-12 text-gray-400">
          No hay productos agregados aún
        </h1>
      ) : (
        <div className="p-6">
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                {["code", "name", "quantity", "createdAt"].map((field) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field as keyof Product)}
                    className="p-3 text-left cursor-pointer hover:bg-gray-300 transition"
                  >
                    {field.toUpperCase()}{" "}
                    {sortField === field
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                ))}
                <th className="p-3 text-left uppercase">Descripción</th>
                <th className="p-3 text-left uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.code}
                  className="border-t border-gray-300 hover:bg-gray-100 transition"
                >
                  <td className="p-3">{product.code}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.quantity}</td>
                  <td className="p-3">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString()
                      : "Fecha no disponible"}
                  </td>
                  <td className="p-3">{product.description}</td>
                  <td className="flex justify-center">
                    <button
                      className="p-3 text-red-400 hover:text-red-600 cursor-pointer"
                      onClick={() =>
                        dispatch({
                          type: "delete-product",
                          payload: { code: product.code },
                        })
                      }
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
