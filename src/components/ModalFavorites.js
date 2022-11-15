import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  actionAddToFavorites,
  actionEditImag,
  actionRemoveToFavorites,
} from "../slices/favoriteSlice";
import editLogo from "../images/edit.svg";
import { useDispatch, useSelector } from "react-redux";

function Modal({ openModal, closeModal, imag, isOpen }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

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

  const downloadImage = () => {
    const src = imag.urls.regular;
    const img = new Image();
    img.crossOrigin = "anonymous"; // This tells the browser to request cross-origin access when trying to download the image data.
    // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#Implementing_the_save_feature
    img.src = src;
    img.onload = () => {
      // create Canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      // create a tag
      const a = document.createElement("a");
      a.download = "download.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  };

  const closeEdit = () => {};

  const isSave = () => {
    if(favorites.some((item) => item.id === imag.id)){
      return (
        <svg
          key={imag.id}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute bottom-10 right-6 h-10 w-10 rounded bg-black/60 fill-black p-1"
          onClick={() => dispatch(actionRemoveToFavorites(imag.id))}
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
            clipRule="evenodd"
          />
        </svg>
      );
    }else {
      console.log('is not matched')
    }
    
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
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
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
            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white dark:bg-black">
              <figure className="grid grid-cols-3 justify-between  gap-x-5">
                <div className="relative col-span-full">
                  <img
                    className=" mb-5 rounded"
                    src={imag && imag.urls.regular}
                    alt={imag && imag.alt}
                  />
                  {imag && isSave()}
                </div>
                <figcaption className="col-start-1 col-end-2 ml-5 mb-3">
                  <h2 className="font-serif text-xl">
                    {imag.alt_description ? imag.alt_description : "No named"}
                  </h2>
                  <p className="from-neutral-400">
                    {imag.description ? imag.description : "No description"}
                  </p>
                </figcaption>
                <div className="col-start-3 mr-5 justify-self-end">
                  <svg
                    role="button"
                    onClick={downloadImage}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 dark:stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  <span>{imag.likes && imag.likes}</span>
                </div>
              </figure>

              <Dialog as="div" onClose={closeModal}>
                <form className="mt-5" onSubmit={editDescription}>
                  <input name="input" />
                  <button>Guardar</button>
                </form>
              </Dialog>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default Modal;

/*


                        <svg
                          key={item.id}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="absolute bottom-10 right-6 h-10 w-10 rounded bg-black/60 stroke-white p-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          />
                        </svg>


*/
