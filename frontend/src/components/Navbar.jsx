import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-100'
    }`;

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <NavLink to="/home" className="text-lg font-semibold text-slate-900">
                    Voting App
                </NavLink>
                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <>
                            <NavLink to="/home" className={linkClass}>
                                Home
                            </NavLink>
                            <NavLink to="/candidates" className={linkClass}>
                                Candidates
                            </NavLink>
                            <NavLink to="/vote" className={linkClass}>
                                Vote
                            </NavLink>
                            <NavLink to="/results" className={linkClass}>
                                Results
                            </NavLink>
                            {user.role === 'admin' && (
                                <NavLink to="/admin/dashboard" className={linkClass}>
                                    Admin
                                </NavLink>
                            )}
                            <NavLink to="/profile" className={linkClass}>
                                Profile
                            </NavLink>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={linkClass}>
                                Login
                            </NavLink>
                            <NavLink to="/register" className={linkClass}>
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
