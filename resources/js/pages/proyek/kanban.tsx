// Papan kanban tugas, kolom per tahap, filter proyek.
import { useMemo, useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';

interface Task {
    id: number;
    proyek: string;
    judul: string;
    assignee: string;
    deadline: string;
    stage: ToneLabel;
}

function initialsOf(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export default function ProyekKanban({
    tasks,
    stages,
    proyeks,
}: {
    tasks: Record<string, any>[];
    stages: string[];
    proyeks: Record<string, any>[];
}) {
    const rows: Task[] = useMemo(
        () =>
            tasks.map((t, i) => ({
                id: Number(t.id) || i + 1,
                proyek: String(t.proyek),
                judul: String(t.judul),
                assignee: String(t.assignee),
                deadline: String(t.deadline),
                stage: t.stage as ToneLabel,
            })),
        [tasks],
    );

    const proyekNames = useMemo(
        () => Array.from(new Set(proyeks.map((p: any) => String(p.nama)))),
        [proyeks],
    );

    const [proyek, setProyek] = useState('semua');
    const visible =
        proyek === 'semua' ? rows : rows.filter((t) => t.proyek === proyek);

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Kanban"
                description="Alur tugas dari antrian sampai selesai."
                breadcrumbs={[{ label: 'Proyek', href: '/proyek' }, { label: 'Kanban' }]}
                actions={
                    <div className="flex items-center gap-2">
                        <Label htmlFor="filter-proyek" className="text-sm whitespace-nowrap">
                            Proyek
                        </Label>
                        <Select value={proyek} onValueChange={setProyek}>
                            <SelectTrigger id="filter-proyek" className="w-56">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="semua">Semua proyek</SelectItem>
                                {proyekNames.map((n) => (
                                    <SelectItem key={n} value={n}>
                                        {n}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                }
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stages.map((stage) => {
                    const cards = visible.filter((t) => t.stage.label === stage);
                    return (
                        <div key={stage} className="flex flex-col gap-3">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-sm font-semibold">{stage}</h3>
                                <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-semibold">
                                    {cards.length}
                                </span>
                            </div>
                            {cards.map((t) => (
                                <Card key={t.id} className="shadow-sm">
                                    <CardContent className="space-y-3 p-4">
                                        <p className="text-sm leading-snug font-medium">{t.judul}</p>
                                        <p className="text-muted-foreground truncate text-xs">
                                            {t.proyek}
                                        </p>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="flex min-w-0 items-center gap-2">
                                                <Avatar className="h-6 w-6 shrink-0">
                                                    <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-semibold">
                                                        {initialsOf(t.assignee)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="truncate text-xs">{t.assignee}</span>
                                            </span>
                                            <span className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
                                                <CalendarDays className="h-3 w-3" /> {t.deadline}
                                            </span>
                                        </div>
                                        <ToneBadge label={t.stage.label} tone={t.stage.tone} />
                                    </CardContent>
                                </Card>
                            ))}
                            {cards.length === 0 && (
                                <p className="text-muted-foreground rounded-xl border border-dashed px-3 py-6 text-center text-xs">
                                    Tidak ada tugas di tahap ini.
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}
