import React, { useState, useEffect } from "react";
import axios from "axios";
import "./qlist.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";


function QuestionList() {
  const [qs, setqs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve access token from local storage

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include access token in Authorization header
      },
    };

    axios
      .get("http://65.2.136.44:8000/questions/api/questions/", config)
      .then((response) => {
        setqs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching qs:", error);
      });
  }, []);

  const handleNavigateToSubmit = () => {
    navigate("/submit"); // Navigate to SubmitForm
  };

  return (
    <div className="q-list-container">
      <h2 className="q-list-title">Available Questions</h2>
      <div className="q-list">
        {qs.map((q) => (
          <div key={q.id} className="q-item">
            <div className="q-info">
              <span className="q-name">{q.name}</span>
            </div>
            <a href={`/questions/${q.code}`} className="q-link">
              Solve
            </a>
          </div>
        ))}
      </div>
      <button className="submit-button" onClick={handleNavigateToSubmit}>
        Submit a Question
      </button>
    </div>
  );
}

export default QuestionList;
