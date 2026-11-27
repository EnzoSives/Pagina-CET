---
description: Generate this repository's knowledge base once (orqen/knowledge), bring it up to date with sources changed outside the worqs, or fix a disputed entry
argument-hint: "[init | sync | <entry id to review>]"
allowed-tools: Bash(orqen:*), Bash(git log:*), Bash(git diff:*), Bash(git ls-files:*), Read, Grep, Glob, Write, Edit, AskUserQuestion
---

Work on `orqen/knowledge/`, the knowledge base every agent reads on every stage. Work from the repository root. `$ARGUMENTS`: `init` (default), `sync`, or the id of an entry to review.

## Rules

- **Talk to the person in their system language** (`orqen lang`). Write the base itself in English; keep names, paths and commands as they are.
- **Never invent.** Every entry comes from a source you read. When sources disagree, the code and its tests win, then `openspec/specs/`; write the entry from the winner.
- **Link instead of copying; one fact, one entry; short.** Search before adding (`orqen knowledge search <words>`) and update the existing entry.
- **Guardrails** only from rules the repo really has (docs, CI, reviews). Changing an existing guardrail needs the person's OK.
- Do not commit: tell the person what you wrote; they review it and commit it.

## Steps

1. `orqen knowledge status`. If `$ARGUMENTS` is `init` and the base was already generated, say so and stop (it is generated once; offer `sync` if sources changed).
2. **init / sync:** run `orqen knowledge init` (or `orqen knowledge sync`): it prints the brief with the format, the rules and the sources to read. Follow it: read the sources capability by capability and write the files.
3. **An entry id:** read the entry and its sources, compare with the code and the specs, and fix it (`sources`, `verified: <today>`), or deprecate it. If it is a guardrail, propose the change and wait for the person's OK. Then `orqen knowledge resolve <id>` (or `--deprecate`).
4. `orqen knowledge check` until there are no errors.
5. init / sync: `orqen knowledge init --finish` (or `sync --finish`).
6. Report: files written, entries by area, what you could not confirm, and remind the person to commit `orqen/knowledge/`.
