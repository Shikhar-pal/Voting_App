import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';
import { useToast } from '../hooks/useToast.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('voting_app_user')) || null;
        } catch {
            return null;
        }
    });
    const [token, setToken] = useState(() => localStorage.getItem('voting_app_token'));
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    const setAuthToken = useCallback((nextToken) => {
        if (nextToken) {
            localStorage.setItem('voting_app_token', nextToken);
            api.defaults.headers.common.Authorization = `Bearer ${nextToken}`;
            setToken(nextToken);
        } else {
            localStorage.removeItem('voting_app_token');
            delete api.defaults.headers.common.Authorization;
            setToken(null);
        }
    }, []);

    const saveUser = useCallback((userData) => {
        if (userData) {
            localStorage.setItem('voting_app_user', JSON.stringify(userData));
            setUser(userData);
        } else {
            localStorage.removeItem('voting_app_user');
            setUser(null);
        }
    }, []);

    const loadProfile = useCallback(async () => {
        try {
            const response = await api.get('/user/profile');
            saveUser(response.data.user);
            return response.data.user;
        } catch (error) {
            setAuthToken(null);
            saveUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [saveUser, setAuthToken]);

    useEffect(() => {
        if (token) {
            setAuthToken(token);
            loadProfile().catch(() => {
                /* error already handled in loadProfile */
            });
        } else {
            setLoading(false);
        }
    }, [loadProfile, setAuthToken, token]);

    const login = async ({ aadharCardNumber, password }) => {
        setLoading(true);
        try {
            const response = await api.post('/user/login', { aadharCardNumber, password });
            setAuthToken(response.data.token);
            await loadProfile();
            showToast('success', 'Welcome back!');
            return true;
        } catch (error) {
            showToast('error', error.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (payload) => {
        setLoading(true);
        try {
            const response = await api.post('/user/signup', payload);
            setAuthToken(response.data.token);
            await loadProfile();
            showToast('success', 'Account created successfully');
            return true;
        } catch (error) {
            showToast('error', error.message || 'Registration failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setAuthToken(null);
        saveUser(null);
        showToast('success', 'You have been logged out');
    };

    const updatePassword = async ({ currentPassword, newPassword }) => {
        setLoading(true);
        try {
            await api.put('/user/profile/password', { currentPassword, newPassword });
            showToast('success', 'Password updated successfully');
            return true;
        } catch (error) {
            showToast('error', error.message || 'Update failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, updatePassword, loadProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};