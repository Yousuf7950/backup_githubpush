import "./App.css";
import MainPage from "./components/MainPage";
import InventoryCategory from "./components/InventoryCategory";
import InventoryItem from "./components/InventoryItem";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import ViewCategory from "./components/ViewCategory";
import Work from "./components/work";
import Home from "./components/work";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route
            path="/InventoryCategory"
            element={<InventoryCategory />}
          ></Route>
          <Route path="/InventoryItem" element={<InventoryItem />}></Route>
          <Route path="/ViewCategory" element={<ViewCategory />}></Route>
          <Route path="/work" element={<Work />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
