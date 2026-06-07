import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ResetPassword from '../pages/auth/ResetPassword.jsx';
import Home from '../pages/user/Home.jsx';
import CandidateList from '../pages/user/CandidateList.jsx';
import Vote from '../pages/user/Vote.jsx';
import Profile from '../pages/user/Profile.jsx';
import Results from '../pages/user/Results.jsx';
import AdminDashboard from '../pages/admin/Dashboard.jsx';
import AddCandidate from '../pages/admin/AddCandidate.jsx';
import EditCandidate from '../pages/admin/EditCandidate.jsx';
import DeleteCandidate from '../pages/admin/DeleteCandidate.jsx';
import ManageUsers from '../pages/admin/ManageUsers.jsx';
import Settings from '../pages/admin/Settings.jsx';
import AdminResults from '../pages/admin/Results.jsx';
import ErrorPage from '../components/ErrorPage.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import AdminRoute from '../components/AdminRoute.jsx';

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="candidates" element={<CandidateList />} />
                <Route path="vote" element={<Vote />} />
                <Route path="profile" element={<Profile />} />
                <Route path="results" element={<Results />} />
            </Route>
            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }
            >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="candidates/add" element={<AddCandidate />} />
                <Route path="candidates/:candidateId/edit" element={<EditCandidate />} />
                <Route path="candidates/delete" element={<DeleteCandidate />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="settings" element={<Settings />} />
                <Route path="results" element={<AdminResults />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
