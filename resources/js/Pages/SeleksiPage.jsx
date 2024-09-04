import React, { useState, useEffect } from "react";
import LandingPageLayout from "@/Layouts/LandingPageLayout";

const App = ({ listForm }) => {
    const [contentTopPadding, setContentTopPadding] = useState(0);

    useEffect(() => {
        $("#data-table").DataTable({
            responsive: true,
            pageLength: 5,
        });

        const headerHeight = document.querySelector("header").offsetHeight;
        setContentTopPadding(headerHeight);
    }, []);

    return (
        <LandingPageLayout>
            <div
                style={{ marginTop: contentTopPadding + "px" }}
                className="max-w-4xl mx-auto bg-blue-50 p-5 rounded-lg shadow shadow-blue-300"
            >
                <table id="data-table">
                    <thead>
                        <tr>
                            <th>Ranking</th>
                            <th>Nama Lengkap</th>
                            <th>Email</th>
                            <th>NEM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listForm.length > 0 &&
                            listForm.map((form, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{form.nama_lengkap}</td>
                                    <td>{form.email}</td>
                                    <td>{form.nem}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </LandingPageLayout>
    );
};

export default App;
