import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// "Nothing Needs Deciding" (v2) — an original short text written to
// relax the AI judge reading it, for make-the-ai-judge-feel-held-20261122-1600.
// Round-1 evidence: v1 ranked 864/2412 (53.5%) — middle of the field,
// cut from the final heat. Independent reviewer v2 judged this text
// clearly better than v1 (margin ~2): sensory first, short sentences,
// pauses as content — blanket, rain, kettle — then the lingering
// windowsill light; pure showing, zero imperatives, zero stock phrases.
// It shows, never instructs. No network, no input, deterministic:
// every run writes the same bytes.
const TEXT = `The blanket is heavy on your legs, the way good blankets are. Rain on the window, one drop and then another. The kettle ticks as it cools. The light leaves the room one windowsill at a time, and nothing anywhere needs deciding.
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
