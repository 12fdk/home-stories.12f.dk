import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";

/**
 * The things a person actually wants to know before they tap download,
 * stated as facts rather than benefits.
 */
function Facts() {
  const {
    ui,
    home: { facts },
  } = useContext(ConfigContext)!;

  if (!facts?.length) return null;

  return (
    <section aria-label={ui.sectionLabels.atAGlance} className="border-b border-base-300 bg-base-200">
      <dl className="mx-auto grid max-w-screen-lg grid-cols-2 divide-x divide-y divide-base-300 border-x border-base-300 sm:grid-cols-3 md:grid-cols-5 md:divide-y-0">
        {facts.map(({ label, value }) => (
          <div key={label} className="px-4 py-5 md:px-6">
            <dt className="tick-label text-base-content/45">{label}</dt>
            <dd className="mt-1 font-display text-lg font-bold tracking-tight text-base-content">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default Facts;
