import React, { useState } from "react";
import Navbar from "./Navbar";
import { Card, Row, Col, Container } from "react-bootstrap";
import Graphs from "./Graphs";

const Design = () => {
  // Initialize state variables with useState hook
  const [deviceStatus, setDeviceStatus] = useState("Online");
  const [lastUpdated, setLastUpdated] = useState("2024-05-31 10:00 AM");
  const [lastDeviceOnline, setLastDeviceOnline] = useState(
    "2024-05-30 09:45 PM"
  );

  const [cards, setCards] = useState([
    { title: "Card 1", data: "Data 1" },
    { title: "Card 2", data: "Data 2" },
    { title: "Card 3", data: "Data 3" },
    { title: "Card 4", data: "Data 4" },
    { title: "Card 5", data: "Data 5" },
    { title: "Card 6", data: "Data 6" },
    { title: "Card 7", data: "Data 7" },
    { title: "Card 8", data: "Data 8" },
    { title: "Card 9", data: "Data 9" },
  ]);

  // Define a set of different background colors with low opacity
  const backgroundColors = [
    "rgba(255, 99, 71, 0.2)", // Tomato
    "rgba(255, 206, 86, 0.2)", // Gold
    "rgba(65, 105, 225, 0.2)", // Royal Blue
    "rgba(127, 255, 212, 0.2)", // Aquamarine
    "rgba(255, 165, 0, 0.2)", // Orange
    "rgba(139, 69, 19, 0.2)", // Saddle Brown
    "rgba(255, 0, 255, 0.2)", // Magenta
    "rgba(0, 0, 255, 0.2)", // Blue
    "rgba(0, 128, 0, 0.2)", // Green
  ];

  // Function to shuffle array randomly
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the background colors to ensure each card gets a different color
  const shuffledColors = shuffleArray(backgroundColors);

  return (
    <div>
      <Navbar />
      <Container className="mt-4">
        <Row>
          <Col>
            <h2>Device Information</h2>
            <p>
              <strong>Device Status:</strong> {deviceStatus}
            </p>
            <Row>
              <Col md={6}>
                <p>
                  <strong>Last Updated:</strong> {lastUpdated}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Last Device Online:</strong> {lastDeviceOnline}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          {/* Loop to render all cards */}
          {cards.map((card, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card style={{ backgroundColor: shuffledColors[index] }}>
                <Card.Body className="text-center">
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text className="lead">{card.data}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Graphs />
        </Row>
      </Container>
    </div>
  );
};

export default Design;
