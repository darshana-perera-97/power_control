const express = require("express");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, onValue } = require("firebase/database");
const moment = require("moment-timezone");
const bodyParser = require("body-parser"); // Import body-parser to handle JSON payloads

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDcehMQQY6D90NIiZcLyzVQkxPys9LJzTM",
  authDomain: "smart-power-meter-be704.firebaseapp.com",
  databaseURL:
    "https://smart-power-meter-be704-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-power-meter-be704",
  storageBucket: "smart-power-meter-be704.appspot.com",
  messagingSenderId: "700492789096",
  appId: "1:700492789096:web:c25633ccac57c7f4b252dd",
  measurementId: "G-NQJ882NCL3",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase();

const app = express();
const cors = require("cors");
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests

let dataArray = [];
let lastOnlineStatus = null; // To store the last known online status

// Function to fetch data from Firebase
const fetchData = async () => {
  try {
    const dbRef = ref(database);
    const snapshot = await new Promise((resolve, reject) => {
      onValue(dbRef, resolve, { onlyOnce: true }, reject); // Listen for changes and resolve the promise
    });
    const data = snapshot.val();

    // Check if the 'online' status has changed
    if (data && data.online !== lastOnlineStatus) {
      // Update the last known online status
      lastOnlineStatus = data.online;

      // Get current date and time in Colombo
      const currentDateTime = moment().tz("Asia/Colombo").format();

      const responseData = {
        data,
        timestamp: currentDateTime,
      };

      // Add the data to the array
      dataArray.push(responseData);

      // Ensure the array has at most 1000 elements
      if (dataArray.length > 1000) {
        dataArray.shift(); // Remove the oldest element
      }

      // console.log(responseData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fetch data every second
setInterval(fetchData, 1000);

// Define a route to fetch data and return the latest entry
app.get("/data", async (req, res) => {
  try {
    const dbRef = ref(database);
    const snapshot = await new Promise((resolve, reject) => {
      onValue(dbRef, resolve, { onlyOnce: true }, reject); // Listen for changes and resolve the promise
    });
    const data = snapshot.val();

    // Get current date and time in Colombo
    const currentDateTime = moment().tz("Asia/Colombo").format();

    const responseData = {
      data,
      timestamp: currentDateTime,
    };

    res.json(responseData);
    console.log(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define a route to fetch the stored dataset
app.get("/dataset", (req, res) => {
  res.json(dataArray);
});

// Endpoint to handle POST requests
app.post("/cost", (req, res) => {
  const { data1, data2 } = req.body;

  // Log received data
  console.log("Received data:", { data1, data2 });

  // Calculate some result based on data1 and data2
  const result = Number(data1) + Number(data2);

  // Log the calculated result
  console.log("Calculated result:", result);

  // Respond with the result
  res.json({ success: true, result });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
