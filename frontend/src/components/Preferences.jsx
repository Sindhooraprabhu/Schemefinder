import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Preferences() {
  const [userName] = useState("ಸಂಜನಾ"); // Placeholder for user's name
  const [activeTopic, setActiveTopic] = useState("ಕೃಷಿ"); // Default topic
  const navigate = useNavigate();

  const topics = ["ಕೃಷಿ", "ವ್ಯಾಪಾರ", "ಹಣಕಾಸು", "ಸಾಮಾಜಿಕ"];

  const content = {
    ಕೃಷಿ: [
      { title: "ಹೊಸ ಬೆಳೆ ಸಲಹೆಗಳು", desc: "ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ಹೊಂದಿಕೊಳ್ಳುವ ಬೆಳೆ ಸಲಹೆಗಳು." },
      { title: "ಮಣ್ಣು ಆರೋಗ್ಯ", desc: "ಮಣ್ಣಿನ ಗುಣಮಟ್ಟ ಮತ್ತು ಪೋಷಕಾಂಶ ಮಾಹಿತಿ." }
    ],
    ವ್ಯಾಪಾರ: [
      { title: "ಉದ್ಯಮ ಮಾರ್ಗದರ್ಶನ", desc: "ನಿಮ್ಮ ವ್ಯಾಪಾರ ಬೆಳವಣಿಗೆಗೆ ಸಲಹೆಗಳು." },
      { title: "ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ", desc: "ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು." }
    ],
    ಹಣಕಾಸು: [
      { title: "ಸಾಲದ ಯೋಜನೆಗಳು", desc: "ಸರಳವಾಗಿ ಲಭ್ಯವಿರುವ ಸಾಲದ ಆಯ್ಕೆಗಳು." },
      { title: "ಹಣಕಾಸು ಯೋಜನೆ", desc: "ನಿಮ್ಮ ಲೆಕ್ಕಪತ್ರ ನಿರ್ವಹಣೆಗೆ ಸಲಹೆಗಳು." }
    ],
    ಸಾಮಾಜಿಕ: [
      { title: "ಸಮುದಾಯ ಚಟುವಟಿಕೆಗಳು", desc: "ಸ್ಥಳೀಯ ಸಮುದಾಯದ ಘಟನೆಗಳು ಮತ್ತು ಫೋರಮ್ ಚಟುವಟಿಕೆಗಳು." }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-800 mb-2">
          ಬಳಕೆದಾರ ಅಗತ್ಯಗಳು / Dashboard
        </h2>
        <p className="text-gray-700 text-lg">
          ನಮಸ್ಕಾರ, {userName}! ನಿಮ್ಮ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ನಾವು ಸಿದ್ಧರಿದ್ದೇವೆ.
        </p>
      </div>

      {/* Topics Filter with Navigation */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => {
              setActiveTopic(topic);
              // Example: Navigate to dedicated topic page if needed
              // navigate(`/topic/${topic}`);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTopic === topic
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-green-100"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಇಲ್ಲಿ ಕೇಳಿ"
          className="w-full max-w-2xl px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Content Display */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Recommendations for You */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">ನಿಮಗಾಗಿ ಶಿಫಾರಸುಗಳು</h3>
          {content[activeTopic].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate("/preferences")} // Example: navigate to details page if implemented
              className="mb-3 p-3 border rounded-lg hover:shadow-lg transition cursor-pointer"
            >
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Recent News & Community Activities */}
        <div className="space-y-6">
          <div
            className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate("/news")} // Example: dedicated news page
          >
            <h3 className="text-xl font-semibold mb-4">ಇತ್ತೀಚಿನ ಸುದ್ದಿ ಮತ್ತು ಅಪ್‌ಡೇಟ್‌ಗಳು</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>ಪ್ರಾದೇಶಿಕ ಮಾರುಕಟ್ಟೆ ವರದಿ</li>
              <li>ಹೊಸ ಸರ್ಕಾರದ ಯೋಜನೆಗಳು ಬಿಡುಗಡೆ</li>
            </ul>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate("/community")} // Example: community forum page
          >
            <h3 className="text-xl font-semibold mb-4">ಸಮುದಾಯ ಚಟುವಟಿಕೆಗಳು</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>ಕೃಷಿ ತಜ್ಞರಿಂದ ಪ್ರಶ್ನೆ ಕೇಳಲಾಗಿದೆ</li>
              <li>ಸ್ಥಳೀಯ ಉದ್ಯಮಿಗಳ ಸಲಹೆಗಳು ಹಂಚಲಾಗಿದೆ</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/new-project")} // Example: start new project page
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg"
        >
          ಹೊಸ ಯೋಜನೆ ಪ್ರಾರಂಭಿಸಿ
        </button>
      </div>
    </div>
  );
}
