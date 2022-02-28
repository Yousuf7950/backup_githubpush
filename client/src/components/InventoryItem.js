import React from "react";
import { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Select from "react-select";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import "./InventoryItem.css";

export default function InventoryItem() {
  const [quantity, setQuantity] = useState(0);
  const [dataa, setDataa] = useState([]);
  const [itemOption, setItemOption] = useState([]);
  const [description, setDescription] = useState("");
  const [locname, setLocname] = useState("");

  const [itemname, setItemName] = useState("");
  //   const [attend, setAttend] = useState([]);
  const [temp, setTemp] = useState("");

  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [data, setData] = useState([]);
  // getting location values from backend
  useEffect(async () => {
    const result = await Axios("http://localhost:5000/getLocation");
    const x = result.data;
    const options = x.map((d) => ({
      label: d.loc_name,
      value: d.location_id,
    }));
    setDataa(options);
  }, []);

  // getting item values from backend
  useEffect(async () => {
    const result = await Axios("http://localhost:5000/getItem");
    const x = result.data;
    const options = x.map((d) => ({
      label: d.itemlist_name,
      value: d.itemlist_id,
    }));
    setItemOption(options);
  }, []);

  const addItemDetails = () => {
    Axios.post("http://localhost:5000/addmom", {
      quantity: quantity,
      description: description,
      itemname: itemname.label,
      locname: locname.label,
    }).then(() => {
      console.log("Success");
      let myval = locname.label;
      let myvalItem = itemname.label;
      setItemList([
        ...itemList,
        {
          quantity: quantity,
          description: description,
          myvalItem: myvalItem,
          myval: myval,
        },
      ]);
    });
  };

  return (
    <div className="InventoryItem">
      <div className="information">
        <label>Item Name</label>
        <Select options={itemOption} value={itemname} onChange={setItemName} />

        {/* Location  */}
        <div>
          <div>
            <p>Enter location:</p>
            <Select options={dataa} value={locname} onChange={setLocname} />
          </div>
        </div>
        <label>Quantity</label>
        <input
          type="number"
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
        <label>Description</label>
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <button onClick={addItemDetails} style={{ margin: "10px" }}>
          Add inventory
        </button>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Index</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{val.myvalItem}</td>
                  <td>{val.quantity}</td>
                  <td>{val.description}</td>
                  <td>{val.myval}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
