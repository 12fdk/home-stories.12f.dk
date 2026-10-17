import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The spreadsheet is the real competitor. One honest table: what each aspect
 * of the job looks like in a spreadsheet vs in the app. The app's column is
 * in the full ink and the spreadsheet's in the soft one; nothing else marks
 * the winner.
 */
function Comparison() {
  const {
    home: { comparison },
  } = useContext(ConfigContext)!;
  if (!comparison) return null;

  return (
    <section id={comparison.id} data-field="light" className="hs-light hs-section">
      <div className="hs-wrap">
        <div className="hs-grid gap-y-5">
          <h2 className="hs-head col-span-12 m-0 md:col-span-8" data-reveal>
            {comparison.title}
          </h2>
          {comparison.subtitle && (
            <p className="hs-lead col-span-12 m-0 max-w-[36ch] md:col-span-6" data-reveal style={d(80)}>
              {comparison.subtitle}
            </p>
          )}
        </div>

        {/* Phone: each aspect, then each side with its name above the copy */}
        <dl className="m-0 mt-14 space-y-10 md:hidden">
          {comparison.rows.map((row, i) => (
            <div key={row.aspect} data-reveal style={d(i * 50)}>
              <dt className="hs-lead font-semibold">{row.aspect}</dt>
              <dd className="m-0 mt-3">
                <span className="hs-soft block">{comparison.columns.them}</span>
                <span className="hs-soft block">{row.them}</span>
              </dd>
              <dd className="m-0 mt-3">
                <span className="block font-semibold">{comparison.columns.us}</span>
                <span className="block">{row.us}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Desktop: the three-column table */}
        <div className="mt-20 hidden md:block" data-reveal style={d(120)}>
          <table className="hs-table w-full border-collapse">
            <thead>
              <tr>
                <th scope="col" className="w-[22%]">
                  <span className="sr-only">Aspect</span>
                </th>
                <th scope="col" className="hs-soft w-[36%] font-medium">
                  {comparison.columns.them}
                </th>
                <th scope="col" className="font-semibold">
                  {comparison.columns.us}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.aspect}>
                  <th scope="row" className="hs-lead font-semibold">
                    {row.aspect}
                  </th>
                  <td className="hs-soft">{row.them}</td>
                  <td className="font-medium">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {comparison.cta && (
          <p className="m-0 mt-12" data-reveal>
            <a href={comparison.cta.href} className="hs-link">
              {comparison.cta.text}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export default Comparison;
