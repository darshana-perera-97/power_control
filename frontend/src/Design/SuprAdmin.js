import React, { useState, useEffect } from "react";
import { Form, Button, Container, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "./config";

export default function SuprAdmin() {
  const [data, setData] = useState(Array(2).fill(Array(5).fill("0"))); // Initialize a 2x5 array with "0" as default values
  const [response, setResponse] = useState(null); // State to hold server response
  const [cost, setCost] = useState(null); // State to hold the fetched cost
  const [tableData, setTableData] = useState(null); // State to hold the table data from /testCost

  const handleDataChange = (row, col, value) => {
    if (/^\d*$/.test(value)) {
      const newData = data.map((r, rowIndex) =>
        rowIndex === row
          ? r.map((c, colIndex) => (colIndex === col ? value : c))
          : r
      );
      setData(newData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract data1 and data2 from the data array
    const [data1Array, data2Array] = data;

    const payload = {
      data1: data1Array[0],
      data2: data2Array[0],
    };

    try {
      const response = await fetch(`${config.apiUrl}setCost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setResponse(result); // Store server response

      // Fetch the updated cost and table data after submitting the form
      fetchCost();
      fetchTableData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCost = async () => {
    try {
      const response = await fetch(`${config.apiUrl}getCost`);
      const result = await response.json();
      setCost(result); // Store fetched cost
    } catch (error) {
      console.error("Error fetching cost:", error);
    }
  };

  const fetchTableData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}testCost`);
      const result = await response.json();
      setTableData(result.tableData); // Store fetched table data

      // Set initial values for the input fields based on tableData
      const initialData = [
        result.tableData[0].map((cell) => cell.toString()),
        result.tableData[1].map((cell) => cell.toString()),
      ];
      setData(initialData);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleBackButtonClick = () => {
    window.location.reload(); // Reload the page
  };

  useEffect(() => {
    // Fetch cost and table data on component mount
    fetchCost();
    fetchTableData();
  }, []);

  return (
    <div className="mainBack pt-5 superAdmin pb-5">
      <div className="pt-5">
        <Container>
          <div className="customCard p-5 ">
            <h4 className="title pt-3">Smart Energy Meter</h4>
            <h1 className="title">Super Admin</h1>
            <p className="subtitle mb-4">
              Change charges for Power Usage to calculate monthly bill
            </p>
            <Button
              variant="secondary"
              className="mb-3"
              onClick={handleBackButtonClick}
            >
              Logout
            </Button>
            <Form onSubmit={handleSubmit}>
              <Table bordered>
                <thead>
                  <tr>
                    <th style={{ width: "20%" }} className="tableBack">
                      Tariff Block
                    </th>{" "}
                    {/* Adjusted width */}
                    <th className="tableBack2">0 - 30</th>
                    <th className="tableBack2">31 - 60</th>
                    <th className="tableBack2">61 - 90</th>
                    <th className="tableBack2">91 - 120</th>
                    <th className="tableBack2">more than 120</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tableBack">
                      <b>Fixed Charge (Rs.)</b>
                    </td>
                    {data[0].map((cell, colIndex) => (
                      <td key={colIndex}>
                        <Form.Control
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleDataChange(0, colIndex, e.target.value)
                          }
                          placeholder={`Basic Cost :${colIndex + 1}`}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="tableBack">
                      <b>Unit Rate (Rs.)</b>
                    </td>
                    {data[1].map((cell, colIndex) => (
                      <td key={colIndex}>
                        <Form.Control
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleDataChange(1, colIndex, e.target.value)
                          }
                          placeholder={`Unit Price :${colIndex + 1}`}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </Table>
              <Button
                variant="primary"
                type="submit"
                className="custombtn mt-3 mb-3"
              >
                Save Changes
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
}
