import axios from 'axios';

// Configure axios base URL for API calls in all environments
// Set REACT_APP_API_URL in your environment (e.g., Vercel project settings)
// Example: https://your-api.example.com or https://your-vercel-backend.vercel.app
const baseURL = process.env.REACT_APP_API_URL || '';
axios.defaults.baseURL = baseURL;

// Attach Authorization header if token exists on initial load
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
