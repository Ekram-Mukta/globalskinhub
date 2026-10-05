import { SITE, waLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 id="contact-title">যোগাযোগ</h2>
            <p>প্রোডাক্ট, দাম বা অর্ডার নিয়ে যেকোনো প্রশ্নে কল করুন অথবা WhatsApp-এ মেসেজ দিন।</p>
          </div>
        </div>
        <div className="contact-grid">
          <div>
            <a className="contact-phone" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
            <div className="contact-actions">
              <a href={`tel:${SITE.phoneTel}`} className="btn btn-ghost"><PhoneIcon /> কল করুন</a>
              <a href={waLink("আসসালামু আলাইকুম, Globalskinhub-এর প্রোডাক্ট সম্পর্কে জানতে চাই।")}
                 target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <WhatsAppIcon /> WhatsApp-এ মেসেজ দিন
              </a>
            </div>
          </div>
          <ul className="contact-list">
            <li><span>ফোন ও অর্ডার</span><a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></li>
            <li><span>WhatsApp</span><a href={waLink()} target="_blank" rel="noopener noreferrer">+880 1975-749812</a></li>
            <li><span>Facebook</span><a href={SITE.facebook} target="_blank" rel="noopener noreferrer">Globalskinhub পেজ</a></li>
            <li><span>ওয়েবসাইট</span><a href={`https://${SITE.website}`}>{SITE.website}</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
