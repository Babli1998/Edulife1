import React, { useState, useEffect } from "react";

const shifts = ["Morning", "Day"];
const batches = ["Soft", "Medium", "Advanced"];

const AdminPanel = () => {
  const [selectedShift, setSelectedShift] = useState("Morning");
  const [selectedBatch, setSelectedBatch] = useState("Soft");

  const [studentsData, setStudentsData] = useState(() => {
    const saved = localStorage.getItem("studentsData");
    return saved
      ? JSON.parse(saved)
      : {
          Morning: { Soft: [], Medium: [], Advanced: [] },
          Day: { Soft: [], Medium: [], Advanced: [] },
        };
  });

  const [newStudent, setNewStudent] = useState("");

  useEffect(() => {
    localStorage.setItem("studentsData", JSON.stringify(studentsData));
  }, [studentsData]);

  const addStudent = () => {
    if (newStudent.trim() === "") return;

    const updated = { ...studentsData };
    updated[selectedShift][selectedBatch].push(newStudent.trim());
    setStudentsData(updated);
    setNewStudent("");
  };

  const removeStudent = (name) => {
    const updated = { ...studentsData };
    updated[selectedShift][selectedBatch] = updated[selectedShift][
      selectedBatch
    ].filter((s) => s !== name);
    setStudentsData(updated);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Panel - Student Editor</h1>

      {/* Shift Selection */}
      <div style={{ marginBottom: "10px" }}>
        {shifts.map((shift) => (
          <button
            key={shift}
            onClick={() => {
              setSelectedShift(shift);
              setSelectedBatch("Soft");
            }}
            style={{
              marginRight: "10px",
              backgroundColor: selectedShift === shift ? "#4caf50" : "#ccc",
              color: "white",
              padding: "10px 12px",
              border: "none",
            
              cursor: "pointer",
              
            }}
          >
            {shift} Shift
          </button>
        ))}
      </div>

      {/* Batch Selection */}
      <div style={{ marginBottom: "10px" }}>
        {batches.map((batch) => (
          <button
            key={batch}
            onClick={() => setSelectedBatch(batch)}
            style={{
              marginRight: "10px",
              backgroundColor: selectedBatch === batch ? "#2196f3" : "#ccc",
              color: "white",
              padding: "6px 12px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {batch} Batch
          </button>
        ))}
      </div>

      {/* Add New Student */}
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter student name"
          value={newStudent}
          onChange={(e) => setNewStudent(e.target.value)}
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button
          onClick={addStudent}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Student
        </button>
      </div>

      {/* Student List */}
      <h3>Students in {selectedShift} Shift - {selectedBatch} Batch</h3>
      <ul>
        {(studentsData[selectedShift][selectedBatch] || []).map((student) => (
          <li key={student} style={{ marginBottom: "8px" }}>
            {student}{" "}
            <button
              onClick={() => removeStudent(student)}
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
