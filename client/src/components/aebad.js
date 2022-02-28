import React, { useState, useEffect } from "react";

import "./dashboard.css";

import Modal from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import { MultiSelect } from "react-multi-select-component";

import { useNavigate } from "react-router-dom";

import axios from "axios";

// const attendeesOpt=[

//   { label: "Aebad ul quadir", value: "Aebad" },

//   { label: "Muhammad Yousuf", value: "yousuf" },

//   { label: "Muhamamd daniyal", value: "daniyal"},

//   { label: "Abdullah Raheel", value: "abdullah"},

// ]

const Dashboard = () => {
  let navigate = useNavigate();

  const [maintitle, setMaintitle] = useState("");

  const [started, setStarted] = useState("");

  const [maintime, setMaintime] = useState("");

  const [maindes, setMaindes] = useState("");

  const [attend, setAttend] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [mainbundle, setMainbundle] = useState([]);

  const [work, setWork] = useState([]);

  useEffect(async () => {
    const result = await axios("http://localhost:5000/getemp");

    const x = result.data;

    const options = x.map((d) => ({
      label: d.emp_name,

      value: d.emp_id,
    }));

    setWork(options);
  }, []);

  const inserting = (e) => {
    e.preventDefault();

    mainbundle.push(maintitle);

    mainbundle.push(started);

    mainbundle.push(maintime);

    mainbundle.push(attend); // attend.map((x)=>{ //  console.log(x.label) // })

    mainbundle.push(maindes); // console.log(mainbundle);

    setMaintitle("");

    setStarted("");

    setMaintime("");

    setAttend([]);

    setMaindes("");

    axios
      .post("http://localhost:3001/addmain", {
        maintitle: maintitle,

        started: started,

        maintime: maintime,

        maindes: maindes,
      })
      .then(() => {
        console.log("han han ");

        setMainbundle([
          ...mainbundle,
          {
            maintitle: maintitle,

            started: started,

            maintime: maintime,

            maindes: maindes,
          },
        ]);
      });
  };

  console.log(work);

  return (
    <>
             
      <Button variant="primary" onClick={handleShow}>
                New Meet        {" "}
      </Button>
                 {" "}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
               {" "}
        <Modal.Header closeButton style={{ padding: "2%" }}>
                           {" "}
        </Modal.Header>
               {" "}
        <div style={{ marginBottom: "0%", paddingBottom: "0%", padding: "4%" }}>
                 {" "}
          <span
            style={{
              color: "#0e7a57",
              fontWeight: "bold",
              fontSize: "30px",
              marginBottom: "0%",
              paddingBottom: "0%",
            }}
          >
            New Meet
            <br />
          </span>
                 {" "}
          <p
            style={{
              fontSize: "16px",
              color: "#bdbdbd",
              marginBottom: "0%",
              paddingBottom: "0%",
              fontWeight: "0px",
            }}
          >
            Record meeting logs with just a click.
          </p>
                 {" "}
        </div>
                               {" "}
        <Modal.Body>
               {" "}
          <Form>
                   {" "}
            <Form.Group className="mb-3">
                        <Form.Label>Enter Title</Form.Label>         {" "}
              <Form.Control
                value={maintitle}
                type="text"
                placeholder="Enter Meeting Title"
                name="maintitle"
                onChange={(e) => setMaintitle(e.target.value)}
              />
                     {" "}
            </Form.Group>
                   {" "}
            <Form.Group className="mb-3">
                        <Form.Label>Enter Date</Form.Label>         {" "}
              <Form.Control
                value={started}
                type="date"
                name="started"
                onChange={(e) => setStarted(e.target.value)}
              />
                     {" "}
            </Form.Group>
                   {" "}
            <Form.Group className="mb-3">
                        <Form.Label>Enter Time</Form.Label>         {" "}
              <Form.Control
                value={maintime}
                type="time"
                name="maintime"
                onChange={(e) => setMaintime(e.target.value)}
              />
                     {" "}
            </Form.Group>
                             
            {/* https://www.npmjs.com/package/react-multi-select-component */} 
                  <pre>{JSON.stringify(attend)}</pre>               {" "}
            <Form.Label>Enter Attendees</Form.Label>     {" "}
            <MultiSelect
              options={work}
              value={attend}
              onChange={setAttend}
              labelledBy="Select"
            />
                 {" "}
            <Form.Group className="mb-3">
                        <Form.Label>Enter Description</Form.Label>         {" "}
              <Form.Control
                value={maindes}
                type="text"
                placeholder="Enter Description"
                name="maindes"
                onChange={(e) => setMaindes(e.target.value)}
              />
                     {" "}
            </Form.Group>
                 {" "}
          </Form>
                 {" "}
        </Modal.Body>
                       {" "}
        <Modal.Footer>
                 {" "}
          <Button
            style={{ background: "#0e7a57", borderRadius: "5", border: "0" }}
            onClick={inserting}
          >
            Create Meet
          </Button>
                   {" "}
          <Button
            style={{ background: "#c21d2e", borderRadius: "5", border: "0" }}
            onClick={handleClose}
          >
                        Close          {" "}
          </Button>
                           {" "}
        </Modal.Footer>
             {" "}
      </Modal>
         {" "}
    </>
  );
};

export default Dashboard;
