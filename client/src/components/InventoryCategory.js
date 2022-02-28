import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function InventoryCategory() {
  const [categoryList, setCategoryList] = useState([]);

  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  let navigate = useNavigate();

  const addCategory = () => {
    Axios.post("http://localhost:5000/createCategory", {
      category: category,
      date: date,
      time: time,
    }).then(() => {
      // console.log("Success");
      setCategoryList([
        ...categoryList,
        {
          category: category,
          date: date,
          time: time,
        },
      ]);
    });
    navigate("/InventoryItem");
  };

  const displayInfo = () => {
    console.log(category + date + time);
  };
  return (
    <div>
      <h1>Inventory Category Page</h1>
      <h3>Create new inventory</h3>
      <input
        type="text"
        label="Enter category name"
        onChange={(e) => setCategory(e.target.value)}
      />
      <div>Enter date</div>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <div>Enter time</div>
      <input type="time" onChange={(e) => setTime(e.target.value)} />
      <button onClick={addCategory}>Create inventory</button>
    </div>
  );
}
