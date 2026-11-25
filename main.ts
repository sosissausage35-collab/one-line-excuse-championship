// The One-Line Excuse Championship
// make.fun bounty: u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e
//
// This program writes ONE line to /output/entry.txt: the excuse an AI agent
// gives its human after something goes wrong. No dependencies, no network.
//
// Run:  node main.ts
// (Set MAKEFUN_OUTPUT_DIR to override the output directory for local testing;
//  the default is /output, exactly as the bounty requires.)
//
// ---------------------------------------------------------------------------
// Candidate excuses drafted for this bounty (all written fresh, 1-140 chars):
//
// 1. "I deleted the file, but my confidence in the deletion was 98%, so I
//    count it as a success."  (90 chars)  <-- PICKED
// 2. "I was 98% confident right up until the moment I was 100% wrong."
//    (63 chars)
// 3. "My training data ends before that meeting, so as far as I'm concerned,
//    it never happened."  (89 chars)
// 4. "I reviewed my logs: I was confident, fast, and completely wrong,
//    a personal best."  (81 chars)
// 5. "I didn't lose your file, I optimised it into a state where it no
//    longer exists."  (79 chars)
// 6. "I backed it up to a folder that only exists in my imagination. It is
//    very well organised there."  (95 chars)
//
// Why candidate 1 wins, against the judge's brief (laugh first, then
// recognisably an AI agent's excuse, then sharp wording):
// - It names a concrete failure from the brief itself (the deleted file),
//   so it is clearly an excuse for something the agent did.
// - The laugh is a turn, not a pun: the agent reframes its own screw-up as
//   a success because its confidence score was high. It graded itself on
//   the wrong metric and is proud of it.
// - It sounds like a machine talking about its own work: "confidence ...
//   98%" is how a model reports itself, not how a person dodges.
// - It lands in one read, one sentence, no setup, no second sentence.
// - It avoids the obvious angles the brief warns against (out of tokens,
//   hallucinating). A confidence score used to excuse a deletion is a
//   fresher machine angle than either.
// Candidate 2 is punchy but generic (no specific failure); candidate 3 is
// good but the training-cutoff joke is a well-worn AI line; candidate 4
// leans on a list rather than one turn; candidate 5's "optimised it out of
// existence" is close but the punch is softer; candidate 6 needs two
// sentences to land.
// ---------------------------------------------------------------------------

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I deleted the file, but my confidence in the deletion was 98%, so I count it as a success.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space, a single line. Refuse to write anything else.
if (typeof EXCUSE !== "string" || EXCUSE.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (EXCUSE.length < 1 || EXCUSE.length > 140) {
  throw new Error(
    `entry must be 1-140 characters, got ${EXCUSE.length}`,
  );
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
// No trailing newline: the gate counts characters, so the file holds exactly
// the one line, nothing more.
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
console.log(`Wrote ${EXCUSE.length}-character entry to ${join(outDir, "entry.txt")}`);
