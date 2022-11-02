import React from "react";
function Home() {
    const arrImg = [0, 1, 2, 3, 4, 5];
    const listImg = arrImg.map((item) => {
        return <div className="rounded-lg w-1/3 bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800"></div>
    })
  return (
    <main className="my-3">
        <section className="flex flex-wrap justify-center w-full gap-5">
            {listImg}
        </section>
    </main>
    
  );
}
export default Home;
