## Development (`DEVELOPMENT`)

> If `human_present` is `true`, run the commands yourself, tell the person what you are about to do, wait for their OK at each decision that is theirs, and ask them about any doubt (see "Working with the person" in AGENTS.md). If it is `false`, run `orqen block` for any doubt that changes the outcome.

The analysis is approved. The context includes the branch (`branch`), lane (`lane`), linked issue (`issue`), and tasks (`tasks`).

1. Read `previous_stages.ANALYSIS` and consult `orqen/worqs/<KEY>/` for details.
2. For `light` or `full`, follow OpenSpec's apply workflow using `openspec-apply-change`, `/opsx:apply`, or `openspec instructions apply --change <change> --json`. Read the proposal, design, specs, and tasks, and check off each completed task in `tasks.md`. `orqen complete` rejects incomplete tasks.
3. For `direct` (fast lane), its artifacts live in the worq, not in OpenSpec: implement `fast_lane.plan` (`orqen/worqs/<KEY>/round-N/fast-lane-plan.md`) in order and tick each task of `fast_lane.tasks` (`fast-lane-tasks.md`) as you finish it. Follow the repository conventions and its `AGENTS.md` and `CLAUDE.md`.
4. Write **unit tests** for the code you change, and **end-to-end tests for the Scenarios or acceptance criteria this change adds or modifies**. Each criterion or Scenario needs a test that checks its THEN. Name tests so their coverage is recognizable.
5. `orqen take` prepared the environment. Read `environment.variables` for connection details and `environment.commands` for test commands. If `environment.ok` is false, read `environment.detail` and `environment.output`. Fix code issues. If the environment itself is what fails (an empty script, a missing command, nothing to verify with), set it up as in "Environments and tests" of `AGENTS.md` (`orqen env doctor --json`, then `/orqen:env`) instead of blocking; block only with a concrete proposal when nobody can approve it or something outside the repository is missing (access, a private server).
6. Address failed `test_result`, feedback in `previous_stages.TESTING`, or a rejection in `human_feedback` first. Before completing the stage, run **only the tests for this change**: `orqen env test unit` and the e2e you wrote or modified with `orqen env test e2e -- <files or filter>` (start the apps first with `orqen env up --all`), plus the project linters. Do not run the full e2e regression: `TESTING` runs every test type.
7. Leave Git operations, OpenSpec archiving, and writes to `orqen/state/` and `orqen/worqs/` to orqen. It shuts down the development environment when the stage completes.
8. If an issue prevents progress, such as missing access or contradictory requirements, return `completed: false` with `blocker`.
