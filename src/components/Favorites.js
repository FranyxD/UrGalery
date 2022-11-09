import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionStorageFavorite, storedURLs } from "../reducers/favoriteReducer";

function Favorites() {
  const favorites = useSelector((state) => state.favorite);

  
  useEffect(() =>{
    if (window.localStorage) {
  
      // If there is no item as 'reload'
      // in localstorage then create one &
      // reload the page
      if (!localStorage.getItem('reload')) {
          localStorage['reload'] = true;
          window.location.reload();
      } else {

          // If there exists a 'reload' item
          // then clear the 'reload' item in
          // local storage
          localStorage.removeItem('reload');
      }
  }
  })
  
  
  const consol = () => {
    
    console.log(storedURLs);
  };
  return (
    <main className="relative top-20">
      <h1>Your Favorites photos</h1>
      <button onClick={consol}>mostrar log de favorites</button>
      <section className="w-full gap-0 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
        {storedURLs.map((item, index) => {
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
