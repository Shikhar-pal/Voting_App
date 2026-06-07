const CandidateCard = ({ candidate, onVote, adminActions }) => (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="text-xl font-semibold text-slate-900">{candidate.name}</h3>
                <p className="mt-2 text-sm text-slate-500">Party: {candidate.party}</p>
                <p className="mt-1 text-sm text-slate-500">Age: {candidate.age}</p>
            </div>
            <div className="rounded-3xl bg-slate-100 px-4 py-3 text-slate-700">
                <p className="text-sm font-medium">Votes</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{candidate.voteCount || 0}</p>
            </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
            {onVote && (
                <button
                    type="button"
                    onClick={() => onVote(candidate._id)}
                    className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                    Vote
                </button>
            )}
            {adminActions}
        </div>
    </article>
);

export default CandidateCard;
