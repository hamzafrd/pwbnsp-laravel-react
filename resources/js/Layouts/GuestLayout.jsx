import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <ApplicationLogo
                    href={route("landing-page")}
                    className="w-20 h-20 fill-current text-gray-500"
                />
            </div>

            <div className="m-6 px-6 py-4 bg-white shadow-lg shadow-[#a0d7de] overflow-hidden rounded-3xl">
                {children}
            </div>
        </div>
    );
}
