import axios from "axios";
import { OFFLINE_MODE, OFFLINE_USER, OFFLINE_DEMO_DATA } from "./offline-mode";
import { toast } from "sonner";

// For web (Vercel): use env var or localhost
// For native (APK): use hardcoded production URL
const isNative = window.Capacitor?.isNativePlatform?.();
const BACKEND_URL = isNative 
  ? 'https://sirius-backend-1hsi.onrender.com'  // APK uses this
  : (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000');  // Web uses this
const API = `${BACKEND_URL}/api`;

// Re-export for convenience
export { OFFLINE_MODE };

// Check if user needs to add their Gemini API key
export const checkGeminiApiKey = async () => {
  if (OFFLINE_MODE) return true;
  
  try {
    const response = await axios.get(`${API}/auth/me`, { withCredentials: true });
    return !!response.data.gemini_api_key;
  } catch (error) {
    return false;
  }
};

// Prompt user to add Gemini API key
export const promptGeminiApiKey = () => {
  toast.error("Você precisa configurar uma API key do Gemini para usar recursos de IA", {
    action: {
      label: "Configurar",
      onClick: () => {
        // Use window.location instead of navigate since this is outside a component
        window.location.href = "/profile?section=gemini";
      }
    },
    duration: 10000
  });
  return false;
};

// Session token management via localStorage
const TOKEN_KEY = "sirius_session_token";

export const isOfflineMode = () => OFFLINE_MODE;

export const getToken = () => {
  if (OFFLINE_MODE) return 'offline_token';
  return localStorage.getItem(TOKEN_KEY);
};
export const setToken = (token) => {
  if (!OFFLINE_MODE) localStorage.setItem(TOKEN_KEY, token);
};
export const clearToken = () => {
  if (!OFFLINE_MODE) localStorage.removeItem(TOKEN_KEY);
};

export const getOfflineUser = () => OFFLINE_USER;
export const getOfflineData = () => OFFLINE_DEMO_DATA;

// Set up global axios interceptor to add Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Always include credentials for cookie fallback
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for 401 responses - clear token and redirect to login
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (OFFLINE_MODE) {
      const offlineError = new Error('Modo offline - dados locais');
      (offlineError).isOfflineError = true;
      return Promise.reject(offlineError);
    }
    if (error.response?.status === 401) {
      clearToken();
      const path = window.location.pathname;
      if (path !== '/login' && path !== '/register' && path !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
