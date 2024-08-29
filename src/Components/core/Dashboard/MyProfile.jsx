import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import Sidebar from "./Sidebar";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="relative flex ">
      <Sidebar />
      <div className="text-white">
        <h1>My Profile</h1>

        {/* Section 1 */}
        <div>
          <div>
            <img src={user?.image} alt={user?.firstName} />
            <div>
              <p>{user?.firstName + " " + user?.lastName}</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div>
            <button onClick={() => navigate("/dashboard/settings")}>
              Edit
            </button>
          </div>
        </div>

        {/* Section 2 */}
      </div>
    </div>
  );
};

export default MyProfile;
