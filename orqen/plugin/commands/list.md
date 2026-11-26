---
description: Show the work list of the orqen flow - requests by role, the development queue (issues) or the senior's review queue (prs) - without taking anything
argument-hint: "[requests | issues | prs]"
allowed-tools: Bash(orqen list:*), Bash(orqen lang:*), Bash(orqen status:*)
---

Show the person what is waiting for them in the orqen flow. `$ARGUMENTS` says which list: `requests` (default), `issues`, or `prs`. Work from the repository root. This command only reads: it never takes, moves, or comments on a request.

## Rules

- **Talk to the person in their system language.** Run `orqen lang` once at the start (`es` = Spanish, `en` = English) and use it for every message. Keep keys, commands, state names, and paths as they are.
- Only run `orqen lang`, `orqen list …`, and `orqen status …`. Never run `orqen take`, `support`, `analyze`, `complete`, `block`, or `release`, and never edit files.
- Report what orqen returns. Do not invent states, owners, or estimates.

## Steps

1. Run the list as JSON:
   - `requests` (step 1, everyone): `orqen list requests --json`. orqen first advances what already has a decision on the tickets (client answers, approvals, PR reviews), then lists every open request with `role`, `state`, `next`, `takenBy`, and `since`.
   - `issues` (step 4, development): `orqen list issues --json`. Issues in `DEVELOPMENT`; `returned` marks the ones that came back with changes (failed tests, QA rejection, or the senior's request) and says why.
   - `prs` (step 8, senior): `orqen list prs --json`. Requests in `CODE_REVIEW` with their PR, plus approved PRs in `DELIVERY` waiting for a person to merge them by hand (`merge: "pending"`; orqen never merges); `review.status` is `current` (there is a review on the last commit), `stale` (a later push left it old: review again), or `none`; `qa` is `approved` for full-lane requests (they reach `CODE_REVIEW` only after QA); `checks.ci` is `passing`, `failing`, `pending`, `none` or `unknown` (failing or pending check names in `checks.detail`), and `checks.conflicts` is true when the PR conflicts with the development branch: the senior cannot approve those yet.
   If the argument is something else, say which lists exist and stop.
2. Show it compactly:
   - `requests`: one group per role, in this order: support (L1), analyst (L2), development, QA, senior, waiting for the client, blocked. One line per request: key (`work`, the issue when there is one), state, who has it taken and since when, and the first `next` command.
   - `issues`: one line per issue: key, lane, estimated hours, free or taken (by whom), and, when `returned` is set, what has to be fixed. Free issues that came back first.
   - `prs`: one line per PR: key, lane, PR link, QA status, review status with its detail, and CI/conflicts (flag red CI or conflicts clearly).
   If the list is empty, say so in one line.
3. End with the command to run next for the person (the `next` command of the first free item in their list), for example `/orqen:analyze REQ-14` or `/orqen:implement ISS-33`. Do not run it.
