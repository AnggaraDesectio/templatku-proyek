<?php

namespace App\Support\Demo;

/**
 * Data demo flavor Proyek "PT Nusantara Digital" (software house, Jakarta).
 *
 * Dunia demo yang koheren: tasks merujuk nama proyek yang ada, tim merujuk
 * proyek yang dikerjakan. Status/stage berbentuk ['label' => .., 'tone' => ..]
 * (tanpa HTML); tone: success | warning | destructive | info.
 */
class ProyekData
{
    public const PERUSAHAAN = 'PT Nusantara Digital';
    public const TOTAL_MINGGU = 12;
    public const MINGGU_INI = 6; // penanda "minggu ini" pada gantt

    public static function rupiah(int $n): string
    {
        return 'Rp'.number_format($n, 0, ',', '.');
    }

    /** @return string[] */
    public static function stages(): array
    {
        return ['Antrian', 'Dikerjakan', 'Review', 'Selesai'];
    }

    /** Proyek: id, nama, klien, progress, deadline, status, rentang minggu gantt, nilai. */
    public static function proyeks(): array
    {
        return [
            ['id' => 1, 'nama' => 'Aplikasi Kasir Kopi Senja',       'klien' => 'Kopi Senja',        'progress' => 75,  'deadline' => '30 Nov 2026', 'status' => ['label' => 'Berjalan',    'tone' => 'info'],        'mulai' => 2, 'selesai' => 10, 'nilai' => 85000000],
            ['id' => 2, 'nama' => 'Website Bank Artha Graha',        'klien' => 'Bank Artha Graha',  'progress' => 100, 'deadline' => '15 Sep 2026', 'status' => ['label' => 'Selesai',     'tone' => 'success'],     'mulai' => 1, 'selesai' => 6,  'nilai' => 120000000],
            ['id' => 3, 'nama' => 'Sistem Informasi PPDB',           'klien' => 'SMA Pelita Bangsa', 'progress' => 40,  'deadline' => '10 Okt 2026', 'status' => ['label' => 'Terlambat',   'tone' => 'destructive'], 'mulai' => 3, 'selesai' => 9,  'nilai' => 60000000],
            ['id' => 4, 'nama' => 'Aplikasi Absensi Mobile',         'klien' => 'PT Cakra Steel',    'progress' => 60,  'deadline' => '20 Des 2026', 'status' => ['label' => 'Berjalan',    'tone' => 'info'],        'mulai' => 4, 'selesai' => 12, 'nilai' => 95000000],
            ['id' => 5, 'nama' => 'Redesign E-commerce Batik Laras', 'klien' => 'Batik Laras',       'progress' => 20,  'deadline' => '15 Jan 2027', 'status' => ['label' => 'Perencanaan', 'tone' => 'warning'],     'mulai' => 8, 'selesai' => 12, 'nilai' => 45000000],
            ['id' => 6, 'nama' => 'Dashboard Logistik Lintas Nusa',  'klien' => 'Lintas Nusa',       'progress' => 90,  'deadline' => '31 Okt 2026', 'status' => ['label' => 'Berjalan',    'tone' => 'info'],        'mulai' => 1, 'selesai' => 8,  'nilai' => 70000000],
        ];
    }

    private static function task(int $id, string $proyek, string $judul, string $assignee, string $deadline, string $stage): array
    {
        $tones = ['Antrian' => 'info', 'Dikerjakan' => 'warning', 'Review' => 'info', 'Selesai' => 'success'];

        return [
            'id' => $id,
            'proyek' => $proyek,
            'judul' => $judul,
            'assignee' => $assignee,
            'deadline' => $deadline,
            'stage' => ['label' => $stage, 'tone' => $tones[$stage] ?? 'info'],
        ];
    }

    /** Tugas: proyek + judul + assignee + deadline + stage kanban. */
    public static function tasks(): array
    {
        return [
            self::task(1,  'Aplikasi Kasir Kopi Senja',      'Wireframe halaman checkout',      'Bagas Pratama', '3 Okt',  'Selesai'),
            self::task(2,  'Aplikasi Kasir Kopi Senja',      'Integrasi pembayaran QRIS',       'Citra Dewi',    '10 Okt', 'Dikerjakan'),
            self::task(3,  'Aplikasi Kasir Kopi Senja',      'Desain struk termal',              'Anya Larasati', '12 Okt', 'Review'),
            self::task(4,  'Website Bank Artha Graha',       'Halaman profil perusahaan',        'Bagas Pratama', '20 Agu', 'Selesai'),
            self::task(5,  'Website Bank Artha Graha',       'Serah terima & dokumentasi',      'Dimas Aryo',    '15 Sep', 'Selesai'),
            self::task(6,  'Sistem Informasi PPDB',          'Formulir pendaftaran online',     'Citra Dewi',    '2 Okt',  'Dikerjakan'),
            self::task(7,  'Sistem Informasi PPDB',          'Migrasi data siswa lama',         'Citra Dewi',    '5 Okt',  'Dikerjakan'),
            self::task(8,  'Sistem Informasi PPDB',          'Cetak kartu peserta',             'Hana Kusuma',   '9 Okt',  'Antrian'),
            self::task(9,  'Aplikasi Absensi Mobile',        'Login dengan PIN karyawan',       'Bagas Pratama', '14 Okt', 'Dikerjakan'),
            self::task(10, 'Aplikasi Absensi Mobile',        'Foto selfie + GPS check-in',      'Citra Dewi',    '18 Okt', 'Review'),
            self::task(11, 'Aplikasi Absensi Mobile',        'Laporan kehadiran bulanan',       'Eka Saputra',   '25 Okt', 'Antrian'),
            self::task(12, 'Redesign E-commerce Batik Laras','Moodboard & arah visual',         'Anya Larasati', '20 Okt', 'Dikerjakan'),
            self::task(13, 'Redesign E-commerce Batik Laras','Ilustrasi motif batik',           'Farah Nabila',  '28 Okt', 'Antrian'),
            self::task(14, 'Dashboard Logistik Lintas Nusa', 'Peta armada real-time',          'Gilang Ramadhan','12 Okt','Dikerjakan'),
            self::task(15, 'Dashboard Logistik Lintas Nusa', 'Testing modul laporan',          'Eka Saputra',   '15 Okt', 'Review'),
            self::task(16, 'Dashboard Logistik Lintas Nusa', 'Optimasi query dashboard',       'Citra Dewi',    '8 Okt',  'Selesai'),
        ];
    }

    /** Tim: nama, peran, proyek yang dikerjakan, utilisasi (%). */
    public static function tims(): array
    {
        return [
            ['id' => 1, 'nama' => 'Anya Larasati',  'peran' => 'UI Designer',        'proyek' => 'Kasir Kopi Senja, E-commerce Batik',   'utilisasi' => 85],
            ['id' => 2, 'nama' => 'Bagas Pratama',  'peran' => 'Frontend Developer', 'proyek' => 'Kasir Kopi Senja, Absensi Mobile',      'utilisasi' => 90],
            ['id' => 3, 'nama' => 'Citra Dewi',     'peran' => 'Backend Developer',  'proyek' => 'PPDB, Absensi Mobile, Logistik',        'utilisasi' => 95],
            ['id' => 4, 'nama' => 'Dimas Aryo',     'peran' => 'Project Manager',    'proyek' => 'Semua proyek berjalan',                 'utilisasi' => 80],
            ['id' => 5, 'nama' => 'Eka Saputra',    'peran' => 'QA Engineer',        'proyek' => 'Absensi Mobile, Dashboard Logistik',    'utilisasi' => 70],
            ['id' => 6, 'nama' => 'Farah Nabila',   'peran' => 'Ilustrator',         'proyek' => 'E-commerce Batik Laras',                'utilisasi' => 55],
            ['id' => 7, 'nama' => 'Gilang Ramadhan','peran' => 'DevOps Engineer',    'proyek' => 'Dashboard Logistik',                    'utilisasi' => 60],
            ['id' => 8, 'nama' => 'Hana Kusuma',    'peran' => 'Copywriter',         'proyek' => 'Bank Artha, PPDB',                      'utilisasi' => 50],
        ];
    }

    /** Angka ringkasan dihitung dari dataset di atas. */
    public static function ringkasan(): array
    {
        $proyeks = self::proyeks();
        $tasks = self::tasks();

        $byStatus = fn (string $label) => count(array_filter($proyeks, fn ($p) => $p['status']['label'] === $label));
        $tugasSelesai = count(array_filter($tasks, fn ($t) => $t['stage']['label'] === 'Selesai'));

        return [
            'perusahaan' => self::PERUSAHAAN,
            'totalProyek' => count($proyeks),
            'proyekBerjalan' => $byStatus('Berjalan'),
            'proyekSelesai' => $byStatus('Selesai'),
            'proyekTerlambat' => $byStatus('Terlambat'),
            'totalNilai' => array_sum(array_column($proyeks, 'nilai')),
            'rataProgress' => (int) round(array_sum(array_column($proyeks, 'progress')) / count($proyeks)),
            'totalTugas' => count($tasks),
            'tugasSelesai' => $tugasSelesai,
            'anggotaTim' => count(self::tims()),
        ];
    }
}
