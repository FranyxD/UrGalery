import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionFiltrarFavorite,
  actionFiltrarLikes,
  actionRemoveFavorite,
} from "../reducers/favoriteReducer";

function Favorites() {
  const favorites = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const filtrarFecha = () => {
    dispatch(actionFiltrarFavorite());
  };

  const filtrarLikes = () => {
    dispatch(actionFiltrarLikes());
  };

  const deletePhoto = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = target.photo;
    const content = target.photo.id;
    console.log(content);
    const attrValues = data
      .getAttributeNames()
      .map((name) => data.getAttribute(name));
    console.log("activado delete");
    dispatch(actionRemoveFavorite(content));
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
      <h1>Your Favorites photos</h1>
      <button onClick={consol}>mostrar log de favorites</button>
      <button onClick={() => filtrarFecha()}>filtrar por fecha</button>
      <button onClick={() => filtrarLikes()}>filtrar por likes</button>
      <section className="w-full gap-0 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
        {favorites &&
          favorites.map((item, index) => {
            console.log(item);
            return (
              <form onSubmit={deletePhoto} className="relative" key={index}>
                <a download href={item.url}>
                <img
                  id={item.id}
                  name="photo"
                  className="object-cover p-2"
                  src={item.url}
                  alt={item.title}
                  
                />
                </a>
                <figcaption className="absolute bottom-3 left-3 rounded bg-white p-2">
                  {item.title}
                  <span>-{item.likes}</span>
                </figcaption>

                <button className="absolute bottom-3 right-3">Borrar</button>
              </form>
            );
          })}
      </section>
    </main>
  );
}

export default Favorites;
