import { useContext, useMemo, useState, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";
import { appStoreClick } from "../../../../utils/tracking";
import { longest, measure } from "../../../../utils/measure";

/**
 * The hero is the sample kitchen's running total, drawn as a level. Graphite
 * above, signal orange below, and the seam sits exactly where the spend sits
 * against the budget: $12,950 of $25,000 puts it at 52% of the screen. The
 * headline straddles the seam and changes ink where it crosses.
 *
 * The reader can log the next costs from the list beside it. Each one raises
 * the field; the last one takes the kitchen past its budget and the orange
 * fills the screen. The figures are the sample project in the app's own
 * screenshots, not a claim about anyone's spend.
 */

const format = (currency: string, n: number) =>
  `${currency}${Math.round(n).toLocaleString("en-US")}`;

function fill(template: string, amount: string) {
  return template.replace("{amount}", amount);
}

function Header() {
  const {
    appStoreLink,
    ui,
    home: { header },
  } = useContext(ConfigContext)!;

  const sample = header.sample!;
  const costs = sample.costs ?? [];
  const [logged, setLogged] = useState<boolean[]>(() => costs.map(() => false));

  const spent = useMemo(
    () => sample.spent + costs.reduce((sum, c, i) => sum + (logged[i] ? c : 0), 0),
    [logged, costs, sample.spent],
  );
  const ratio = spent / sample.budget;
  const over = spent > sample.budget;
  // The field is literal up to the budget; past it, the screen is all orange.
  const level = Math.min(ratio, 1);

  const [line1, line2] = ui.poster.headline;
  const chars = longest([measure(line1) + 4 > measure(line2) ? `${line1}xxxx` : line2]); // + the clip in line one
  const money = (n: number) => format(sample.currency, n);

  const status = over
    ? fill(ui.poster.over, money(spent - sample.budget))
    : fill(ui.poster.left, money(sample.budget - spent));

  const heroStyle = {
    "--level": level,
    // Where the seam starts: the headline is placed on it once and stays put.
    "--seam": Math.min(sample.spent / sample.budget, 1),
    "--chars": chars,
    "--chars-text": longest([line1, line2]),
  } as CSSProperties;

  // The same two lines, twice: the real h1 in mist on the graphite above the
  // seam, and a painted copy in graphite on the orange below it. The copy's
  // letters come from CSS (data-text), so it adds no second headline to the
  // page for readers, crawlers or assistive tech.
  const lines = (real: boolean) =>
    [line1, line2].map((line, i) => (
      <span key={i} className="hs-hero__line" data-text={real ? undefined : line}>
        {real && line}
        {i === 0 && (
          <span className="hs-hero__clip" aria-hidden="true">
            {real && (
              <video
                src={withBase("/videos/hero-reveal.mp4")}
                poster={withBase("/videos/hero-reveal.webp")}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            )}
          </span>
        )}
      </span>
    ));

  return (
    <>
      <section
        id={header.id}
        data-field={over ? "signal" : "dark"}
        className="hs-hero hs-dark"
        style={heroStyle}
      >
        <div aria-hidden="true" className="hs-hero__field" />

        <div aria-hidden="true" className="hs-hero__type hs-hero__type--below">
          <p className="hs-hero__h1 hs-display">{lines(false)}</p>
        </div>
        <div className="hs-hero__type hs-hero__type--above">
          <h1 className="hs-hero__h1 hs-display">{lines(true)}</h1>
        </div>

        <div className="hs-hero__foot hs-wrap hs-grid">
          <div className="col-span-12 md:col-span-4">
            <p className="hs-lead hs-rise m-0 max-w-[20ch] font-medium">
              {ui.header.eyebrow}.
            </p>
            {appStoreLink && (
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hs-badge hs-rise mt-5"
                
                style={{ "--d": "80ms" } as CSSProperties}
                {...appStoreClick("hero")}
              >
                <img
                  className="h-[52px]"
                  alt="Download Home Stories on the App Store"
                  src={withBase("/stores/app-store.svg")}
                  width={156}
                  height={52}
                />
              </a>
            )}
          </div>

          <div className="hidden md:col-span-8 md:col-start-5 md:block lg:col-span-7 lg:col-start-6">
            <LiveTotal
              project={sample.project}
              budget={money(sample.budget)}
              spent={money(spent)}
              percent={Math.round(ratio * 100)}
              ofBudget={ui.header.ofBudget}
              status={status}
              tryIt={ui.poster.tryIt}
              costs={costs.map((amount, i) => ({
                name: ui.poster.costs[i] ?? "",
                amount: `+${money(amount)}`,
                logged: logged[i],
              }))}
              onToggle={(i) =>
                setLogged((current) => current.map((v, j) => (j === i ? !v : v)))
              }
            />
          </div>
        </div>
      </section>

      {/* The orange runs on past the fold, as if the spend kept rising */}
      <div data-field="signal" className="hs-signal">
        <div className="hs-wrap hs-grid gap-y-14 pb-20 pt-10 md:pb-28 md:pt-16">
          <div className="col-span-12 md:hidden">
            <LiveTotal
              project={sample.project}
              budget={money(sample.budget)}
              spent={money(spent)}
              percent={Math.round(ratio * 100)}
              ofBudget={ui.header.ofBudget}
              status={status}
              tryIt={ui.poster.tryIt}
              costs={costs.map((amount, i) => ({
                name: ui.poster.costs[i] ?? "",
                amount: `+${money(amount)}`,
                logged: logged[i],
              }))}
              onToggle={(i) =>
                setLogged((current) => current.map((v, j) => (j === i ? !v : v)))
              }
            />
          </div>

          <p
            className="hs-lead col-span-12 m-0 max-w-[34ch] font-medium md:col-span-7"
            data-reveal
          >
            {header.subtitle}
          </p>

          <Facts />
        </div>
      </div>
    </>
  );
}

/** The plain facts, the things a person wants to know before they tap. */
function Facts() {
  const {
    ui,
    home: { facts },
  } = useContext(ConfigContext)!;
  if (!facts?.length) return null;

  return (
    <dl
      aria-label={ui.sectionLabels.atAGlance}
      className="col-span-12 m-0 grid grid-cols-2 gap-x-6 gap-y-5 self-end sm:grid-cols-3 md:col-span-5 md:col-start-8 md:grid-cols-2"
    >
      {facts.map(({ label, value }, i) => (
        <div
          key={label}
          data-reveal
          style={{ "--d": `${i * 70}ms` } as CSSProperties}
        >
          <dt className="hs-soft">{label}</dt>
          <dd className="hs-lead m-0 font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

interface LiveTotalProps {
  project: string;
  budget: string;
  spent: string;
  percent: number;
  ofBudget: string;
  status: string;
  tryIt: string;
  costs: { name: string; amount: string; logged: boolean }[];
  onToggle: (index: number) => void;
}

/**
 * The app's running total, at true size. It is a real control: each cost is
 * a toggle button, and the figures and the hero's field follow it. With no
 * script it shows the sample as it stands, which is still true.
 */
function LiveTotal({
  project,
  budget,
  spent,
  percent,
  ofBudget,
  status,
  tryIt,
  costs,
  onToggle,
}: LiveTotalProps) {
  return (
    <div data-ui className="hs-live hs-rise" style={{ "--d": "220ms" } as CSSProperties}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-medium">{project}</span>
        <span className="tabular-nums">
          {percent}% {ofBudget}
        </span>
      </div>
      <p className="m-0 mt-1 flex flex-wrap items-baseline gap-x-3">
        <span className="hs-head tabular-nums">{spent}</span>
        <span className="hs-lead tabular-nums">/ {budget}</span>
        <span className="ml-auto font-semibold" aria-live="polite">
          {status}
        </span>
      </p>
      <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
        {costs.map((cost, i) => (
          <li key={cost.name} className="m-0 p-0">
            <button
              type="button"
              aria-pressed={cost.logged}
              onClick={() => onToggle(i)}
              className="hs-cost"
            >
              <span>{cost.name}</span>
              <span className="tabular-nums">{cost.amount}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="hs-small m-0 mt-3">{tryIt}</p>
    </div>
  );
}

export default Header;
