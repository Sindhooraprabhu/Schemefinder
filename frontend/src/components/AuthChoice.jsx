import { useNavigate } from "react-router-dom";

export default function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h2 className="text-3xl font-bold mb-6">
        ಲಾಗಿನ್ ಅಥವಾ ಸೈನ್ ಅಪ್ ಆಯ್ಕೆ ಮಾಡಿ
      </h2>
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
        >
          ಲಾಗಿನ್
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
        >
          ಸೈನ್ ಅಪ್
        </button>
      </div>
    </div>
  );
}
