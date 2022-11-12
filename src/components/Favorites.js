import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionRemoveToFavorites } from "../slices/favoriteSlice";
import {
  actionFilterFecha,
  actionFilterLikes,
  actionFilterSearch,
} from "../slices/filterSlice";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  //hacer useselector para quitar el subscribe

  const [filter, setFilter] = useState(favorites);
  useEffect(() => {
    
    

  }, [favorites]);

  const filtrarFecha = () => {
    //usar setFilter
    dispatch(actionFilterFecha());
  };

  const filtrarLikes = () => {
    dispatch(actionFilterLikes());
  };

  const searchFavorites = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = target.inputSearch.value;
    console.log("data search", data);
    dispatch(actionFilterSearch(data));
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

  const consol = () => {
    console.log(
      favorites.sort(
        (a, b) => new Date(a.fecha).getTime() > new Date(b.fecha).getTime()
      )
    );
  };
  return (
    <main className="mt-20 h-full">
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
                <a download href={item.urls.regular}>
                  <img
                    id={item.id}
                    name="photo"
                    className="object-cover p-2"
                    src={item.urls.regular}
                    alt={item.title}
                  />
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
  );
}

export default Favorites;
