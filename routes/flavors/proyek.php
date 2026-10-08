<?php

use App\Http\Controllers\Web\ProyekController;
use Illuminate\Support\Facades\Route;

// Flavor Proyek — di-include dari routes/web.php oleh worker lain.
Route::prefix('proyek')->name('proyek.')->group(function () {
    Route::get('/', [ProyekController::class, 'index'])->name('index');
    Route::get('/daftar', [ProyekController::class, 'daftar'])->name('daftar');
    Route::get('/kanban', [ProyekController::class, 'kanban'])->name('kanban');
    Route::get('/timeline', [ProyekController::class, 'timeline'])->name('timeline');
    Route::get('/tim', [ProyekController::class, 'tim'])->name('tim');
    Route::get('/laporan', [ProyekController::class, 'laporan'])->name('laporan');
});
