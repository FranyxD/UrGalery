import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {actionAddFavorite} from '../reducers/favoriteReducer';

function Home() {
  const galery = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [valor, setValor] = useState("");
  const [resultados, setResultados] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imag, setImg] = useState("");

  //buscador sin react
  /*
  const buscarResultados = async () => {
    const API_KEY = "UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI";
    const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${valor}&per_page=20`;

    const response = await fetch(URL);
    const data = await response.json();
    setResultados(data.results);
    console.log(data);
  };
  */

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(e) {
    setIsOpen(true);
    setImg(e.target);
  }

  function saveToFavorites(e) {
    setImg(e.target);
    dispatch(actionAddFavorite(imag.src))
    console.log(imag.src)
  }

  return (
    <main className="my-24">
      {/*
    <nav>
        <input
          className=" bg-white shadow-xl"
          type="text"
          onChange={(e) => setValor(e.target.value)}
        />
        <button
          className=" bg-white shadow-xl dark:bg-black dark:text-white"
          onClick={() => buscarResultados()}
        >
          Search
        </button>
      </nav>  

      <section className="w-full gap-0 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
        {resultados.map((item, index) => {
          console.log(item);
          return (
            <img
              className="cursor-pointer object-cover p-2"
              key={index}
              src={item.urls.regular}
              onClick={openModal}
            />
          );
        })}
      </section>
  */}

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
      <section className="w-full gap-0 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
        {galery.map((item, index) => {
          return (
            <figure key={index} className='relative'>
              <button onClick={() => saveToFavorites(imag.src)} className='absolute left-5 top-3 bg-gray shadow-md'>Guardar</button>
              <img
              className="object-cover p-2"
              src={item.urls.regular}
              onClick={openModal}
              alt={item.alt_description}
            />
            </figure>
          );
        })}
      </section>
    </main>
  );
}
export default Home;
