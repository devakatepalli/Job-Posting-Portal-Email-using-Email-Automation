// Add this function at the beginning of the file
export const getJobs = async () => {
    return await api.get('/jobs'); // Adjust based on your job routes
};


import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust this based on your backend URL
});

// User Registration
export const registerCompany = async (data) => {
    return await api.post('/auth/register', data);
};

// User Login
export const loginCompany = async (data) => {
    return await api.post('/auth/login', data);
};

// Post Job
export const postJob = async (data, token) => {
    return await api.post('/jobs', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Send Job Alert
export const sendJobAlert = async (data, token) => {
    return await api.post('/emails/send-alert', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
