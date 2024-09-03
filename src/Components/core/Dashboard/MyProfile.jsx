import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import Sidebar from "./Sidebar";
import { FaRegEdit } from "react-icons/fa";


const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-center items-center">
      {/* <Sidebar /> */}
      <div className="text-white p-8 w-full max-w-[840px]">

        <div className="flex flex-col gap-8 ">
        <h1 className="text-3xl">My Profile</h1>
          {/* Section 1 */}
          <div className="bg-richblack-800 flex flex-row justify-between w-full items-center p-6 rounded-xl border-[1px] border-richblack-700">
            <div className="flex flex-row items-center gap-4">
              <img className="w-20 h-20 object-cover rounded-full" src={user?.image} alt={user?.firstName} />
              <div>
                <p className="font-bold text-lg">{user?.firstName + " " + user?.lastName}</p>
                <p className="text-richblack-300">{user?.email}</p>
              </div>
            </div>
            <div>
              <button 
                className="bg-yellow-50 text-black flex items-center py-1 px-4 gap-x-2 rounded-lg"
                onClick={() => navigate("/dashboard/settings")}>
                <FaRegEdit />
                Edit
              </button>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-richblack-800 flex flex-col w-full  p-6 rounded-xl border-[1px] border-richblack-700">
            <div className="flex flex-row justify-between">
              <p className="text-lg font-bold">About</p>
              <button 
                className="bg-yellow-50 text-black flex items-center py-1 px-4 gap-x-2 rounded-lg"
                onClick={() => navigate("/dashboard/settings")}>
                <FaRegEdit />
                Edit
              </button>
            </div>
            <div className="mt-4">
              <p className="text-richblack-300">
                {
                  user?.additionalDetails?.about ? `${user?.additionalDetails?.about}` : "Add your about details"
                }
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
          <div className="bg-richblack-800 flex flex-col w-full  p-6 rounded-xl border-[1px] border-richblack-700">
            <div className="flex flex-row justify-between">
              <p className="text-lg font-bold">Personal Details</p>
              <button 
                className="bg-yellow-50 text-black flex items-center py-1 px-4 gap-x-2 rounded-lg"
                onClick={() => navigate("/dashboard/settings")}>
                <FaRegEdit />
                Edit
              </button>
            </div>
            <div className="mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-richblack-600">First Name</p>
                  <p className="text-richblack-25">{user.firstName}</p>
                </div>
                <div>
                  <p className="text-richblack-600">Last Name</p>
                  <p className="text-richblack-25">{user.lastName}</p>
                </div>
                <div>
                  <p className="text-richblack-600">Email</p>
                  <p className="text-richblack-400">{user.email}</p>
                </div>
                <div>
                  <p className="text-richblack-600">Phone Number</p>
                  <p className="text-richblack-25">{user.contactNumber ? `${user.contactNumber}` : "Add phone number"}</p>
                </div>
                <div>
                  <p className="text-richblack-600">Gender</p>
                  <p className="text-richblack-25">{user?.additionalDetails.gender ? `${user.additionalDetails.gender}` : "Add your gender"}</p>
                </div>
                <div>
                  <p className="text-richblack-600">Date of Birth</p>
                  <p className="text-richblack-25">{user?.additionalDetails.dateOfBirth ? `${user?.additionalDetails.dateOfBirth}` : "Add date of birth"}</p>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MyProfile;
