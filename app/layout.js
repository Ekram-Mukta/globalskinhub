import { Tiro_Bangla, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const tiro = Tiro_Bangla({ subsets: ["bengali", "latin"], weight: "400", variable: "--font-tiro", display: "swap" });
const hind = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-hind", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://globalskinhub.com"),
  title: "Globalskinhub — Imported Cosmetics & Premium Brands",
  description: "বিদেশি ব্র্যান্ডের স্কিনকেয়ার, বডি কেয়ার ও বিউটি সাপ্লিমেন্ট। WhatsApp-এ সহজে অর্ডার করুন: 01975749812",
  openGraph: {
    title: "Globalskinhub — Imported Cosmetics & Premium Brands",
    description: "বিদেশি ব্র্যান্ডের স্কিনকেয়ার ও বিউটি প্রোডাক্ট, WhatsApp-এ সহজ অর্ডার।",
    images: ["/images/jamsai-blood-orange-c.jpg"],
    locale: "bn_BD",
    type: "website",
  },
};

export const viewport = { themeColor: "#fcf7f8", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${tiro.variable} ${hind.variable}`}>
      <body>{children}</body>
    </html>
  );
}
