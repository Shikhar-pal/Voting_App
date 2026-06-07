import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import api from '../../services/api.js';
import CandidateCard from '../../components/CandidateCard.jsx';

const Vote = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const { user, loadProfile } = useAuth();

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

    const handleVote = async (candidateId) => {
        setError(null);
        setSubmitting(true);
        try {
            await api.post(`/candidate/vote/${candidateId}`);
            await loadProfile();
            const response = await api.get('/candidate');
            setCandidates(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="py-20 text-center text-slate-600">Loading vote page…</div>;
    }

    if (error) {
        return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>;
    }

    return (
        <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Vote for your favorite candidate</h1>
                        <p className="mt-2 text-sm text-slate-500">Only one vote per voter is allowed. Admin users cannot vote.</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                        {user?.isVoted ? 'You have voted' : 'Vote is available'}
                    </span>
                </div>
            </div>
            {user?.isVoted && (
                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
                    You already cast a vote. Results are available on the Results page.
                </div>
            )}
            <div className="grid gap-5 md:grid-cols-2">
                {candidates.map((candidate) => (
                    <CandidateCard
                        key={candidate._id}
                        candidate={candidate}
                        onVote={!user?.isVoted && user?.role !== 'admin' ? handleVote : null}
                        adminActions={null}
                    />
                ))}
            </div>
            {submitting && <div className="text-sm text-slate-600">Submitting vote…</div>}
        </section>
    );
};

export default Vote;
