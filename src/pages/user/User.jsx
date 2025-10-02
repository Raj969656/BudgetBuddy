import React from 'react';
import { useAuthContext } from '../../context/AuthContext.jsx';

const User = () => {
    const { user } = useAuthContext();

    if (!user) {
        return <div>Loading user profile...</div>;
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-lg text-gray-900">{user.name || user.username}</p>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-lg text-gray-900">{user.email}</p>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500">User ID</label>
                    <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded">{user.id || user._id}</p>
                </div>
            </div>
        </div>
    );
};

export default User;

