import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import SectionHeading from "../../../../components/sectionHeading";

/**
 * The spreadsheet is the real competitor. One honest table: what each aspect
 * of the job looks like in a spreadsheet vs in the app. Same drawing
 * conventions as the rest of the page — hairlines, mono labels, no drama.
 */
function Comparison() {
  const {
    home: { comparison },
  } = useContext(ConfigContext)!;
  if (!comparison) return null;

  return (
    <section
      id={comparison.id}
      className="border-y border-base-300 bg-base-200"
    >
      <div className="mx-auto max-w-screen-lg px-4 py-20 md:py-28">
        <SectionHeading
          label={comparison.label}
          title={comparison.title}
          subtitle={comparison.subtitle}
        />

        {/* Mobile: one stacked card per row — no horizontal scroll. */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 divide-y divide-base-300 border-y border-base-300 md:hidden"
        >
          {comparison.rows.map((row) => (
            <div key={row.aspect} className="py-5">
              <dt className="tick-label text-base-content/45">{row.aspect}</dt>
              <dd className="m-0 mt-2 text-sm leading-relaxed text-base-content/60">
                <span className="tick-label mr-2 text-base-content/40">
                  {comparison.columns.them}
                </span>
                {row.them}
              </dd>
              <dd className="m-0 mt-2 text-sm font-medium leading-relaxed text-base-content">
                <span className="tick-label mr-2 flex-none text-base-content/40">
                  <span className="mr-1 inline-block h-0.5 w-4 translate-y-[-3px] bg-accent" />
                  {comparison.columns.us}
                </span>
                {row.us}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Desktop: the honest three-column table. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 hidden md:block"
        >
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-base-300">
                <th className="w-32 py-3 pr-4 text-left align-bottom md:w-40" aria-label="Aspect" />
                <th className="py-3 pr-4 text-left align-bottom font-normal">
                  <span className="tick-label text-base-content/45">
                    {comparison.columns.them}
                  </span>
                </th>
                <th className="py-3 text-left align-bottom font-normal">
                  <span className="tick-label flex items-center gap-2 text-base-content">
                    <span className="inline-block h-0.5 w-4 bg-accent" />
                    {comparison.columns.us}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300">
              {comparison.rows.map((row) => (
                <tr key={row.aspect}>
                  <td className="py-4 pr-4 align-top">
                    <span className="tick-label text-base-content/45">
                      {row.aspect}
                    </span>
                  </td>
                  <td className="py-4 pr-4 align-top leading-relaxed text-base-content/60">
                    {row.them}
                  </td>
                  <td className="py-4 align-top font-medium leading-relaxed text-base-content">
                    {row.us}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {comparison.cta && (
          <p className="mt-8">
            <a
              href={comparison.cta.href}
              className="tick-label inline-flex items-center gap-2 border-b-2 border-accent pb-0.5 text-base-content no-underline hover:opacity-70"
            >
              {comparison.cta.text}
              <span aria-hidden="true">→</span>
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export default Comparison;
