import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./qdetail.css"; // Import the CSS file

function QuestionDetail() {
  const { code } = useParams();
  const [problem, setProblem] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("c"); // Default to 'c'
  const [submitting, setSubmitting] = useState(false);
  const [responseOutput, setResponseOutput] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve access token from local storage

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include access token in Authorization header
      },
    };
    axios
      .get(`http://65.2.136.44:8000/questions/api/questions/${code}/`, config)
      .then((response) => {
        setProblem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching problem detail:", error);
      });
  }, [code]);

  const handleSubmit = () => {
    setSubmitting(true);
    console.log("Submitted code:", codeInput);
    console.log("Selected language:", selectedLanguage);

    const formData = new URLSearchParams();
    formData.append("lang", selectedLanguage);
    formData.append("question_code", code); // Assuming problemCode is available
    formData.append("code", codeInput);
    console.log(code)
    console.log(codeInput)

    const accessToken = localStorage.getItem("accessToken"); // Retrieve access token from local storage

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include access token in Authorization header
      },
    };

    axios.post("http://65.2.136.44:8000/questions/api/run/", formData, config)
      .then((response) => {
        console.log("Response:", response.data);
        setResponseOutput(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setCodeInput("");
        setSubmitting(false);
      });

  };

  if (!problem) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="q-detail-container">
      <h2 className="q-detail-title">{problem.name}</h2>
      <div className="q-detail-content">
        <div className="q-statement">{problem.statement}</div>
      </div>
      <div className="language-select">
        <label htmlFor="language">Select Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="java">Java</option>
        </select>
      </div>
      <textarea
        className="code-input"
        placeholder="Enter your code here..."
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
      />
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
      {/* Display response output */}
      {responseOutput && (
        <div>
          <h2>Output:</h2>
          <pre>{responseOutput}</pre>
        </div>
      )}
    </div>
  );
}

export default QuestionDetail;
