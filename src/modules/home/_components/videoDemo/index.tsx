import { motion } from "framer-motion";
import { useState, useRef, useEffect, useContext } from "react";
import { withBase } from "../../../../utils/basePath";
import { ConfigContext } from "../../../../utils/configContext";
import SectionHeading from "../../../../components/sectionHeading";

const videoAssets = [
  { src: "/videos/demo-1.mp4", poster: "/videos/poster-1.webp" },
  { src: "/videos/demo-2.mp4", poster: "/videos/poster-2.webp" },
  { src: "/videos/demo-3.mp4", poster: "/videos/poster-3.webp" },
];

function VideoDemo() {
  const { ui } = useContext(ConfigContext)!;
  const videos = videoAssets.map((v, i) => ({ ...v, label: ui.videoDemo.tabs[i] }));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && isPlaying) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {});
    }
  }, [currentIndex, isPlaying]);

  const handleInView = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      videoRefs.current[currentIndex]?.play().catch(() => {});
    }
  };

  return (
    <section
      id="demo"
      className="border-t border-base-300 bg-neutral py-20 text-neutral-content md:py-28"
    >
      <div className="mx-auto grid max-w-screen-lg items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHeading
            inverted
            label={ui.sectionLabels.demo}
            title={ui.videoDemo.title}
            subtitle={ui.videoDemo.subtitle}
          />

          {/* Chapter list doubles as the control */}
          <ul className="mt-10 list-none space-y-px p-0">
            {videos.map((video, index) => {
              const isActive = index === currentIndex;
              return (
                <li key={video.src} className="m-0 p-0">
                  <button
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsPlaying(true);
                    }}
                    aria-current={isActive}
                    className={`flex w-full items-center gap-4 border-t border-neutral-content/15 py-4 text-left transition-colors ${
                      isActive
                        ? "text-neutral-content"
                        : "text-neutral-content/50 hover:text-neutral-content/80"
                    }`}
                  >
                    <span className="tick-label w-6 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-bold tracking-tight">
                      {video.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive ? "bg-accent" : "bg-transparent"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={handleInView}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center md:justify-end"
        >
          {/* The recordings already frame themselves — no second phone around them */}
          <div className="relative aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-box border border-neutral-content/15 bg-base-100 shadow-2xl">
            {videos.map((video, index) => (
              <video
                key={video.src}
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={withBase(video.src)}
                poster={withBase(video.poster)}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
                muted
                playsInline
                preload={index === 0 ? "auto" : "none"}
                onEnded={handleVideoEnd}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default VideoDemo;
