---
description: Handle a new customer request as first-line support, answer the customer when possible, and otherwise escalate it to the analyst
argument-hint: <KEY>
allowed-tools: Bash(orqen:*), Read, Grep, Glob, Write, Skill, AskUserQuestion
---

Handle the customer request in `$ARGUMENTS` with the support person who invoked this command. The argument is the request key. Do not ask for the person's name: orqen takes it from this machine (`git config user.name`). Only if the person asks to sign with another name, add `--person "<name>"` to `orqen support`. Work from the repository root and follow the customer request workflow in `AGENTS.md`.

## Rules

- **Talk to the person in their system language.** Run `orqen lang` once at the start (`es` = Spanish, `en` = English; the stage context also has it as `language`) and use it for every message, question, and option. Keep commands, state names, and paths as they are. Files and texts posted on the tickets follow their own rules.
- **Work with the person who invoked this command, and run every command yourself.** Never ask them to type an `orqen` command, a `/orqen:*` command, `/approve`, or a shell command. Before each decision that is theirs (see "Working with the person" in `AGENTS.md`), tell them what you are about to do and wait for their OK; steps that need no decision, just do and report. When in doubt, ask them (with `AskUserQuestion` when available: concrete options plus your recommendation); never assume what you can ask. After each step, report what you did and what you do next.
- Read-only on code and tickets (an MCP for the ticket tool, or `orqen search`). orqen posts the comment on the request. Do not edit code, tests, specs, or configuration.
- Leave Git operations and writes to `orqen/state/` and `orqen/worqs/` to orqen.
- Never promise dates, scope, or changes to the customer. Require the person's explicit approval of the outcome and of the exact text that reaches the customer.

## Steps

1. Check that the argument is the request key (the client's ticket). If it is missing, ask for it and stop.
2. Claim the request and load the stage instructions, context, and output schema:
   ```sh
   orqen support <KEY> --agent support
   ```
   If this fails, explain the reason to the person and stop.
3. Read the request and comments, then look for the answer: similar requests, the documented behavior in `openspec/specs/`, and the code when needed. Report what you found.
4. Agree the outcome with the person: `resolved` (the customer can be answered without changes) or `escalate` (the analyst must take it). When unsure, recommend `escalate`.
5. Draft the reply to the customer (or the escalation summary for the analyst), show it, and adjust it until the person approves it.
6. Write the JSON output with `support_ok: true` and submit it:
   ```sh
   orqen complete <KEY> <output.json> --agent support
   ```
   Correct validation errors and retry until the command reports success.
7. Report the outcome and what happens next: a resolved request waits for the customer, who confirms or rejects it on the ticket (nothing for the person to type), and an escalated one goes to the analyst. If the person is also the analyst and wants to continue, follow `orqen/plugin/commands/analyze.md` yourself. Otherwise stop after completing support.

If you cannot proceed, run `orqen block <KEY> "<specific reason>"`.
