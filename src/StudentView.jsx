import React, { useState, useEffect } from "react";

const shifts = ["Morning", "Day"];
const batches = ["Soft", "Medium", "Advanced"];
const assignmentsCount = 20;

function StudentView() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("studentsData");
    if (saved) return JSON.parse(saved);
    return {
      Morning: {
        Soft: ["Arafat", "Badhon", "Cipto", "Dip", "Ehsan"],
        Medium: ["Fahim", "Gazi", "Habib", "Imran", "Jamal"],
        Advanced: ["Kamal", "Liton", "Milon", "Noman", "Omar"],
      },
      Day: {
        Soft: ["Papon", "Rasel", "Sabbir", "Tushar", "Uzzal"],
        Medium: ["Vicky", "Wahid", "Xavier", "Yusuf", "Zahid"],
        Advanced: ["Alif", "Bappy", "Chandan", "Dewan", "Eshan"],
      },
    };
  });

  const [selectedShift, setSelectedShift] = useState("Morning");
  const [selectedBatch, setSelectedBatch] = useState("Soft");

  const [assignmentStatus, setAssignmentStatus] = useState(() => {
    const saved = localStorage.getItem("assignmentStatus");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("assignmentStatus", JSON.stringify(assignmentStatus));
  }, [assignmentStatus]);

  const toggleAssignment = (student, assignmentIndex) => {
    const key = `${selectedShift}_${selectedBatch}_${student}`;
    const current = assignmentStatus[key] || Array(assignmentsCount).fill(false);
    current[assignmentIndex] = !current[assignmentIndex];
    setAssignmentStatus({
      ...assignmentStatus,
      [key]: current,
    });
  };

  const cellStyle = {
    border: "1px solid #ccc",
    padding: "12px 15px",
    fontWeight: "bold",
    userSelect: "none",
  };

  const assignmentCellStyle = (done) => ({
    border: "1px solid #ccc",
    cursor: "pointer",
    backgroundColor: done ? "red" : "pink",
    transition: "background-color 0.3s ease",
    userSelect: "none",
    fontSize: "20px",
    padding: "12px",
  });

  return (
    <div
      style={{
        maxWidth: "100vw",
        overflowX: "auto",
        padding: "10px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Assignment Tracker (Student View)
      </h1>

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        {shifts.map((shift) => (
          <button
            key={shift}
            style={{
              marginRight: 10,
              backgroundColor: selectedShift === shift ? "#4caf50" : "#ddd",
              color: selectedShift === shift ? "white" : "black",
              padding: "8px 16px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "20px",
            }}
            onClick={() => {
              setSelectedShift(shift);
              setSelectedBatch("Soft");
            }}
          >
            {shift} Shift
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {batches.map((batch) => (
          <button
            key={batch}
            style={{
              marginRight: 8,
              backgroundColor: selectedBatch === batch ? "#2196f3" : "#ddd",
              color: selectedBatch === batch ? "white" : "black",
              padding: "6px 14px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "20px",
            }}
            onClick={() => setSelectedBatch(batch)}
          >
            {batch} Batch
          </button>
        ))}
      </div>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          minWidth: "900px",
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "12px 15px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Student Name
            </th>
            {[...Array(assignmentsCount)].map((_, i) => (
              <th
                key={i}
                style={{
                  border: "1px solid #ccc",
                  padding: "12px 15px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                A{i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(students[selectedShift][selectedBatch] || []).map((student) => (

            <tr key={student}>
              <td style={cellStyle}>{student}</td>
              {[...Array(assignmentsCount)].map((_, idx) => {
                const key = `${selectedShift}_${selectedBatch}_${student}`;
                const done =
                  assignmentStatus[key] && assignmentStatus[key][idx]
                    ? true
                    : false;
                return (
                  <td
                    key={idx}
                    onClick={() => toggleAssignment(student, idx)}
                    style={assignmentCellStyle(done)}
                    title={done ? "Completed" : "Not Completed"}
                  >
                    {done ? "✔️" : "x"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentView;