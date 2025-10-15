export const BASE_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

// Role-specific registration/login
export const REGISTER_CANDIDATE = "/candidate/register";
export const LOGIN_CANDIDATE = "/candidate/login";

export const REGISTER_EMPLOYER = "/employer/register";
export const LOGIN_EMPLOYER = "/employer/login";

// Universal endpoints (same for both roles)
export const VERIFY_OTP = "/user/verify-otp"; // 🎯 Universal
export const GET_USER = "/user/me"; // 🎯 Universal
export const LOGOUT_USER = "/user/logout"; // 🎯 Universal
