import type { DepartureDate } from "@/components/blocks/departure-dates";

/** Generate rolling group departure dates from today */
export function buildDepartures(
  price: number,
  count = 5,
  intervalDays = 14
): DepartureDate[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const labels: (string | undefined)[] = ["Upcoming", undefined, "New", undefined, "New"];
  const totalSlots = [30, 30, 40, 40, 40];
  const leftPct   = [0.25, 0.65, 1, 1, 1]; // % slots remaining

  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + 20 + i * intervalDays);
    const max = totalSlots[i] ?? 30;
    const left = Math.round(max * (leftPct[i] ?? 1));
    return {
      date: d.toISOString().split("T")[0],
      slotsTotal: max,
      slotsLeft: left,
      price,
      label: labels[i],
    };
  });
}
