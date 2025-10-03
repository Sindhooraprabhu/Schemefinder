import { BarChart3, Leaf, Wallet } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <BarChart3 className="w-10 h-10 text-green-700" />,
      title: "ಯೋಜನೆ ಶಿಫಾರಸುಗಳು AI ಮೂಲಕ",
      desc: "ನಮ್ಮ LLM ಆಧಾರಿತ ವ್ಯವಸ್ಥೆ ಬಳಕೆದಾರರ ವಿವರಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ, ರೈತರು ಮತ್ತು ಸಣ್ಣ ಉದ್ಯಮಿಗಳಿಗೆ ಸರಿಯಾದ ಸರ್ಕಾರದ ಯೋಜನೆಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತದೆ.",
    },
    {
      icon: <Leaf className="w-10 h-10 text-green-700" />,
      title: "ಸ್ಥಿರ ಹಾಗೂ ಬುದ್ಧಿವಂತ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ",
      desc: "ಬೆಳೆ ನಿರ್ವಹಣೆ, ಮಣ್ಣಿನ ಆರೋಗ್ಯ, ಹವಾಮಾನ ಮಾಹಿತಿ ಮತ್ತು ಸ್ಥಳೀಯ ಅಗತ್ಯಗಳನ್ನು ಗಮನಿಸಿದ ಡೇಟಾ ಆಧಾರಿತ ಸಲಹೆಗಳನ್ನು ನೀಡುತ್ತದೆ.",
    },
    {
      icon: <Wallet className="w-10 h-10 text-green-700" />,
      title: "ಆರ್ಥಿಕ ಹಾಗೂ ವ್ಯವಹಾರ ನಿರ್ವಹಣೆ",
      desc: "ಸಣ್ಣ ಉದ್ಯಮಗಳಿಗೆ ಲೆಕ್ಕಪತ್ರ, ಹಣಕಾಸು ಯೋಜನೆ, ಮೈಕ್ರೋ ಸಾಲ ಮತ್ತು ಉದ್ಯಮ ಪ್ರಗತಿಗೆ ನೆರವು ಒದಗಿಸುತ್ತದೆ.",
    },
  ];

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-4xl font-bold text-green-800 mb-12">
        LLM ಆಧಾರಿತ ವೈಶಿಷ್ಟ್ಯಗಳು
      </h2>
      <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-8 border rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

