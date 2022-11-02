import React, { useState } from "react";

function Home() {
  const [valor, setValor] = useState("");
  const [resultados, setResultados] = useState([]);
  //buscador
  const buscarResultados = async () => {
    
    const API_KEY = "UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI";
    const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${valor}&per_page=20`;

    const response = await fetch(URL);
    const data = await response.json();
    setResultados(data.results);
    console.log(data);
  };
  return (
    <main className="my-3">
      <nav>
      <input
          className=" bg-white shadow-xl"
          type="text"
          onChange={(e) => setValor(e.target.value)}
        />
        <button
          className=" bg-white shadow-xl dark:bg-black dark:text-white"
          onClick={() => buscarResultados()}
        >
          Search
        </button>
      </nav>
      <section className="w-full columns-3 gap-0">
        {
        resultados.map((item, index) => {
          return (
            <img
              className="object-cover p-2"
              key={index}
              src={item.urls.regular}
            />
          );
        })
        }
        
      </section>
    </main>
  );
}
export default Home;
