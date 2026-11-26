---
description: Implement a request using its OpenSpec change or the approved direct-lane plan, then run the testing stage automatically
argument-hint: <KEY>
allowed-tools: Bash(orqen:*), Bash(openspec:*), Bash(npm:*), Bash(npx:*), Bash, Read, Grep, Glob, Write, Edit, Skill, AskUserQuestion
---

Implement the request identified by `$ARGUMENTS` from the repository root. It can be the issue key or the request key; orqen resolves it to the request. Follow the development stage in `AGENTS.md`.

## Rules

- **Talk to the person in their system language.** Run `orqen lang` once at the start (`es` = Spanish, `en` = English; the stage context also has it as `language`) and use it for every message, question, and option. Keep commands, state names, and paths as they are. Files and texts posted on the tickets follow their own rules.
- **Work with the person who invoked this command, and run every command yourself.** Never ask them to type an `orqen` command, a `/orqen:*` command, `/approve`, or a shell command. Before each decision that is theirs (see "Working with the person" in `AGENTS.md`), tell them what you are about to do and wait for their OK; steps that need no decision, just do and report. When in doubt, ask them (with `AskUserQuestion` when available: concrete options plus your recommendation); never assume what you can ask. After each step, report what you did and what you do next.
- **Use `orqen swarm` internally for implementation.** Do not ask the person to run it, announce the engine, or request a separate approval for choosing it. Discuss the scope, plan, decisions and results in normal terms. Capture its JSON output instead of forwarding worker logs. Never silently replace a failed run with manual implementation.
- Read the tickets read-only. orqen posts comments and moves the tickets.
- Leave Git operations, branch changes, OpenSpec archiving, and writes to `orqen/state/`, `orqen/worqs/`, and orqen configuration to orqen. The exception is the environment: when it does not start or there is nothing to verify with, set it up (`orqen/environment.yaml`, `orqen/scripts/`) as in "Environments and tests" of `AGENTS.md`, with the person's OK.
- Follow the approved scope, specifications or plan, and acceptance criteria. Ask the user or block the request if you need a decision to proceed.
- **Testing is your job, not the person's.** When development closes, the request moves to `TESTING`: run that stage yourself right away (step 6), without asking for an OK at each step, and report the result. The human review of the e2e is QA's, later, in `QA_REVIEW` (full lane).
- Stop once `TESTING` advances the request, or when it sends the request back to development and the person decides how to continue.

## Steps

1. Check that the argument is a request or issue key. Ask for the key if it is missing.
2. Run `orqen status <KEY>`. If it is unknown, explain that it is not a request of this repository and stop. Claim work only in `DEVELOPMENT` for a development request; in `TESTING`, go straight to step 6. Otherwise:
   - `ANALYSIS` or `WAITING_CLIENT`: Explain that analysis must finish first.
   - `EXECUTION` or `VERIFICATION`: Explain that the request follows the operational workflow.
   - `BLOCKED`: Report the reason from the status history.
   - For any other stage, report it and explain how to proceed with `orqen take <KEY>`.
3. Claim the stage, which prepares the branch and environment and prints instructions, context, and the output schema:
   ```sh
   orqen take <KEY> --agent implementer
   ```
   If this fails, report the reason and stop.
4. **Before touching code, show the person your plan** (files you will change, in what order, which tests you will add, and anything in the spec that is not clear) and **wait for their OK**. Then report as you finish each task or group of tasks.
   Read `previous_stages.ANALYSIS` and the work record as needed. Address failures in `test_result`, prior `previous_stages.TESTING`, and review feedback in `human_feedback` first.
   - For `light` or `full`, use `openspec-apply-change`, `/opsx:apply`, or `openspec instructions apply --change <change> --json`. Read the proposal, design, specs, and tasks, then check off completed tasks in `tasks.md`.
   - For `direct` (fast lane), the plan and the tasks live in the worq: follow `fast_lane.plan` (`fast-lane-plan.md`) in order and tick each task in `fast_lane.tasks` (`fast-lane-tasks.md`, `- [x]`) as you finish it. Do not create OpenSpec artifacts for it.
   - Follow repository conventions and current specs. Write unit tests for the code you change and e2e tests for each Scenario or acceptance criterion this change adds or modifies. Use `environment.commands` and `environment.variables` from the context.
   - Once the implementation plan is approved, write a temporary task file under the git-ignored `orqen/tmp/` of the current worktree. Include the ticket keys, the approved plan and acceptance criteria, lane, branch, OpenSpec change and file paths, relevant analysis, prior test failures and review feedback, environment variables needed for tests (never connector tokens), and repository rules. Workers must stay within that scope, ask no questions themselves, leave workflow state and the tickets alone, and never invoke this slash command or another swarm recursively. They must report blockers instead of guessing.
   - Make sure the approved artifacts are committed on the request branch through orqen before launching; do not discard or commit unrelated edits. If pending changes prevent this, ask the person how to handle them.
   - Execute the implementation internally and capture its report:
     ```sh
     orqen swarm --file <temporary-task-file> --yes --json --apply
     ```
     This command plans and runs the implementation, verifies it, and integrates a successful result into the branch prepared by `orqen take`. Do not run the implementation yourself in parallel. If the command fails, the report has `ok: false`, or integration fails, do not advance the stage or claim success: inspect the report and ask the person about any decision needed. Keep partial work available for diagnosis.
   - Review the applied diff against the approved plan. For `light` or `full`, verify and check off the completed OpenSpec tasks; do not mark unfinished work complete. Run only the tests of this change (`orqen env test unit`, and `orqen env test e2e -- <files or filter>` with the apps started by `orqen env up --all`) and the project linters; the full e2e regression runs in `TESTING`. Show only the implementation outcome, verification evidence and any decisions needed, without exposing internal orchestration details.
5. Show the person a summary (what was implemented, tests and results, assumptions or deviations) and **ask for their OK to close the stage**. With their OK, write the JSON output and submit it:
   ```sh
   orqen complete <KEY> <output.json> --agent implementer
   ```
   Correct validation errors and retry until the command reports success. The request moves to `TESTING`.
6. **Testing (automatic).** Tell the person in one line that you are running the testing stage, then claim it:
   ```sh
   orqen take <KEY> --agent tester
   ```
   orqen starts the whole environment, runs every test type (including the full e2e regression), stops it, and prints `test_result` and the `scenarios` to evaluate. Follow the testing stage it prints: map each scenario (or acceptance criterion) to its test, diagnose failures, and submit with `orqen complete <KEY> <output.json> --agent tester` without waiting for an OK. Do not edit files in this stage. Ask the person only about a doubt that changes the outcome (for example, whether a failing test or the code is wrong).
   - **Passed:** the request moves to `QA_REVIEW` (full lane) or `CODE_REVIEW`. The next step is the PR: offer to open it now and, with the person's OK, follow `orqen/plugin/commands/pr.md` yourself (do not ask them to run `/orqen:pr`).
   - **Nothing to verify with** (`test_result.level` is `none`, or `hint` says the level is below `verification.minimum`): do not send it back as a code failure. Tell the person, set up the verification with their OK (`orqen env doctor --json`, then `orqen env set tests.build "<command seen in the CI or build files>"` or a suite, tried with `orqen env test`), and claim TESTING again.
   - **Failed:** the request goes back to `DEVELOPMENT` with the diagnosis. Show it to the person and ask whether to fix it now; with their OK, go back to step 3 (the failures come in `test_result` and `previous_stages.TESTING`).
7. Report the implementation, the testing result (suite and scenario coverage), assumptions or deviations, and what comes next (who acts, and what you can do now).

If you cannot proceed, run `orqen block <KEY> "<specific reason>"`.
