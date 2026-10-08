// Tim, kartu anggota, peran, proyek yang dikerjakan, utilisasi.
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Anggota {
    id: number;
    nama: string;
    peran: string;
    proyek: string;
    utilisasi: number;
}

function initialsOf(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export default function ProyekTim({ tims }: { tims: Record<string, any>[] }) {
    const rows: Anggota[] = tims.map((t, i) => ({
        id: Number(t.id) || i + 1,
        nama: String(t.nama),
        peran: String(t.peran),
        proyek: String(t.proyek),
        utilisasi: Number(t.utilisasi) || 0,
    }));

    const rataUtilisasi = Math.round(
        rows.reduce((s, r) => s + r.utilisasi, 0) / Math.max(rows.length, 1),
    );

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Tim"
                description={`${rows.length} anggota · utilisasi rata-rata ${rataUtilisasi}%`}
                breadcrumbs={[{ label: 'Proyek', href: '/proyek' }, { label: 'Tim' }]}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {rows.map((m) => (
                    <Card key={m.id} className="shadow-sm">
                        <CardContent className="space-y-4 p-5">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-11 w-11">
                                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                                        {initialsOf(m.nama)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold">{m.nama}</p>
                                    <p className="text-muted-foreground truncate text-xs">{m.peran}</p>
                                </div>
                            </div>

                            <p className="text-muted-foreground min-h-8 text-xs leading-relaxed">
                                {m.proyek}
                            </p>

                            <div>
                                <div className="mb-1.5 flex items-baseline justify-between">
                                    <span className="text-muted-foreground text-xs">Utilisasi</span>
                                    <span
                                        className={cn(
                                            'tnum text-xs font-bold',
                                            m.utilisasi >= 90
                                                ? 'text-destructive'
                                                : 'text-foreground',
                                        )}
                                    >
                                        {m.utilisasi}%
                                    </span>
                                </div>
                                <div className="bg-muted h-2 overflow-hidden rounded-full">
                                    <div
                                        className={cn(
                                            'h-full rounded-full',
                                            m.utilisasi >= 90 ? 'bg-destructive' : 'bg-primary',
                                        )}
                                        style={{ width: `${m.utilisasi}%` }}
                                    />
                                </div>
                                {m.utilisasi >= 90 && (
                                    <p className="text-destructive mt-1 text-xs">
                                        Beban penuh, pertimbangkan redistribusi tugas.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
