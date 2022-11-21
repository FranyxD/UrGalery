import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function Pagination({ page, setPage, totalPages }) {
  const favorites = useSelector((state) => state.favorites);
  const [filter, setFilter] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [arrayPagination, setArrayPagination] = useState([]);
  
  useEffect(() => {
    let newArr = [];
    for (let i = 1; i <= totalPages; i++) {
      newArr.push(i);
    }
    setArrayPagination(newArr);
  }, [totalPages]);
  const onChangeHandler = (e) => {
    //document.getElementsByClassName("Mui-selected ")[0].classList.remove("Mui-selected");
    setActivePage(e.target.textContent);
    setPage(e.target.textContent);
    console.log("cambio: ", e.target.textContent);
    window.scroll(0, 0);
    console.log("page" , page)
  };
  useEffect(() => {
    setFilter(favorites);
  }, [favorites]);
  
  return (
    <ul className="mb-2 flex w-full place-content-center gap-5 ">
      {arrayPagination.map((item, index) => {
        return (
          <li>
            <button
              className={activePage == item ? 'rounded-lg bg-green-light text-white px-2 py-1' : 'rounded-lg bg-green-light text-black px-2 py-1'}
              key={index}
              onClick={onChangeHandler}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
