import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionRemoveFavorite } from "../reducers/favoriteReducer";

function Favorites() {
  const favorites = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  
  
  /*useEffect(() =>{
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
  })*/

  const deletePhoto = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = target.photo;
    const content = target.photo.id;
    console.log(content);
    const attrValues = data
      .getAttributeNames()
      .map((name) => data.getAttribute(name));
      console.log('activado delete')
    dispatch(actionRemoveFavorite(content));
  }
  
  
  const consol = () => {
    console.log(favorites.sort((a, b) => new Date(a.fecha).getTime() > new Date(b.fecha).getTime()));
  };
  return (
    <main className="h-full mt-20">
      <h1>Your Favorites photos</h1>
      <button onClick={consol}>mostrar log de favorites</button>
      <section className="w-full gap-0 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
        {favorites && favorites.map((item, index) => {
          console.log(item)
          return (
            <form  onSubmit={deletePhoto} className="relative" key={index}>
              <img id={item.id} name="photo" className="object-cover p-2" src={item.url} />
              <figcaption className='bg-white p-2 rounded absolute bottom-3 left-3'>{item.title}</figcaption>
              <button className="absolute bottom-3 right-3">Borrar</button>
            </form>
          );
        })}
      </section>
    </main>
  );
}

export default Favorites;
