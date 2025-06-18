import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { headers } from "next/headers"; // Asumsi penggunaan Next.js, sesuaikan jika berbeda

// 1. Daftar semua kode bahasa yang Anda dukung.
// 'id' digunakan untuk Bahasa Indonesia. Varian 'zh-' (Chinese) dihapus.
export const locales = ["en", "id", "ja", "ar", "es", "ru"];

// 2. Daftar nama bahasa untuk ditampilkan di pemilih bahasa.
export const localeNames: Record<string, string> = {
  en: "🇺🇸 English",
  id: "🇮🇩 Indonesia",
  ja: "🇯🇵 日本語",
  ar: "🇸🇦 العربية",
  es: "🇪🇸 Español",
  ru: "🇷🇺 Русский",
};

// 3. Atur bahasa default.
export const defaultLocale = "en";

// 4. Fungsi untuk mendeteksi bahasa dari browser.
// Fungsi ini tidak perlu diubah.
export function getLocale(): string {
  const acceptLanguage = headers().get('accept-language');
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const languages = new Negotiator({
    headers: { 'accept-language': acceptLanguage },
  }).languages();

  // 'as any' mungkin diperlukan jika ada ketidakcocokan tipe
  return match(languages, locales as any, defaultLocale);
}

// 5. Objek yang memetakan kode bahasa ke file .json yang sesuai.
// Perhatikan 'id' sekarang memuat 'id.json'.
const dictionaries = {
  en: () => import("@/locales/en.json").then((module) => module.default),
  id: () => import("@/locales/id.json").then((module) => module.default),
  ja: () => import("@/locales/ja.json").then((module) => module.default),
  ar: () => import("@/locales/ar.json").then((module) => module.default),
  es: () => import("@/locales/es.json").then((module) => module.default),
  ru: () => import("@/locales/ru.json").then((module) => module.default),
};

// 6. Fungsi untuk mengambil data kamus berdasarkan bahasa.
// Logika untuk 'zh-CN', 'zh-TW' dihapus karena tidak relevan.
export const getDictionary = async (locale: string) => {
  // Jika locale yang diminta tidak ada di daftar kamus, gunakan bahasa default.
  if (!Object.keys(dictionaries).includes(locale)) {
    locale = defaultLocale;
  }

  // 'as keyof typeof dictionaries' untuk keamanan tipe di TypeScript
  return dictionaries[locale as keyof typeof dictionaries]();
};
