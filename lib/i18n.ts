// File: i18n.ts (atau nama file logika Anda)

// Langsung impor seluruh file JSON gabungan Anda
import translations from "@/locales/locales.json";

export const locales = ["en", "id", "ja", "ar", "es", "ru"];

export const localeNames: Record<string, string> = {
  en: "🇺🇸 English",
  id: "🇮🇩 Indonesia",
  ja: "🇯🇵 日本語",
  ar: "🇸🇦 العربية",
  es: "🇪🇸 Español",
  ru: "🇷🇺 Русский",
};

export const defaultLocale = "en";

// Fungsi getLocale tidak perlu diubah, tapi saya sertakan lagi untuk kelengkapan
// Pastikan Anda sudah menginstal negotiator dan @formatjs/intl-localematcher
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { headers } from "next/headers";

export function getLocale(): string {
    const acceptLanguage = headers().get('accept-language');
    if (!acceptLanguage) {
        return defaultLocale;
    }

    const languages = new Negotiator({
        headers: { 'accept-language': acceptLanguage },
    }).languages();

    return match(languages, locales as any, defaultLocale);
}

// Fungsi getDictionary menjadi jauh lebih sederhana
export const getDictionary = async (locale: string) => {
  // Cek apakah bahasa yang diminta ada di dalam file gabungan kita
  if (Object.keys(translations).includes(locale)) {
    // Jika ada, kembalikan bagian (object) dari bahasa tersebut
    return translations[locale as keyof typeof translations];
  }
  // Jika tidak ada, kembalikan bahasa default
  return translations[defaultLocale as keyof typeof translations];
};
