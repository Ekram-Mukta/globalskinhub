// সব প্রোডাক্টের তথ্য এখানে। দাম না থাকলে price: null রাখুন — সাইটে "দাম জানতে মেসেজ করুন" দেখাবে।
// image: public/images/ ফোল্ডারের ফাইল; null হলে একটি ডিজাইন করা প্লেসহোল্ডার দেখাবে।

export const CATEGORIES = [
  { id: "all", label: "সব প্রোডাক্ট" },
  { id: "care", label: "স্কিন ও বডি কেয়ার" },
  { id: "supplement", label: "সাপ্লিমেন্ট" },
];

export const PRODUCTS = [
  {
    id: "aichun-underarm",
    name: "Aichun Beauty Yogurt Milk 7-in-1 Underarm Cream",
    category: "care",
    size: "থাইল্যান্ডের উপাদানে তৈরি",
    image: "/images/aichun-yogurt-milk-underarm-cream.jpg",
    imagePosition: "center 58%",
    description:
      "আন্ডারআর্মের ত্বকের যত্নে ইয়োগার্ট মিল্ক ক্রিম। কালচে ভাব কমাতে এবং ত্বক মসৃণ ও পুষ্ট রাখতে তৈরি।",
    price: 690,
  },
  {
    id: "derma-house",
    name: "Derma House Breast Care Cream",
    category: "care",
    size: "১২৫ মি.লি.",
    image: "/images/derma-house-breast-care.jpg",
    imagePosition: "center 30%",
    description:
      "Dermochlorella Extract সমৃদ্ধ বডি কেয়ার ক্রিম। ত্বক নরম ও মসৃণ রাখে এবং ত্বকের স্থিতিস্থাপকতা ধরে রাখতে সহায়তা করে।",
    variants: ["Breast Enlargement Cream", "Breast Tightening Cream", "Breast Younger Cream"],
    price: 950,
  },
  {
    id: "anti-stretch-mark",
    name: "Anti Stretch Mark Cream",
    category: "care",
    size: "৬০ গ্রাম",
    image: "/images/anti-stretch-mark.jpg",
    imagePosition: "center",
    description:
      "স্ট্রেচ মার্কের যত্নে হালকা ফর্মুলার ক্রিম। দ্রুত শোষিত হয়, চিটচিটে ভাব রাখে না। ছেলে-মেয়ে সবার জন্য উপযোগী।",
    price: 710,
  },
  {
    id: "manee-gluta-collagen",
    name: "Manee Gluta Collagen Pink",
    category: "supplement",
    size: "ডায়েটারি সাপ্লিমেন্ট",
    image: "/images/manee-gluta-collagen-pink.jpg",
    imagePosition: "center 62%",
    description:
      "ত্বকের উজ্জ্বলতা ও কোমলতার যত্নে তৈরি গ্লুটা-কোলাজেন পাউডার সাপ্লিমেন্ট।",
    price: 750,
  },
  {
    id: "jamsai-blood-orange-c",
    name: "Jamsai Blood Orange C",
    category: "supplement",
    size: "ডায়েটারি সাপ্লিমেন্ট",
    image: "/images/jamsai-blood-orange-c.jpg",
    imagePosition: "80% center",
    description:
      "ভিটামিন সি ১,০০০ মি.গ্রা., সাথে এল্ডারবেরি এক্সট্র্যাক্ট। প্যাকেট অনুযায়ী চিনি ও ফ্যাট যোগ করা হয়নি।",
    price: 790,
  },
  {
    id: "mulan-capsule",
    name: "MULAN Capsule",
    category: "supplement",
    size: "ক্যাপসুল",
    image: "/images/mulan-capsule.jpg",
    imagePosition: "38% center",
    description:
      "কোলাজেন, এল-গ্লুটাথায়োন ও NAC সমন্বিত ক্যাপসুল, ত্বকের যত্নের রুটিনের জন্য।",
    price: 850,
    oldPrice: 350,
  },
  {
    id: "hoodia-slim",
    name: "Hoodia Slim Dietary Supplement",
    category: "supplement",
    size: "ডায়েটারি সাপ্লিমেন্ট",
    image: "/images/hoodia-slim.jpg",
    imagePosition: "center",
    description: "অফারে একটা কিনলে একটা ফ্রি — ১৫০০ টাকায় পাচ্ছেন ২টি বোতল।",
    badge: "১টা কিনলে ১টা ফ্রি",
    price: 1500,
    unit: "অফার প্যাক (১+১ বোতল)",
    priceNote: "অফারটি সীমিত সময়ের জন্য",
  },
];

const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export function toBn(value) {
  return String(value).replace(/\d/g, (d) => BN[d]);
}
export function formatTaka(n) {
  return "৳" + toBn(Number(n).toLocaleString("en-IN"));
}
