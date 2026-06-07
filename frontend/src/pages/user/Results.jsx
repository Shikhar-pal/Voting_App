import { useEffect, useState } from 'react';
import api from '../../services/api.js';

const Results = () => {
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadResult = async () => {
            try {
                const response = await api.get('/candidate/vote/count/');
                setSummary(response.data.candidates || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadResult();
    }, []);

    if (loading) {
        return <div className="py-20 text-center text-slate-600">Loading results…</div>;
    }

    if (error) {
        return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>;
    }

    return (
        <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Election results</h1>
                <p className="mt-2 text-sm text-slate-500">Live vote counts sorted by candidate party.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
                {summary.length === 0 ? (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">No results available yet.</div>
                ) : (
                    summary.map((item) => (
                        <div key={item.party} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">Party</p>
                            <p className="mt-3 text-2xl font-semibold text-slate-900">{item.party}</p>
                            <p className="mt-2 text-sm text-slate-500">Votes: {item.count}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default Results;
