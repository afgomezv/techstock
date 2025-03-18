import { CirclePlus } from "lucide-react";
import AddProductModal from "../components/products/AddProductModal";
import { useProduct } from "../hook/useProduct";
import ProductTable from "../components/products/ProductTable";

export default function ProductsView() {
  const { dispatch } = useProduct();

  return (
    <>
      <div className="max-w-6xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-xl">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-semibold text-gray-500">
            Gestión de Productos
          </h1>
          <button
            className="flex justify-evenly w-60 py-3 px-2 bg-blue-ocean hover:bg-blue-ice rounded-xl text-white text-xl  cursor-pointer items-center"
            onClick={() => dispatch({ type: "show-modal" })}
          >
            <div>
              <CirclePlus size={28} strokeWidth={1.5} />
            </div>
            Agregar Productos
          </button>
        </div>
        <ProductTable />
      </div>

      <AddProductModal />
    </>
  );
}
