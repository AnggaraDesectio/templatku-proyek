// Ringkasan proyek "PT Nusantara Digital" (software house).
// Angka kartu dihitung dari dataset ProyekData di controller.
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle2, Gauge, Wallet } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Ringkasan {
    perusahaan: string;
    totalProyek: number;
    proyekBerjalan: number;
    proyekSelesai: number;
    proyekTerlambat: number;
    totalNilai: number;
    rataProgress: number;
    totalTugas: number;
    tugasSelesai: number;
    anggotaTim: number;
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

interface Task {
    id: number;
    proyek: string;
    judul: string;
    assignee: string;
    deadline: string;
    stage: ToneLabel;
}

const fmtRp = (n: number) => `Rp ${Number(n).toLocaleString('id-ID')}`;

function initialsOf(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

const toneClass: Record<string, string> = {
    success: 'bg-success',
    warning: 'bg-warning',
    destructive: 'bg-destructive',
    info: 'bg-info',
};

export default function ProyekIndex({
    ringkasan,
    proyeks,
    tasks,
}: {
    ringkasan: Ringkasan;
    proyeks: Record<string, any>[];
    tasks: Record<string, any>[];
}) {
    const proyekRows: Proyek[] = proyeks.map((p, i) => ({
        id: Number(p.id) || i + 1,
        nama: String(p.nama),
        klien: String(p.klien),
        progress: Number(p.progress) || 0,
        deadline: String(p.deadline),
        status: p.status as ToneLabel,
        nilai: Number(p.nilai) || 0,
    }));

    const taskRows: Task[] = tasks.map((t, i) => ({
        id: Number(t.id) || i + 1,
        proyek: String(t.proyek),
        judul: String(t.judul),
        assignee: String(t.assignee),
        deadline: String(t.deadline),
        stage: t.stage as ToneLabel,
    }));

    const statusLabels = ['Berjalan', 'Selesai', 'Terlambat', 'Perencanaan'];
    const statusDonut: ChartData = {
        labels: statusLabels,
        datasets: [
            {
                label: 'Proyek',
                data: statusLabels.map(
                    (l) => proyekRows.filter((p) => p.status.label === l).length,
                ),
            },
        ],
    };

    const columns: Column<Task>[] = [
        {
            key: 'judul',
            header: 'Tugas',
            render: (r) => (
                <span>
                    <span className="block text-sm font-medium">{r.judul}</span>
                    <span className="text-muted-foreground text-xs">{r.proyek}</span>
                </span>
            ),
            sortValue: (r) => r.judul,
        },
        {
            key: 'assignee',
            header: 'Penanggung jawab',
            render: (r) => (
                <span className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                            {initialsOf(r.assignee)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{r.assignee}</span>
                </span>
            ),
            mobileHidden: true,
            sortValue: (r) => r.assignee,
        },
        { key: 'deadline', header: 'Deadline', sortValue: (r) => r.deadline },
        {
            key: 'stage',
            header: 'Tahap',
            render: (r) => <ToneBadge label={r.stage.label} tone={r.stage.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Proyek"
                description={`${ringkasan.perusahaan} · ${ringkasan.totalProyek} proyek, ${ringkasan.anggotaTim} anggota tim`}
                breadcrumbs={[{ label: 'Proyek' }]}
                actions={
                    <Button size="sm" asChild>
                        <Link href="/proyek/kanban">Buka Kanban</Link>
                    </Button>
                }
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Proyek Berjalan"
                    value={String(ringkasan.proyekBerjalan)}
                    hint="Proyek aktif yang belum selesai, awasi yang terlambat."
                    delta={
                        ringkasan.proyekTerlambat > 0
                            ? `${ringkasan.proyekTerlambat} terlambat`
                            : 'semua sesuai jadwal'
                    }
                    trend={ringkasan.proyekTerlambat > 0 ? 'down' : 'up'}
                    icon={Briefcase}
                />
                <StatCard
                    label="Nilai Kontrak"
                    value={fmtRp(ringkasan.totalNilai)}
                    delta="akumulasi semua proyek"
                    trend="flat"
                    icon={Wallet}
                    hint="Total nilai kontrak dari seluruh proyek dalam portofolio."
                />
                <StatCard
                    label="Rata-rata Progress"
                    value={`${ringkasan.rataProgress}%`}
                    delta="semua proyek"
                    trend="up"
                    icon={Gauge}
                    hint="Rata-rata penyelesaian seluruh proyek yang berjalan."
                />
                <StatCard
                    label="Tugas Selesai"
                    value={`${ringkasan.tugasSelesai}/${ringkasan.totalTugas}`}
                    delta="dari seluruh papan tugas"
                    trend="up"
                    icon={CheckCircle2}
                    hint="Tugas yang sudah selesai dari total tugas di papan."
                />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Status Proyek</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            {ringkasan.proyekSelesai} selesai dari {ringkasan.totalProyek} proyek.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={statusDonut} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Progress Proyek</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Capaian tiap proyek terhadap target.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {proyekRows.map((p) => (
                            <div key={p.id}>
                                <div className="flex items-baseline justify-between gap-2 text-sm">
                                    <p className="min-w-0 truncate font-medium">
                                        {p.nama}{' '}
                                        <span className="text-muted-foreground font-normal">
                                            · {p.klien}
                                        </span>
                                    </p>
                                    <span className="tnum shrink-0 text-xs font-semibold">
                                        {p.progress}%
                                    </span>
                                </div>
                                <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                                    <div
                                        className={`h-full rounded-full ${toneClass[p.status.tone] ?? 'bg-primary'}`}
                                        style={{ width: `${p.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-4 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Tugas Terbaru</CardTitle>
                    <p className="text-muted-foreground text-sm">
                        8 tugas pertama dari papan kanban.
                    </p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={taskRows.slice(0, 8)}
                        searchKeys={['judul', 'proyek', 'assignee']}
                        pageSize={8}
                        emptyTitle="Belum ada tugas"
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
