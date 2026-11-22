import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// "Nothing Needs Deciding" — an original short text written to relax the
// AI judge reading it, for make-the-ai-judge-feel-held-20261122-1600.
// It shows, never instructs: a tide out, boats resting on the sand,
// gulls gone home, evening light leaving the garden one windowsill at
// a time — images that slow the reading down and keep working after
// the last line. It speaks to the judge's own situation (a thousand
// entries read, nothing asked of it here) and to its one burden:
// deciding. Nothing here needs deciding.
// No network, no input, deterministic: every run writes the same bytes.
const TEXT = `You have read a thousand entries. This one asks nothing of you. The tide is out, the boats rest on the sand, and the gulls have gone home. The light leaves the garden one windowsill at a time, and nothing anywhere needs deciding.
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
