import React, { useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Profil from "./Pages/Profil";
import Trending from "./Pages/Trending";
import { UserContext } from "./Hooks/UserContext";


function App() {

  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const getToken = async() => {

      await axios({
        method : "get",
        url: `${process.env.REACT_APP_CALL_API}jwtid`,
        withCredentials: true
      })
      .then((res) => {
        console.log(res)
        setUserId(res.data)
      })
      .catch((err) => console.log("No token"))
    }
    getToken()
  }, [userId]);

  return (
    <div>
      <header>
      </header>
      <main>
        <UserContext.Provider value={userId}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="*" element={<Error />}/>
          <Route path="/Trending" element={<Trending />}/>
          <Route path="/Profil" element={<Profil />}/>
        </Routes>
        </UserContext.Provider>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
