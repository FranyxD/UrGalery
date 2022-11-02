import React, { useEffect, useState } from "react";
import { Switch } from '@headlessui/react';
function Header() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
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
    localStorage.theme = darkMode ? 'light': 'dark'
    setDarkMode(!darkMode)
    if(darkMode){
        document.documentElement.classList.remove("dark");
    }
    else{
        document.documentElement.classList.add("dark");
    }
  };

  
  

  return (
    <header className="bg-black fixed bottom-0 w-full">
      <nav>
      <Switch
        checked={darkMode}
        onChange={changeTheme}
        className={`${darkMode ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${darkMode ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      </nav>
    </header>
  );
}

export default Header;
