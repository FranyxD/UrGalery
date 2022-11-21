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
import { ReactComponent as IsSaveIcon } from "../../images/isSave.svg";
import { ReactComponent as NotSaveIcon } from "../../images/notSave.svg";


function Home() {
  const dispatch = useDispatch();
  const galery = useSelector((state) => state.search);
  const [saveImages, setSaveImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imag, setImg] = useState("");
  const favorites = useSelector((state) => state.favorites);
  const [page, setPage] = useState(1)
  const [content, setContent] = useState('');
  const totalPages = sessionStorage.getItem('totalPages');

  useEffect(() => {
    console.log('galery', galery)
    if (content) {
      dispatch(actionSearchPhotos({
        content: content,
        page: page,
      }));
    }else {
      dispatch(actionRandomPhotos())
    }
  }, [content, page]);


  //buscador
  const inputSearch =  (event) => {
    event.preventDefault();
    const { target } = event;
    //const querys = target.buscador.value;
    console.log('content before', content)
    setContent(target.buscador.value)
    console.log('content after', content)
  };

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
        return dispatch(actionAddToFavorites(item));
      }
      return "";
    });
  }
 

//mirar si esta guardado
const isSave = (imag) => {
  if (favorites.some((item) => item.id === imag.id)) {
    return (
      <IsSaveIcon
        key={imag && imag.id}
        className="h-10 w-10 rounded bg-black/60 fill-white p-1"
        onClick={() => dispatch(actionRemoveToFavorites(imag.id))}
      />
    );
  } else {
    //console.log("is not matched");
    return (
      <NotSaveIcon
        key={imag && imag.id}
        className="h-10 w-10 rounded bg-black/60 stroke-white p-1"
        onClick={() => dispatch(actionAddToFavorites(imag))}
      />
    );
  }
};

  return (
    <>
      <Header buscador={inputSearch} 
          setContent={setContent}
          content={content}
          />
      <main className="mb-16 mt-3 md:mb-0 md:mt-16 bg-white dark:bg-black">
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
        <ul className="mb-2 flex w-full place-content-center gap-5 dark:text-white text-black">
          <li><button  disabled={page === 1} onClick={() => setPage((prevState) => prevState - 1)}>Prev</button></li>
          <li>{page}</li>
          <li><button onClick={() => setPage((prevState) => prevState + 1)}>Next</button></li>
          <li><button onClick={() => setPage(totalPages)}>{sessionStorage.getItem("totalPages")}</button></li>
        </ul>
      </main>
    </>
  );
}
export default Home;
