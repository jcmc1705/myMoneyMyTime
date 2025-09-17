import "./app.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Alert from "./components/Alert";

export type StatusType = "success" | "error" | null;
export type LayoutContextType = {
  handleAlert: (message: string, status: StatusType) => void;
};

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [color, setColor] = useState<StatusType>(null);
  const [message, setMessage] = useState<string>("");
  function handleAlert(message: string, color: StatusType) {
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
