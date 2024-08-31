import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from './Components/common/Navbar';
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import ResetComplete from "./Pages/ResetComplete";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import PrivateRoute from "./Components/core/Auth/PrivateRoute";
import MyProfile from "./Components/core/Dashboard/MyProfile";
import PurchaseHistory from "./Components/core/Dashboard/PurchaseHistory";
import EnrolledCourses from "./Components/core/Dashboard/EnrolledCourses";
import Settings from "./Components/core/Dashboard/Settings";


function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/update-password/:id" element={<UpdatePassword/>} />
        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="/reset-complete" element={<ResetComplete/>} />

        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<ContactUs/>} />

        <Route path="/dashboard" element={<Dashboard/>} />
        
        
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile/>} />
          <Route path="/dashboard/purchase-history" element={<PurchaseHistory/>} />
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />

          <Route path="/dashboard/settings" element={<Settings/>} />
        </Route>

        <Route path="*" element={<Error />} />


      </Routes>
    </div>
  );
}

export default App;
