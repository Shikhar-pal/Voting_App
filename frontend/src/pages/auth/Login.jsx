import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import PasswordInput from '../../components/PasswordInput.jsx';

const Login = () => {
    const [form, setForm] = useState({ aadharCardNumber: '', password: '' });
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const success = await login(form);
        setSubmitting(false);
        if (success) {
            navigate('/home');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Login to Voting App</h1>
                <p className="mt-2 text-sm text-slate-500">Access voting and dashboard features with your credentials.</p>
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-slate-700">
                        Aadhar Number
                        <input
                            type="text"
                            name="aadharCardNumber"
                            value={form.aadharCardNumber}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />
                    </label>
                    <PasswordInput
                        label="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-3xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        {submitting ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-slate-500 space-y-3">
                    <p>
                        New to Voting App?{' '}
                        <Link to="/register" className="font-semibold text-sky-600 hover:text-sky-700">
                            Register now
                        </Link>
                    </p>
                    <p>
                        <Link to="/reset-password" className="font-semibold text-sky-600 hover:text-sky-700">
                            Forgot password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
