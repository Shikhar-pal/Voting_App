import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';

const DeleteCandidate = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(null);

    const loadCandidates = async () => {
        setLoading(true);
        try {
            const response = await api.get('/candidate');
            setCandidates(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCandidates();
    }, []);

    const handleDelete = async (candidateId) => {
        setProcessing(candidateId);
        try {
            await api.delete(`/candidate/${candidateId}`);
            setCandidates((current) => current.filter((item) => item._id !== candidateId));
        } catch (err) {
            setError(err.message);
        } finally {
            setProcessing(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Delete Candidate</h1>
                <p className="mt-2 text-sm text-slate-500">Remove a candidate from the election roster.</p>
            </div>
            {error && <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700">{error}</div>}
            <div className="grid gap-5">
                {loading ? (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">Loading candidates…</div>
                ) : candidates.length === 0 ? (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">No candidates available for deletion.</div>
                ) : (
                    candidates.map((candidate) => (
                        <div key={candidate._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-slate-900">{candidate.name}</p>
                                    <p className="mt-1 text-sm text-slate-500">{candidate.party}</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        to={`/admin/candidates/${candidate._id}/edit`}
                                        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(candidate._id)}
                                        disabled={processing === candidate._id}
                                        className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300"
                                    >
                                        {processing === candidate._id ? 'Deleting…' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DeleteCandidate;
