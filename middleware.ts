// Lokasi File: middleware.ts (di root proyek Anda)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// 1. Definisikan semua bahasa yang didukung dan bahasa default
const locales = ['en', 'id', 'ja', 'ar', 'es', 'ru'];
const defaultLocale = 'en';

// 2. Fungsi untuk mendapatkan preferensi bahasa dari browser pengunjung
function getLocale(request: NextRequest): string {
  // Ambil header 'accept-language' dari request
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Dapatkan daftar bahasa yang didukung oleh browser
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // Cocokkan bahasa browser dengan daftar bahasa kita untuk menemukan yang terbaik
  try {
    return match(languages, locales, defaultLocale);
  } catch (e) {
    // Jika ada error, gunakan bahasa default
    return defaultLocale;
  }
}

// 3. Fungsi middleware utama
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Cek apakah URL yang diakses sudah memiliki awalan bahasa
  // Contoh: /en/about -> tidak hilang
  // Contoh: /id/services -> tidak hilang
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Jika awalan bahasa tidak ada, kita harus melakukan redirect
  if (pathnameIsMissingLocale) {
    // Deteksi bahasa terbaik untuk pengunjung ini
    const locale = getLocale(request);

    // Bentuk URL baru dengan menambahkan awalan bahasa
    // Contoh: jika user ke /services, dan bahasanya 'id', URL baru menjadi /id/services
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

// 4. Konfigurasi Matcher
// Ini memberitahu middleware untuk berjalan di SEMUA request,
// KECUALI untuk file-file internal Next.js dan file aset (gambar, css, dll.)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)',
  ],
};
