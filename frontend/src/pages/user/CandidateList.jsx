import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import CandidateCard from '../../components/CandidateCard.jsx';

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCandidates = async () => {
            try {
                const response = await api.get('/candidate');
                setCandidates(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadCandidates();
    }, []);

    if (loading) {
        return <div className="py-20 text-center text-slate-600">Loading candidates…</div>;
    }

    if (error) {
        return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>;
    }

    return (
        <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Candidate list</h1>
                <p className="mt-2 text-sm text-slate-500">Review all candidates currently registered in the election.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
                {candidates.length === 0 ? (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">No candidates found.</div>
                ) : (
                    candidates.map((candidate) => <CandidateCard key={candidate._id} candidate={candidate} />)
                )}
            </div>
        </section>
    );
};

export default CandidateList;
