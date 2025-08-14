import { Outlet } from "react-router-dom";

import "./app.css";

import Navbar from "./components/Navbar";
import Container from "./components/Container";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
