import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import LandingPageLayout from "@/Layouts/LandingPageLayout";
import jVideo from "@public/landingPage.mp4";

const LandingPage = () => {
    const [contentTopPadding, setContentTopPadding] = useState(0);
    const [contentTopVideoPadding, setContentTopVideoPadding] = useState(0);

    useEffect(() => {
        const bodyHeight = $("body").outerHeight(true);
        const btnDaftarHeight = $("#btn-daftar").outerHeight(true);
        setContentTopPadding(bodyHeight * 0.5 - btnDaftarHeight);

        const videoHeight = $("video").outerHeight(true);
        setContentTopVideoPadding(bodyHeight * 0.5 - videoHeight * 0.5);
    }, []);
    return (
        <LandingPageLayout>
            <div
                className="flex"
                id="jumbotron"
                style={{ paddingTop: `${contentTopPadding}px` }}
            >
                <div className="font-quicksand">
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-700 ">
                        Kuliah Praktik, Industrial, Magang
                    </h1>
                    <p className="text-6xl font-bold tracking-tight text-[#008797] ">
                        Sesuai{" "}
                        <span className="text-[#008797] underline decoration-yellow-400">
                            Keinginanmu !
                        </span>
                    </p>
                    <div className="mt-10" id="btn-daftar">
                        <Link
                            href={route("register")}
                            className="rounded-3xl bg-gradient-to-tr from-[#008797] to-[#012a2e] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Daftar Sekarang →
                        </Link>
                    </div>
                </div>
                <div>
                    <video
                        autoPlay
                        muted
                        controls
                        loop
                        className="w-1/2 rounded-lg right-0 z-10 absolute max-lg:hidden block"
                        style={{
                            top: `${contentTopVideoPadding}px`,
                        }}
                    >
                        <source src={jVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </LandingPageLayout>
    );
};

export default LandingPage;
