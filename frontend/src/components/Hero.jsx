import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate("/auth"); // Go to intermediate page
  };

  return (
    <section className="py-20 bg-blue-50 text-center">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        ನಿಮ್ಮ ಸಮುದಾಯಕ್ಕೆ ಬುದ್ಧಿವಂತ ಪರಿಹಾರ
      </h1>
      <p className="text-gray-700 mb-6 max-w-xl mx-auto leading-relaxed">
        ರೈತರು ಮತ್ತು ಸಣ್ಣ ಉದ್ಯಮಿಗಳು ಸರಿಯಾದ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಲು ಮತ್ತು ಲಾಭ ಪಡೆಯಲು ನಮ್ಮ AI ಆಧಾರಿತ ವ್ಯವಸ್ಥೆ ನೆರವಾಗುತ್ತದೆ.
      </p>
      <button
        onClick={handleCTAClick}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
      >
        ಪ್ರಾರಂಭಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ
      </button>
    </section>
  );
}
