import React from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordSettings = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <div className="bg-richblack-800 p-6 flex flex-col gap-6 rounded-lg border-[1px] border-richblack-700">
        <p className="font-bold">Password</p>
        <form className="flex flex-col justify-between gap-6">
            <div className="flex flex-row gap-6">
                <div className="w-full">
                    <p className="text-richblack-50 text-[14px] mb-2">
                    Current Password <span className="text-pink-400">*</span>
                    </p>
                    <div className="relative">
                    <input
                        type={showPassword1 ? "text" : "password"}
                        required
                        placeholder="**********"
                        name="password"
                        className="input-shadow w-full bg-richblack-700 px-4 py-3 rounded-lg text-richblack-100"
                    />
                    <span
                        onClick={() => setShowPassword1((prev) => !prev)}
                        className="absolute right-4 top-3 text-richblack-200 text-2xl"
                    >
                        {showPassword1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-richblack-50 text-[14px] mb-2">
                    New Password <span className="text-pink-400">*</span>
                    </p>
                    <div className="relative">
                    <input
                        type={showPassword2 ? "text" : "password"}
                        required
                        placeholder="**********"
                        name="password"
                        className="input-shadow w-full bg-richblack-700 px-4 py-3 rounded-lg text-richblack-100"
                    />
                    <span
                        onClick={() => setShowPassword2((prev) => !prev)}
                        className="absolute right-4 top-3 text-richblack-200 text-2xl"
                    >
                        {showPassword2 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                    </div>
                </div>
                </div>

            <div className="flex fle-row gap-4 justify-end">
                <button className="w-fit py-2 px-4 bg-richblack-700 rounded-lg text-richblack-100">
                    cancel
                </button>
                <button
                    type="submit"
                    className="w-fit py-2 px-4 bg-yellow-200 rounded-lg text-black"
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
  );
};

export default PasswordSettings;
