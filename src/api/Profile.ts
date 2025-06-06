import axios, {AxiosResponse} from 'axios';
import {API_URL} from './constants';

type UpdateProfileResponse = {
  success: boolean;
  data: {
    message: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      profileImage: {
        url: string;
      };
      isEmailVerified: boolean;
    };
  };
};

type UpdateUserProfileParams = {
  token: string;
  firstName: string;
  lastName: string;
  imageUri?: string | null;
};

export const updateUserProfile = async ({
  token,
  firstName,
  lastName,
  imageUri = null,
}: UpdateUserProfileParams): Promise<UpdateProfileResponse> => {
  try {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);

    if (imageUri) {
      const fileName = imageUri.split('/').pop() || 'photo.jpg';
      const fileType = fileName.split('.').pop() || 'jpg';

      formData.append('profileImage', {
        uri: imageUri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }

    const response: AxiosResponse<UpdateProfileResponse> = await axios.put(
      API_URL,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('Profile updated:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error updating profile:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
