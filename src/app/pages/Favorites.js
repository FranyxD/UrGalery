import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddToFavorites,
  actionRemoveToFavorites,
} from "../slices/favoriteSlice";
import Modal from "../components/Modal";
import Header from "../components/Header";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [isOpen, setIsOpen] = useState(false);
  const [imag, setImg] = useState("");

  //MODAL
  function closeModal() {
    setIsOpen(false);
  }

  const openModal = (item) => {
    setIsOpen(true);
    setImg(item);
  };

  //hacer useselector para quitar el subscribe
  const [filter, setFilter] = useState(favorites);
  useEffect(() => {
    setFilter(favorites);
  }, [favorites]);

  //FILTROS
  const searchFavorites = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = target.buscador.value;

    setFilter(
      filter.filter((item, index) => {
        console.log("estado actual", filter);
        console.log("//action: ", data);
        if (item.description === null) {
          console.log("descripcion es null");
          return filter;
        } else {
          if (data.search(item.description) !== -1) {
            console.log("coincide");
          }
          //item.title.search(action.payload.title)
          return item.description.search(data) !== -1;
        }
      })
    );
  };

  const filtrarFecha = () => {
    //usar setFilter
    setFilter(filter.slice().sort((a, b) => b.fecha - a.fecha));
  };

  const filtrarLikes = () => {
    setFilter(filter.slice().sort((a, b) => a.likes - b.likes));
  };

  const deletePhoto = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = target.id;
    favorites.filter((item) => {
      if (item.id === data) {
        return dispatch(actionRemoveToFavorites(item.id));
      }
    });
  };

  //mirar si esta guardado
  //mirar si esta guardado
  const isSave = (imag) => {
    if (favorites.some((item) => item.id === imag.id)) {
      return (
        <svg
          key={imag && imag.id}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-10 w-10 rounded bg-black/60 fill-white p-1"
          onClick={() => dispatch(actionRemoveToFavorites(imag.id))}
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      console.log("is not matched");
      return (
        <svg
          key={imag && imag.id}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-10 w-10 rounded bg-black/60 stroke-white p-1"
          onClick={() => dispatch(actionAddToFavorites(imag.id))}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      );
    }
  };

  return (
    <>
      <Header buscador={searchFavorites} />
      <main className="mt-20 h-full bg-white dark:bg-black">
        <Modal
          openModal={openModal}
          closeModal={closeModal}
          imag={imag}
          isOpen={isOpen}
        />
        <button
          className="m-2 rounded bg-gray-300 p-2 dark:bg-gray-600 dark:text-white"
          onClick={() => filtrarFecha()}
        >
          filtrar por fecha
        </button>
        <button
          className="m-2 rounded bg-gray-300 p-2 dark:bg-gray-600 dark:text-white"
          onClick={() => filtrarLikes()}
        >
          filtrar por likes
        </button>
        <section className="w-full px-2 py-3 m-0 columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
          {filter &&
            filter.map((item, index) => {
              //console.log(item);
              return (
                <figure
                  className="relative p-3"
                  key={index}
                >
                  <img
                    id={item.id}
                    name="photo"
                    className="object-cover rounded-xl "
                    src={item.urls.regular}
                    alt={item.title}
                    onClick={() => openModal(item)}
                  />
                  <div className="absolute right-5 bottom-5" role="button">
                    {favorites && isSave(item)}
                  </div>

                  {/*<button
                  id={item.id}
                  onClick={deletePhoto}
                  className="absolute bottom-3 right-3"
                >
                  Borrar
                </button>*/}
                </figure>
              );
            })}
        </section>
      </main>
    </>
  );
}

export default Favorites;
