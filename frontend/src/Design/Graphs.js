import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Graphs = () => {
  const [chartDataVoltage, setChartDataVoltage] = useState({});
  const [chartDataCurrent, setChartDataCurrent] = useState({});
  const [chartDataPower, setChartDataPower] = useState({});
  const [chartDataGrid, setChartDataGrid] = useState({});
  const [chartDataCost, setChartDataCost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/dataset"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      processChartData(result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const processChartData = (data) => {
    const labels = data.map((entry) => formatDateTime(entry.timestamp));

    const handleValue = (value) => (value > 2000 ? 0 : value);

    const valuesVoltage = data.map((entry) =>
      handleValue(entry.data.device1.svoltage)
    );
    const valuesCurrent = data.map((entry) =>
      handleValue(entry.data.device1.scurrent)
    );
    const valuesPower = data.map((entry) =>
      handleValue(entry.data.device1.spower)
    );
    const valuesGrid = data.map((entry) =>
      handleValue(entry.data.device1.senergy)
    );
    const valuesCost = data.map((entry) => handleValue(entry.data.cost.price));

    const lineSettings = {
      fill: false,
      borderWidth: 1, // Reducing the line width
      pointRadius: 1, // Reducing the point size
    };

    setChartDataVoltage({
      labels,
      datasets: [
        {
          label: "Voltage (V)",
          data: valuesVoltage,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          ...lineSettings,
        },
      ],
    });

    setChartDataCurrent({
      labels,
      datasets: [
        {
          label: "Current (A)",
          data: valuesCurrent,
          backgroundColor: "rgba(192, 75, 75, 0.2)",
          borderColor: "rgba(192, 75, 75, 1)",
          ...lineSettings,
        },
      ],
    });

    setChartDataPower({
      labels,
      datasets: [
        {
          label: "Power (W)",
          data: valuesPower,
          backgroundColor: "rgba(75, 75, 192, 0.2)",
          borderColor: "rgba(75, 75, 192, 1)",
          ...lineSettings,
        },
      ],
    });

    setChartDataGrid({
      labels,
      datasets: [
        {
          label: "Source Energy",
          data: valuesGrid,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          ...lineSettings,
        },
      ],
    });

    setChartDataCost({
      labels,
      datasets: [
        {
          label: "Cost",
          data: valuesCost,
          backgroundColor: "rgba(192, 75, 192, 0.2)",
          borderColor: "rgba(192, 75, 192, 1)",
          ...lineSettings,
        },
      ],
    });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const options = {
    scales: {
      y: {},
    },
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1, margin: "10px" }}>
          <h4 className="title mt-4">Source Voltage (V)</h4>
          <Line data={chartDataVoltage} options={options} />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <h4 className="title mt-4">Source Current (A)</h4>
          <Line data={chartDataCurrent} options={options} />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <h4 className="title mt-4">Source Power (W)</h4>
          <Line data={chartDataPower} options={options} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1, margin: "10px" }}>
          <h4 className="title mt-4">Source Energy (kWh)</h4>
          <Line data={chartDataGrid} options={options} />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <h4 className="title mt-4">Bill Amount (LKR)</h4>
          <Line data={chartDataCost} options={options} />
        </div>
      </div> 
    </div>
  );
};

export default Graphs;
