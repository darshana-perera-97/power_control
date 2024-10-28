import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  Card,
  Row,
  Col,
  Container,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import Graphs from "./Graphs";
import loginAsset from "../Asset/loginAsset.png";
import config from "./config"; // Import config

const Design = () => {
  const [deviceStatus, setDeviceStatus] = useState("not set");
  const [tgas, setTgas] = useState("not set");
  const [lastUpdated, setLastUpdated] = useState("2024-05-31 10:00 AM");
  const [lastDeviceOnline, setLastDeviceOnline] = useState(
    "2024-05-30 09:45 PM"
  );

  const [current, setCurrent] = useState("0 A");
  const [frequency, setFrequency] = useState("0 Hz");
  const [voltage, setVoltage] = useState("233 V");
  const [devicePower, setDevicePower] = useState("8.2 W");
  const [battery, setBattery] = useState("Data 8");
  const [power, setPower] = useState("501.92999 W");
  const [cost, setCost] = useState("Rs.1.193.00");
  const [lkr, setlkr] = useState("0");
  const [grid, setGrid] = useState("Grid");
  const [setValeu, setSetValue] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [spf, setspf] = useState(0);
  const [l1, setl1] = useState(true);

  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}data`);
        const result = await response.json();

        setCost("Rs." + result.data.cost.price.toFixed(2));
        setlkr(result.data.cost.price.toFixed(2));
        setTgas(
          result.data.device1.gasState > 80 ? "Gas Emission" : "No Gas Emission"
        );
        setCurrent(result.data.device1.scurrent + " A");
        setspf(result.data.device1.spf);
        setl1(result.data.device1.state ? "ON" : "OFF");
        setVoltage(result.data.device1.svoltage.toFixed(2) + " V");
        if (result.data.device1.senergy) {
          setEnergy(result.data.device1.senergy + " kWh");
        }
        setFrequency(result.data.device1.sfrequency + " Hz");
        setSetValue(result.data.set.val);
        setDevicePower(result.data.device1.spower + " W");
        setBattery("Battery data here");
        setPower(result.data.device1.totalP + " W");
        setGrid(
          result.data.device1.svoltage > 200
            ? "Grid Power Available"
            : "Grid Power Lost"
        );
        setDeviceStatus(result.state ? "Online" : "Offline");
        // setDeviceStatus("result.state");
        // setDeviceStatus(result.state);
        setTgas(
          result.data.device1.gasState > 84 ? "Gas Emission" : "No Gas Emission"
        );

        const originalTimestamp = result.timestamp;

        // Convert to Date object
        const date = new Date(originalTimestamp);

        // Format the date
        const formattedDate = `${date.getFullYear()}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        const formattedTime = `${("0" + date.getHours()).slice(-2)}:${(
          "0" + date.getMinutes()
        ).slice(-2)} ${date.getHours() >= 12 ? "PM" : "AM"}`;

        // Combine date and time
        const formattedDateTime = `${formattedDate} ${formattedTime}`;

        console.log(formattedDateTime); // Output: 2024-07-13 09:27 AM (adjusted for your timezone)
        setLastUpdated(formattedDateTime);
        // setLastUpdated(result.timestamp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log("Input value changed:", e.target.value); // Debug log
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiUrl}setValue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: Number(inputValue) }), // Ensure value is sent as a number
      });

      const result = await response.json();
      if (result.success) {
        console.log("Value set successfully:", inputValue);
      } else {
        console.error("Error setting value:", result.message);
      }
    } catch (error) {
      console.error("Error setting value:", error);
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="mainBack2 pt-5 pb-5">
      {/* <Navbar /> */}
      <Container className="mt-4">
        <div className="customCard p-5">
          <Row>
            <Col>
              <div className=" mb-3 mt-2 mb-4">
                {/* <div className="d-flex justify-content-center mb-3 mt-2 mb-4"> */}
                <div className="d-flex justify-content-center mt-2">
                  <img
                    src={loginAsset}
                    height="140px"
                    className="text-center glow "
                    style={{ marginRight: "20px" }}
                  />
                </div>
                <div className="pl-2">
                  <h1 className="main-title text-center mb-5 pb-3">
                    Smart Energy Meter
                  </h1>
                  {/* <p className="title text-center opacity-50 mb-4">
                    Manage and Analys power usage
                  </p> */}
                  <hr />
                </div>
              </div>

              <h2 className="title">Device Information</h2>

              <Row>
                <Col md={6}>
                  <p className="title">
                    <strong>Device Status:</strong> {deviceStatus}
                  </p>
                </Col>
                <Col md={6} className=" d-flex justify-content-end">
                  <p className="title texe-right">
                    <strong>Last Updated:</strong> {lastUpdated}
                  </p>
                </Col>
                {/* <Col md={6}>
                  <p className="title">
                    <strong>Last Device Online:</strong> {lastDeviceOnline}
                  </p>
                </Col> */}
              </Row>
            </Col>
            <Col md={12}>
              <Button variant="secondary" onClick={reloadPage}>
                Logout
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            {/* Conditionally render each card */}
            {[
              { title: "Device Status", data: deviceStatus },
              { title: "Gas Status", data: tgas },
              { title: "Current", data: current },
              { title: "Voltage", data: voltage },
              { title: "Power", data: devicePower },
              { title: "Set Value", data: setValeu },
              { title: "Grid Power", data: grid },
              { title: "Frequency", data: frequency },
              { title: "Total Units", data: energy },
              { title: "Bill Amount", data: cost },
              { title: "Power Factor", data: spf },
              { title: "Load L1", data: l1 },
            ].map((card, index) => (
              <Col md={3} key={index} className="mb-4">
                <Card
                  className={`py-4 dashboard-card ${
                    card.title === "Grid Power" && grid === "Grid Power Lost"
                      ? "card-grid-power-lost"
                      : ""
                  } ${
                    card.title === "Device Status" && deviceStatus === "Offline"
                      ? "card-grid-power-lost"
                      : ""
                  } ${
                    card.title === "Gas Status" && tgas === "Gas Emission"
                      ? "card-grid-power-lost"
                      : ""
                  }${
                    card.title === "Load L1" && l1 === "OFF"
                      ? "card-grid-power-lost"
                      : ""
                  }`}
                >
                  <Card.Body className="text-center">
                    <Card.Title className="title">{card.title}</Card.Title>
                    <Card.Text className="lead title">{card.data}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            <div className="mt-5"></div>
            <hr />
            <Col md={3} className="mb-1 ">
              <Form onSubmit={handleSubmit} className="py-2">
                <Form.Group controlId="formValue">
                  <h2 className="title mt-5">Set Usage Limit</h2>
                  <p className="title mb-4">You can change set value for L1</p>
                  <Form.Control
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 custombtn"
                >
                  Change Value
                </Button>
              </Form>
            </Col>
            <Col md={9} className="mb-1 mt-5">
              <div className="billCard px-3 pb-1">
                <div>
                  <h2 className="title pt-2 ">View Your Bill</h2>
                  <Row>
                    <Row>
                      <Col md={6}>
                        <Table
                          bordered={false}
                          hover={false}
                          striped={false}
                          className="mt-3"
                        >
                          <tbody>
                            <tr>
                              <td className="title">Customer Name</td>
                              <td className="title">: ABC Company</td>
                            </tr>
                            <tr>
                              <td className="title">Invoice Number</td>
                              <td className="title">: 0000 0000 0000 0000</td>
                            </tr>
                            <tr>
                              <td className="title">Bill Period</td>
                              <td className="title">
                                : From 2024-07-01 To 2024-07-31
                              </td>
                            </tr>
                            <tr>
                              <td className="title">Last Month Bill</td>
                              <td className="title">: RS. 330.00</td>
                            </tr>
                            {/* Add more rows as needed */}
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={6}>
                        <Table
                          bordered={false}
                          hover={false}
                          striped={false}
                          className="mt-3"
                        >
                          <tbody>
                            <tr>
                              <td className="title">Payment Received</td>
                              <td className="title">: Rs. 335.00</td>
                            </tr>
                            <tr>
                              <td className="title">Charges for the period</td>
                              <td className="title">: {cost}</td>
                            </tr>
                            <tr>
                              <td className="title">Total Payable</td>
                              <td className="title">
                                : Rs. {(lkr - 5.0).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td className="title">Payment Due Date</td>
                              <td className="title">: 2024-08-22</td>
                            </tr>
                            {/* Add more rows as needed */}
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={12}>
                        <p>
                          Please use{" "}
                          <a
                            href="https://payment.ceb.lk/instantpay"
                            target="_blank"
                            className="custom-link"
                          >
                            {" "}
                            payment.ceb.lk/instantpay
                          </a>{" "}
                          to pay your Bill
                        </p>
                      </Col>
                    </Row>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="mt-5"></div>
            <hr />
          </Row>
          <Row>
            <h2 className="title mt-5">Usage Analytics</h2>
            <Graphs />
          </Row>
        </div>
      </Container>
      <p className="text-center opacity-50 pt-2">Powered by ABC</p>
    </div>
  );
};

export default Design;
