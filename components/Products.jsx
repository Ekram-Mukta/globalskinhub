"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function Products({ onOrder }) {
  const [filter, setFilter] = useState("all");
  const reduce = useReducedMotion();
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section id="products" className="section products" aria-labelledby="products-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 id="products-title">আমাদের প্রোডাক্ট</h2>
            <p>পছন্দের প্রোডাক্টে “অর্ডার করুন” চাপুন, ফর্ম পূরণ করুন — অর্ডার চলে যাবে আমাদের WhatsApp-এ।</p>
          </div>
          <div className="filters" role="group" aria-label="ক্যাটাগরি অনুযায়ী দেখুন">
            {CATEGORIES.map((c) => (
              <button key={c.id} type="button" className="chip" aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout={!reduce} className="product-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p) => (
              <motion.div key={p.id} layout={!reduce} style={{ display: "flex" }}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}>
                <ProductCard product={p} onOrder={onOrder} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
