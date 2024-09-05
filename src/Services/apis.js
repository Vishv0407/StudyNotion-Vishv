const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    RESETCOMPLETEUSERDATA_API: BASE_URL + "/auth/reset-complete/userData",
    CHANGEPASSWORD_API: BASE_URL + "/auth/changepassword"
}

export const categories = {
    CATAGORIES_API: BASE_URL + "/course/showAllCategories",
}

export const contactUsEnpoints = {
    CONTACTUS_API: BASE_URL + "/contact-us",
}

export const profileEndpoints = {
    UPDATEPROFILEPICTUTRE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATEPROFILEDETAILS_API: BASE_URL + "/profile/updateProfile",
    DELETEACCOUNT_API: BASE_URL + "/profile/deleteAccount",
}