// Laporan proyek, nilai kontrak, tahap tugas, ringkasan per proyek.
import { useMemo } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle2, Gauge, Wallet } from 'lucide-react';

interface Ringkasan {
    perusahaan: string;
    totalProyek: number;
    proyekBerjalan: number;
    proyekTerlambat: number;
    totalNilai: number;
    rataProgress: number;
    totalTugas: number;
    tugasSelesai: number;
}

interface Proyek {
    id: number;
    nama: string;
    klien: string;
    progress: number;
    deadline: string;
    status: ToneLabel;
    nilai: number;
}

const fmtRp = (n: number) => `Rp ${Number(n).toLocaleString('id-ID')}`;

export default function ProyekLaporan({
    ringkasan,
    proyeks,
    tasks,
}: {
    ringkasan: Ringkasan;
    proyeks: Record<string, any>[];
    tasks: Record<string, any>[];
}) {
    const rows: Proyek[] = useMemo(
        () =>
            proyeks.map((p, i) => ({
                id: Number(p.id) || i + 1,
                nama: String(p.nama),
                klien: String(p.klien),
                progress: Number(p.progress) || 0,
                deadline: String(p.deadline),
                status: p.status as ToneLabel,
                nilai: Number(p.nilai) || 0,
            })),
        [proyeks],
    );

    // Nilai kontrak per proyek (juta Rp).
    const nilaiChart: ChartData = useMemo(
        () => ({
            labels: rows.map((p) => p.nama.replace(/^Aplikasi |^Website |^Sistem Informasi |^Redesign |^Dashboard /, '')),
            datasets: [
                {
                    label: 'Juta Rp',
                    data: rows.map((p) => Math.round(p.nilai / 1_000_000)),
                },
            ],
        }),
        [rows],
    );

    // Komposisi tahap tugas.
    const stageChart: ChartData = useMemo(() => {
        const stages = ['Antrian', 'Dikerjakan', 'Review', 'Selesai'];
        return {
            labels: stages,
            datasets: [
                {
                    label: 'Tugas',
                    data: stages.map(
                        (s) =>
                            tasks.filter((t: any) => t.stage?.label === s).length,
                    ),
                },
            ],
        };
    }, [tasks]);

    const columns: Column<Proyek>[] = [
        {
            key: 'nama',
            header: 'Proyek',
            render: (r) => (
                <span>
                    <span className="block text-sm font-medium">{r.nama}</span>
                    <span className="text-muted-foreground text-xs">{r.klien}</span>
                </span>
            ),
            sortValue: (r) => r.nama,
        },
        {
            key: 'progress',
            header: 'Progress',
            render: (r) => (
                <span className="flex items-center gap-2">
                    <span className="bg-muted h-2 w-24 overflow-hidden rounded-full">
                        <span
                            className="bg-primary block h-full rounded-full"
                            style={{ width: `${r.progress}%` }}
                        />
                    </span>
                    <span className="tnum text-xs font-semibold">{r.progress}%</span>
                </span>
            ),
            sortValue: (r) => r.progress,
        },
        {
            key: 'nilai',
            header: 'Nilai Kontrak',
            render: (r) => <span className="tnum font-medium">{fmtRp(r.nilai)}</span>,
            sortValue: (r) => r.nilai,
            mobileHidden: true,
        },
        { key: 'deadline', header: 'Deadline', sortValue: (r) => r.deadline },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description={`Ringkasan portofolio ${ringkasan.perusahaan}`}
                breadcrumbs={[{ label: 'Proyek', href: '/proyek' }, { label: 'Laporan' }]}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total Proyek"
                    value={String(ringkasan.totalProyek)}
                    delta={`${ringkasan.proyekBerjalan} berjalan · ${ringkasan.proyekTerlambat} terlambat`}
                    trend={ringkasan.proyekTerlambat > 0 ? 'down' : 'flat'}
                    icon={Briefcase}
                    hint="Semua proyek yang ditangani, berjalan maupun selesai."
                />
                <StatCard
                    label="Nilai Kontrak"
                    value={fmtRp(ringkasan.totalNilai)}
                    delta="akumulasi portofolio"
                    trend="up"
                    icon={Wallet}
                    hint="Total nilai kontrak dari seluruh proyek dalam portofolio."
                />
                <StatCard
                    label="Rata-rata Progress"
                    value={`${ringkasan.rataProgress}%`}
                    delta="seluruh proyek"
                    trend="up"
                    icon={Gauge}
                    hint="Rata-rata penyelesaian seluruh proyek yang berjalan."
                />
                <StatCard
                    label="Tugas Selesai"
                    value={`${ringkasan.tugasSelesai}/${ringkasan.totalTugas}`}
                    delta="dari papan kanban"
                    trend="up"
                    icon={CheckCircle2}
                    hint="Tugas yang sudah selesai dari total tugas di papan."
                />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Nilai Kontrak per Proyek</CardTitle>
                        <p className="text-muted-foreground text-sm">Dalam juta Rupiah.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={nilaiChart} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Tahap Tugas</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Distribusi {ringkasan.totalTugas} tugas di papan kanban.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={stageChart} />
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-4 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Ringkasan Proyek</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'klien']}
                        emptyTitle="Belum ada proyek"
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
