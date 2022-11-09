import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionAddFavorite } from "../reducers/favoriteReducer";
import { actionSearch, actionRandom } from "../reducers/searchReducer";
import Modal from "./modal";

function Home() {
  const galery = useSelector((state) => state.search);
  const favorites = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  const [saveImages, setSaveImages] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [imag, setImg] = useState("");

  useEffect(() => {
    dispatch(actionRandom('https://api.unsplash.com/photos/random/?client_id=${API_KEY}&per_page=20'))
  }, [])

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
    //const fecha = `${dateSave.getDate()}-${dateSave.getMonth()}-${dateSave.getFullYear()}`
    const fecha = dateSave.getTime();

    console.log('fecha de guardado', fecha)
    const { target } = e;
    const data = target.photo;
    const attrValues = data
      .getAttributeNames()
      .map((name) => data.getAttribute(name));
    console.log("data", attrValues);
    console.log("saveImages estado: ", saveImages);
    dispatch(actionAddFavorite(attrValues, fecha));
  }

  return (
    <main className=" my-24">
      <Modal
        openModal={openModal}
        closeModal={closeModal}
        imag={imag}
        isOpen={isOpen}
      />

      <section className="w-full gap-0 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
        {galery.map((item, index) => {
          //console.log('items from galery: ', item)
          return (
            <form onSubmit={savePhoto} key={index} className="relative">
              <button className="bg-gray absolute left-5 top-3 shadow-md">
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
            </form>
          );
        })}
      </section>
    </main>
  );
}
export default Home;
