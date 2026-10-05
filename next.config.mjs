/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",        // `npm run build` → out/ ফোল্ডারে সম্পূর্ণ স্ট্যাটিক সাইট
  trailingSlash: true,     // যেকোনো সাধারণ হোস্টিংয়ে index.html হিসেবে কাজ করে
  images: { unoptimized: true },
};
export default nextConfig;
