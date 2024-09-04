import React, { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";

function Users({ users, user }) {
    useEffect(() => {
        $("#data-table").DataTable();
    }, []);

    const form = useForm({});

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Data will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#3085d6",
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                form.delete(route("admin.users.delete", id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Success.",
                            text: "Berhasil Menghapus Akun.",
                            icon: "success",
                        });
                    },
                    onError: (err) => {
                        for (const [key, message] of Object.entries(
                            form.errors
                        )) {
                            Swal.fire({
                                title: "Gagal!",
                                text: `Gagal: ${message}`,
                                icon: "error",
                            });
                        }
                    },
                });
            }
        });
    };

    return (
        <Authenticated user={user}>
            <div className="p-6 bg-white shadow rounded-lg">
                <div className="flex items-center justify-between gap-2">
                    <h1 className="text-2xl font-bold">
                        Manage Users Mahasiswa
                    </h1>
                </div>
                <table className="min-w-full bg-white" id="data-table">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Role</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="py-2">{user.name}</td>
                                <td className="py-2">{user.email}</td>
                                <td className="py-2">{user.role}</td>
                                <td className="py-2 flex items-center gap-3">
                                    <Link
                                        href={route(
                                            "admin.users.edit",
                                            user.id
                                        )}
                                        className="text-blue-500 hover:text-blue-700 bg-blue-200 rounded-md px-2"
                                    >
                                        Edit Role
                                    </Link>
                                    <button
                                        className="text-red-500 hover:text-red-700 bg-red-200 rounded-md px-2"
                                        onClick={() =>
                                            handleDeleteUser(user.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Authenticated>
    );
}

export default Users;
