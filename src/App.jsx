// Đặt bên ngoài component (global scope)
let globalAudio = null;

import LoveTimeline from "./components/LoveTimeline";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

export default function App() {
  const [step, setStep] = useState("question");
  const [hearts, setHearts] = useState([]);
  const hasPlayedRef = useRef(false);
  const audioRef = useRef(null);
  const stopAllAudio = () => {
    const audios = document.querySelectorAll("audio");
    audios.forEach((a) => {
      a.pause();
      a.currentTime = 0;
    });
  };
  const [hideAllContent, setHideAllContent] = useState(false);

  // Chỉ tạo một bản audio duy nhất
  useEffect(() => {
    if (!window.__audioInstance__) {
      const audio = new Audio("/love-song.mp3"); // Đường dẫn đến file nhạc
      audio.volume = 0.7;
      window.__audioInstance__ = audio;
    }

    audioRef.current = window.__audioInstance__;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);


  // Trái tim rơi
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        duration: 5 + Math.random() * 5,
        size: 16 + Math.random() * 10,
      };
      setHearts((prev) => [...prev.slice(-50), newHeart]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
  };

  const renderQuestion = () => (
    <motion.div
      key="question"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={transition}
      className="z-20 text-center relative"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-pink-700 mb-6 drop-shadow">
        //để câu hỏi vào đây nhé
      </h1>
      <button
        onClick={() => setStep("choices")}
        className="bg-pink-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-pink-600 transition"
      >
        Bấm vào đây để trả lời
      </button>
    </motion.div>
  );

  const renderChoices = () => (
    <motion.div
      key="choices"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={transition}
      className="z-20 text-center relative"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-pink-700 mb-6 drop-shadow">
        //để câu hỏi vào đây nhé
      </h1>
      <div className="space-y-4">
        <button
          onClick={() => setStep("response")}
          className="block w-40 mx-auto bg-white border border-pink-400 text-pink-600 px-4 py-2 rounded-md hover:bg-pink-100 transition"
        >
          Có
        </button>
        <button
          onClick={() => setStep("response")}
          className="block w-40 mx-auto bg-white border border-pink-400 text-pink-600 px-4 py-2 rounded-md hover:bg-pink-100 transition"
        >
          Rất nhiều
        </button>
      </div>
    </motion.div>
  );

  const renderResponse = () => (
    <motion.div
      key="response"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={transition}
      className="z-20 text-center relative px-6"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-pink-700 mb-6 drop-shadow">
        Anh biết mà 💖<br />
        Giờ thì em bấm vào đây để xem tiếp nhé
      </h2>
      <button
        onClick={() => {
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current.loop = true;
            audioRef.current.play().catch((e) => {
              console.warn("Không thể phát nhạc:", e);
            });
          }
          setStep("timeline");
        }}

        className="mt-4 px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:bg-pink-600 transition-all duration-300"
      >
        💌 Xem tiếp
      </button>
    </motion.div>
  );

return (
  <div
    className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    style={{
      backgroundImage: "url('/heart-bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Light leak overlay */}
    <div className="absolute inset-0 bg-pink-100 mix-blend-screen opacity-40 pointer-events-none z-0"></div>

    {/* Trái tim rơi */}
    <div className="heart-container z-10">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>

    {/* Nếu chưa ẩn toàn bộ nội dung */}
    {!hideAllContent && (
      <AnimatePresence mode="wait">
        {step === "question" && renderQuestion()}
        {step === "choices" && renderChoices()}
        {step === "response" && renderResponse()}
        {step === "timeline" && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <LoveTimeline setHideAllContent={setHideAllContent} />
          </motion.div>
        )}
      </AnimatePresence>
    )}
  </div>
);
}
