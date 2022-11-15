import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionRandomPhotos, actionSearchPhotos } from "../services/services";
import { actionAddToFavorites } from "../slices/favoriteSlice";
import { actionSearchResult, selectState } from "../slices/searchSlice";
import Header from "./Header";
import Modal from "./modal";

function Home() {
  const dispatch = useDispatch();
  const galery = useSelector(state => state.search);
  const [saveImages, setSaveImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imag, setImg] = useState("");

  useEffect(() => {
    dispatch(actionRandomPhotos());
    
  }, [dispatch]);

  

  function closeModal() {
    setIsOpen(false);
  }

  const openModal = (e) => {
    setIsOpen(true);
    setImg(e.target);
  };

  function savePhoto(e) {
    e.preventDefault();
    const dateSave = new Date();
    const fecha = dateSave.getMilliseconds();
    const { target } = e;
    const data = target.id;
    galery.filter(item => {
      if (item.id === data) {
        console.log('id filter: ', item.id)
        return dispatch(actionAddToFavorites(item));
    }
    return ''
  })
    
  }
 const inputSearch = async (event) => {
    event.preventDefault();
    const { target } = event;
    const content = target.buscador.value;
    if(content){
      dispatch(actionSearchPhotos(content))
    }else {
      dispatch(actionRandomPhotos())
    }

  };

  return (
    <>
    <Header buscador={inputSearch}/>
    <main className=" my-24">
      <Modal
        openModal={openModal}
        closeModal={closeModal}
        imag={imag}
        isOpen={isOpen}
      />

      <section className="w-full gap-0 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">

        {galery.map((item, index) => {
          console.log("items from galery: ", item);
          return (
            <figure key={index} className="relative">
              <button id={item.id} onClick={savePhoto} className="bg-gray absolute left-5 top-3 shadow-md">
                Guardar
              </button>
              <img
                id={item.id}
                src={item.urls.regular}
                likes={item.likes}
                alt={item.alt_description}
                name="photo"
                className="object-cover p-2"
                onClick={openModal}
              />
            </figure>
          );
        })
      }
      </section>
    </main>
    </>
  );
}
export default Home;
