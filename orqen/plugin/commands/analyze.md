---
description: Analyze a customer request with the analyst, choose a lane, write a spec when needed, and create the linked issue (when the project has one)
argument-hint: <KEY>
allowed-tools: Bash(orqen:*), Read, Grep, Glob, Write, Edit, Skill, AskUserQuestion
---

Analyze the customer request in `$ARGUMENTS` with the analyst who invoked this command. The argument is the request key. Do not ask for the analyst's name: orqen takes it from this machine (`git config user.name`). Only if the person asks to sign with another name, add `--analyst "<name>"` to `orqen analyze`. Work from the repository root and follow the customer request workflow in `AGENTS.md`.

## Rules

- **Talk to the person in their system language.** Run `orqen lang` once at the start (`es` = Spanish, `en` = English; the stage context also has it as `language`) and use it for every message, question, and option. Keep commands, state names, and paths as they are. Files and texts posted on the tickets follow their own rules.
- **Work with the person who invoked this command, and run every command yourself.** Never ask them to type an `orqen` command, a `/orqen:*` command, `/approve`, or a shell command. Before each decision that is theirs (see "Working with the person" in `AGENTS.md`), tell them what you are about to do and wait for their OK; steps that need no decision, just do and report. When in doubt, ask them (with `AskUserQuestion` when available: concrete options plus your recommendation); never assume what you can ask. After each step, report what you did and what you do next.
- Read the tickets read-only (an MCP for the ticket tool, or `orqen search`). orqen creates and links the issue and posts comments.
- Leave Git operations, OpenSpec archiving, and writes to `orqen/state/` and `orqen/worqs/` to orqen.
- Require the analyst's explicit approval of the analysis and lane. Record unknowns as open questions or labeled assumptions.

## Steps

1. Check that the argument is the request key (the client's ticket, e.g. `SOP-1234`, `GH-42`). If it is missing, ask for it and stop.
2. Claim the request and load the stage instructions, context, and output schema:
   ```sh
   orqen analyze <KEY> --agent analyst
   ```
   If this fails, explain the reason to the analyst and stop.
3. Read the request, comments, repository specs, code, and relevant history. Load `orqen:grilling` and interview the analyst about decisions that remain open.
4. Once the analyst approves the analysis, propose `operational`, `direct`, `light`, or `full` using the criteria in the stage guide. Ask the analyst to confirm.
5. For `light` or `full`, run `orqen lane <KEY> <lane> --agent analyst` and write the spec with the analyst. The other lanes skip the spec.
6. Write the JSON output and submit it:
   ```sh
   orqen complete <KEY> <output.json> --agent analyst
   ```
   Correct validation errors and retry until the command reports success.
7. Report the lane, the linked issue key (if any), `orqen/worqs/<KEY>/` record, and next stage. Stop after completing analysis.

If you cannot proceed, run `orqen block <KEY> "<specific reason>"`.
