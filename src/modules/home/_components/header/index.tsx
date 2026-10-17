import { useContext, useMemo, useState, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";
import { appStoreClick } from "../../../../utils/tracking";
import { longest } from "../../../../utils/measure";

/**
 * The hero: the claim on the left, the proof on the right. The proof is the
 * app's own before/after slider wiping an old kitchen into the finished one
 * (cut from demo-3.mp4), and under the claim the sample kitchen's running
 * total, which the reader can push past its budget by logging the next costs.
 * The figures are the sample project in the app's screenshots, not a claim
 * about anyone's spend.
 */

const format = (currency: string, n: number) =>
  `${currency}${Math.round(n).toLocaleString("en-US")}`;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

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
  const over = spent > sample.budget;
  const money = (n: number) => format(sample.currency, n);
  const status = over
    ? ui.poster.over.replace("{amount}", money(spent - sample.budget))
    : ui.poster.left.replace("{amount}", money(sample.budget - spent));

  const [line1, line2] = ui.poster.headline;

  return (
    <section id={header.id} data-field="dark" className="hs-dark overflow-hidden">
      <div className="hs-wrap hs-grid gap-y-12 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="col-span-12 flex flex-col md:col-span-6">
          <h1
            className="hs-display hs-display--half hs-rise m-0"
            style={{ "--chars": longest([line1, line2]) } as CSSProperties}
          >
            <span className="block whitespace-nowrap">{line1}</span>
            <span className="block whitespace-nowrap">{line2}</span>
          </h1>

          <p className="hs-lead hs-rise m-0 mt-8 max-w-[30ch]" style={d(80)}>
            {ui.header.eyebrow}. {header.usersDescription}.
          </p>

          {appStoreLink && (
            <a
              href={appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hs-badge hs-rise mt-8 self-start"
              style={d(140)}
              {...appStoreClick("hero")}
            >
              <img
                className="h-[54px]"
                alt="Download Home Stories on the App Store"
                src={withBase("/stores/app-store.svg")}
                width={162}
                height={54}
              />
            </a>
          )}

          <LiveTotal
            project={sample.project}
            budget={money(sample.budget)}
            spent={money(spent)}
            ratio={spent / sample.budget}
            ofBudget={ui.header.ofBudget}
            status={status}
            over={over}
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

        {/* The proof: a real recording from the app, large */}
        <figure className="hs-hero-media hs-rise col-span-12 m-0 md:col-span-6" style={d(60)}>
          <video
            src={withBase("/videos/hero-reveal.mp4")}
            poster={withBase("/videos/hero-reveal.webp")}
            aria-label="The Home Stories before and after slider wiping an old oak kitchen into the finished white one."
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            width={720}
            height={900}
          />
        </figure>
      </div>

      <div className="hs-wrap hs-grid gap-y-10 pb-20 md:pb-28">
        <p className="hs-lead col-span-12 m-0 max-w-[40ch] md:col-span-6" data-reveal>
          {header.subtitle}
        </p>
        <Facts />
      </div>
    </section>
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
      className="col-span-12 m-0 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:col-span-6 md:grid-cols-3"
    >
      {facts.map(({ label, value }, i) => (
        <div key={label} data-reveal style={d(i * 60)}>
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
  ratio: number;
  ofBudget: string;
  status: string;
  over: boolean;
  tryIt: string;
  costs: { name: string; amount: string; logged: boolean }[];
  onToggle: (index: number) => void;
}

/**
 * The app's running total at true size, and a real control: each cost is a
 * toggle button and the bar follows it. With no script it shows the sample as
 * it stands, which is still true.
 */
function LiveTotal({
  project,
  budget,
  spent,
  ratio,
  ofBudget,
  status,
  over,
  tryIt,
  costs,
  onToggle,
}: LiveTotalProps) {
  return (
    <div data-ui className="hs-live hs-rise mt-14 md:mt-auto md:pt-16" style={d(220)}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-semibold">{project}</span>
        <span className="tabular-nums">
          {Math.round(ratio * 100)}% {ofBudget}
        </span>
      </div>
      <p className="m-0 mt-2 flex flex-wrap items-baseline gap-x-3">
        <span className="hs-head tabular-nums">{spent}</span>
        <span className="hs-lead hs-soft tabular-nums">/ {budget}</span>
      </p>

      <div
        className="hs-bar mt-4"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(ratio * 100)}
        aria-label={`${project}: ${Math.round(ratio * 100)}% ${ofBudget}`}
        style={{ "--fill": Math.min(ratio, 1) } as CSSProperties}
        data-over={over || undefined}
      >
        <div className="hs-bar__fill" />
      </div>
      <p className={`m-0 mt-3 font-semibold ${over ? "hs-over" : ""}`} aria-live="polite">
        {status}
      </p>

      <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
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
      <p className="hs-soft m-0 mt-3">{tryIt}</p>
    </div>
  );
}

export default Header;
