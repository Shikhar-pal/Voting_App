import { Link } from 'react-router-dom';

const ErrorPage = () => (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-slate-50 px-4 py-16 text-center">
        <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <h1 className="text-4xl font-semibold text-slate-900">Page not found</h1>
            <p className="mt-4 text-sm text-slate-500">The page you are looking for does not exist or has moved.</p>
            <Link
                to="/home"
                className="mt-8 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
                Back to Home
            </Link>
        </div>
    </div>
);

export default ErrorPage;
