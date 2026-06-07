import { useEffect, useState } from 'react';
import api from '../../services/api.js';

const SETTINGS_KEY = 'voting_app_election_settings';

const defaultSettings = {
    electionName: 'General Election',
    isOpen: true,
    allowGuestVoting: false,
};

const Settings = () => {
    const [settings, setSettings] = useState(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (saved) {
            setSettings(JSON.parse(saved));
        }
        api.get('/candidate/vote/count/').catch((err) => setError(err.message));
        setLoading(false);
    }, []);

    const updateSettings = (partial) => {
        const next = { ...settings, ...partial };
        setSettings(next);
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    };

    if (loading) {
        return <div className="py-20 text-center text-slate-600">Loading settings…</div>;
    }

    return (
        <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Election Settings</h1>
                <p className="mt-2 text-sm text-slate-500">Manage the election configuration and review system behavior.</p>
            </section>
            {error && <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700">{error}</div>}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">Ballot details</h2>
                    <label className="mt-4 block text-sm font-medium text-slate-700">
                        Election name
                        <input
                            type="text"
                            value={settings.electionName}
                            onChange={(event) => updateSettings({ electionName: event.target.value })}
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />
                    </label>
                    <div className="mt-5 space-y-4">
                        <button
                            type="button"
                            onClick={() => updateSettings({ isOpen: !settings.isOpen })}
                            className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            {settings.isOpen ? 'Close election' : 'Open election'}
                        </button>
                        <button
                            type="button"
                            onClick={() => updateSettings({ allowGuestVoting: !settings.allowGuestVoting })}
                            className="w-full rounded-3xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                        >
                            {settings.allowGuestVoting ? 'Disable guest voting' : 'Enable guest voting'}
                        </button>
                    </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">Current configuration</h2>
                    <dl className="mt-5 space-y-4 text-sm text-slate-700">
                        <div className="rounded-3xl bg-white p-4">
                            <dt className="font-medium">Election name</dt>
                            <dd className="mt-1 text-slate-600">{settings.electionName}</dd>
                        </div>
                        <div className="rounded-3xl bg-white p-4">
                            <dt className="font-medium">Election status</dt>
                            <dd className="mt-1 text-slate-600">{settings.isOpen ? 'Open' : 'Closed'}</dd>
                        </div>
                        <div className="rounded-3xl bg-white p-4">
                            <dt className="font-medium">Guest voting</dt>
                            <dd className="mt-1 text-slate-600">{settings.allowGuestVoting ? 'Enabled' : 'Disabled'}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Settings;
