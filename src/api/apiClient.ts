import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const patchUserName = async (id: any, newName: any) => {
  const response = await apiClient.patch(`/users/${id}`, { name: newName });
  return response.data;
};
