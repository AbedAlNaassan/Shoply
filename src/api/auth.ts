import axios from './axios';
import {RefreshTokenRequest, RefreshTokenResponse} from '../types/types';

type LoginRequest = {
  email: string;
  password: string;
  token_expires_in?: string;
};

type LoginResponse = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

type SignupResponse = {
  message: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

type VerifyOtpResponse = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    message?: 'OTP verified successfully';
  };
};

export const loginApi = async ({
  email,
  password,
  token_expires_in,
}: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post('/api/auth/login', {
      email,
      password,
      token_expires_in,
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data || {message: 'Login failed'};
  }
};

export const signupUser = async (
  formData: FormData,
): Promise<SignupResponse> => {
  try {
    const response = await axios.post('/api/auth/signup', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || {message: 'Something went wrong'};
  }
};

export const verifyOtp = async (
  email: string,
  otp: string,
): Promise<VerifyOtpResponse> => {
  try {
    if (!email || !otp || otp.length !== 6) {
      throw {message: 'Email and OTP must be provided correctly'};
    }

    const response = await axios.post(
      '/api/auth/verify-otp',
      {email, otp},
      {headers: {'Content-Type': 'application/json'}},
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      throw {message: error.message || 'Something went wrong'};
    }
  }
};

export const resendOtp = async (email: string) => {
  const response = await axios.post('/api/auth/resend-verification-otp', {
    email,
  });
  return response.data;
};

export const refreshTokenApi = async (
  params: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  try {
    const response = await axios.post('/api/auth/refresh-token', params);

    // ✅ Ensure we return only the "data" part that has accessToken and refreshToken
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || {message: 'Token refresh failed'};
  }
};
