import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Real reviews only. There is exactly one, so it is set as one: a verbatim
 * excerpt at poster size, who said it and where, and the whole review beside
 * it, unedited. #117
 */
function Testimonials() {
  const {
    ui,
    home: { testimonials },
  } = useContext(ConfigContext)!;
  if (!testimonials?.cards.length) return null;

  const [first, ...rest] = testimonials.cards;
  const quote = ui.poster.quote;

  return (
    <section id={testimonials.id} data-field="light" className="hs-light hs-section">
      <div className="hs-wrap">
        <h2 className="hs-lead m-0 font-semibold" data-reveal>
          {testimonials.title}
        </h2>

        <figure className="m-0 mt-12 md:mt-16">
          <blockquote className="hs-head m-0 !leading-[1.02]">
            {quote.map((line, i) => (
              <span key={line} className="block whitespace-nowrap" data-reveal style={d(i * 90)}>
                {line}
              </span>
            ))}
          </blockquote>

          <div className="hs-grid mt-14 gap-y-6">
            <figcaption className="col-span-12 md:col-span-4" data-reveal style={d(180)}>
              <span className="hs-lead block font-semibold">{first.name}</span>
              {first.source && <span className="hs-soft mt-1 block">{first.source}</span>}
            </figcaption>
            <div className="col-span-12 space-y-4 md:col-span-7 md:col-start-6">
              <p className="m-0 max-w-[60ch]" data-reveal style={d(220)}>
                {first.comment}
              </p>
              {testimonials.subtitle && (
                <p className="hs-soft m-0 max-w-[60ch]" data-reveal style={d(260)}>
                  {testimonials.subtitle}
                </p>
              )}
            </div>
          </div>
        </figure>

        {rest.map(({ name, comment, source }) => (
          <blockquote key={name} className="m-0 mt-10 max-w-[60ch] md:ml-[41.66%]">
            <p className="m-0">{comment}</p>
            <footer className="hs-soft mt-2">
              {name}
              {source ? `, ${source}` : ""}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
