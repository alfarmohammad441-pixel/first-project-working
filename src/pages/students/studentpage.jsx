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
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Student() {
  const navigate = useNavigate();
  const [student, setstudent] = useState([]);
  const backendURL2 = process.env.REACT_APP_API_backendURL2;
  useEffect(() => {
    axios
      .get(backendURL2)
      .then((response) => {
        setstudent(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  function handleAdd() {
    navigate("/addsubject");
  }

  return (
    <>
      <div className="table">
        <h1>Student</h1>{" "}
        <button className="add-student-button" onClick={handleAdd}>
          {" "}
          +Add subject
        </button>
        <TableContainer component={Paper}></TableContainer>
        <div className="search">
          <Search size={30} />
          <input type="text" placeholder="Search..."/>
        </div>
        <button className="studentbutton">filter</button>
        <div className="student">
          <Table className="student-table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell >name</TableCell>
                <TableCell >email</TableCell>
                <TableCell >birthday</TableCell>
                <TableCell >gender</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {student.map((studenttable) => (
                <TableRow key={studenttable.ID}>
                  <TableCell component="th" scope="row">
                    {studenttable.ID}
                  </TableCell>
                  <TableCell >{studenttable.name}</TableCell>
                  <TableCell >{studenttable.email}</TableCell>
                  <TableCell>{studenttable.birthday}</TableCell>
                  <TableCell>{studenttable.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
