import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

const Dashboard = ({ listForm = [], user }) => {
    const form = useForm({});

    useEffect(() => {
        const $dataTable = $("#data-table");

        if (!$dataTable.DataTable().settings().length) {
            $dataTable.DataTable({
                responsive: true,
                pageLength: 5,
            });
        }
    }, []);

    const printPdf = (dokumenId, nama_lengkap) => {
        axios({
            url: route("pdf.generate", dokumenId),
            method: "post",
            responseType: "blob",
        })
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute(
                    "download",
                    `bukti-pendaftaran-${dokumenId}-${nama_lengkap}-${new Date().toLocaleDateString()}.pdf`
                );
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("There was an error downloading the PDF:", error);
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Data Akan Hilang Selamanya !",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#3085d6",
            confirmButtonColor: "#d33",
            confirmButtonText: "Hapus!",
        }).then((result) => {
            if (result.isConfirmed) {
                form.delete(route("admin.dokumen.delete", id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    },
                    onError: (err) => {
                        Swal.fire({
                            title: "Gagal !",
                            text: "Gagal : " + err,
                            icon: "error",
                        });
                    },
                });
            }
        });
    };

    return (
        <>
            <Head title="Dashboard" />

            <AuthenticatedLayout user={user}>
                <div className="p-6 bg-white shadow rounded-lg">
                    <h1 className="text-2xl font-bold">Verifikasi Dokumen</h1>

                    <table id="data-table">
                        <thead>
                            <tr>
                                <th>Nama Lengkap</th>
                                <th>Kewarganegaraan</th>
                                <th>NEM</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listForm.length > 0 &&
                                listForm.map((form, index) => (
                                    <tr key={index}>
                                        <td>{form.nama_lengkap}</td>
                                        <td>{form.kewarganegaraan}</td>
                                        <td>{form.nem}</td>
                                        <td>{form.email}</td>
                                        <td>
                                            <p
                                                className={`text-center capitalize rounded-xl ${
                                                    form.status === "pending"
                                                        ? "bg-yellow-500"
                                                        : form.status ===
                                                          "accepted"
                                                        ? "bg-blue-500"
                                                        : form.status === "user"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            >
                                                {form.status}
                                            </p>
                                        </td>
                                        <td className="flex">
                                            {user.role === "admin" && (
                                                <Link
                                                    type="button"
                                                    href={route(
                                                        "admin.dokumen.show",
                                                        form.id
                                                    )}
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                >
                                                    Tinjau Dokumen
                                                </Link>
                                            )}

                                            {form.status === "accepted" &&
                                                user.role === "admin" && (
                                                    <Link
                                                        type="button"
                                                        href={route(
                                                            "admin.users.show",
                                                            form.id
                                                        )}
                                                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                                                    >
                                                        Buat Akun
                                                    </Link>
                                                )}

                                            {form.status !== "user" && (
                                                <Link
                                                    href="#"
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(form.id)
                                                    }
                                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                >
                                                    Delete
                                                </Link>
                                            )}

                                            {(form.status === "accepted" ||
                                                form.status === "user") && (
                                                <a
                                                    type="button"
                                                    href="#"
                                                    onClick={() =>
                                                        printPdf(
                                                            form.id,
                                                            form.nama_lengkap
                                                        )
                                                    }
                                                    className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
                                                >
                                                    Print Bukti
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Dashboard;
