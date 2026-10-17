import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * A wide heading and the questions indented beneath it, so the left third
 * under the heading stays empty. Native <details>: every answer is in the
 * markup (and in the FAQPage schema) and opens without script.
 */
function Faq() {
  const {
    home: { faq },
  } = useContext(ConfigContext)!;
  if (!faq) return null;

  return (
    <section id={faq.id} data-field="dark" className="hs-dark hs-section">
      <div className="hs-wrap hs-grid gap-y-14 md:gap-y-20">
        <h2 className="hs-head col-span-12 m-0" data-reveal>
          {faq.title}
        </h2>

        <div className="col-span-12 space-y-3 md:col-span-8 md:col-start-5">
          {faq.qa.map((qa, index) => (
            <details
              key={qa.question}
              className="hs-faq group"
              data-reveal
              style={d((index % 6) * 50)}
            >
              <summary className="hs-lead flex cursor-pointer list-none items-start justify-between gap-6 py-3 [&::-webkit-details-marker]:hidden">
                <h3 className="m-0 text-[length:inherit] font-normal leading-[inherit] tracking-normal">
                  {qa.question}
                </h3>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-1 h-6 w-6 shrink-0 transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 9l7 7 7-7" />
                </svg>
              </summary>
              <p className="faq-answer m-0 max-w-[52ch] pb-4">{qa.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
