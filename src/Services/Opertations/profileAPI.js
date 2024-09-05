import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { endpoints, profileEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";

const { UPDATEPROFILEPICTUTRE_API, DELETEACCOUNT_API, UPDATEPROFILEDETAILS_API } = profileEndpoints;

export function updateProfilePicture(formData, setFilePreview) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("PUT", UPDATEPROFILEPICTUTRE_API, formData, {
                "Content-Type": "multipart/form-data",
            });
            console.log("UPDATE PROFILE PICTURE API RESPONSE:", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.data)); // Update the profile in Redux
            localStorage.setItem("user", JSON.stringify(response.data.data));
            toast.success("Profile Picture Updated");
            setFilePreview(null);
        } catch (error) {
            if (error.response?.data?.message === "No image provided") {
                toast.error("Please select an image");
            } else {
                console.log("UPDATE PROFILE PICTURE API ERROR:", error);
                toast.error("Could Not Update Profile Picture");
            }
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function updateProfileDetails(formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("PUT", UPDATEPROFILEDETAILS_API, formData, {
                "Content-Type": "multipart/form-data",
            });
            console.log("UPDATE PROFILE DETAILS API RESPONSE:", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.user)); // Update the profile in Redux
            localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.success("Profile Updated Successfully");
        } catch (error) {
            if (error.response?.data?.message === "All fields are not filled") {
                toast.error("All input fields are not filled");
            } else {
                console.log("UPDATE PROFILE DETAILS API ERROR:", error);
                toast.error("Could Not Update Profile Details");
            }
        } finally {
            toast.dismiss(toastId);
        }
    };
}


export function deleteAccount(userData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("DELETE", DELETEACCOUNT_API, userData);
            console.log("DELETE ACCOUNT API RESPONSE:", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Account deleted successfully");

            // Clear local storage
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Clear Redux store
            dispatch(setToken(null));
            dispatch(setUser(null));

            // Navigate to the homepage
            navigate("/");
        } catch (error) {
            console.log("DELETE ACCOUNT API ERROR:", error);
            toast.error("Unable to delete account");
        } finally {
            toast.dismiss(toastId);
        }
    };
}

