import { Outlet } from "react-router-dom";

import "./app.css";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Alert from "./components/Alert";

export type statusType = "success" | "error" | null;
export type LayoutContextType = {
  handleAlert: (message: string, status: statusType) => void;
};

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [color, setColor] = useState<statusType>(null);
  const [message, setMessage] = useState<string>("");
  function handleAlert(message: string, color: statusType) {
    setMessage(message);
    setColor(color);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }
  return (
    <div className="app">
      <Navbar />
      {showAlert && <Alert color={color} message={message} />}
      <Container>
        <Outlet context={{ handleAlert: handleAlert }} />
      </Container>
    </div>
  );
}

export default App;
