import axios from "axios";
import "./studentpage.css";
import { useEffect, useState } from "react";
export default function AddSubject() {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [coordName, setCoordName] = useState("");
  const [specalizationName, setSpecalizationName] = useState("");
  const [subjectcredithours, setSubjectcredithours] = useState("");
  const [subject, setsubject] = useState([]);
  const backendURL = process.env.REACT_APP_API_backendURL;
  useEffect(() => {
    axios
      .get(backendURL)
      .then((response) => response.data)
      .then((data) => {
        setsubject(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  const handleAddSubject = () => {
    return console.log(subject);
  };

  return (
    <div className="add-subject">
      <h1 className="add-subject-title">add subject</h1>
      <h3 className="add-subject-subtitle">fill the form to add subject</h3>
      <div className="add-subject-container">
        <div className="add-subject-row">
          <label>Subject Name</label>
          <br />
          <input
            aria-label="Subject name"
            placeholder="subject name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
        </div>
        <div className="add-subject-row">
          <label>Subject Code</label>
          <br />
          <input
            aria-label="Subject code"
            placeholder="subject code
          "
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
          />
        </div>

        <div className="add-subject-row">
          <label>Coord Name</label>
          <br />
          <select
            aria-label="Coord name"
            placeholder="Coord name"
            value={coordName}
            onChange={(e) => setCoordName(e.target.value)}
          >
            <option value="Dr. Ahmed">Dr. Ahmed</option>
            <option value="Dr. Mohamed">Dr. Mohamed</option>
            <option value="Dr. Ali">Dr. Ali</option>
          </select>
        </div>
        <div className="add-subject-row">
          <label>Specalization Name</label>
          <br />
          <select
            aria-label="Specalization name"
            placeholder="specalization name"
            value={specalizationName}
            onChange={(e) => setSpecalizationName(e.target.value)}
          >
            <option value="computer-science">Computer Science</option>
            <option value="software-engineering">Software Engineering</option>
          </select>
        </div>

        <div className="add-subject-row">
          <label>Subject credithours</label>
          <br />
          <input
            aria-label="Subject credithours"
            placeholder="subject credithours"
            value={subjectcredithours}
            onChange={(e) => setSubjectcredithours(e.target.value)}
          />
        </div>

        <div className="add-subject-actions">
          <button
            className="add-subject-button"
            type="button"
            onClick={handleAddSubject}
          >
            +Add subject
          </button>
        </div>
      </div>
    </div>
  );
}
