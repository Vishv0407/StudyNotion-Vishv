import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfileDetails } from "../../../Services/Opertations/profileAPI";

const EditFormSettings = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    contactNumber: user.contactNumber,
    about: user?.additionalDetails.about,
    dateOfBirth: user?.additionalDetails.dateOfBirth,
    gender: user?.additionalDetails.gender || "male",
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues,
  });

  const submitEditForm = (data) => {
    data.token = user.token ? user.token : localStorage.getItem("token");
    dispatch(updateProfileDetails(data));
  };

  // Watch the fields for changes
  const watchFields = watch();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [reset, isSubmitSuccessful]);

  // Compare current field values with default values
  const isFormChanged = Object.keys(defaultValues).some(
    (key) => watchFields[key] !== defaultValues[key]
  );

  return (
    <div className="flex flex-col gap-6 p-8 bg-richblack-800 rounded-lg shadow-lg border-[1px] border-richblack-700">
      <p className="text-lg font-bold">Profile Information</p>
      <form onSubmit={handleSubmit(submitEditForm)} className="flex flex-col">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              className="input-shadow w-full bg-richblack-700 px-4 py-3 rounded-lg text-richblack-100"
              {...register("firstName", { required: "Please enter First Name" })}
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="input-shadow w-full bg-richblack-700 px-4 py-3 rounded-lg text-richblack-100"
              {...register("lastName", { required: "Please enter Last Name" })}
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </div>

          <div>
            <label htmlFor="dateOfBirth">Date Of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className="input-shadow w-full bg-richblack-700 px-4 py-3 rounded-lg text-richblack-100"
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
          </div>

          <div>
            <label htmlFor="gender">Gender</label>
            <div className="flex justify-between input-shadow w-full bg-richblack-700 px-4 py-3 rounded-lg text-richblack-100">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  className="h-4 w-4"
                  {...register("gender", { required: true })}
                />
                <label htmlFor="male">Male</label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  className="h-4 w-4"
                  {...register("gender", { required: true })}
                />
                <label htmlFor="female">Female</label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  className="h-4 w-4"
                  {...register("gender", { required: true })}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              className="input-shadow w-full bg-richblack-700 px-4 py-3 rounded-lg text-richblack-100"
              {...register("contactNumber", {
                required: "Please enter Contact Number",
                minLength: {
                  value: 10,
                  message: "Contact number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Contact number must be 10 digits",
                },
              })}
            />
            {errors.contactNumber && <span>{errors.contactNumber.message}</span>}
          </div>

          <div>
            <label htmlFor="about">About</label>
            <input
              type="text"
              name="about"
              placeholder="Enter Bio Details"
              className="input-shadow w-full bg-richblack-700 px-4 py-3 rounded-lg text-richblack-100"
              {...register("about")}
            />
            {errors.about && <span>{errors.about.message}</span>}
          </div>
        </div>

        <div className="flex flex-row gap-4 justify-end mt-8">
          {isFormChanged && (
            <button 
            type="button" 
            className="w-fit py-2 px-4 bg-richblack-700 rounded-lg text-richblack-100" 
            onClick={() => reset()}
            >
            Cancel
          </button>
          )}
          
          <button type="submit" className="w-fit py-2 px-4 bg-yellow-200 rounded-lg text-black">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFormSettings;
