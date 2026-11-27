import { publishingConfig } from "../../lib/academy/config";
import { centralDate } from "../../lib/academy/policy";
import { github } from "./github";
export interface Reservation {
  name: string;
  expired?: boolean;
}
export function checkReservations(
  artifacts: Reservation[],
  date: string,
  reservation: number,
  daily: number,
  monthly: number,
) {
  let day = 0,
    month = 0;
  for (const artifact of artifacts) {
    const match = /^academy-spend-(\d{4}-\d{2}-\d{2})-(\d+)-\d+-\d+$/.exec(
      artifact.name,
    );
    if (!match) continue;
    const amount = Number(match[2]);
    if (match[1].slice(0, 7) === date.slice(0, 7)) month += amount;
    if (match[1] === date) day += amount;
  }
  if (day + reservation > daily || month + reservation > monthly)
    throw new Error(
      "Academy generation budget cap reached; no paid call permitted.",
    );
  return { day, month, reservation };
}
export async function budgetReservation() {
  const artifacts: Reservation[] = [];
  for (let page = 1; page <= 100; page++) {
    const result = (await github(
      `/actions/artifacts?per_page=100&page=${page}`,
    )) as { artifacts: Reservation[]; total_count: number };
    artifacts.push(...result.artifacts);
    if (artifacts.length >= result.total_count) break;
    if (page === 100)
      throw new Error(
        "Budget history exceeds bounded lookup; paid calls stopped.",
      );
  }
  const date = centralDate(),
    budget = publishingConfig.budget;
  checkReservations(
    artifacts,
    date,
    budget.reservationCents,
    budget.dailyLimitCents,
    budget.monthlyLimitCents,
  );
  return `academy-spend-${date}-${budget.reservationCents}-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}`;
}
export async function requireReservation() {
  const expected = `academy-spend-${centralDate()}-${publishingConfig.budget.reservationCents}-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}`;
  if (process.env.ACADEMY_BUDGET_ARTIFACT !== expected)
    throw new Error("A durable pre-call budget reservation is required.");
  const result = (await github(
    `/actions/runs/${process.env.GITHUB_RUN_ID}/artifacts`,
  )) as { artifacts: Reservation[] };
  if (!result.artifacts.some((a) => a.name === expected && !a.expired))
    throw new Error(
      "Budget reservation was not durably uploaded. No paid calls permitted.",
    );
}
