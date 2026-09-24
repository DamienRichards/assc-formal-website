import { useReveal } from "@/hooks/use-reveal";

type Milestone = { time: string; title: string; details: string[] };

const MILESTONES: Milestone[] = [
  {
    time: "18:00",
    title: "Buses depart from Gate 5",
    details: ["Students are transported to A-Lodge"],
  },
  {
    time: "18:30",
    title: "Arrival of all students",
    details: ["Walk-in photographs"],
  },
  {
    time: "19:00",
    title: "Guests are seated",
    details: [
      "Short introduction to the ASSC",
      "Bongani (MC) outlines the rest of the programme",
      "Open positions for next year's ASSC are announced",
      "MC speaks — a few jokes to keep the mood light",
      "Damien speaks — thanking the venue, photographer, sound & Zeus",
      "Starters are already on the tables",
      "Photo booth opens",
    ],
  },
  { time: "20:00", title: "Mains are served", details: ["Photo booth open"] },
  {
    time: "20:30",
    title: "Dessert is served",
    details: ["Photo booth open — party photos begin"],
  },
  {
    time: "21:00",
    title: "Party starts",
    details: ["Photo booth closes", "Party photos continue"],
  },
  {
    time: "23:00",
    title: "Buses depart from A-Lodge",
    details: ["Students are transported back to Gate 5"],
  },
  { time: "00:00", title: "Venue closes", details: [] },
];

function Item({ item, index }: { item: Milestone; index: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      data-visible={visible}
      className="reveal relative pl-10 sm:pl-14"
      style={{ transitionDelay: `${Math.min(index, 6) * 70}ms` }}
    >
      <span className="absolute left-[9px] top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_2px_var(--gold)] sm:left-[13px]" />
      <div className="font-display text-2xl text-gilded sm:text-3xl">
        {item.time}
      </div>
      <h3 className="mt-1 text-sm font-semibold tracking-[0.18em] uppercase">
        {item.title}
      </h3>
      {item.details.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {item.details.map((d) => (
            <li key={d} className="flex gap-2">
              <span className="text-primary">—</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Programme() {
  return (
    <section id="programme" className="mx-auto max-w-3xl px-5 py-24">
      <header className="text-center">
        <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
          An evening at A-Lodge
        </p>
        <h2 className="mt-3 font-display text-4xl text-gilded sm:text-5xl">
          Programme of the Evening
        </h2>
        <div className="rule-gold mx-auto mt-6 w-40" />
      </header>

      <ol className="relative mt-14 space-y-12 before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-px before:bg-gradient-to-b before:from-transparent before:via-[var(--gold)] before:to-transparent sm:before:left-[13px]">
        {MILESTONES.map((m, i) => (
          <Item key={m.time} item={m} index={i} />
        ))}
      </ol>

      <p className="mx-auto mt-16 max-w-xl text-center font-display text-lg leading-relaxed text-muted-foreground italic sm:text-xl">
        Please dance, sing, laugh — join in however you like, all night long.
        Nothing here is set in stone. Consider it simply a loose structure for
        the evening.
      </p>
    </section>
  );
}
