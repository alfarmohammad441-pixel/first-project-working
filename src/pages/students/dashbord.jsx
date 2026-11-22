import axios from "axios";
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
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalSubject, setTotalSubject] = useState(0);
  const [totalpayment, setTotalpayment] = useState(0);
  const [totalcenter, setTotalcenter] = useState(0);
  const [totalspecialization, setTotalspecialization] = useState(0);
  const [Totalexams, setTotalexams] = useState(0);
  const [Totalcoordintator, setTotalcoordintator] = useState(0);
  const [loading, setLoading] = useState(true);
  const backendURL6 = process.env.REACT_APP_API_backendURL6;
  const backendURL7 = process.env.REACT_APP_API_backendURL7;
  const backendURL8 = process.env.REACT_APP_API_backendURL8;
  const backendURL9 = process.env.REACT_APP_API_backendURL9;
  const backendURL10= process.env.REACT_APP_API_backendURL10;
  const backendURL11= process.env.REACT_APP_API_backendURL11;
  const backendURL12= process.env.REACT_APP_API_backendURL12;
  useEffect(() => {
    if (!backendURL6 || !backendURL7 || !backendURL8 || !backendURL9 || !backendURL10 || !backendURL11 || !backendURL12) {
      console.warn("Missing dashboard API URL configuration");
      setLoading(false);
      return;
    }

    Promise.allSettled([
    axios.get(backendURL6),
    axios.get(backendURL7),
    axios.get(backendURL8),
    axios.get(backendURL9),
    axios.get(backendURL10), 
    axios.get(backendURL11), 
    axios.get(backendURL12), 
    ]).then(([studentResult, subjectResult, paymentResult, examsResult, centerResult, specializationResult, coordintatorResult]) => {
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
        console.error("specialization count API error:", specializationResult.reason);
      }

      if (coordintatorResult.status === "fulfilled") {
        setTotalcoordintator(coordintatorResult.value.data);
      } else {
        console.error("coordintator count API error:", coordintatorResult.reason);
      }
      setLoading(false);
    });
  }, [backendURL6, backendURL7, backendURL8, backendURL9, backendURL10, backendURL11, backendURL12]);

  const studentCount =
    typeof totalStudent === "object" && totalStudent !== null
      ? (totalStudent.totalStudent ??
        totalStudent.count ??
        0)
      : (totalStudent ?? 0);

  const subjectCount =
    typeof totalSubject === "object" && totalSubject !== null
      ? (totalSubject.totalSubject ??
        totalSubject.count ??
        0)
      : (totalSubject ?? 0);

       const paymentCount =
    typeof totalpayment === "object" && totalpayment !== null
      ? (totalpayment.totalpayment ??
        totalpayment.count ??
        0)
      : (totalpayment?? 0);

      
       const examsCount =
    typeof Totalexams === "object" && Totalexams !== null
      ? (Totalexams.totalexams ??
        Totalexams.Totalexams ??
        Totalexams.count ??
        0)
      : (Totalexams?? 0);

    const centerCount =
    typeof totalcenter === "object" && totalcenter !== null
      ? (totalcenter.totalcenter ??
        totalcenter.Totalcenter ??
        totalcenter.Totalcenter ??
        totalcenter.count ??
        0)
      : (totalcenter?? 0);

      const specializationCount =
    typeof totalspecialization === "object" && totalspecialization !== null
      ? (totalspecialization.totalspecialization ??
        totalspecialization.totalspecialization ??
        totalspecialization.totalspecialization ??
        totalspecialization.totalspecialization ??
        totalspecialization.count ??
        0)
      : (totalspecialization?? 0);

        const coordintatorCount =
    typeof Totalcoordintator === "object" && Totalcoordintator !== null
      ? (Totalcoordintator.Totalcoordintator ??
        Totalcoordintator.Totalcoordintator ??
        Totalcoordintator.count ??
        0)
      : (Totalcoordintator?? 0);
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
          <label>{loading ? "..." : subjectCount}</label>
          <br />
        </div>
        <br />
        <div className="total-student">
          <Users />
          <br />
          <label> عدد الطلاب</label>
          <br />
          <label>{loading ? "..." : studentCount}</label>
          <br />
        </div>
        <div className="total-payment">
          <CreditCard />
          <br />
          <label>اجمالي الدفعات</label>
          <br />
          <label>{loading ? "..." : paymentCount}</label>
          <br />
        </div>
        <div className="total-exams">
          <Calendar />
          <br />
          <label> الامتحانات القادمة</label>
          <br />
           <label>{loading ? "..." : examsCount}</label>
        </div>

        <div className="total-center">
          <MapPin />
          <br />
          <label> مراكز الامتحان</label>
          <br />
         <label>{loading ? "..." : centerCount}</label>
        </div>
        <div className="total-specalization">
          <GraduationCap />
          <br />
          <label> عدد الاختصاصات</label>
          <br />
          <label>{loading ? "..." : specializationCount}</label>
          <br />
        </div>
        <div className="total-coordintator">
          <Users />
          <br />
          <label> عدد الدكاترة</label>
          <br />
          <label>{loading ? "..." : coordintatorCount}</label>
          <br />
        </div>
      </div>
    </div>
  );
}
