export default function Testimonials() {
  const testimonials = [
    {
      text: "With this platform, I can sell my crops at fair prices and directly connect with buyers.",
      name: "Ravi Kumar",
      role: "Farmer from Pavoor Village",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      text: "The financial tools helped me apply for a micro-loan easily and grow my tailoring business.",
      name: "Meena Devi",
      role: "Entrepreneur from Anantapur",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  return (
    <section className="bg-green-50 py-20 text-center">
      <h2 className="text-4xl font-bold text-green-800 mb-12">Success Stories</h2>
      <div className="flex flex-col md:flex-row justify-center gap-10 px-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-xl shadow-md max-w-sm">
            <img
              src={t.img}
              alt={t.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="italic text-gray-700 mb-4">“{t.text}”</p>
            <h4 className="font-semibold text-lg">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
