import axios from "axios";
import "./studentpage.css";
import { useEffect, useState } from "react";
export default function AddPayment() {
  const [payment, setpayment] = useState("");
  const [paymenttype, setpaymenttype] = useState("");
  const [studentname, setstudentname] = useState("");
  const [amount, setamount] = useState("");
  const [subjectname, setsubjectname] = useState("");
  const [status, setstatus] = useState("");
  const backendURL3 = process.env.REACT_APP_API_backendURL3;
  useEffect(() => {
    axios
      .get(backendURL3)
      .then((response) => {
        setpayment(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  const handleAddpayment = () => {
    return console.log(payment);
  };

  return (
    <div className="add-subject">
      <h1 className="add-subject-title">add subject</h1>
      <h3 className="add-subject-subtitle">fill the form to add subject</h3>
      <div className="add-subject-container">
        <div className="add-subject-row">
          <label>payment type</label>
          <br />
          <input
            aria-label="payment type"
            placeholder="payment type"
            value={paymenttype}
            onChange={(e) => setpaymenttype(e.target.value)}
          />
        </div>
        <div className="add-subject-row">
          <label>student name</label>
          <br />
          <input
            aria-label="Subject name"
            placeholder="student name"
            value={studentname}
            onChange={(e) => setstudentname(e.target.value)}
          />
        </div>

        <div className="add-subject-row">
          <label>Coord Name</label>
          <br />
          <select
            aria-label="Coord name"
            placeholder="Coord name"
            value={subjectname}
            onChange={(e) => setsubjectname(e.target.value)}
          >
            <option value="Dr. Ahmed">مهارات الحاسوب</option>
            <option value="Dr. Mohamed">مقدمة بالبرمجة </option>
            <option value="Dr. Ali">انظمة التشغيل</option>
          </select>
        </div>

        <div className="add-subject-row">
          <label>Amount</label>
          <br />
          <input
            aria-label="Amount"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setamount(e.target.value)}
          />
        </div>
        <div className="add-subject-row">
          <label>status</label>
          <br />
          <input
            aria-label="status"
            placeholder="status"
            type="text"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
          />
        </div>

        <div className="add-subject-actions">
          <button
            className="add-subject-button"
            type="button"
            onClick={handleAddpayment}
          >
            +Add payment
          </button>
        </div>
      </div>
    </div>
  );
}
