import React, { useState } from "react";
function Home() {
  const [valor, setValor] = useState("");
  const arrImg = [0, 1, 2, 3, 4, 5];
  const listImg = arrImg.map((item) => {
    return (
      <div className="w-1/3 rounded-lg bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800"></div>
    );
  });
  const buscarResultados = async () =>{
    const API_KEY = 'UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI';
    const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${valor}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
  }
  return (
    <main className="my-3">
      <nav className="">
      <input className=" bg-white shadow-xl" type="text" onChange={(e) => setValor(e.target.value)} />
      <button className=" bg-white shadow-xl dark:bg-black dark:text-white" onClick={() => buscarResultados()}>Search</button>
      </nav>
      <section className="flex w-full flex-wrap justify-center gap-5">
        {listImg}
      </section>
    </main>
  );
}
export default Home;
