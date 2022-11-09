import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionStorageFavorite, storedURLs } from "../reducers/favoriteReducer";

function Favorites() {
  const favorites = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  useEffect(() => {
    if(favorites){
        dispatch(actionStorageFavorite());
    }
  }, []);

  const consol = () => {
    for (let i in favorites) {
      console.log("log de estado favorite", favorites[i]);
    }
    console.log(typeof favorites);
  };
  return (
    <main className="relative top-20">
      <h1>Your Favorites photos</h1>
      <button onClick={consol}>mostrar log de favorites</button>
      <section className="w-full gap-0 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
        {storedURLs.map((item, index) => {
          console.log("favorite", favorites);
          console.log("favorites log", favorites.length, index);
          return (
            <figure key={index}>
              <img name="photo" className="object-cover p-2" src={item} />
            </figure>
          );
        })}
      </section>
    </main>
  );
}

export default Favorites;
