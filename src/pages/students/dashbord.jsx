import axios from "axios";
import {
  BookOpen,
  Users,
  Calendar,
  MapPin,
  CreditCard,
  GraduationCap,
} from "lucide-react";
import {useState,useEffect } from "react";
export default function Dashbord() {
const [totalStudent, setTotalStudent] = useState(0);
  const [loading, setLoading] = useState(true);          
  const backendURL6 = process.env.REACT_APP_API_backendURL6;

  useEffect(() => {
    if (!backendURL6) {
      console.warn("REACT_APP_API_backendURL6 غير معرّف في .env");
      setLoading(false);
      return;
    }

    axios
      .get(backendURL6)
      .then((response) => {
        setTotalStudent(response.data); 
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [backendURL6]);
  const studentCount =
    typeof totalStudent === "object" && totalStudent !== null
      ? totalStudent.totalStudents ??
        totalStudent.totalStudent ??
        totalStudent.count ??
        0
      : totalStudent ?? 0;
  return (
    <div className="table">
      <h1>Dash bourd</h1>
      <h4>Welcom To Student Dashbourd</h4>
      <br />
      <div className="table-dashbourd">
        <div className="total-subject">
          <BookOpen/>
          <br/>
          <label> عدد المواد</label>
          <br />
          <label typeof="number">17</label>
          <br />
        </div>
        <br />
        <div className="total-student">
          <Users/>
          <br/>
          <label> عدد الطلاب</label>
          <br />
           <span>{loading ? "..." : studentCount}</span> 
          <br />
        </div>
        <div className="total-payment">
          < CreditCard/>
          <br/>
          <label>اجمالي الدفعات</label>
          <br />
          <label typeof="number">20</label>
          <br />
        </div>
        <div className="total-exams">
          <Calendar/>
          <br/>
          <label> الامتحانات القادمة</label>
          <br />
          <label typeof="number">16</label>
        </div>

        <div className="total-center">
          <MapPin/>
          <br/>
          <label>  مراكز الامتحان</label>
          <br />
          <label typeof="number">22</label>
        </div>
        <div className="total-specalization">
          <GraduationCap/>
          <br/>
          <label> عدد الاختصاصات</label>
          <br />
          <label typeof="number">50</label>
          <br />
        </div>
        <div className="total-coordintator">
          <Users/>
          <br/>
          <label> عدد الدكاترة</label>
          <br />
          <label typeof="number">6</label>
          <br />
        </div>
      </div>
    </div>
  );
}
