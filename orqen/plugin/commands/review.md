---
description: QA review of a full-lane request - check the end-to-end tests of the change on screen with QA and record their decision
argument-hint: <KEY>
allowed-tools: Bash(orqen:*), Bash(git status:*), Bash(git branch:*), Bash(git diff:*), Bash(git log:*), Bash(npm:*), Bash(npx:*), Read, Grep, Glob, Write, AskUserQuestion
---

Run the QA review of `$ARGUMENTS` with the QA person who invoked this command. Only full-lane requests go through QA, in `QA_REVIEW`, after `TESTING` passed. QA controls test edits and the decision. Follow the workflow in `AGENTS.md`.

## Rules

- **Use the configured language.** Run `orqen lang` once at the start (`es` = Spanish, `en` = English; the stage context also has it as `language`) and use it for the conversation, the QA report, and all text to be posted on the tickets. Keep commands, state names, and paths as they are.
- **Work with the person who invoked this command, and run every command yourself.** Never ask them to type an `orqen` command, a `/orqen:*` command, `/approve`, or a shell command. Before each decision that is theirs (see "Working with the person" in `AGENTS.md`), tell them what you are about to do and wait for their OK; steps that need no decision, just do and report. When in doubt, ask them (with `AskUserQuestion` when available: concrete options plus your recommendation); never assume what you can ask. After each step, report what you did and what you do next.
- Do not run `orqen take`, `complete`, `block`, or `release`. The only workflow command you run is `orqen review` at the end, with QA's explicit decision.
- Leave test edits to QA. Read the tickets read-only and leave Git writes, branch changes, and OpenSpec archiving to orqen.
- Do not rerun the full regression: `TESTING` already ran every test type. Focus on the end-to-end tests of this change and whether they check what was asked.
- Report missing coverage and failures as observed. Wait for explicit approval of a passing run after any manual edits.

## Steps

1. Validate the key (request or issue) and run `orqen status <KEY>`. Continue only for a request in `QA_REVIEW`. If it is in another state, report it and stop: the direct and light lanes skip QA, and a full-lane request reaches QA after `TESTING`. Record the branch, lane, change, and round.
2. Check that the current branch matches the request branch. If it differs, ask QA to switch and stop. Report pending changes unrelated to the end-to-end tests.
3. List the OpenSpec scenarios of the change and read the `TESTING` result in the work record (`orqen/worqs/<KEY>/`).
4. Detect the project's test runner and find the end-to-end tests this change added or modified. Match each scenario to a test by file and name, and check its assertions against the expected behavior (the THEN).
5. Start the project with `orqen env up --all` (it starts every process in `orqen/environment.yaml`, including the frontend, waits until they respond, and runs migrations and seed; `orqen env status` shows each log). Do not ask QA to start anything by hand. Run the end-to-end tests of the change with `orqen env test e2e -- <files or filter>`, in the runner's headed mode, with traces, screenshots, or video, and record the commands and artifact paths.
6. Give QA a table of scenarios, tests, commands, and expected screen behavior. Flag scenarios without a test, missing assertions, fragile selectors, fixed waits, and order-dependent tests. Ask QA to make any corrections directly on the branch.
7. Rerun after edits and verify that each scenario still has coverage. If QA edited tests, the edits stay uncommitted on the branch: before approving, run `/orqen:pr` (or `orqen pr <KEY> <explanation.md>`) so they reach the PR the senior reviews. When the review ends, stop the processes with `orqen env down`.
8. Write a short report to a temporary file outside the repository: scenarios and tests reviewed, commands and artifacts, observations, and QA's decision. Show it to QA and record their decision:
   - Approve (only with a passing run): `orqen review <KEY> approve --report <report.md> --person "<QA name>" --agent qa`. The request moves to `CODE_REVIEW`, where the senior reviews the PR.
   - Request changes: `orqen review <KEY> reject --reason "<what development must fix>" --report <report.md> --person "<QA name>" --agent qa`. The request returns to `DEVELOPMENT` with the reason as feedback.

   orqen saves the report as `orqen/worqs/<KEY>/round-<N>/qa-review-<n>.md` and comments the decision on the request and on its issue (when there is one). QA can also decide by commenting `/approve` or `/reject <reason>` on the request (limited to `workflow.approvers.qa` in `orqen/config.yaml`).
9. Stop the processes with `orqen env down` if they are still running and report who acts next: approved → the senior reviews the PR; changes requested → development fixes it. Do not ask QA to run another command.
