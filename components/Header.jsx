"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/site";
import { MenuIcon, CloseIcon, PhoneIcon } from "./Icons";

const LINKS = [
  { href: "#home", label: "হোম" },
  { href: "#products", label: "প্রোডাক্ট" },
  { href: "#how-to-order", label: "অর্ডারের নিয়ম" },
  { href: "#contact", label: "যোগাযোগ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap header-row">
        <a href="#home" className="brand" aria-label="Globalskinhub হোম">
          <span className="brand-name">Global<span>skin</span>hub</span>
          <span className="brand-tag">{SITE.tagline}</span>
        </a>

        <nav className="nav" aria-label="প্রধান মেনু">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? "is-active" : undefined}
               aria-current={active === l.href ? "true" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href={`tel:${SITE.phoneTel}`} className="btn btn-primary header-call">
          <PhoneIcon /> কল করুন
        </a>

        <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav"
                aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"} onClick={() => setOpen((v) => !v)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div id="mobile-nav" className="mobile-nav"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}>
            <ul>
              {LINKS.map((l) => (
                <li key={l.href}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>
              ))}
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="btn btn-primary btn-block" style={{ borderBottom: 0 }}>
                  <PhoneIcon /> কল করুন: {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
