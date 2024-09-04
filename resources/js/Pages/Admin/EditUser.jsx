import React, { useState } from "react";
import { useForm } from "@inertiajs/react"; // Assuming you're using Inertia.js with React

function EditUser({ user }) {
    const { data, setData, put } = useForm({
        role: user.role || "user",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.users.update", user.id));
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Edit User Role</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Role:
                    </label>
                    <select
                        name="role"
                        id="role"
                        value={data.role}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditUser;
