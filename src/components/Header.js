import React, { useEffect, useState } from "react";

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
        <input checked={darkMode} type="checkbox" onChange={changeTheme} />
      </nav>
    </header>
  );
}

export default Header;
