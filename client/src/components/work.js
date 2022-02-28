import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
const Work = () => {
  const [dataa, setDataa] = useState([]);
  const [kaka, setKaka] = useState([]);
  const [bundle, setBundle] = useState([]);
  const [locname, setLocname] = useState("");
  const [temp, setTemp] = useState("");
  useEffect(async () => {
    const result = await axios("http://localhost:5000/getLocation");

    const x = result.data;

    const options = x.map((d) => ({
      label: d.loc_name,

      value: d.location_id,
    }));

    setDataa(options);
  }, []);

  const inserting = () => {
    axios
      .post("http://localhost:5000/postingLocation", {
        locname: locname.label,
        // ok: dataa.value,
      })
      .then(() => {
        console.log(locname.label);
        setTemp(locname.label);
        setBundle([
          ...bundle,
          {
            ok: dataa.value,
          },
        ]);
      });
    return <></>;
  };
  console.log(dataa);

  return (
    <>
      <Select options={dataa} value={locname} onChange={setLocname} />
      {temp}
      <button onClick={inserting}>Post me</button>
    </>
  );
};

export default Work;
