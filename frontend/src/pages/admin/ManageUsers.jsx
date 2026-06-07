import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';

const ManageUsers = () => {
    const { user, updatePassword } = useAuth();
    const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setMessage(null);
        const success = await updatePassword(form);
        setSubmitting(false);
        if (success) {
            setMessage('Admin password updated successfully.');
            setForm({ currentPassword: '', newPassword: '' });
        }
    };

    return (
        <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Manage Users</h1>
                <p className="mt-2 text-sm text-slate-500">Update the admin profile and password for account security.</p>
            </section>
            <section className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">Admin profile</h2>
                    <dl className="mt-5 space-y-4 text-sm text-slate-600">
                        <div>
                            <dt className="font-semibold text-slate-800">Name</dt>
                            <dd>{user?.name}</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-slate-800">Aadhar</dt>
                            <dd>{user?.aadharCardNumber}</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-slate-800">Role</dt>
                            <dd>{user?.role}</dd>
                        </div>
                    </dl>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">Change admin password</h2>
                    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                        <label className="block text-sm font-medium text-slate-700">
                            Current password
                            <input
                                type="password"
                                name="currentPassword"
                                value={form.currentPassword}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </label>
                        <label className="block text-sm font-medium text-slate-700">
                            New password
                            <input
                                type="password"
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full rounded-3xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            {submitting ? 'Saving…' : 'Update password'}
                        </button>
                    </form>
                    {message && <p className="mt-4 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-800">{message}</p>}
                </div>
            </section>
        </div>
    );
};

export default ManageUsers;
