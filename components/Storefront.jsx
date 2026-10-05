"use client";
import { useCallback, useRef, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Products from "./Products";
import HowToOrder from "./HowToOrder";
import Contact from "./Contact";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import OrderModal from "./OrderModal";

export default function Storefront() {
  const [selected, setSelected] = useState(null);
  const triggerRef = useRef(null);

  const openOrder = useCallback((product, trigger) => {
    triggerRef.current = trigger || null;
    setSelected(product);
  }, []);

  const closeOrder = useCallback(() => {
    setSelected(null);
    // মোডাল বন্ধ হলে যে বাটন থেকে খোলা হয়েছিল সেখানে ফোকাস ফেরত যায়
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products onOrder={openOrder} />
        <HowToOrder />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <OrderModal product={selected} onClose={closeOrder} />
    </>
  );
}
