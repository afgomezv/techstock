import { useForm } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import { Product } from "../../types";
import { CirclePlus } from "lucide-react";
import { useProduct } from "../../hook/useProduct";
import { toast } from "react-toastify";

const initialValues: Product = {
  code: null,
  name: "",
  description: "",
  quantity: null,
  createdAt: new Date(),
};

export default function ProductForm() {
  const { dispatch } = useProduct();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: initialValues,
  });

  const handleCreateProduct = (product: Product) => {
    dispatch({ type: "add-product", payload: { product } });
    toast.success("Producto creado correctamente");
    reset();
    dispatch({ type: "close-modal" });
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleCreateProduct)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="flex flex-col gap-2">
          <label className="font-normal text-xl" htmlFor="code">
            Código
          </label>
          <input
            id="code"
            type="text"
            className="w-full p-3 bg-gray-100  border-gray-300 border rounded-lg outline-blue-ocean"
            {...register("code", {
              required: "El código es requerido",
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "El código solo puede contener letras y números",
              },
            })}
          />
          {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-normal text-xl" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            className="w-full p-3 bg-gray-100  border-gray-300 border rounded-lg outline-blue-ocean"
            {...register("name", {
              required: "El nombre es requerido",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede tener más de 50 caracteres",
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="font-normal text-xl" htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            className="w-full p-3 bg-gray-100  border-gray-300 border rounded-lg outline-blue-ocean"
            {...register("description", {
              required: "La descripción es requerida",
              minLength: {
                value: 5,
                message: "La descripción debe tener al menos 10 caracteres",
              },
              maxLength: {
                value: 200,
                message: "La descripción no puede tener más de 200 caracteres",
              },
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-normal text-xl" htmlFor="quantity">
            Cantidad
          </label>
          <input
            id="quantity"
            type="text"
            className="w-full p-3 bg-gray-100  border-gray-300 border rounded-lg outline-blue-ocean"
            {...register("quantity", {
              required: "La cantidad es requerida",
              min: {
                value: 1,
                message: "La cantidad debe ser un número entero positivo",
              },
            })}
          />
          {errors.quantity && (
            <ErrorMessage>{errors.quantity.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-normal text-xl" htmlFor="createdAt">
            Fecha de creación
          </label>
          <input
            id="createdAt"
            type="date"
            className="w-full p-3 bg-gray-100  border-gray-300 border rounded-lg outline-blue-ocean"
            {...register("createdAt", {
              required: "La fecha de creación es requerida",
              pattern: {
                value: /^(\d{4})-(\d{2})-(\d{2})$/,
                message:
                  "La fecha de creación debe estar en el formato AAAA-MM-DD",
              },
            })}
          />
          {errors.createdAt && (
            <ErrorMessage>{errors.createdAt.message}</ErrorMessage>
          )}
        </div>
        <button className="col-span-2 w-full flex justify-center py-3 px-2 bg-blue-ocean hover:bg-blue-ice rounded-xl text-white text-xl  cursor-pointer items-center mt-2">
          <div className="px-4">
            <CirclePlus size={28} strokeWidth={1.5} />
          </div>
          Crear Productos
        </button>
      </div>
    </form>
  );
}
