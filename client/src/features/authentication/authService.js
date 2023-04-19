import axios from 'axios';

const API_URL = '/users/';

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
        .catch(function (error) {
            if (error.response.data) {
                throw new Error(error.response.data);
            }
    })

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
        .catch(function (error) {
            if (error.response.data) {
                throw new Error(error.response.data);
            }
        })
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

// Logout user 
const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    logout,
    login,
}

export default authService