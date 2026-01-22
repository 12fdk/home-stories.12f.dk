import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { withBase } from "../../../../utils/basePath";

const videos = [
  { src: "/videos/demo-1.mp4", poster: "/videos/poster-1.webp" },
  { src: "/videos/demo-2.mp4", poster: "/videos/poster-2.webp" },
  { src: "/videos/demo-3.mp4", poster: "/videos/poster-3.webp" },
];

function VideoDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-advance to next video when current one ends
  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  // Play video when it becomes active
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && isPlaying) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {});
    }
  }, [currentIndex, isPlaying]);

  // Start playing when component is in view
  const handleInView = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo) {
        currentVideo.play().catch(() => {});
      }
    }
  };

  return (
    <section id="demo" className="py-16 md:py-24 bg-base-200/50">
      <div className="max-w-screen-lg mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Watch how Home Stories helps you manage your renovation projects
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onViewportEnter={handleInView}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Video Container */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-base-300">
              {videos.map((video, index) => (
                <video
                  key={video.src}
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={withBase(video.src)}
                  poster={withBase(video.poster)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                  muted
                  playsInline
                  preload={index === 0 ? "auto" : "none"}
                  onEnded={handleVideoEnd}
                />
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-base-content/30 hover:bg-base-content/50"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default VideoDemo;
