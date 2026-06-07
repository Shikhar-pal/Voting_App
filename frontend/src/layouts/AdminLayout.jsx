import { Link, NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const navLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-2 transition ${isActive ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`;

const AdminLayout = () => (
    <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr] lg:px-6">
            <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 border-b border-slate-200 pb-4">
                    <h2 className="text-lg font-semibold text-slate-900">Admin Control</h2>
                    <p className="mt-1 text-sm text-slate-500">Manage elections, candidates and results.</p>
                </div>
                <nav className="space-y-2">
                    <NavLink to="dashboard" className={navLinkClass}>
                        Dashboard
                    </NavLink>
                    <NavLink to="candidates/add" className={navLinkClass}>
                        Add Candidate
                    </NavLink>
                    <NavLink to="candidates/delete" className={navLinkClass}>
                        Delete Candidate
                    </NavLink>
                    <NavLink to="users" className={navLinkClass}>
                        Manage Users
                    </NavLink>
                    <NavLink to="settings" className={navLinkClass}>
                        Election Settings
                    </NavLink>
                    <NavLink to="results" className={navLinkClass}>
                        Results
                    </NavLink>
                </nav>
            </aside>
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <Outlet />
            </section>
        </div>
    </div>
);

export default AdminLayout;
