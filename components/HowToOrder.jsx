const STEPS = [
  { title: "প্রোডাক্ট বেছে নিন", text: "পছন্দের প্রোডাক্টের নিচে “অর্ডার করুন” বাটনে চাপুন।" },
  { title: "ফর্ম পূরণ করুন", text: "পরিমাণ, আপনার নাম, মোবাইল নম্বর ও ডেলিভারি ঠিকানা লিখে “WhatsApp-এ অর্ডার পাঠান” চাপুন।" },
  { title: "WhatsApp-এ Send চাপুন", text: "অর্ডারের সব তথ্য সাজানো মেসেজ হিসেবে WhatsApp-এ খুলবে। Send চাপলেই অর্ডার আমাদের কাছে পৌঁছাবে।" },
];

export default function HowToOrder() {
  return (
    <section id="how-to-order" className="section" aria-labelledby="order-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 id="order-title">কীভাবে অর্ডার করবেন</h2>
            <p>তিনটি ধাপ। কোনো অ্যাকাউন্ট খোলার দরকার নেই, শুধু ফোনে WhatsApp থাকলেই হবে।</p>
          </div>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-num" aria-hidden="true">{"১২৩"[i]}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
