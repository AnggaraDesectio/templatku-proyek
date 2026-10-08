// Daftar proyek, kartu dengan progress, deadline, nilai, dan status.
import { useMemo, useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, User } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const toneBar: Record<string, string> = {
    success: 'bg-success',
    warning: 'bg-warning',
    destructive: 'bg-destructive',
    info: 'bg-info',
};

export default function ProyekDaftar({ proyeks }: { proyeks: Record<string, any>[] }) {
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

    const statuses = useMemo(
        () => ['Semua', ...Array.from(new Set(rows.map((p) => p.status.label)))],
        [rows],
    );
    const [active, setActive] = useState('Semua');
    const visible = active === 'Semua' ? rows : rows.filter((p) => p.status.label === active);

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Daftar Proyek"
                description="Semua proyek beserta klien, progres, dan nilai kontraknya."
                breadcrumbs={[{ label: 'Proyek', href: '/proyek' }, { label: 'Daftar' }]}
            />

            <div className="mb-4 flex flex-wrap gap-2">
                {statuses.map((s) => (
                    <Button
                        key={s}
                        size="sm"
                        variant={active === s ? 'default' : 'outline'}
                        onClick={() => setActive(s)}
                    >
                        {s}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visible.map((p) => (
                    <Card key={p.id} className="shadow-sm">
                        <CardContent className="space-y-4 p-5">
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <h3 className="truncate font-semibold">{p.nama}</h3>
                                    <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                                        <User className="h-3.5 w-3.5" /> {p.klien}
                                    </p>
                                </div>
                                <ToneBadge label={p.status.label} tone={p.status.tone} />
                            </div>

                            <div>
                                <div className="mb-1.5 flex items-baseline justify-between text-sm">
                                    <span className="text-muted-foreground text-xs">Progress</span>
                                    <span className="tnum text-xs font-bold">{p.progress}%</span>
                                </div>
                                <div className="bg-muted h-2 overflow-hidden rounded-full">
                                    <div
                                        className={cn(
                                            'h-full rounded-full',
                                            toneBar[p.status.tone] ?? 'bg-primary',
                                        )}
                                        style={{ width: `${p.progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="text-muted-foreground flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    Deadline {p.deadline}
                                </span>
                                <span className="tnum text-sm font-bold text-foreground">
                                    {fmtRp(p.nilai)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {visible.length === 0 && (
                <p className="text-muted-foreground py-10 text-center text-sm">
                    Tidak ada proyek dengan status ini.
                </p>
            )}
        </AuthenticatedLayout>
    );
}
