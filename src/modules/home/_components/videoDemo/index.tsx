import { useState, useRef, useEffect, useContext, type CSSProperties } from "react";
import { withBase } from "../../../../utils/basePath";
import { ConfigContext } from "../../../../utils/configContext";

const videoAssets = [
  { src: "/videos/demo-1.mp4", poster: "/videos/poster-1.webp" },
  { src: "/videos/demo-2.mp4", poster: "/videos/poster-2.webp" },
  { src: "/videos/demo-3.mp4", poster: "/videos/poster-3.webp" },
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Three recordings from the app, indexed by name. The names are the control:
 * large type on the left, the selected one in full ink, and the clip it names
 * plays at phone size on the right. Clips run on into the next when they end.
 */
function VideoDemo() {
  const { ui } = useContext(ConfigContext)!;
  const videos = videoAssets.map((v, i) => ({ ...v, label: ui.videoDemo.tabs[i] }));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);

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

  // Start the first clip only once the stage is on screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  return (
    <section id="demo" data-field="light" className="hs-light hs-section">
      <div className="hs-wrap hs-grid items-center gap-y-16">
        <div className="col-span-12 md:col-span-6">
          <h2 className="hs-head m-0" data-reveal>
            {ui.videoDemo.title}
          </h2>
          <p className="m-0 mt-5 max-w-[44ch]" data-reveal style={d(80)}>
            {ui.videoDemo.subtitle}
          </p>

          <ul className="m-0 mt-14 list-none p-0 md:mt-20">
            {videos.map((video, index) => {
              const isActive = index === currentIndex;
              return (
                <li key={video.src} className="m-0 p-0" data-reveal style={d(140 + index * 70)}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsPlaying(true);
                    }}
                    aria-pressed={isActive}
                    className={`hs-index-button hs-head block py-1.5 text-left transition-[color,transform] duration-300 ${
                      isActive ? "" : "hs-soft"
                    }`}
                  >
                    {video.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          ref={stageRef}
          className="col-span-12 flex justify-center md:col-span-5 md:col-start-8"
          data-reveal
          style={d(120)}
        >
          {/* The recordings frame themselves: no second phone around them */}
          <div className="relative aspect-[9/16] w-full max-w-[360px] overflow-hidden bg-mist-2">
            {videos.map((video, index) => (
              <video
                key={video.src}
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={withBase(video.src)}
                poster={withBase(video.poster)}
                aria-label={video.label}
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
        </div>
      </div>
    </section>
  );
}

export default VideoDemo;
