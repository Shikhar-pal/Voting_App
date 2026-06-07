import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput.jsx';

const ResetPassword = () => {
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setSubmitting(true);
        try {
            setMessage('If this email exists, a reset confirmation has been sent.');
            setTimeout(() => navigate('/login'), 1100);
        } catch (err) {
            setError('Unable to reset password at this time.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Reset your password</h1>
                <p className="mt-2 text-sm text-slate-500">Enter your email and choose a new password to reset your account.</p>
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-slate-700">
                        Email address
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />
                    </label>
                    <PasswordInput
                        label="New password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <PasswordInput
                        label="Confirm password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {error && <div className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
                    {message && <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-3xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        {submitting ? 'Resetting…' : 'Reset password'}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-500">
                    Remembered your password?{' '}
                    <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-700">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
