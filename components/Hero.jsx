"use client";
import { motion, useReducedMotion } from "framer-motion";
import { SITE, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

const FAN = [
  { src: "/images/jamsai-blood-orange-c.jpg", pos: "80% center", rotate: -14, alt: "Jamsai Blood Orange C" },
  { src: "/images/manee-gluta-collagen-pink.jpg", pos: "center 62%", rotate: -5, alt: "Manee Gluta Collagen Pink" },
  { src: "/images/derma-house-breast-care.jpg", pos: "center 30%", rotate: 5, alt: "Derma House Body Care Cream" },
  { src: "/images/mulan-capsule.jpg", pos: "38% center", rotate: 14, alt: "MULAN Capsule" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div>
          <p className="hero-kicker">{SITE.tagline}</p>
          <h1 id="hero-title">বিদেশি ব্র্যান্ডের প্রসাধনী, এক ঠিকানায়</h1>
          <p className="hero-lede">
            Globalskinhub-এ পাবেন ইমপোর্টেড স্কিনকেয়ার, বডি কেয়ার ও বিউটি সাপ্লিমেন্ট। পছন্দের প্রোডাক্ট বেছে নিন, অর্ডার পাঠান সরাসরি WhatsApp-এ।
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn-rose">প্রোডাক্ট দেখুন</a>
            <a href={waLink("আসসালামু আলাইকুম, Globalskinhub-এর প্রোডাক্ট সম্পর্কে জানতে চাই।")}
               target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <WhatsAppIcon /> WhatsApp-এ জিজ্ঞাসা করুন
            </a>
          </div>
          <dl className="hero-facts">
            <div><dt>অর্ডার ও তথ্য</dt><dd><a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></dd></div>
            <div><dt>অর্ডার পদ্ধতি</dt><dd>WhatsApp মেসেজ</dd></div>
            <div><dt>ওয়েবসাইট</dt><dd>{SITE.website}</dd></div>
          </dl>
        </div>

        <div className="fan" aria-hidden="true">
          {FAN.map((card, i) => (
            <motion.div key={card.src} className="fan-card"
              initial={reduce ? { rotate: card.rotate } : { rotate: 0, y: 16, opacity: 0 }}
              animate={{ rotate: card.rotate, y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}>
              <img src={card.src} alt="" style={{ objectPosition: card.pos }} fetchPriority={i === 2 ? "high" : undefined} />
            </motion.div>
          ))}
          <div className="fan-seal">ইমপোর্টেড প্রিমিয়াম ব্র্যান্ড</div>
        </div>
      </div>
    </section>
  );
}
