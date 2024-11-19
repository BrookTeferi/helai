import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (username: string, password: string) => {
    const response = await axios.post(`${apiUrl}/account_users/login`, { username, password });
    return response.data;
};

export const registerUser = async (username: string, password: string, email: string, role: string) => {
    const response = await axios.post(`${apiUrl}/account_users/registration`, { username, password, email, role });
    return response.data;
};
