import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionRemoveToFavorites } from "../slices/favoriteSlice";
import {
  actionFilterFecha,
  actionFilterLikes,
  actionFilterSearch,
} from "../slices/filterSlice";
import ModalFavorites from "../components/ModalFavorites";
import Header from "./Header";

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
    setFilter(
      filter.slice().sort((a, b) => b.fecha - a.fecha )
    )
  };

  const filtrarLikes = () => {
    setFilter(
      filter.slice().sort((a, b) => a.likes - b.likes)
    )
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

  //EDITAR DESCRIPTION
  

  const consol = () => {
    console.log(
      filter.map((item) => console.log(item.likes))
    );
  };
  return (
    <>
    <Header buscador={searchFavorites}/>
    <main className="mt-20 h-full bg-white dark:bg-black">
      <ModalFavorites
        openModal={openModal}
        closeModal={closeModal}
        imag={imag}
        isOpen={isOpen}
      />
      <form onSubmit={searchFavorites} className="ml-2 flex gap-5">
        <input name="inputSearch"></input>
        <button>Search</button>
      </form>
      <button
        className="m-2 rounded bg-gray-300 p-2 dark:bg-gray-600 dark:text-white"
        onClick={consol}
      >
        mostrar log de favorites
      </button>
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
      <section className="w-full gap-0 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
        {filter &&
          filter.map((item, index) => {
            //console.log(item);
            return (
              <figure className="relative" key={index}>
                <img
                  id={item.id}
                  name="photo"
                  className="object-cover p-2"
                  src={item.urls.regular}
                  alt={item.title}
                  onClick={() => openModal(item)}
                />
                <a download href={item.urls.regular}>
                  Descargar
                </a>
                <figcaption className="absolute bottom-3 left-3 rounded bg-white p-2">
                  {item.description ? item.description : "undefined"}
                  <span>-{item.likes}</span>
                </figcaption>

                <button
                  id={item.id}
                  onClick={deletePhoto}
                  className="absolute bottom-3 right-3"
                >
                  Borrar
                </button>
              </figure>
            );
          })}
      </section>
    </main>
    </>
  );
}

export default Favorites;
