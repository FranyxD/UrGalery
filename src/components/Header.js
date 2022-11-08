import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {actionSearch} from '../reducers/searchReducer';


function Header() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDarkMode(!darkMode);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      console.log("modo luz activado");
      setDarkMode(darkMode);
    }
  }, []);

  //onclick input function
  const changeTheme = () => {
    localStorage.theme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const inputSearch = async (event) =>{
    event.preventDefault();
    const {target} = event;
    const content = target.buscador.value;
    dispatch(actionSearch(content))
  }

  return (
    <header className="fixed  w-full bg-black max-md:bottom-0 md:top-0">
      <nav className="p-3 flex items-center gap-x-5">
          <Switch
          checked={darkMode}
          onChange={changeTheme}
          className={`${darkMode ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${darkMode ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <form onSubmit={inputSearch}>
        <input type='text' name="buscador" className="w-full rounded bg-white"/>
        <button className='text-white dark:text-black'>Buscar</button>
        </form>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white  w-auto h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
        </svg>

      </nav>
    </header>
  );
}

export default Header;
