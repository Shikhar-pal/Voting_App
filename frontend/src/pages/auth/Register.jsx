import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import PasswordInput from '../../components/PasswordInput.jsx';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        age: '',
        email: '',
        mobile: '',
        address: '',
        aadharCardNumber: '',
        password: '',
        role: 'voter',
    });
    const [submitting, setSubmitting] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const payload = {
            ...form,
            age: Number(form.age),
            aadharCardNumber: Number(form.aadharCardNumber),
        };

        const success = await register(payload);
        setSubmitting(false);
        if (success) {
            navigate('/home');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Create a new account</h1>
                <p className="mt-2 text-sm text-slate-500">Register as a voter or admin and start using the voting platform.</p>
                <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-slate-700">
                            Full name
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </label>
                        <label className="block text-sm font-medium text-slate-700">
                            Age
                            <input
                                type="number"
                                min="18"
                                name="age"
                                value={form.age}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </label>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-slate-700">
                            Email address
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </label>
                        <label className="block text-sm font-medium text-slate-700">
                            Mobile number
                            <input
                                type="tel"
                                name="mobile"
                                value={form.mobile}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </label>
                    </div>
                    <label className="block text-sm font-medium text-slate-700">
                        Address
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />
                    </label>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-slate-700">
                            Aadhar number
                            <input
                                type="text"
                                name="aadharCardNumber"
                                value={form.aadharCardNumber}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </label>
                        <PasswordInput
                            label="Password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <label className="block text-sm font-medium text-slate-700">
                        Account type
                        <select
                            value={form.role}
                            name="role"
                            onChange={handleChange}
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        >
                            <option value="voter">Voter</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-3xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        {submitting ? 'Registering…' : 'Create account'}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-500">
                    Already registered?{' '}
                    <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-700">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
