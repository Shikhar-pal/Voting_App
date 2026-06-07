import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const Home = () => {
    const { user } = useAuth();

    return (
        <section className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Welcome back</p>
                        <h1 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">Hi, {user?.name || 'Voter'}.</h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                            Access candidates, cast your vote, and track results in one responsive dashboard.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Link to="/candidates" className="rounded-3xl bg-slate-900 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-slate-800">
                            Browse Candidates
                        </Link>
                        <Link to="/vote" className="rounded-3xl bg-sky-600 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-sky-700">
                            Cast your vote
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Account type</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{user?.role === 'admin' ? 'Admin' : 'Voter'}</p>
                    <p className="mt-2 text-sm text-slate-500">Use the navigation to manage candidates, access results, or update your profile.</p>
                </article>
                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Voting status</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{user?.isVoted ? 'Vote cast' : 'Vote pending'}</p>
                    <p className="mt-2 text-sm text-slate-500">Your ballot is secured with your account profile.</p>
                </article>
                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Voter details</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{user?.aadharCardNumber || 'Not set'}</p>
                    <p className="mt-2 text-sm text-slate-500">Aadhar-connected profile data from the server.</p>
                </article>
            </div>
        </section>
    );
};

export default Home;
