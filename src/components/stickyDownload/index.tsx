import { motion, useScroll, useTransform } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";

/** Phone-only: the action follows you down the page, quietly. */
function StickyDownload() {
  const { appStoreLink } = useContext(ConfigContext)!;
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [400, 520], [0, 1]);
  const y = useTransform(scrollY, [400, 520], [24, 0]);

  if (!appStoreLink) return null;

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-base-300 bg-base-100/95 p-3 backdrop-blur-md md:hidden"
    >
      <a
        href={appStoreLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary w-full text-base font-semibold normal-case"
      >
        Download free
        <span className="tick-label opacity-70">iOS 17+</span>
      </a>
    </motion.div>
  );
}

export default StickyDownload;
