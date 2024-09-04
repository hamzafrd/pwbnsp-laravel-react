import React, { useState, useEffect, useRef } from "react";
import { Head, useForm } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";
import ReactSelect from "react-select";

export default function Register() {
    const [provinsiList, setProvinsiList] = useState([]);
    const [kotaList, setKotaList] = useState([]);
    const [kotaLahirList, setKotaLahirList] = useState([]);
    const [agamaList, setAgamaList] = useState([]);

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidTelepon, setIsValidTelepon] = useState(true);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isValidNEM, setIsValidNEM] = useState(true);

    const form = useForm({
        pribumi: "tidak",
        kewarganegaraan: "WNI",
        provinsi: "",
        namaLengkap: "",
        alamatKtp: "",
        alamatDomisili: "",
        regionKtpId: "",
        kecamatan: "",
        nomorTelepon: "",
        nomorHp: "",
        email: "",
        tanggalLahir: "",
        tempatLahir: "",
        jenisKelamin: "",
        statusMenikah: "",
        agama: "",
        nem: "",

        // Conditional, akan terbuat
        // provinsiLahir: "",
        // regionLahirId: "",
        // negaraWNA: "",
    });

    useEffect(() => {
        console.log(form.data);
    }, [form]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        form.setData(name, value);
    };

    const handleChangeFetch = (e, action) => {
        form.setData(action.name, e.value);
    };

    const fetchCities = async (provinceId, isTempatLahir = false) => {
        try {
            const response = await axios.get(`/api/cities/${provinceId}`);
            if (isTempatLahir) {
                setKotaLahirList(response.data);
            } else {
                setKotaList(response.data);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const fetchAgama = async () => {
        try {
            const response = await axios.get(`/api/agama`);
            setAgamaList(response.data);
        } catch (error) {
            console.error("Error fetching agama:", error);
        }
    };

    const validateEmail = (e) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(re.test(String(e.target.value).toLowerCase()));
    };

    const validateNEM = (e) => {
        const re = /^[+-]?\d+(\.\d+)?$/;
        setIsValidNEM(re.test(String(e.target.value).toLowerCase()));
    };

    const validatePhoneNumber = (isPhoneNumber, value) => {
        const phoneNumberRegex = /^\d+$/;
        console.log(value);

        if (isPhoneNumber) {
            setIsValidPhoneNumber(phoneNumberRegex.test(value));
        } else {
            setIsValidTelepon(phoneNumberRegex.test(value));
        }
    };

    const validateForm = () => {
        const isEmpty = Object.keys(form.data).some((key) => !form.data[key]);
        if (isEmpty) {
            alert("Please fill out all fields.");
            return;
        }
        if (!isValidEmail) {
            alert("Please enter a valid email address");
            return;
        }
        if (!isValidNEM) {
            alert("Please enter a valid NEM");
            return;
        }
        if (!isValidPhoneNumber || !isValidTelepon) {
            alert("Isian Nomor harus format angka");
            return;
        }
    };

    const submitForm = () => {
        validateForm();

        Swal.fire({
            title: "Apa Anda Yakin ?",
            text: "Pastikan Data Sudah Benar.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#3085d6",
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                form.post(route("registrasi.mahasiswa-baru"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Success.",
                            text: "Data anda akan diverifikasi oleh admin.",
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

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get("/api/provinces");
                setProvinsiList(response.data);
            } catch (error) {
                Swal.fire("Error", "Error fetching provinces", "error");
            }
        };

        fetchProvinces();
        fetchAgama();
    }, []);

    useEffect(() => {}, [form.data.pribumi]);

    return (
        <Guest>
            <Head title="Registrasi Mahasiswa Baru" />
            <div className="p-8 py-3 mx-auto">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitForm();
                    }}
                >
                    <div className="text-center">
                        <p className="text-2xl">
                            Seleksi Pendaftaran Mahasiswa Baru
                        </p>
                        <p className="text-2xl text-[#008797] font-bold">
                            POLITEKNIK NEGERI JAKARTA
                        </p>
                        <p className="py-2 text-[#1a484e] font-semibold">
                            Form Pendaftaran
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8">
                        <div className="col-span-full">
                            <label
                                htmlFor="namaLengkap"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Nama Lengkap <br />
                                (sesuai ijazah disertasi gelar)
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    placeholder="Nama Lengkap"
                                    type="text"
                                    name="namaLengkap"
                                    id="namaLengkap"
                                    autoComplete="name"
                                    value={form.data.namaLengkap}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="alamatKtp"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Alamat KTP
                            </label>
                            <div className="mt-2">
                                <textarea
                                    required
                                    value={form.data.alamatKtp}
                                    onChange={handleChange}
                                    id="alamatKtp"
                                    name="alamatKtp"
                                    rows="2"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="alamatDomisili"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Alamat Lengkap Saat Ini
                            </label>
                            <div className="mt-2">
                                <textarea
                                    value={form.data.alamatDomisili}
                                    onChange={handleChange}
                                    id="alamatDomisili"
                                    name="alamatDomisili"
                                    rows="2"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-2 col-span-full">
                            <label
                                htmlFor="provinsi"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Provinsi
                            </label>
                            <div className="mt-2">
                                <ReactSelect
                                    options={provinsiList.map((provinsi) => {
                                        return {
                                            value: provinsi.name,
                                            label: provinsi.name,
                                        };
                                    })}
                                    required
                                    name="provinsi"
                                    defaultValue={form.data.provinsi}
                                    autoComplete="address-level1"
                                    placeholder="Pilih atau ketik Provinsi"
                                    onChange={(e, action) => {
                                        handleChangeFetch(e, action);
                                        fetchCities(e.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-2 col-span-full">
                            <label
                                htmlFor="kota"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Kabupaten/Kota
                            </label>
                            <div className="mt-2">
                                <ReactSelect
                                    required
                                    name="regionKtpId"
                                    defaultValue={form.data.regionKtpId}
                                    autoComplete="address-level2"
                                    options={kotaList.map((kota) => {
                                        return {
                                            value: kota.id,
                                            label: kota.name,
                                        };
                                    })}
                                    placeholder="Pilih atau ketik kota"
                                    onChange={(e, action) =>
                                        handleChangeFetch(e, action)
                                    }
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 col-span-full">
                            <label
                                htmlFor="kecamatan"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Kecamatan
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    value={form.data.kecamatan}
                                    onChange={handleChange}
                                    type="text"
                                    name="kecamatan"
                                    id="kecamatan"
                                    autoComplete="address-level3"
                                    placeholder="cth : Cimanggis"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3 col-span-full">
                            <label
                                htmlFor="nomor_telepon"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Nomor Telepon
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    value={form.data.nomorTelepon}
                                    onChange={handleChange}
                                    id="nomor_telepon"
                                    name="nomorTelepon"
                                    type="number"
                                    autoComplete="tel"
                                    onInput={(e) =>
                                        validatePhoneNumber(
                                            false,
                                            e.target.value
                                        )
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                                {!isValidTelepon && (
                                    <p className="text-red-500">
                                        Isian harus format angka
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-3 col-span-full">
                            <label
                                htmlFor="nomor_hp"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Nomor HP
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    value={form.data.nomorHp}
                                    onChange={handleChange}
                                    id="nomor_hp"
                                    name="nomorHp"
                                    type="number"
                                    autoComplete="tel"
                                    onInput={(e) =>
                                        validatePhoneNumber(
                                            true,
                                            e.target.value
                                        )
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                                {!isValidPhoneNumber && (
                                    <p className="text-red-500">
                                        Isian harus format angka
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-6 col-span-full">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    value={form.data.email}
                                    onChange={handleChange}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onInput={validateEmail}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                                {!isValidEmail && (
                                    <p className="text-red-500">
                                        Invalid email format
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="kewarganegaraan"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Kewarganegaraan
                            </label>
                            <div className="mt-2">
                                <select
                                    required
                                    id="kewarganegaraan"
                                    name="kewarganegaraan"
                                    defaultValue={form.data.kewarganegaraan}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-600  sm:text-sm sm:leading-6"
                                >
                                    <option value="WNI">WNI Asli</option>
                                    <option value="WNI Keturunan">
                                        WNI Keturunan
                                    </option>
                                    <option value="WNA">WNA</option>
                                </select>
                            </div>
                        </div>

                        {form.data.kewarganegaraan === "WNA" && (
                            <div className="col-span-full">
                                <label
                                    htmlFor="additionalInput"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Nama Negara WNA
                                </label>
                                <div className="mt-2">
                                    <input
                                        required
                                        defaultValue={form.data.negaraWNA}
                                        onChange={handleChange}
                                        id="additionalInput"
                                        name="negaraWNA"
                                        type="text"
                                        placeholder="ex: Australia"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="md:col-span-2 col-span-full">
                            <label
                                htmlFor="pribumi"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Saya Lahir Di Luar Negara
                            </label>
                            <div className="mt-2">
                                <select
                                    required
                                    id="pribumi"
                                    name="pribumi"
                                    defaultValue={form.data.pribumi}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-600  sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                >
                                    <option value="tidak">Tidak</option>
                                    <option value="ya">Ya</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2 col-span-full">
                            <label
                                htmlFor="tanggal_lahir"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Tanggal Lahir (Sesuai Ijazah)
                            </label>
                            <div className="mt-2">
                                <input
                                    value={form.data.tanggalLahir}
                                    onChange={handleChange}
                                    id="tanggal_lahir"
                                    name="tanggalLahir"
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2 col-span-full">
                            <label
                                htmlFor="tempat_lahir"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Tempat Lahir
                                {form.data.pribumi === "tidak" ? (
                                    <span>(Sesuai Ijazah)</span>
                                ) : (
                                    <span> (Nama Negaranya)</span>
                                )}
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    value={form.data.tempatLahir}
                                    onChange={handleChange}
                                    id="tempat_lahir"
                                    name="tempatLahir"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {form.data.pribumi === "tidak" && (
                            <>
                                <div className="md:col-span-3 col-span-full">
                                    <label
                                        htmlFor="provinsiLahirSelect"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Provinsi Lahir
                                    </label>
                                    <div className="mt-2">
                                        <ReactSelect
                                            id="provinsiLahirSelect"
                                            name="provinsiLahir"
                                            defaultValue={
                                                form.data.provinsiLahir
                                            }
                                            options={provinsiList.map(
                                                (provinsi) => {
                                                    return {
                                                        value: provinsi.name,
                                                        label: provinsi.name,
                                                    };
                                                }
                                            )}
                                            placeholder="Pilh atau ketik provinsi lahir"
                                            onChange={(e, action) => {
                                                handleChangeFetch(e, action);
                                                fetchCities(e.value, true);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-3 col-span-full">
                                    <label
                                        htmlFor="kota_lahir"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Kabupaten/Kota Lahir
                                    </label>
                                    <div className="mt-2">
                                        <ReactSelect
                                            defaultValue={
                                                form.data.regionLahirId
                                            }
                                            id="kotaLahirSelect"
                                            name="regionLahirId"
                                            options={kotaLahirList.map(
                                                (kota) => {
                                                    return {
                                                        value: kota.id,
                                                        label: kota.name,
                                                    };
                                                }
                                            )}
                                            placeholder="Pilh atau ketik kota lahir"
                                            onChange={(e, action) =>
                                                handleChangeFetch(e, action)
                                            }
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <fieldset className="sm:col-span-3 col-span-full">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                Jenis Kelamin
                            </legend>
                            <div className="mt-6 flex gap-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        required
                                        id="push-everything"
                                        name="jenisKelamin"
                                        type="radio"
                                        value="pria"
                                        checked={
                                            form.data.jenisKelamin == "pria"
                                        }
                                        onChange={handleChange}
                                        className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-600"
                                    />
                                    <label
                                        htmlFor="push-everything"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Pria
                                    </label>
                                </div>

                                <div className="flex items-center gap-x-3">
                                    <input
                                        required
                                        id="push-email"
                                        name="jenisKelamin"
                                        type="radio"
                                        value="wanita"
                                        checked={
                                            form.data.jenisKelamin == "wanita"
                                        }
                                        onChange={handleChange}
                                        className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-600"
                                    />
                                    <label
                                        htmlFor="push-email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Wanita
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                        <div className="sm:col-span-3 col-span-full">
                            <label
                                htmlFor="nem"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Nilai NEM
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    value={form.data.nem}
                                    onChange={handleChange}
                                    onInput={validateNEM}
                                    id="nem"
                                    name="nem"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                                {!isValidNEM && (
                                    <p className="text-red-500">
                                        Isian harus angka/decimal cth : 4.00
                                    </p>
                                )}
                            </div>
                        </div>

                        <fieldset className="col-span-full">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                Status Menikah
                            </legend>
                            <div className="mt-6 flex flex-wrap gap-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        required
                                        id="push-everything2"
                                        name="statusMenikah"
                                        type="radio"
                                        value="belum menikah"
                                        checked={
                                            form.data.statusMenikah ==
                                            "belum menikah"
                                        }
                                        onChange={handleChange}
                                        className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-600"
                                    />
                                    <label
                                        htmlFor="push-everything2"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Belum Menikah
                                    </label>
                                </div>

                                <div className="flex items-center gap-x-3">
                                    <input
                                        required
                                        id="push-email2"
                                        name="statusMenikah"
                                        type="radio"
                                        value="menikah"
                                        checked={
                                            form.data.statusMenikah == "menikah"
                                        }
                                        onChange={handleChange}
                                        className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-600"
                                    />
                                    <label
                                        htmlFor="push-email2"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Menikah
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        required
                                        id="push-emails2"
                                        name="statusMenikah"
                                        type="radio"
                                        value="lainnya"
                                        checked={
                                            form.data.statusMenikah == "lainnya"
                                        }
                                        onChange={handleChange}
                                        className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-600"
                                    />
                                    <label
                                        htmlFor="push-emails2"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Lainnya
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="col-span-full">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                Agama
                            </legend>
                            <div className="mt-6 flex flex-wrap gap-6">
                                {agamaList.map((item) => (
                                    <div
                                        className="flex items-center gap-x-3"
                                        key={item.id}
                                    >
                                        <input
                                            required
                                            onChange={handleChange}
                                            id={item.nama}
                                            name="agama"
                                            type="radio"
                                            value={item.nama}
                                            checked={
                                                form.data.agama == item.nama
                                            }
                                            className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-600"
                                        />
                                        <label
                                            htmlFor={item.nama}
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {item.nama}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="rounded-md w-full flex
                         bg-indigo-600 px-3 py-2 justify-center
                         text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <p className="text-center">
                                Buat Akun Mahasiswa Baru &gt;&gt;
                            </p>
                        </button>
                    </div>
                </form>
            </div>
        </Guest>
    );
}
