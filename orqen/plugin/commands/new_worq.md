---
description: Start a worq the team itself needs (no client request, no support or analysis): creates its issue in the connector, or takes an existing one, and takes it to development
argument-hint: <title> | <ISSUE-KEY>
allowed-tools: Bash(orqen:*), AskUserQuestion
---

`$ARGUMENTS` is the title of the work, or the key of an issue that already exists (e.g. `GH-12`, `DEV-34`). If it is missing, ask the person for it. This is work the team starts itself: there is no client or request, so support and analysis are skipped. orqen creates the issue in the connector the project uses (the issues connector, or the requests one when there is none), or takes the existing one.

**Short path (only a title and a description).** If the person just wants to describe the work in their own words and let the analysis work out the rest, do not build the brief: run `orqen new_worq <brief.json>` with `{ "title": "...", "description": "..." }` (the description as they wrote it, at least 20 characters). The worq is born in ANALYSIS with the person as its analyst and requester; continue with `/orqen:analyze <KEY>`, which asks them what is missing, picks the lane and writes the spec. orqen studio's "Nuevo Worq" does exactly this.

If it is an existing issue, read it first (`orqen comments <KEY>` shows its title, description and comments) and start the brief from what it says.

Run `orqen lang` for the configured language. Use it for the conversation and the brief, including its acceptance criteria and plan, which are published on the ticket. Ask only what you cannot infer, one question at a time with your recommendation:
- **description**: what to do and why, in a few sentences.
- **acceptance_criteria**: at least one, each testable ("Dado … cuando … entonces …" in Spanish, "Given … when … then …" in English). Testing evaluates every one.
- **plan**: the steps, each ending with its estimate in hours, e.g. `Unify the entry point (2h)`.
- **estimated_hours**: the total.

Recognise the kind of work and propose its usual criteria, so the person confirms or adjusts instead of writing them from scratch:
- **Refactor**: the behaviour does not change (the existing tests pass without editing them); what was duplicated or tangled has one place; no public API changes unless agreed.
- **Technical debt / cleanup**: the dead code, warning or workaround named in the description is gone; the build and the tests stay green.
- **Dependency upgrade**: the new version is in the manifest and the lock file; the tests pass; the breaking changes of the changelog that affect the project are handled (name them).
- **Bug the team found**: a test that reproduces the bug fails before the fix and passes after it; nearby behaviour stays the same.
- **Tooling / CI / scripts**: the new command or job runs from a clean checkout; the README or the docs say how to use it.
- **Performance**: the operation is measured before and after with the same data, and the target is a number.

Show the person the brief and get their explicit OK, because the issue is created (or labelled and commented) in the tracker right away. Then write it as JSON in a temporary file outside the repository and run, from the repository root:

- new issue: `orqen new_worq "<title>" <brief.json>`
- existing issue: `orqen new_worq --issue <KEY> <brief.json>` (the title is the issue's; pass `"<title>"` before the file to use another)

The brief is `{ "description": "...", "acceptance_criteria": ["..."], "plan": ["... (2h)"], "estimated_hours": 4 }`. orqen validates it and starts the worq with the issue's key (`<KEY>`), in DEVELOPMENT, direct lane. If it reports the brief is invalid, nothing was created: fix what it names and run it again. If it says the issue was created but the worq could not start, fix that and run the `--issue` command it prints, so no second issue is created.

Then continue with `/orqen:implement <KEY>`. The rest of the flow is the usual one (testing, `/orqen:pr`, senior `/orqen:approve`) without QA. There is no delivery or client acceptance: when a person merges the PR by hand, orqen detects it and closes the worq and its issue.
