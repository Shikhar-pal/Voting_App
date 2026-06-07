import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api.js';

const EditCandidate = () => {
    const { candidateId } = useParams();
    const [form, setForm] = useState({ name: '', party: '', age: '' });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCandidate = async () => {
            try {
                const response = await api.get('/candidate');
                const candidate = response.data.find((item) => item._id === candidateId);
                if (!candidate) {
                    throw new Error('Candidate not found');
                }
                setForm({ name: candidate.name, party: candidate.party, age: candidate.age.toString() });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadCandidate();
    }, [candidateId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await api.put(`/candidate/${candidateId}`, { name: form.name, party: form.party, age: Number(form.age) });
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="py-20 text-center text-slate-600">Loading candidate…</div>;
    }

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Edit Candidate</h1>
                <p className="mt-2 text-sm text-slate-500">Update candidate details for the registered ballot.</p>
            </div>
            {error && <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700">{error}</div>}
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
                    {submitting ? 'Updating…' : 'Save changes'}
                </button>
            </form>
        </div>
    );
};

export default EditCandidate;
