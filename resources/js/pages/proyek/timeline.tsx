// Timeline proyek, gantt CSS sederhana 12 minggu.
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Proyek {
    id: number;
    nama: string;
    klien: string;
    progress: number;
    deadline: string;
    status: ToneLabel;
    mulai: number;
    selesai: number;
}

const toneBar: Record<string, string> = {
    success: 'bg-success/70',
    warning: 'bg-warning/70',
    destructive: 'bg-destructive/70',
    info: 'bg-info/70',
};

export default function ProyekTimeline({
    proyeks,
    totalMinggu,
    mingguIni,
}: {
    proyeks: Record<string, any>[];
    totalMinggu: number;
    mingguIni: number;
}) {
    const rows: Proyek[] = proyeks.map((p, i) => ({
        id: Number(p.id) || i + 1,
        nama: String(p.nama),
        klien: String(p.klien),
        progress: Number(p.progress) || 0,
        deadline: String(p.deadline),
        status: p.status as ToneLabel,
        mulai: Number(p.mulai) || 1,
        selesai: Number(p.selesai) || totalMinggu,
    }));

    const weeks = Array.from({ length: totalMinggu }, (_, i) => i + 1);

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Timeline"
                description={`Jadwal ${totalMinggu} minggu · minggu ${mingguIni} adalah minggu berjalan.`}
                breadcrumbs={[{ label: 'Proyek', href: '/proyek' }, { label: 'Timeline' }]}
            />

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Gantt Proyek</CardTitle>
                    <p className="text-muted-foreground text-sm">
                        Bar penuh = rentang jadwal, bagian gelap = progres tercapai.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <div className="min-w-[720px]">
                            {/* Kepala minggu */}
                            <div
                                className="grid gap-1"
                                style={{
                                    gridTemplateColumns: `220px repeat(${totalMinggu}, minmax(0, 1fr))`,
                                }}
                            >
                                <div />
                                {weeks.map((w) => (
                                    <div
                                        key={w}
                                        className={cn(
                                            'pb-2 text-center text-xs font-semibold',
                                            w === mingguIni
                                                ? 'text-primary'
                                                : 'text-muted-foreground',
                                        )}
                                    >
                                        M{w}
                                    </div>
                                ))}
                            </div>

                            {/* Baris proyek */}
                            {rows.map((p) => (
                                <div
                                    key={p.id}
                                    className="grid items-center gap-1 border-t py-3"
                                    style={{
                                        gridTemplateColumns: `220px repeat(${totalMinggu}, minmax(0, 1fr))`,
                                    }}
                                >
                                    <div className="min-w-0 pr-3">
                                        <p className="truncate text-sm font-medium">{p.nama}</p>
                                        <div className="mt-1 flex items-center gap-2">
                                            <ToneBadge label={p.status.label} tone={p.status.tone} />
                                        </div>
                                    </div>
                                    {weeks.map((w) => {
                                        const inRange = w >= p.mulai && w <= p.selesai;
                                        if (!inRange) return <div key={w} />;
                                        const span = p.selesai - p.mulai + 1;
                                        const progressWeeks = Math.round(
                                            (p.progress / 100) * span,
                                        );
                                        const filled = w - p.mulai < progressWeeks;
                                        return (
                                            <div
                                                key={w}
                                                className={cn(
                                                    'h-7 rounded-md',
                                                    filled
                                                        ? (toneBar[p.status.tone] ?? 'bg-primary')
                                                        : 'bg-muted',
                                                    w === mingguIni && 'ring-primary ring-1',
                                                )}
                                                title={`${p.nama} · M${w}`}
                                            />
                                        );
                                    })}
                                </div>
                            ))}

                            {/* Legenda */}
                            <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-4 text-xs">
                                <span className="flex items-center gap-1.5">
                                    <span className="bg-info/70 inline-block h-3 w-3 rounded" />
                                    Sudah dikerjakan
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="bg-muted inline-block h-3 w-3 rounded" />
                                    Terjadwal
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="ring-primary inline-block h-3 w-3 rounded ring-1" />
                                    Minggu berjalan (M{mingguIni})
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
