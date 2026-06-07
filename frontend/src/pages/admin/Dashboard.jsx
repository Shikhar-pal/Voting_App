import { useEffect, useState } from 'react';
import api from '../../services/api.js';

const Dashboard = () => {
    const [candidateCount, setCandidateCount] = useState(0);
    const [voteSummary, setVoteSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [candidateRes, summaryRes] = await Promise.all([
                    api.get('/candidate'),
                    api.get('/candidate/vote/count/'),
                ]);
                setCandidateCount(candidateRes.data.length);
                setVoteSummary(summaryRes.data.candidates || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return <div className="py-20 text-center text-slate-600">Loading admin dashboard…</div>;
    }

    if (error) {
        return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
                <p className="mt-2 text-sm text-slate-500">Monitor candidate registration and voting trends.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Candidates registered</p>
                    <p className="mt-4 text-4xl font-bold text-slate-900">{candidateCount}</p>
                </article>
                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Election status</p>
                    <p className="mt-4 text-4xl font-bold text-slate-900">Live</p>
                </article>
                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Results categories</p>
                    <p className="mt-4 text-4xl font-bold text-slate-900">{voteSummary.length}</p>
                </article>
            </div>
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Top vote counts</h2>
                <div className="mt-5 space-y-4">
                    {voteSummary.length === 0 ? (
                        <p className="text-sm text-slate-500">No vote data available.</p>
                    ) : (
                        voteSummary.slice(0, 5).map((item) => (
                            <div key={item.party} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                <span className="font-medium text-slate-800">{item.party}</span>
                                <span className="text-slate-600">{item.count}</span>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
