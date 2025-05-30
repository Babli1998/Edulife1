import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentView from "./StudentView";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <Router>
      <div style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
        <nav
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              padding: "8px 16px",
              backgroundColor: "#2196f3",
              color: "white",
              borderRadius: "6px",
            }}
          >
            Student View
          </Link>
          <Link
            to="/admin"
            style={{
              textDecoration: "none",
              padding: "8px 16px",
              backgroundColor: "#4caf50",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Admin Panel
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<StudentView />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
