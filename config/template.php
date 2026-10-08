<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "proyek".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'proyek'),

    'flavors' => array (
  'proyek' => 
  array (
    'label' => 'Proyek',
    'brand_name' => 'Proyek',
    'brand_tagline' => 'Kelola proyek & tim',
    'brand_initials' => 'PR',
    'accent' => '#475569',
    'category' => 'bisnis',
    'home' => 'proyek.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Proyek',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/proyek',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Daftar',
              'to' => '/proyek/daftar',
              'icon' => 'ClipboardList',
            ),
            2 => 
            array (
              'label' => 'Kanban',
              'to' => '/proyek/kanban',
              'icon' => 'SquareKanban',
            ),
            3 => 
            array (
              'label' => 'Timeline',
              'to' => '/proyek/timeline',
              'icon' => 'CalendarDays',
            ),
            4 => 
            array (
              'label' => 'Tim',
              'to' => '/proyek/tim',
              'icon' => 'Users',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/proyek/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
