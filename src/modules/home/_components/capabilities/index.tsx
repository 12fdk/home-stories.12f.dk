import { motion } from "framer-motion";
import { useContext, type ReactNode } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import SectionHeading from "../../../../components/sectionHeading";

// Inline, stroke-based icons keyed by the `icon` field in config. Kept here so
// adding a capability needs no new image asset — just a key that exists below.
const icons: Record<string, ReactNode> = {
  widget: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <circle cx="17.5" cy="17.5" r="3.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  note: (
    <>
      <path d="M5 3h9l5 5v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M8 13h8M8 17h5" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5a3.5 3.5 0 0 1 0 7M22 20a6.5 6.5 0 0 0-5-6.3" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21C9.5 18.5 8.2 15.3 8.2 12S9.5 5.5 12 3Z" />
    </>
  ),
};

function Capabilities() {
  const {
    home: { capabilities },
  } = useContext(ConfigContext)!;
  if (!capabilities) return null;

  return (
    <section
      id={capabilities.id}
      className="mx-auto max-w-screen-lg px-4 pb-20 md:pb-28"
    >
      <SectionHeading
        label="More"
        title={capabilities.title}
        subtitle={capabilities.subtitle}
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.cards.map((cap, index) => (
          <motion.article
            key={cap.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: (index % 4) * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col rounded-box border border-base-300 bg-base-100 p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {icons[cap.icon] ?? icons.widget}
              </svg>
            </span>
            <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-base-content">
              {cap.title}
            </h3>
            <p className="mt-2 text-sm text-base-content/70">{cap.subtitle}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Capabilities;
