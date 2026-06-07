const LoadingSpinner = () => (
    <div className="flex min-h-[240px] items-center justify-center px-4 py-20">
        <div className="flex items-center gap-3 rounded-3xl bg-white px-6 py-5 shadow-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-sky-600" />
            <span className="text-sm font-medium text-slate-700">Loading...</span>
        </div>
    </div>
);

export default LoadingSpinner;
