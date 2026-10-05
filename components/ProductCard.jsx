"use client";
import { formatTaka } from "@/lib/products";
import { DELIVERY } from "@/lib/site";

export default function ProductCard({ product, onOrder }) {
  const cat = product.category === "supplement" ? "সাপ্লিমেন্ট" : "স্কিন ও বডি কেয়ার";
  return (
    <article className="product-card" aria-labelledby={`p-${product.id}`}>
      <div className="product-media">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" decoding="async"
               style={{ objectPosition: product.imagePosition || "center" }} />
        ) : (
          <div className="product-placeholder" role="img" aria-label={product.name}>
            <div><span>{product.name}</span><small>ছবি শীঘ্রই যোগ হবে</small></div>
          </div>
        )}
      </div>
      <div className="product-body">
        <span className="product-cat">{cat}</span>
        <h3 className="product-name" id={`p-${product.id}`}>{product.name}</h3>
        {product.size && <span className="product-meta">{product.size}</span>}
        <p className="product-desc">{product.description}</p>
        {product.note && <p className="product-note">{product.note}</p>}
        <div className="product-delivery">
          <span className="product-delivery-title"><span aria-hidden="true">🚚</span> ডেলিভারি চার্জ</span>
          <ul>
            {DELIVERY.map((d) => (
              <li key={d.id}><span>{d.label}</span><b>{formatTaka(d.charge)}</b></li>
            ))}
          </ul>
        </div>
        <div className="product-foot">
          {product.price ? (
            <div className="price">
              <strong>{formatTaka(product.price)}</strong>
              {product.oldPrice && <s aria-label={`আগের দাম ${formatTaka(product.oldPrice)}`}>{formatTaka(product.oldPrice)}</s>}
              {(product.unit || product.priceNote) && (
                <small>{[product.unit, product.priceNote].filter(Boolean).join("। ")}</small>
              )}
            </div>
          ) : (
            <span className="price-ask">দাম জানতে<br />মেসেজ বা কল করুন</span>
          )}
          <button type="button" className="btn btn-primary" onClick={(e) => onOrder(product, e.currentTarget)}>
            অর্ডার করুন
          </button>
        </div>
      </div>
    </article>
  );
}
