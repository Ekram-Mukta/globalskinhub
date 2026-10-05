"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PRODUCTS, formatTaka, toBn } from "@/lib/products";
import { DELIVERY, buildOrderMessage, normalizeBdPhone, waLink } from "@/lib/site";
import { CheckIcon, CloseIcon, WhatsAppIcon } from "./Icons";

const MAX_QTY = 20;
const EMPTY = { name: "", phone: "", address: "", note: "", area: "" };

function openInNewTab(url) {
  // ক্লিকের ভেতরেই একটি লিংক ক্লিক করানো হয়, তাই পপ-আপ ব্লকার আটকায় না
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function OrderModal({ product, onClose }) {
  const reduce = useReducedMotion();
  const open = Boolean(product);
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  const [productId, setProductId] = useState(null);
  const [variant, setVariant] = useState("");
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sentUrl, setSentUrl] = useState(null);

  // নতুন প্রোডাক্ট নিয়ে মোডাল খুললে ফর্ম রিসেট (গ্রাহকের নাম-ঠিকানা থেকে যায়)
  useEffect(() => {
    if (product) {
      setProductId(product.id);
      setVariant(product.variants ? product.variants[0] : "");
      setQty(1);
      setErrors({});
      setSentUrl(null);
    }
  }, [product]);

  const current = PRODUCTS.find((p) => p.id === productId) || product;
  const delivery = DELIVERY.find((d) => d.id === form.area) || null;

  // Esc, ফোকাস ট্র্যাপ ও স্ক্রল লক
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("no-scroll");
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll('a[href],button:not([disabled]),input,select,textarea');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function validate() {
    const er = {};
    if (form.name.trim().length < 2) er.name = "আপনার নাম লিখুন।";
    if (!normalizeBdPhone(form.phone)) er.phone = "সঠিক মোবাইল নম্বর লিখুন, যেমন 01XXXXXXXXX (১১ সংখ্যা)।";
    if (form.address.trim().length < 8) er.address = "এলাকা, থানা ও জেলাসহ পূর্ণ ঠিকানা লিখুন।";
    if (!delivery) er.area = "ঢাকার ভিতরে নাকি বাইরে, বেছে নিন।";
    return er;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) {
      dialogRef.current?.querySelector(`[name="${Object.keys(er)[0]}"]`)?.focus();
      return;
    }
    const message = buildOrderMessage(
      {
        product: current,
        variant,
        qty,
        name: form.name.trim(),
        phone: normalizeBdPhone(form.phone),
        address: form.address.trim(),
        note: form.note.trim(),
        delivery,
      },
      formatTaka,
      toBn
    );
    const url = waLink(message);
    openInNewTab(url);
    setSentUrl(url);
  }

  const fade = reduce ? { duration: 0 } : { duration: 0.2 };
  const sheet = reduce ? { duration: 0 } : { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] };

  return (
    <AnimatePresence>
      {open && current && (
        <div className="modal-root">
          <motion.div className="modal-backdrop" onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade} />
          <motion.div ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="order-dialog-title"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 28 }} transition={sheet}>
            <div className="modal-head">
              <div>
                <h2 id="order-dialog-title">{sentUrl ? "প্রায় শেষ!" : "অর্ডার করুন"}</h2>
                <p>{sentUrl ? "শেষ ধাপটি WhatsApp-এ" : "তথ্য দিন, অর্ডার যাবে WhatsApp-এ"}</p>
              </div>
              <button type="button" className="modal-close" onClick={onClose} aria-label="বন্ধ করুন"><CloseIcon /></button>
            </div>

            <div className="modal-body">
              {sentUrl ? (
                <div className="success" role="status">
                  <div className="success-icon"><CheckIcon /></div>
                  <h3>WhatsApp-এ Send চাপুন</h3>
                  <p>আপনার অর্ডারের মেসেজ WhatsApp-এ তৈরি হয়ে আছে। Send বাটন চাপলেই অর্ডারটি আমাদের কাছে পৌঁছাবে।</p>
                  <div className="success-actions">
                    <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-block">
                      <WhatsAppIcon /> WhatsApp না খুললে এখানে চাপুন
                    </a>
                    <button type="button" className="btn btn-ghost btn-block" onClick={onClose}>বন্ধ করুন</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="order-product">
                    <div className="order-product-thumb">
                      {current.image ? <img src={current.image} alt="" style={{ objectPosition: current.imagePosition || "center" }} /> : "G"}
                    </div>
                    <div>
                      <strong>{current.name}</strong>
                      <span>{current.price ? `${formatTaka(current.price)}${current.unit ? ` / ${current.unit}` : ""}` : "দাম WhatsApp-এ জানিয়ে দেওয়া হবে"}</span>
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="o-product">প্রোডাক্ট</label>
                    <select id="o-product" name="product" value={current.id}
                      onChange={(e) => {
                        const p = PRODUCTS.find((x) => x.id === e.target.value);
                        setProductId(p.id);
                        setVariant(p.variants ? p.variants[0] : "");
                      }}>
                      {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>

                  {current.variants && (
                    <div className="field">
                      <label htmlFor="o-variant">ধরন</label>
                      <select id="o-variant" name="variant" value={variant} onChange={(e) => setVariant(e.target.value)}>
                        {current.variants.map((v) => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                  )}

                  <div className="field">
                    <span className="label" id="o-qty-label">পরিমাণ</span>
                    <div className="qty" role="group" aria-labelledby="o-qty-label">
                      <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="পরিমাণ কমান">−</button>
                      <output aria-live="polite">{toBn(qty)}</output>
                      <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} disabled={qty >= MAX_QTY} aria-label="পরিমাণ বাড়ান">+</button>
                    </div>
                  </div>

                  <div className="field-row">
                    <div className={`field${errors.name ? " has-error" : ""}`}>
                      <label htmlFor="o-name">আপনার নাম</label>
                      <input ref={firstFieldRef} id="o-name" name="name" autoComplete="name" value={form.name} onChange={set("name")}
                        aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "o-name-err" : undefined} />
                      {errors.name && <span className="field-error" id="o-name-err">{errors.name}</span>}
                    </div>
                    <div className={`field${errors.phone ? " has-error" : ""}`}>
                      <label htmlFor="o-phone">মোবাইল নম্বর</label>
                      <input id="o-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX"
                        value={form.phone} onChange={set("phone")}
                        aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "o-phone-err" : undefined} />
                      {errors.phone && <span className="field-error" id="o-phone-err">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className={`field${errors.address ? " has-error" : ""}`}>
                    <label htmlFor="o-address">ডেলিভারি ঠিকানা</label>
                    <textarea id="o-address" name="address" autoComplete="street-address" rows={3}
                      placeholder="বাসা/রোড, এলাকা, থানা, জেলা" value={form.address} onChange={set("address")}
                      aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? "o-address-err" : undefined} />
                    {errors.address && <span className="field-error" id="o-address-err">{errors.address}</span>}
                  </div>

                  <fieldset className={`field delivery-choice${errors.area ? " has-error" : ""}`}
                    aria-describedby={errors.area ? "o-area-err" : undefined}>
                    <legend className="label">ডেলিভারি এলাকা</legend>
                    <div className="delivery-options">
                      {DELIVERY.map((d) => (
                        <label key={d.id} className={`delivery-option${form.area === d.id ? " is-selected" : ""}`}>
                          <input type="radio" name="area" value={d.id} checked={form.area === d.id} onChange={set("area")} />
                          <span>{d.label}</span>
                          <b>{formatTaka(d.charge)}</b>
                        </label>
                      ))}
                    </div>
                    {errors.area && <span className="field-error" id="o-area-err">{errors.area}</span>}
                  </fieldset>

                  <div className="field">
                    <label htmlFor="o-note">অতিরিক্ত মন্তব্য <span className="opt">(ঐচ্ছিক)</span></label>
                    <textarea id="o-note" name="note" rows={2} placeholder="যেমন: ডেলিভারির সুবিধাজনক সময়" value={form.note} onChange={set("note")} />
                  </div>

                  {(current.price || delivery) ? (
                    <div className="order-summary">
                      {current.price ? (
                        <div className="order-line">
                          <span>প্রোডাক্ট ({toBn(qty)} × {formatTaka(current.price)})</span>
                          <span>{formatTaka(current.price * qty)}</span>
                        </div>
                      ) : null}
                      {delivery ? (
                        <div className="order-line">
                          <span>ডেলিভারি চার্জ ({delivery.label})</span>
                          <span>{formatTaka(delivery.charge)}</span>
                        </div>
                      ) : null}
                      {current.price ? (
                        <div className="order-total">
                          <span>সর্বমোট</span>
                          <strong>{formatTaka(current.price * qty + (delivery ? delivery.charge : 0))}</strong>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="wa-explainer">
                    <WhatsAppIcon />
                    <span>বাটনে চাপলে আপনার অর্ডার একটি সাজানো মেসেজ হিসেবে WhatsApp-এ খুলবে। সেখানে <b>Send</b> চাপলে অর্ডার আমাদের কাছে পৌঁছাবে।</span>
                  </div>

                  <button type="submit" className="btn btn-wa btn-block"><WhatsAppIcon /> WhatsApp-এ অর্ডার পাঠান</button>
                  <p className="form-hint">অর্ডার নম্বর: +880 1975-749812</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
