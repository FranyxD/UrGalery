import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionAddFavorite } from "../reducers/favoriteReducer";
import Modal from "./modal";

function Home() {
  const galery = useSelector((state) => state.search);
  const favorites = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  const [saveImages, setSaveImages] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [imag, setImg] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const openModal = (e) => {
    setIsOpen(true);
    setImg(e.target);
  };

  function savePhoto(e) {
    e.preventDefault();
    const { target } = e;
    const content = target.photo.src;
    const data = target.photo;
    console.log('data', data)
    setSaveImages(oldImages => {
      return [...oldImages, content];
    });
    console.log('saveImages estado: ', saveImages)
    localStorage.setItem("img", JSON.stringify(saveImages));
    dispatch(actionAddFavorite(content));
  }

  return (
    <main className="my-24">
      
      <Modal
        openModal={openModal}
        closeModal={closeModal}
        imag={imag}
        isOpen={isOpen}
      />

      <section className="w-full gap-0 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
        {galery.map((item, index) => {
          console.log(item[0])
          return (
            <form onSubmit={savePhoto} key={index} className="relative">
              
              <button className="bg-gray absolute left-5 top-3 shadow-md">
                Guardar
              </button>
              <img
                name="photo"
                likes={item.likes}
                className="object-cover p-2"
                onClick={openModal}
                src={item.urls.regular}
                alt={item.alt_description}
              />
            </form>
          );
        })}
      </section>
    </main>
  );
}
export default Home;
