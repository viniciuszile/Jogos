import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Graficos from "./Components/Graphs/graficos";
import NewGames from "./Components/new_games/new_games"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graficos" element={<Graficos />} />
        <Route path="/newgames" element={<NewGames />} />
      </Routes>
    </Router>
  );
};

export default App;
