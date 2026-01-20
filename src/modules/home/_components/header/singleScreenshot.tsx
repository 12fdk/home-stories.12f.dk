import { motion, transform, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { withBase } from "../../../../utils/basePath";

interface Props {
  index: number;
  totalCount: number;
  scrollYProgress: MotionValue<number>;
  src: string;
}

function SingleScreenshot({ scrollYProgress, index, totalCount, src }: Props) {
  const x = useTransform(scrollYProgress, (y) => {
    if (index > 0 && index % 2 === 0) {
      const i = totalCount - index;
      const transformer = transform(
        [(i - 1) / totalCount, i / totalCount],
        [0, 1]
      );
      return -transformer(y) * 100 + "%";
    }
    return 0;
  });
  const y = useTransform(scrollYProgress, (y) => {
    if (index % 2 === 1) {
      const i = totalCount - index;
      const transformer = transform(
        [(i - 1) / totalCount, i / totalCount],
        [0, 1]
      );
      return -transformer(y) * 100 + "%";
    }
    return 0;
  });

  // Create mobile version path by adding -mobile suffix before extension
  const mobileSrc = src.replace(/\.webp$/, '-mobile.webp');

  return (
    <motion.img
      src={withBase(src)}
      srcSet={`${withBase(mobileSrc)} 480w, ${withBase(src)} 1206w`}
      sizes="(max-width: 768px) 480px, 1206px"
      alt={`App screenshot ${index + 1}`}
      style={{ translateX: x, translateY: y, scale: 1 }}
      className="absolute overflow-hidden w-full h-full object-cover object-top iphone-screenshot"
      width={240}
      height={520}
      loading={index === 0 ? "eager" : "lazy"}
      decoding={index === 0 ? "sync" : "async"}
      fetchPriority={index === 0 ? "high" : "low"}
    />
  );
}

export default SingleScreenshot;
