import { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useInView } from "react-intersection-observer";

const sections = [
  {
    messageText:
      "Hé lô Kế Tường, trải qua mấy tháng bên nhau rồi ha, cũng hong quá ngắn cũng quá dài, anh với em cũng ở xa nữa, nên những lúc được ở cạnh em thật đáng trân trọng đối với anh.|||Em có nhớ những ngày đầu 2 đứa đi với nhau mà còn ngại chứ hả haha.|||Đây là những lần đầu của tụi mình nè em nhớ hong, những món quà đầu tiên của 2 đứa, bó hoa đầu tiên, buổi hoàng hôn đầu tiên,...|||Anh làm cái này để em có thể cùng anh nhìn nhận lại từ đầu đến giờ, và cùng nhau ngắm nhìn những tấm hình vui vẻ này nhé.|||Em vuốt xuống nha cục dàng",
    textPosition: "top-[280px] left-[1225px]",
    textColor: "text-black",
  },
  {
    messageText:
      "Đây là chuyến du lịch xa cùng nhau lần đầu tiên đó bé nhớ hong.|||Anh dẫn em đi làm móng tới 10h tối nè, lúc đó anh chỉ ăn 1 ổ bánh mì và uống ly nước, ngồi chờ em để em có được bộ móng như ý đó.|||Nhờ chuyến đi chơi này mà em mới mở lòng hơn với anh nè, giờ nhắc lại anh thấy mắc cưới quá bé haha",
    textPosition: "top-64 left-[1355px]",
    textColor: "text-black",
  },
  {
    messageText:
      "Anh bắt đầu tặng quà cho em nhiều hơn, làm em bất ngờ nhiều hơn. Những lần em cười anh thấy hạnh phúc lắm, anh muốn em cười quài thôi á hí hí.|||Em biết anh mê em do nụ cười của em, nên em cười quài để gài anh chứ gì :v|||Trong lúc này thì anh với em đã có thêm định hướng chung mới, anh rất thích điều đó, anh muốn 2 đứa sẽ trở nên tốt hơn|||Và mình đã dần dần làm được rồi đó bae",
    textPosition: "top-1/3 left-[225px]",
    textColor: "text-black",
  },
  {
    messageText:
      "Anh vẫn nhớ câu nói mà anh đã nói với em rằng, em đẹp hơn hơn.|||Cái này anh nói thiệt đó chứ hong phải nói giỡn nịnh em đâu.|||Anh muốn tặng em thêm nhiều hoa nữa, đặc biệt là hoa Tulip, vì anh biết em thích hoa đó, anh sẽ cố gắng nhá.|||Mỗi lần em giận sẽ có 1 bó hoa, những cũng đừng vì thích hoa quá mà giận anh quài nhen, tội anh lắm đó haha",
    textPosition: "top-[170px] left-[1310px]",
    textColor: "text-black",
  },
  {
    messageText:
      "Dù có giận nhau đi chăng nữa thì em cũng đừng ghét bỏ hay bỏ anh mà đi nha|||Hai đứa cùng nhau cố gắng nhé|||Anh yêu Kế Tường nhất trên đời",
    textPosition: "top-[180px] left-[1235px]",
    textColor: "text-black",
  },
];

export default function LoveTimeline({ setHideAllContent }) {
  const [videoOpened, setVideoOpened] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = window.__audioInstance__;
  }, []);

  const handleOpenVideo = () => {
    if (audioRef.current && !audioRef.current.paused) {
      let fadeVolume = audioRef.current.volume;
      const fadeInterval = setInterval(() => {
        fadeVolume = Math.max(0, fadeVolume - 0.05);
        audioRef.current.volume = fadeVolume;
        if (fadeVolume <= 0) {
          clearInterval(fadeInterval);
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setVideoOpened(true);
        }
      }, 150); // Mượt hơn chút, bạn có thể chỉnh 100 nếu muốn nhanh hơn
    } else {
      setVideoOpened(true);
    }
  };

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      {sections.map((sec, i) => (
        <TimelineSection
          key={i}
          messageText={sec.messageText}
          textPosition={sec.textPosition}
          sectionIndex={i}
          textColor={sec.textColor}
        />
      ))}

      <section
        className="snap-start h-screen relative flex flex-col items-center justify-center bg-pink-50 overflow-hidden"
        style={{ backgroundImage: "url('/heart-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <motion.h1
          className="text-4xl font-bold text-pink-600 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          💖 Cảm ơn em vì đã ở bên anh 💖
        </motion.h1>

        <motion.p
          className="mt-4 text-xl text-gray-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Hành trình của chúng ta vẫn đang tiếp diễn...
        </motion.p>

        {!videoOpened ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-10 px-6 py-3 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition"
            onClick={handleOpenVideo}
          >
            💌 Em yêu có một lời nhắn 💌
          </motion.button>
        ) : (
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <video
              className="w-full h-full object-cover"
              src="/VIDEO.mov"
              controls
              autoPlay
              onEnded={() => setVideoEnded(true)}
            />
            {videoEnded && (
              <motion.button
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-white/80 text-pink-600 font-semibold rounded-full shadow-md hover:bg-white transition z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setShowThanks(true);

                  setTimeout(() => {
                    if (setHideAllContent) {
                      setHideAllContent(true); // Ẩn mọi giao diện
                    }
                  }, 2000); // Delay để hiện “Cảm ơn bé yêu” 1 chút rồi mới ẩn
                }}
              >
                🔄 Quay lại hành trình
              </motion.button>
            )}
            {showThanks && (
              <motion.div
                className="absolute top-10 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-pink-500 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                💕 Cám ơn bé yêu đã xem hết 💕
              </motion.div>
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
}

function TimelineSection({ messageText, textPosition, sectionIndex, textColor }) {
  const [typingDone, setTypingDone] = useState(false);
  const [svgShown, setSvgShown] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [showText, setShowText] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.4 });

  useEffect(() => {
    if (inView && showText) {
      setStartTyping(true);
    }
  }, [inView, showText]);

  const hearts = useMemo(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 2,
    })), []);

  const renderImage = () => {
    const imgSrc = `/PICS/HINH${sectionIndex + 1}.jpg`;
    return (
      <motion.img
        src={imgSrc}
        alt={`Love Image ${sectionIndex + 1}`}
        className="absolute inset-0 w-full h-full object-contain z-10"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        onAnimationComplete={() => {
          setTimeout(() => setShowText(true), 2000);
        }}
      />
    );
  };

  return (
    <section
      ref={ref}
      className="snap-start h-screen relative flex justify-center items-center bg-pink-50 p-6 overflow-hidden"
    >
      <div className="absolute inset-0 z-50 pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-400 text-xl"
            style={{ left: heart.left, top: `-${10 + heart.id * 10}px` }}
            animate={{ y: "110vh", opacity: [1, 0.8, 0] }}
            transition={{ duration: heart.duration, repeat: Infinity, delay: heart.delay }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {renderImage()}

      {startTyping && (
        <motion.div
          className={`absolute ${textPosition} z-20 text-lg font-semibold max-w-md leading-relaxed whitespace-pre-line bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl ${textColor}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typewriter
            key={sectionIndex}
            words={[messageText.replaceAll("|||", "\n")]}
            loop={false}
            typeSpeed={40}
            cursor
            cursorStyle="|"
            onDone={() => setTypingDone(true)}
          />
        </motion.div>
      )}

      {typingDone && (
        <motion.div
          className="absolute bottom-6 text-pink-600 font-medium animate-bounce z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ↓ Kéo xuống để tiếp tục
        </motion.div>
      )}
    </section>
  );
}
