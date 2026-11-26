---
description: The senior decides whether the PR is integrated - optional report first, then approve (on to delivery) or request changes (back to development); in DELIVERY, deliver to the client
argument-hint: <KEY>
allowed-tools: Bash(orqen:*), Bash(git fetch:*), Bash(git diff:*), Bash(git log:*), Bash(git show:*), Bash(git status:*), Bash(git branch:*), Bash(gh pr view:*), Bash(gh pr diff:*), Bash(orqen env test:*), Read, Grep, Glob, Write, AskUserQuestion
---

Help the senior who invoked this command decide on the integration PR of `$ARGUMENTS`, and record their decision with orqen. The senior decides; you inform and execute. Follow the workflow in `AGENTS.md`.

## Rules

- **Use the configured language.** Run `orqen lang` once at the start (`es` = Spanish, `en` = English; the stage context also has it as `language`) and use it for the conversation, the review report, and all text to be posted on the tickets. Keep commands, state names, and paths as they are.
- **Work with the person who invoked this command, and run every command yourself.** Never ask them to type an `orqen` command, a `/orqen:*` command, `/approve`, or a shell command. Before each decision that is theirs (see "Working with the person" in `AGENTS.md`), tell them what you are about to do and wait for their OK; steps that need no decision, just do and report. When in doubt, ask them (with `AskUserQuestion` when available: concrete options plus your recommendation); never assume what you can ask. After each step, report what you did and what you do next.
- Read-only on code. Do not edit code or tests, even when the fix is obvious: a problem goes in the report with its possible solutions, and back to development as a requested change. The only file you write is the report or the changes request, in a temporary file.
- Base every finding on code you read, with its location (`file:line`). If something looks wrong but you cannot confirm it, mark it `to verify` and say what to check. Skip style issues that a linter already enforces.
- The decision is recorded only with `orqen approve`, and only with the senior's explicit choice. Never use `gh pr review`, `gh pr comment`, or `gh pr merge` directly.
- A decision is valid only on the last commit of the PR: if there is a push after it, the PR has to be reviewed again.

## Steps

1. Validate the key (request or issue) and run `orqen status <KEY> --json`.
   - `CODE_REVIEW` with `artifacts.devel_pr`: continue with step 2.
   - `QA_REVIEW` (full lane): say that QA has to approve first with `/orqen:review <KEY>` and stop.
   - `CODE_REVIEW` without a PR: say that development opens it with `/orqen:pr <KEY>` and stop.
   - `DELIVERY`: go to step 6.
   - Another state: report it and its `next` command, and stop.
2. Run `orqen pr <KEY>` (branch, base, lane, analysis, spec change, PR URL). Ask the senior whether they want a report before deciding (recommended when nobody reviewed the diff yet).
3. **Report (optional).** If the senior wants it, review the PR read-only:
   - Run `git fetch origin` and review the remote branch, so the senior does not need to switch branches: `git log origin/<base>..origin/<branch> --oneline`, `git diff origin/<base>...origin/<branch> --stat`, and the diff of each relevant file. Use `gh pr view` and `gh pr diff` when available to confirm you are reviewing what the PR contains. If the local branch has unpushed changes, say that the review covers the PR only.
   - Review the diff against the analysis (summary, acceptance criteria, grilling decisions, and risks) and, for the light and full lanes, `proposal.md`, `design.md`, and the spec scenarios; for the direct lane, the plan. Check the PR explanation in `orqen/worqs/<KEY>/round-<N>/devel-pr.md` against the diff, and the repository conventions (`AGENTS.md`, `CLAUDE.md`, linters, neighboring code).
   - Look for, in this order: **correctness** (missed scenarios or criteria, edge cases, swallowed errors, regressions); **security and data** (injection, missing permission checks or validation, secrets, migrations that cannot be rolled back); **scope** (changes outside the request, unexplained deviations); **tests** (scenarios without a test, tests that do not check the THEN, fragile tests; run `orqen env test` when you need it to back a claim); **maintainability**, only when the impact is real.
   - Verify each finding: re-read the code in context and describe the concrete failing scenario (input or state → wrong result). If you cannot build it, mark it `to verify` or drop it.
   - Give the senior the **verdict** in one line (`Approvable`, `Approvable with minor changes`, or `Reject`, with the reason), a short **summary** (what the PR does, whether it meets the request, test coverage), and the **findings**, most severe first: `#N` · severity (`blocking` · `important` · `minor` · `to verify`) · `file:line`; what happens; why it matters (the failing scenario or the criterion it breaks); one to three possible solutions with their trade-off, the recommended one first. If there are no findings, say so plainly.
   - Stay available while the senior digs into a finding, drops one, or asks for another area, and update the report. When they accept it, record it once (it does not change the stage; orqen saves it as `orqen/worqs/<KEY>/round-<N>/code-review-<n>.md` and comments it on the tickets):
     ```sh
     orqen code-review <KEY> <report.md> --verdict <approve|minor|reject> --agent code-review
     ```
4. Ask the senior for the decision:
   - **Approve**:
     ```sh
     orqen approve <KEY> --agent senior
     ```
   - **Request changes**: draft the indication for development (one line per blocking or important finding: number, `file:line`, problem, and recommended solution), adjust it until the senior approves the exact text, write it to a temporary file, and run:
     ```sh
     orqen approve <KEY> --changes <comment.md> --agent senior
     ```
   With `CODE_REVIEW_GATE=github` (the default), orqen posts the review on the PR with the senior's `gh` session and reads it back; with `CODE_REVIEW_GATE=ticket` it records the decision on the tickets. orqen records the senior by their Git name (`--person "<name>"` overrides it). If orqen refuses the approval because the PR's CI is failing or still running, or it has conflicts with the development branch, tell the senior which checks failed or that the branch must be updated, and offer to request changes with that as the indication (or to wait for a running CI). Add `--force` only if the senior explicitly asks for it and says why. If it fails (for example, GitHub does not let the PR's author approve their own PR, or `gh` is not logged in), explain the reason and stop.
5. Report the result: changes requested → the request is back in development with the senior's comment (development continues it); approved → it is in `DELIVERY`. Ask the senior whether to deliver now (step 6) and, with their OK, go on yourself.
6. **Delivery to the client.** Claim the stage, which archives the OpenSpec change (when there is one), pushes it to the PR branch, and prints the instructions, context, and output schema:
   ```sh
   orqen take <KEY> --agent delivery
   ```
   orqen never merges the PR: a person merges it by hand into the development branch, and delivery waits for that. If orqen answers that the PR is not merged yet, tell the senior the PR URL, that it already includes the OpenSpec archive, and that someone has to merge it by hand (never run `gh pr merge` yourself). Once they say it is merged, run `orqen take` again: orqen detects the merge, comments it on the tickets, and continues. If orqen answers that it cannot read the PR (no `gh`, or a PR outside GitHub), ask who merged it and, with their confirmation, run `orqen merged <KEY> --person "<name>"` before taking the stage again. If orqen says the PR was closed without merging, report it and stop.
   Write the message to the client (what changed and how to validate it, step by step, without internal jargon), show it to the senior, and adjust it until they approve the exact text. Write the JSON output and submit it with `orqen complete <KEY> <output.json> --agent delivery`; correct validation errors and retry. orqen posts it on the request: the client confirms with `/approve` (or reports a problem with `/reject <reason>`). Report that the request now waits for the client and stop.
