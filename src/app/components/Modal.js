import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  actionAddToFavorites,
  actionEditImag,
  actionRemoveToFavorites,
} from "../slices/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { downloadImage } from "../Modules/functions";
import { ReactComponent as DownloadIcon } from "../../images/download.svg";
import { ReactComponent as IsSaveIcon } from "../../images/isSave.svg";
import { ReactComponent as NotSaveIcon } from "../../images/notSave.svg";
import { ReactComponent as ViewIcon } from "../../images/view.svg";
import {ReactComponent as LikeIcon} from '../../images/like.svg';

function Modal({ openModal, closeModal, imag, isOpen, setImg }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescripton] = useState("");

  const [filter, setFilter] = useState(favorites);

  useEffect(() => {
    setFilter(favorites);
    favorites.some((item) => {
      if (item.id === imag.id) {
        setImg(item);
      }
    });
  }, [favorites]);

  const editDescription = (e) => {
    e.preventDefault();

    //    const data = tar.title.value;
    //const data2 = target.description.value;
    console.log("form");
    console.log(description);
    console.log(title);

    dispatch(
      actionEditImag({
        id: imag.id,
        description: title,
        alt_description: description,
      })
    );
    setShow(false);
  };

  const isSave = () => {
    if (favorites.some((item) => item.id === imag.id)) {
      return (
        <IsSaveIcon
          key={imag && imag.id}
          className="h-10 w-10 rounded bg-black/60 fill-white p-1"
          onClick={() => dispatch(actionRemoveToFavorites(imag.id))}
        />
      );
    } else {
      console.log("is not matched");
      return (
        <NotSaveIcon
          key={imag && imag.id}
          className="h-10 w-10 rounded bg-black/60 fill-none stroke-white p-1"
          onClick={() => dispatch(actionAddToFavorites(imag))}
        />
      );
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
      <Dialog as="div" className="relative z-50 " onClose={closeModal}>
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 flex max-md:m-5 items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="mx-auto max-w-sm rounded-lg border-2 border-white  bg-white dark:bg-black">
              <figure className=" mb-3 grid grid-cols-3 justify-between gap-3 dark:text-white">
                <div className="relative col-span-full row-start-1">
                  {/* IMAGE */}
                  <img
                    className="rounded"
                    src={imag && imag.urls.regular}
                    alt={imag && imag.alt}
                  />
                  {/* BUTTON TO SAVE */}
                  <div className="absolute right-5 bottom-5" role="button">
                    {favorites && isSave(imag)}
                  </div>
                </div>

                {/* FORM EDIT TITLE */}
                {show ? (
                  <form
                    className="opacity-1 col-start-1 row-span-3 row-start-2 ml-3 w-full transition-all"
                    onSubmit={editDescription}
                  >
                    <input
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      name="description"
                      className="my-2"
                      onChange={(e) => setDescripton(e.target.value)}
                    />

                    <button className="mb-10 rounded bg-slate-600 py-1 px-2 text-white">
                      Save
                    </button>
                  </form>
                ) : (
                  <>
                    <figcaption className="col-span-2 col-start-1 ml-3 inline-flex gap-x-3 font-serif text-xl">
                      {imag.description ? imag.description : "No named"}

                      {/* EDIT BUTTON */}
                      <svg
                        role="button"
                        onClick={() => setShow(!show)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg>
                    </figcaption>
                    <p className="col-span-2 col-start-1 ml-3 w-full">
                      {imag.alt_description
                        ? imag.alt_description
                        : "No description"}
                    </p>
                  </>
                )}

                {/* Width y Height */}
                <span className="col-start-1 col-end-2 row-start-4 ml-3">
                  Width: {imag.width}
                </span>
                <span className="col-start-1 col-end-2 row-start-5 ml-3">
                  Height: {imag.height}
                </span>

                {/* DOWNLOAD IMAGE */}
                <DownloadIcon
                  role="button"
                  onClick={() => downloadImage(imag)}
                  className="mr-5 col-start-3 row-start-2 h-6 w-6 justify-self-end dark:text-white"
                />
                {/* LIKES */}
                <div className="mr-5 col-start-3 row-start-3 gap-x-3 inline-flex place-self-end text-black dark:text-white">
                  
                  <span className="inline w-fit">{imag.likes && imag.likes}</span>
                  <LikeIcon className="inline w-6" />
                </div>
                {/* VIEWS */}
                <div className="mr-5 col-start-3 row-start-4 gap-x-3 inline-flex place-self-end text-black dark:text-white">
                  
                  <span className="inline w-fit">
                    {imag.views && imag.views}
                  </span>
                  <ViewIcon className="inline w-6" />
                </div>
              </figure>
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
