import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import logo from "@public/android-chrome-192x192.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";

export default function LandingPageLayout(props) {
    const { canLogin = true, children } = props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: "Pendaftaran Mahasiswa Baru", href: route("register") },
        { name: "Seleksi Mahasiswa Baru", href: route("seleksi") },
    ];

    return (
        <div className="bg-white min-h-screen">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav
                    className="flex items-center justify-between p-6 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1 gap-3">
                        <Link
                            href={route("landing-page")}
                            className="-m-1.5 p-1.5"
                        >
                            <img
                                className="h-12 w-auto"
                                src={logo}
                                alt="Logo"
                            />
                        </Link>
                        <div className="flex flex-col justify-center">
                            <p className="font-bold">
                                Politeknik Negeri Jakarta
                            </p>
                            <p className="text-xs font-semibold">
                                Bangkit, Adaptif dan Terus Melaju
                            </p>
                        </div>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    {canLogin && (
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <Link
                                href={route("login")}
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    )}
                </nav>
                {mobileMenuOpen && (
                    <Dialog
                        onClose={() => setMobileMenuOpen(false)}
                        open={mobileMenuOpen}
                    >
                        <div className="fixed inset-0 z-50" />
                        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <Link href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">
                                        Politeknik Negeri Jakarta
                                    </span>
                                    <img
                                        className="h-8 w-auto"
                                        src={logo}
                                        alt="Logo"
                                    />
                                </Link>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <Link
                                            href={route("login")}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Log in
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </Dialog>
                )}
            </header>

            <div className="relative isolate px-6 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#008797] to-[#012a2e] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>

                {children}

                <div
                    className="absolute inset-x-0 top-[-100px] -z-10 transform-gpu overflow-hidden blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#008797] to-[#1a737b] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
