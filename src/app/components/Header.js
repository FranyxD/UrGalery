import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { actionSearchResult } from "../slices/searchSlice";
import "../../App.css";
import { NavLink } from "react-router-dom";
import darkLogo from "../../images/dark.svg";
import lightLogo from "../../images/light.svg";
import nullLogo from "../../images/null.svg";

export const refresh = () => {
  window.location.reload();
};

function Header({ buscador }) {
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

  return (
    <header className="fixed z-10 w-full border-0 bg-slate-500 p-2 dark:border-b-2 dark:border-white dark:bg-black max-md:bottom-0 max-md:p-0 max-md:dark:border-b-0 max-md:dark:border-t-2 md:top-0">
      <div className="pd-3 flex items-center justify-between gap-x-5 bg-slate-500 dark:bg-black max-md:p-2">
        <nav className="flex items-center gap-x-5">
          <NavLink to="/">
            <h1 className="font-italiana text-3xl text-white max-sm:hidden">
              UrGalery
            </h1>
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return {
                filter: isActive ? "brightness(1)" : "brightness(0.8)",
              };
            }}
            to="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-10 w-auto  text-white max-md:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return {
                filter: isActive ? "brightness(1)" : "brightness(0.8)",
              };
            }}
            to="/Favorites"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-10 w-auto  text-white max-md:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
              />
            </svg>
          </NavLink>
        </nav>

        <form className="flex  w-full items-center gap-x-5" onSubmit={buscador}>
          <input
            type="text"
            name="buscador"
            className="w-full rounded-full bg-white p-1 text-xl"
          />
          <button className="text-white dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
        <Switch
          checked={darkMode}
          onChange={changeTheme}
          className={`${
            darkMode
              ? "bg-midnight bg-stars"
              : "bg-green-400 bg-cloud bg-right bg-no-repeat saturate-[0.7]"
          }
          relative  inline-flex h-auto  w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent  transition-colors  duration-200 ease-linear focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <img
            alt="switch"
            src={darkMode ? darkLogo : nullLogo}
            aria-hidden="true"
            className={`${
              darkMode ? "translate-x-[28px]  " : "translate-x-[1px]  "
            }
            pointer-events-none inline-block h-auto w-8 transform self-center rounded-full border-[3px] border-orange-300 bg-yellow-300 shadow-lg ring-0 transition-all duration-200  ease-in-out  dark:border-2 dark:border-white  dark:bg-midnight-light dark:p-[2px]`}
          />
        </Switch>
      </div>
    </header>
  );
}

export default Header;
