import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Profil from "./Pages/Profil";
import Tranding from "./Pages/Tranding";


function App() {
  return (
    <div>
      <header>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Error" element={<Error />}/>
          <Route path="/Tranding" element={<Tranding />}/>
          <Route path="/Profil/:id" element={<Profil />}/>
        </Routes>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
