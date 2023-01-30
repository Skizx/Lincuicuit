import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Profil from "./Pages/Profil";
import Trending from "./Pages/Trending";


function App() {
  return (
    <div>
      <header>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Error" element={<Error />}/>
          <Route path="/Trending" element={<Trending />}/>
          <Route path="/Profil/:id" element={<Profil />}/>
        </Routes>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
