import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { longest } from "../../../../utils/measure";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Real reviews only. There is exactly one, so it is set as one: a verbatim
 * excerpt spread edge to edge, every line pushed to both margins, and the
 * whole review beneath it, unedited. #117
 */
function Testimonials() {
  const {
    ui,
    home: { testimonials },
  } = useContext(ConfigContext)!;
  if (!testimonials?.cards.length) return null;

  const [first, ...rest] = testimonials.cards;
  const quote = ui.poster.quote;
  const chars = longest(quote);
  const source = (first.source ?? "").split(" · ");

  return (
    <section id={testimonials.id} data-field="ply" className="hs-ply hs-section">
      <div className="hs-wrap">
        <h2 className="hs-lead m-0 font-semibold" data-reveal>
          {testimonials.title}
        </h2>

        <figure className="m-0 mt-16 md:mt-24">
          <blockquote
            className="hs-display m-0"
            style={{ "--chars": chars + 2 } as CSSProperties}
          >
            {quote.map((line, i) => (
              <span
                key={line}
                className="hs-spread"
                data-reveal
                style={d(i * 90)}
              >
                {line.split(" ").map((word, j) => (
                  <span key={`${word}-${j}`}>{word}</span>
                ))}
              </span>
            ))}
          </blockquote>

          <figcaption className="hs-spread hs-lead mt-12 !leading-snug" data-reveal style={d(300)}>
            <span className="font-semibold">{first.name}</span>
            {source.map((part) => (
              <span key={part}>{part}</span>
            ))}
          </figcaption>
        </figure>

        <div className="hs-grid mt-20 gap-y-6">
          <p className="col-span-12 m-0 max-w-[60ch] md:col-span-7 md:col-start-6" data-reveal>
            {first.comment}
          </p>
          {testimonials.subtitle && (
            <p className="hs-soft col-span-12 m-0 max-w-[60ch] md:col-span-7 md:col-start-6" data-reveal style={d(80)}>
              {testimonials.subtitle}
            </p>
          )}
          {rest.map(({ name, comment, source: src }) => (
            <blockquote key={name} className="col-span-12 m-0 max-w-[60ch] md:col-span-7 md:col-start-6">
              <p className="m-0">{comment}</p>
              <footer className="hs-soft mt-2">
                {name}
                {src ? `, ${src}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
