<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bukti Pendaftaran</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            padding: 8px;
            border: 1px solid #ccc;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <th>
                <h1>Bukti Pendaftaran</h1>
            </th>
            <td>
                <h2>NEM : {{ $data['nem'] ?? '-' }}</h2>
                <h3>Status : {{ $data['status'] ?? '-' }}</h3>
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <th>Nama Lengkap</th>
            <td>{{ $data['nama_lengkap'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Alamat KTP</th>
            <td>{{ $data['alamat_ktp'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Alamat Lengkap</th>
            <td>{{ $data['alamat_lengkap'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Provinsi</th>
            <td>{{ $data['region_pribadi_id'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Kota Tempat Lahir</th>
            <td>{{ $data['region_tempat_lahir_id'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Nomor Telepon</th>
            <td>{{ $data['nomor_telepon'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Nomor HP</th>
            <td>{{ $data['nomor_handphone'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>{{ $data['email'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Kewarganegaraan</th>
            <td>{{ $data['kewarganegaraan'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Negara WNA</th>
            <td>{{ $data['negara_wna'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Tanggal Lahir</th>
            <td>{{ $data['tanggal_lahir'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Tempat Lahir</th>
            <td>{{ $data['tempat_lahir'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Jenis Kelamin</th>
            <td>{{ $data['jenis_kelamin'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Status Menikah</th>
            <td>{{ $data['status_menikah'] ?? '-' }}</td>
        </tr>
        <tr>
            <th>Agama</th>
            <td>{{ $data['agama'] ?? '-' }}</td>
        </tr>

    </table>

</body>

</html>
