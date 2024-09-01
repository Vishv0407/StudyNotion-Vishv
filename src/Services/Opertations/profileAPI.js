import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";

const { UPDATEPROFILEPICTUTRE_API } = profileEndpoints;

export async function updateProfilePicture(formData, dispatch, 
  setFilePreview) {
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
            toast.error("No image selected");
        } else if (error.response?.data?.message === "Token is invalid") {
            toast.error("Token is invalid");
        } else if (error.response?.data?.message === "Token is missing") {
            toast.error("Token is missing");
        } else {
            console.log("UPDATE PROFILE PICTURE API ERROR:", error);
            toast.error("Could Not Update Profile Picture");
        }
    } finally {
        toast.dismiss(toastId);
    }
}
