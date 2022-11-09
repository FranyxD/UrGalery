import React, {useState} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

function Modal({openModal, closeModal, imag, isOpen}) {
    

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
        <Dialog as="div" className="fixed inset-1/3 z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Dialog.Panel className="w-full max-w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <div className="w-full">
              <img
                className="flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
                src={imag.src}
                alt={imag.alt}
              />
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    )
}

export default Modal;