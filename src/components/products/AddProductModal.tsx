import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useProduct } from "../../hook/useProduct";
import ProductForm from "./ProductForm";

export default function AddProductModal() {
  const { state, dispatch } = useProduct();
  return (
    <>
      <Transition appear show={state.isShow} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch({ type: "close-modal" })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-12 text-gray-500 space-y-4">
                  <Dialog.Title as="h3" className="font-black text-4xl">
                    Crear Producto
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Deligencia el formulario y crea un{" "}
                    <span className="text-blue-ocean">producto</span>
                  </p>
                  <ProductForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
