import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function CreateUser({ dokumen, errors }) {
    const form = useForm({
        name: dokumen.nama_lengkap,
        email: dokumen.email,
        password: dokumen.email,
        password_confirmation: dokumen.email,
        dokumen_id: dokumen.id,
    });

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "Pastikan data sesuai.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#3085d6",
            confirmButtonColor: "#d33",
            confirmButtonText: "Ya",
        }).then((result) => {
            if (result.isConfirmed) {
                form.post(route("register.regist"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Berhasil!",
                            text: "Akun Berhasil Dibuat.",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        for (const [key, message] of Object.entries(errors)) {
                            Swal.fire({
                                title: "Gagal!",
                                text: `Gagal: ${message}`,
                                icon: "error",
                            });
                        }
                    },
                    onFinish: () =>
                        form.reset("password", "password_confirmation"),
                });
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} autoComplete="off">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={form.data.name}
                        readOnly
                        required
                    />

                    <InputError className="mt-2" message={form.errors.name} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={form.data.email}
                        readOnly
                        required
                    />

                    <InputError className="mt-2" message={form.errors.email} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={form.data.password}
                        onChange={(e) =>
                            form.setData("password", e.target.value)
                        }
                        required
                    />

                    <InputError
                        className="mt-2"
                        message={form.errors.password}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        value={form.data.password_confirmation}
                        onChange={(e) =>
                            form.setData(
                                "password_confirmation",
                                e.target.value
                            )
                        }
                        required
                    />

                    <InputError
                        className="mt-2"
                        message={form.errors.password_confirmation}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={form.processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
