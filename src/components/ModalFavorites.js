import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  actionAddToFavorites,
  actionEditImag,
  actionRemoveToFavorites,
} from "../slices/favoriteSlice";
import { useDispatch } from "react-redux";

function Modal({ openModal, closeModal, imag, isOpen }) {
  const dispatch = useDispatch();

  const editDescription = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = target.input.value;
    console.log(imag.id);
    dispatch(
      actionEditImag({
        id: imag.id,
        description: data,
      })
    );
  };

  return (
    <Transition
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
              <img
                className="flex  justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
                src={imag && imag.urls.regular}
                alt={imag && imag.alt}
              />
              <form className="mt-5" onSubmit={editDescription}>
                <input name="input" />
                <button>Guardar</button>
              </form>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default Modal;

/*



*/
