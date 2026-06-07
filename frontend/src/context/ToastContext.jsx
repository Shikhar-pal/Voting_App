import { createContext, useContext, useEffect, useState } from 'react';
import Toast from '../components/Toast.jsx';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!toast) return undefined;
        const timer = window.setTimeout(() => setToast(null), 3500);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const showToast = (type, message) => {
        setToast({ type, message });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast toast={toast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};
