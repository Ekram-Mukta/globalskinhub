import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-row">
          <span>© {new Date().getFullYear()} {SITE.name}. {SITE.tagline}</span>
          <span>অর্ডার: {SITE.phoneDisplay}</span>
        </div>
        <p className="footer-note">
          প্রসাধনী ও ডায়েটারি সাপ্লিমেন্ট কোনো রোগের চিকিৎসা বা ওষুধের বিকল্প নয়। গর্ভাবস্থা, অ্যালার্জি, দীর্ঘমেয়াদি অসুস্থতা বা নিয়মিত ওষুধ সেবনের ক্ষেত্রে ব্যবহারের আগে চিকিৎসকের পরামর্শ নিন। নতুন ক্রিম ব্যবহারের আগে ত্বকের ছোট অংশে পরীক্ষা করে নিন।
        </p>
      </div>
    </footer>
  );
}
