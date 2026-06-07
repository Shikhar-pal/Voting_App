import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';

const AddCandidate = () => {
    const [form, setForm] = useState({ name: '', party: '', age: '' });
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setFeedback(null);

        try {
            await api.post('/candidate', { name: form.name, party: form.party, age: Number(form.age) });
            setFeedback({ type: 'success', message: 'Candidate added successfully.' });
            navigate('/admin/dashboard');
        } catch (err) {
            setFeedback({ type: 'error', message: err.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Add Candidate</h1>
                <p className="mt-2 text-sm text-slate-500">Create a new candidate profile for the election.</p>
            </div>
            {feedback && (
                <div className={`rounded-3xl border px-5 py-4 ${feedback.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                    {feedback.message}
                </div>
            )}
            <form className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-slate-700">
                    Candidate name
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
                    Party name
                    <input
                        type="text"
                        name="party"
                        value={form.party}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                    Age
                    <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                </label>
                <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-3xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                    {submitting ? 'Saving…' : 'Create candidate'}
                </button>
            </form>
        </div>
    );
};

export default AddCandidate;
