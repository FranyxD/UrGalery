import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionRandomPhotos, actionSearchPhotos } from "../slices/services/searchServices";
import {
  actionAddToFavorites,
  actionRemoveToFavorites,
} from "../slices/favoriteSlice";
import { actionSearchResult, selectState } from "../slices/searchSlice";
import Header from "../components/Header";
import Modal from "../components/Modal";

function Home() {
  const dispatch = useDispatch();
  const galery = useSelector((state) => state.search);
  const [saveImages, setSaveImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imag, setImg] = useState("");
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(actionRandomPhotos());
  }, [dispatch]);

  //MODAL
  function closeModal() {
    setIsOpen(false);
  }

  const openModal = (item) => {
    setIsOpen(true);
    setImg(item);
  };

  function savePhoto(e) {
    e.preventDefault();
    const dateSave = new Date();
    const fecha = dateSave.getMilliseconds();
    const { target } = e;
    const data = target.id;
    galery.filter((item) => {
      if (item.id === data) {
        console.log("id filter: ", item.id);
        return dispatch(actionAddToFavorites(item));
      }
      return "";
    });
  }
  const inputSearch = async (event) => {
    event.preventDefault();
    const { target } = event;
    const content = target.buscador.value;
    if (content) {
      dispatch(actionSearchPhotos(content));
    } else {
      dispatch(actionRandomPhotos());
    }
  };

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
          onClick={() => dispatch(actionRemoveToFavorites(imag))}
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
      return(
        <svg
        key={imag && imag.id}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-10 w-10 rounded bg-black/60 stroke-white p-1"
        onClick={() => dispatch(actionAddToFavorites(imag))}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
      )
    }
  };

  return (
    <>
      <Header buscador={inputSearch} />
      <main className=" my-24">
        <Modal
          openModal={openModal}
          closeModal={closeModal}
          imag={imag}
          isOpen={isOpen}
        />

        <section className="w-full px-2 py-3 m-0 columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
          {galery.map((item, index) => {
            //console.log("items from galery: ", item);
            return (
              <figure className="relative p-3" key={index}>
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
                
                
              </figure>
            );
          })}
        </section>
      </main>
    </>
  );
}
export default Home;
