---
description: Write an explanation of the implemented request and ask orqen to open its integration pull request
argument-hint: <KEY>
allowed-tools: Bash(orqen:*), Bash(git diff:*), Bash(git log:*), Bash(git status:*), Bash(git branch:*), Bash(git show:*), Read, Grep, Glob, Write, AskUserQuestion
---

Prepare the integration PR for `$ARGUMENTS` from the repository root. `orqen pr` targets `DEVEL_BRANCH`. It is the only PR in the workflow: testing opens none, and the senior does the code review (CODE_REVIEW) on this PR. Follow the workflow in `AGENTS.md`.

## Rules

- **Talk to the person in their system language.** Run `orqen lang` once at the start (`es` = Spanish, `en` = English; the stage context also has it as `language`) and use it for every message, question, and option. Keep commands, state names, and paths as they are. Files and texts posted on the tickets follow their own rules.
- **Work with the person who invoked this command, and run every command yourself.** Never ask them to type an `orqen` command, a `/orqen:*` command, `/approve`, or a shell command. Before each decision that is theirs (see "Working with the person" in `AGENTS.md`), tell them what you are about to do and wait for their OK; steps that need no decision, just do and report. When in doubt, ask them (with `AskUserQuestion` when available: concrete options plus your recommendation); never assume what you can ask. After each step, report what you did and what you do next.
- Let `orqen pr` commit, push, and open the PR. Read the tickets read-only. Leave branch changes, OpenSpec archiving, and workflow files to orqen.
- Describe the actual diff. Identify deviations from the specification or plan, and report only test results you observed.

## Steps

1. Validate the key (request or issue). Run `orqen pr <KEY>` to read the branch, base, lane, issue, analysis path, spec change, and any existing PR. If the request is ineligible, report the reason and stop.
2. Check the current branch with `git branch --show-current`. If it differs from the request branch, ask the user to switch and stop. Mention pending changes that `orqen pr` will commit.
3. Read the log and diff against the target base (or its remote-tracking branch), review the analysis and OpenSpec artifacts or direct plan, and inspect the tests. Run tests when needed to substantiate a result.
4. Write a temporary Markdown explanation with the ticket keys, a summary, changes by capability, decisions and deviations, tests mapped to the acceptance criteria, verification steps, and risks or pending work.
5. Run `orqen pr <KEY> <explanation.md> --agent pr`. Pass `--title "<title>"` if needed. orqen saves the explanation to the work record, commits pending changes, pushes the branch, and opens or updates the PR. If it fails because the repository is not on the request branch, ask the user to switch and stop (orqen writes nothing in that case). For any other failure, address the reported cause before retrying.
6. Report the PR URL, branch, target base, and relevant risks or deviations.
