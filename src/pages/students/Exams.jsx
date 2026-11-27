import { useState, useEffect } from "react";
import "./studentpage.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Search } from "lucide-react";
import axios from "axios";

export default function Exams() {
  const [exam, setexam] = useState([]);
  const backendURL4 = process.env.REACT_APP_API_backendURL4;
  useEffect(() => {
    axios
      .get(backendURL4)
      .then((response) => response.data)
      .then((data) => {
        setexam(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  return (
    <>
      <div className="table">
        <h1>Exams</h1>
      

        <TableContainer component={Paper}></TableContainer>
        <div className="search">
          <Search size={30} />
          <input type="text" placeholder="Search..." />
        </div>
        <button className="studentbutton">filter</button>
        <div className="student">
          <Table className="student-table">
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell>subjectname</TableCell>
                <TableCell>email</TableCell>
                <TableCell>code</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>starttime</TableCell>
                <TableCell>endtime</TableCell>
                <TableCell>status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {exam.map((studentexams) => (
                <TableRow key={studentexams.ID}>
                  <TableCell component="th" scope="row">
                    {studentexams.name}
                  </TableCell>
                  <TableCell >
                    {studentexams.subjectname}
                  </TableCell>
                  <TableCell>{studentexams.email}</TableCell>
                  <TableCell>{studentexams.code}</TableCell>
                  <TableCell>{studentexams.Date}</TableCell> 
                  <TableCell>{studentexams.starttime}</TableCell>
                  <TableCell>{studentexams.endtime}</TableCell>
                  <TableCell>{studentexams.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
