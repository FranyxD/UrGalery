import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddToFavorites,
  actionRemoveToFavorites,
} from "../slices/favoriteSlice";
import Modal from "../components/Modal";
import Header from "../components/Header";
import { ReactComponent as IsSaveIcon } from "../../images/isSave.svg";
import { ReactComponent as NotSaveIcon } from "../../images/notSave.svg";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [isOpen, setIsOpen] = useState(false);
  const [imag, setImg] = useState("");
  const [search, setSearch] = useState('')
  //MODAL
  function closeModal() {
    setIsOpen(false);
  }

  const openModal = (item) => {
    setIsOpen(true);
    setImg(item);
  };

  //hacer useselector para quitar el subscribe
  const [filter, setFilter] = useState(favorites);
  useEffect(() => {
    setFilter(favorites);
    
  }, [favorites]);

  //FILTROS
  const searchFavorites = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = target.buscador.value;

    setFilter(
      favorites.slice().filter((item, index) => {
        if (item.description === null) {
          if(data === '') return item;
          
        } else {
          if (data.search(item.description) !== -1) {
          }
          //item.title.search(action.payload.title)
          return item.description.search(data) !== -1;
        }
      })
    );
  };


  const filterButtons = (value) => {
    //usar setFilter
    setFilter(filter.slice().sort((a, b) => b[value] - a[value]));
  };


  const deletePhoto = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = target.id;
    favorites.filter((item) => {
      if (item.id === data) {
        return dispatch(actionRemoveToFavorites(item.id));
      }
    });
  };
  //mirar si esta guardado

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
      console.log("is not matched");
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
      <Header buscador={searchFavorites} />
      <main className="mb-16 mt-3 md:mb-0 md:mt-16 bg-white dark:bg-black">
        <Modal
          openModal={openModal}
          closeModal={closeModal}
          imag={imag}
          isOpen={isOpen}
          setImg={setImg}
        />
        {/* BUTTONS FILTERS */}
        <div className="ml-3 inline-flex flex-wrap gap-3">
        <button 
          className="m-2 font-mono tracking-tighter rounded bg-green-light p-2 dark:bg-midnight dark:text-white"
          onClick={() => filterButtons('fecha')}
        >
          By date
        </button>
        <button
          className="m-2 font-mono tracking-tighter rounded bg-green-light p-2 dark:bg-midnight dark:text-white"
          onClick={() => filterButtons('likes')}
        >
          By likes
        </button>
        <button 
          className="m-2 font-mono tracking-tighter rounded bg-green-light p-2 dark:bg-midnight dark:text-white"
          onClick={() => filterButtons('width')}
        >
          By width
        </button>
        <button 
          className="m-2 font-mono tracking-tighter rounded bg-green-light p-2 dark:bg-midnight dark:text-white"
          onClick={() => filterButtons('height')}
        >
          By height
        </button>
        </div>
        <section className="w-full px-2 py-3 m-0 columns-2 md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
          {filter &&
            filter.map((item, index) => {
              //console.log(item)
              //console.log(item);
              return (
                <figure
                  className="relative p-3"
                  key={index}
                >
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

export default Favorites;
