import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export default function FloatingWhatsApp() {
  return (
    <a className="float-wa" href={waLink("আসসালামু আলাইকুম, Globalskinhub-এর প্রোডাক্ট সম্পর্কে জানতে চাই।")}
       target="_blank" rel="noopener noreferrer" aria-label="WhatsApp-এ মেসেজ দিন">
      <WhatsAppIcon />
    </a>
  );
}
