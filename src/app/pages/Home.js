import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  actionRandomPhotos,
  actionSearchPhotos,
} from "../slices/services/searchServices";
import {
  actionAddToFavorites,
  actionRemoveToFavorites,
} from "../slices/favoriteSlice";
import { actionSearchResult, selectState } from "../slices/searchSlice";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { ReactComponent as IsSaveIcon } from "../../images/isSave.svg";
import { ReactComponent as NotSaveIcon } from "../../images/notSave.svg";
import ReactPaginate from 'react-paginate';

function Home() {
  const dispatch = useDispatch();
  const galery = useSelector((state) => state.search);
  const [saveImages, setSaveImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imag, setImg] = useState("");
  const favorites = useSelector((state) => state.favorites);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");

  const totalPages = sessionStorage.getItem("totalPages");

  useEffect(() => {
    console.log(page);
    if (content) {
      dispatch(
        actionSearchPhotos({
          content: content,
          page: page,
        })
      );
    } else {
      dispatch(actionRandomPhotos());
    }
  }, [content, page]);

  //buscador
  const inputSearch = (event) => {
    event.preventDefault();
    const { target } = event;
    //const querys = target.buscador.value;
    console.log("content before", content);
    setContent(target.buscador.value);
    console.log("content after", content);
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

  const handlePageClick = (event) => {
    console.log(
      `User requested page number ${event.selected}, which is offset ${event.selected}`
    );
    setPage(event.selected)
  };

  return (
    <>
      <Header
        buscador={inputSearch}
        setContent={setContent}
        content={content}
      />
      <main className="mb-16 mt-3 bg-white dark:bg-black md:mb-0 md:mt-16">
        <Modal
          openModal={openModal}
          closeModal={closeModal}
          imag={imag}
          isOpen={isOpen}
        />

        <section className="m-0 w-full columns-2 px-2 py-3 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
          {galery.map((item, index) => {
            //console.log("items from galery: ", item);
            return (
              <figure className="relative p-3" key={index}>
                <img
                  id={item.id}
                  name="photo"
                  className="rounded-xl object-cover "
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
        <ReactPaginate
        className="flex gap-5 w-full place-items-center place-content-center p-2 dark:text-white "
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={totalPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName="text-black px-3  py-1 rounded-full dark:text-white dark:bg-midnight bg-green-light"
      />
      </main>
    </>
  );
}

export default Home;
