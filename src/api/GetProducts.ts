import axios from 'axios';

const API_URL = 'https://backend-practice.eurisko.me/api/products'; // Replace with actual URL

export const fetchProducts = async (
  page = 1,
  limit = 8,
  sortBy = 'price',
  order = 'asc',
  token: string,
) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit,
      sortBy,
      order,
    },
  });

  return response.data;
};
