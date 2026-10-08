<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\ProyekData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman flavor Proyek (Inertia). */
class ProyekController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('proyek/index', [
            'ringkasan' => ProyekData::ringkasan(),
            'proyeks' => ProyekData::proyeks(),
            'tasks' => ProyekData::tasks(),
        ]);
    }

    public function daftar(): Response
    {
        return Inertia::render('proyek/daftar', [
            'proyeks' => ProyekData::proyeks(),
        ]);
    }

    public function kanban(): Response
    {
        return Inertia::render('proyek/kanban', [
            'tasks' => ProyekData::tasks(),
            'stages' => ProyekData::stages(),
            'proyeks' => ProyekData::proyeks(),
        ]);
    }

    public function timeline(): Response
    {
        return Inertia::render('proyek/timeline', [
            'proyeks' => ProyekData::proyeks(),
            'totalMinggu' => ProyekData::TOTAL_MINGGU,
            'mingguIni' => ProyekData::MINGGU_INI,
        ]);
    }

    public function tim(): Response
    {
        return Inertia::render('proyek/tim', [
            'tims' => ProyekData::tims(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('proyek/laporan', [
            'ringkasan' => ProyekData::ringkasan(),
            'proyeks' => ProyekData::proyeks(),
            'tasks' => ProyekData::tasks(),
        ]);
    }
}
