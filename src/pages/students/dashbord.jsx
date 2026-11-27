import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  BookOpen,
  Users,
  Calendar,
  MapPin,
  CreditCard,
  GraduationCap,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashbord() {
  const [activeexams, setactiveexams] = useState([]);
  const [activeExamsLoading, setActiveExamsLoading] = useState(true);
  const [activeExamsError, setActiveExamsError] = useState(false);
  const [totalStudent, setTotalStudent] = useState(null);
  const [totalSubject, setTotalSubject] = useState(null);
  const [totalpayment, setTotalpayment] = useState(null);
  const [totalcenter, setTotalcenter] = useState(null);
  const [totalspecialization, setTotalspecialization] = useState(null);
  const [Totalexams, setTotalexams] = useState(null);
  const [Totalcoordintator, setTotalcoordintator] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendURL6 = process.env.REACT_APP_API_backendURL6;
  const backendURL7 = process.env.REACT_APP_API_backendURL7;
  const backendURL8 = process.env.REACT_APP_API_backendURL8;
  const backendURL9 = process.env.REACT_APP_API_backendURL9;
  const backendURL10 = process.env.REACT_APP_API_backendURL10;
  const backendURL11 = process.env.REACT_APP_API_backendURL11;
  const backendURL12 = process.env.REACT_APP_API_backendURL12;
  const backendURL13 = process.env.REACT_APP_API_backendURL13;

  useEffect(() => {
    if (!backendURL13) {
      console.warn("Missing active exams API URL configuration");
      setActiveExamsError(true);
      setActiveExamsLoading(false);
      return;
    }

    axios
      .get(backendURL13, { timeout: 10000 })
      .then(({ data }) => {
        if (!Array.isArray(data)) {
          console.error("Active exams API returned an invalid response:", data);
          setActiveExamsError(true);
          return;
        }
        setactiveexams(data);
      })
      .catch((error) => {
        console.error("Active exams API error:", error);
        setActiveExamsError(true);
      })
      .finally(() => setActiveExamsLoading(false));
  }, [backendURL13]);

  useEffect(() => {
    Promise.allSettled(
      [
        backendURL6,
        backendURL7,
        backendURL8,
        backendURL9,
        backendURL10,
        backendURL11,
        backendURL12,
      ].map((url) =>
        url
          ? axios.get(url, { timeout: 10000 })
          : Promise.reject(new Error("Missing dashboard API URL configuration")),
      ),
    ).then(
      ([
        studentResult,
        subjectResult,
        paymentResult,
        examsResult,
        centerResult,
        specializationResult,
        coordintatorResult,
      ]) => {
        if (studentResult.status === "fulfilled") {
          setTotalStudent(studentResult.value.data);
        } else {
          console.error("Student count API error:", studentResult.reason);
        }

        if (subjectResult.status === "fulfilled") {
          setTotalSubject(subjectResult.value.data);
        } else {
          console.error("Subject count API error:", subjectResult.reason);
        }

        if (paymentResult.status === "fulfilled") {
          setTotalpayment(paymentResult.value.data);
        } else {
          console.error("Payment count API error:", paymentResult.reason);
        }

        if (examsResult.status === "fulfilled") {
          setTotalexams(examsResult.value.data);
        } else {
          console.error("exams count API error:", examsResult.reason);
        }

        if (centerResult.status === "fulfilled") {
          setTotalcenter(centerResult.value.data);
        } else {
          console.error("center count API error:", centerResult.reason);
        }

        if (specializationResult.status === "fulfilled") {
          setTotalspecialization(specializationResult.value.data);
        } else {
          console.error(
            "specialization count API error:",
            specializationResult.reason,
          );
        }

        if (coordintatorResult.status === "fulfilled") {
          setTotalcoordintator(coordintatorResult.value.data);
        } else {
          console.error(
            "coordintator count API error:",
            coordintatorResult.reason,
          );
        }
        setLoading(false);
      },
    );
  }, [
    backendURL6,
    backendURL7,
    backendURL8,
    backendURL9,
    backendURL10,
    backendURL11,
    backendURL12,
  ]);

  const studentCount =
    typeof totalStudent === "object" && totalStudent !== null
      ? (totalStudent.totalStudent ?? totalStudent.count ?? null)
      : totalStudent;

  const subjectCount =
    typeof totalSubject === "object" && totalSubject !== null
      ? (totalSubject.totalSubject ?? totalSubject.count ?? null)
      : totalSubject;

  const paymentCount =
    typeof totalpayment === "object" && totalpayment !== null
      ? (totalpayment.totalpayment ?? totalpayment.count ?? null)
      : totalpayment;

  const examsCount =
    typeof Totalexams === "object" && Totalexams !== null
      ? (Totalexams.totalexams ??
        Totalexams.Totalexams ??
        Totalexams.count ??
        null)
      : Totalexams;

  const centerCount =
    typeof totalcenter === "object" && totalcenter !== null
      ? (totalcenter.totalcenter ??
        totalcenter.Totalcenter ??
        totalcenter.Totalcenter ??
        totalcenter.count ??
        null)
      : totalcenter;

  const specializationCount =
    typeof totalspecialization === "object" && totalspecialization !== null
      ? (totalspecialization.totalspecialization ??
        totalspecialization.totalspecialization ??
        totalspecialization.totalspecialization ??
        totalspecialization.totalspecialization ??
        totalspecialization.count ??
        null)
      : totalspecialization;

  const coordintatorCount =
    typeof Totalcoordintator === "object" && Totalcoordintator !== null
      ? (Totalcoordintator.Totalcoordintator ??
        Totalcoordintator.Totalcoordintator ??
        Totalcoordintator.count ??
        null)
      : Totalcoordintator;
  return (
    <div className="table">
      <h1>Dash bourd</h1>
      <h4>Welcom To Student Dashbourd</h4>
      <br />
      <div className="table-dashbourd">
        <div className="total-subject">
          <BookOpen />
          <br />
          <label> عدد المواد</label>
          <br />
          <label>{loading ? "..." : subjectCount ?? "غير متاح"}</label>
          <br />
        </div>
        <br />
        <div className="total-student">
          <Users />
          <br />
          <label> عدد الطلاب</label>
          <br />
          <label>{loading ? "..." : studentCount ?? "غير متاح"}</label>
          <br />
        </div>
        <div className="total-payment">
          <CreditCard />
          <br />
          <label>اجمالي الدفعات</label>
          <br />
          <label>{loading ? "..." : paymentCount ?? "غير متاح"}</label>
          <br />
        </div>
        <div className="total-exams">
          <Calendar />
          <br />
          <label> الامتحانات القادمة</label>
          <br />
          <label>{loading ? "..." : examsCount ?? "غير متاح"}</label>
        </div>

        <div className="total-center">
          <MapPin />
          <br />
          <label> مراكز الامتحان</label>
          <br />
          <label>{loading ? "..." : centerCount ?? "غير متاح"}</label>
        </div>
        <div className="total-specalization">
          <GraduationCap />
          <br />
          <label> عدد الاختصاصات</label>
          <br />
          <label>{loading ? "..." : specializationCount ?? "غير متاح"}</label>
          <br />
        </div>
        <div className="total-coordintator">
          <Users />
          <br />
          <label> عدد الدكاترة</label>
          <br />
          <label>{loading ? "..." : coordintatorCount ?? "غير متاح"}</label>
          <br />
        </div>
      </div>
      <br />
      <TableContainer component={Paper}>
        <br />
        <Table className="active_table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">examdate</TableCell>
              <TableCell align="center">subjectname</TableCell>
              <TableCell align="center">starttime</TableCell>
              <TableCell align="center">endtime</TableCell>
              <TableCell align="center">examname</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {activeExamsLoading ? (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  جارٍ تحميل الامتحانات...
                </TableCell>
              </TableRow>
            ) : activeExamsError ? (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  تعذر تحميل الامتحانات
                </TableCell>
              </TableRow>
            ) : activeexams.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  لا توجد امتحانات نشطة
                </TableCell>
              </TableRow>
            ) : (
              activeexams.map((examstable) => (
                <TableRow key={examstable.ID}>
                  <TableCell align="center">{examstable.ID}</TableCell>
                  <TableCell align="center">{examstable.examdate}</TableCell>
                  <TableCell align="center">{examstable.subjectname}</TableCell>
                  <TableCell align="center">{examstable.starttime}</TableCell>
                  <TableCell align="center">{examstable.endtime}</TableCell>
                  <TableCell align="center">{examstable.examname}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}