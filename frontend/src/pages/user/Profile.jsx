import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import PasswordInput from '../../components/PasswordInput.jsx';

const Profile = () => {
    const { user, updatePassword } = useAuth();
    const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        await updatePassword(form);
        setSubmitting(false);
        setForm({ currentPassword: '', newPassword: '' });
    };

    return (
        <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Your profile</h1>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-5">
                        <p className="text-sm text-slate-500">Name</p>
                        <p className="mt-2 text-base font-medium text-slate-900">{user?.name}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                        <p className="text-sm text-slate-500">Aadhar number</p>
                        <p className="mt-2 text-base font-medium text-slate-900">{user?.aadharCardNumber}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                        <p className="text-sm text-slate-500">Role</p>
                        <p className="mt-2 text-base font-medium text-slate-900">{user?.role}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                        <p className="text-sm text-slate-500">Vote status</p>
                        <p className="mt-2 text-base font-medium text-slate-900">{user?.isVoted ? 'Completed' : 'Pending'}</p>
                    </div>
                </div>
            </section>
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Update password</h2>
                <p className="mt-2 text-sm text-slate-500">Change your password for added account security.</p>
                <form className="mt-6 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
                    <PasswordInput
                        label="Current password"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        required
                    />
                    <PasswordInput
                        label="New password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        disabled={submitting}
                        className="col-span-full rounded-3xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        {submitting ? 'Updating…' : 'Update password'}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Profile;
