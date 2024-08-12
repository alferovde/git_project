import React, { useState } from "react";
import "animate.css";
import style from "./index.module.scss";
import { Query } from "./store/inderfaces";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";

function App() {
  const [query, setQuery] = useState<Query>({
    query: "",
    perPage: 10,
    page: 1,
    sort: "",
  });

  return (
    <main className={style.app}>
      <Header query={query} setQuery={setQuery} />
      <Main query={query} setQuery={setQuery} />
      <Footer />
    </main>
  );
}

export default App;
