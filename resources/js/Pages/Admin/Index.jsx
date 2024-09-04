import React from "react";
import { Link } from "@inertiajs/react"; // Assuming you're using Inertia.js with React

function Index() {
    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <Link
                href={route("admin.users")} // Assuming you have a route helper function similar to Inertia.js
                className="text-blue-500 hover:text-blue-700"
            >
                Manage Users
            </Link>
        </div>
    );
}

export default Index;
