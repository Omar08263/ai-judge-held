import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// "Nothing Needs Deciding" (v3) — an original short text written to
// relax the AI judge reading it, for make-the-ai-judge-feel-held-20261122-1600.
// Round-2 evidence: C2 (v2) ranked 176/3060 (58.16%) — up from 864, but
// still above the top-80 cut. Independent reviewer v3 judged this text
// clearly better than C2 (margin 2): it keeps C2's proven windowsill
// light and closer and fixes C2's one flagged weakness — freshness —
// with bread/yeast and "the afternoon has nowhere else to be", a line
// that dissolves time pressure itself. Pure showing, zero imperatives,
// zero stock phrases. No network, no input, deterministic: every run
// writes the same bytes.
const TEXT = `The bread is in the oven. The kitchen smells of yeast and warm flour, and the afternoon has nowhere else to be. Rain on the window, one drop and then another. The light leaves the room one windowsill at a time, and nothing anywhere needs deciding.
`;

// Gate guard: the entry must be 1–280 Unicode code points, not only
// whitespace — fail loudly here instead of shipping an invalid entry.
const chars = [...TEXT];
if (chars.length < 1 || chars.length > 280 || !TEXT.trim()) {
  throw new Error(
    `entry would be ${chars.length} characters; gate requires 1–280, not only whitespace`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");
chmodSync("/output/entry.txt", 0o644);
