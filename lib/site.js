export const SITE = {
  name: "Globalskinhub",
  tagline: "Imported Cosmetics & Premium Brands",
  phoneDisplay: "01982807179",
phoneTel: "+8801982807179",
whatsapp: "8801982807179",
  website: "globalskinhub.com",
  facebook: "https://www.facebook.com/profile.php?id=61583879864993",
};

// ডেলিভারি চার্জ বদলাতে শুধু এখানে টাকার অঙ্ক বদলান
export const DELIVERY = [
  { id: "inside", label: "ঢাকার ভিতরে", charge: 80 },
  { id: "outside", label: "ঢাকার বাইরে", charge: 150 },
];

export function waLink(text) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// বাংলাদেশি মোবাইল নম্বর: 01XXXXXXXXX (বাংলা অঙ্কেও লেখা যায়, +880 সহ বা ছাড়া)
export function normalizeBdPhone(raw) {
  const en = String(raw).replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d)).replace(/[\s-]/g, "");
  const m = en.match(/^(?:\+?88)?(01[3-9]\d{8})$/);
  return m ? m[1] : null;
}

export function buildOrderMessage({ product, variant, qty, name, phone, address, note, delivery }, formatTaka, toBn) {
  const lines = [
    "🛍️ নতুন অর্ডার — Globalskinhub",
    "",
    `প্রোডাক্ট: ${product.name}`,
  ];
  if (variant) lines.push(`ধরন: ${variant}`);
  lines.push(`পরিমাণ: ${toBn(qty)}${product.unit ? ` × ${product.unit}` : "টি"}`);
  if (product.price) {
    lines.push(`দাম: ${formatTaka(product.price)} × ${toBn(qty)} = ${formatTaka(product.price * qty)}`);
  }
  if (delivery) {
    lines.push(`ডেলিভারি চার্জ (${delivery.label}): ${formatTaka(delivery.charge)}`);
    if (product.price) lines.push(`সর্বমোট: ${formatTaka(product.price * qty + delivery.charge)}`);
  }
  lines.push("", `নাম: ${name}`, `মোবাইল: ${phone}`, `ঠিকানা: ${address}`);
  if (note) lines.push(`মন্তব্য: ${note}`);
  return lines.join("\n");
}
