## Analysis (`ANALYSIS`)

> If `human_present` is `true`, run the commands yourself, tell the person what you are about to do, wait for their OK at each decision that is theirs, and ask them about any doubt (see "Working with the person" in AGENTS.md). If it is `false`, run `orqen block` for any doubt that changes the outcome.

A human analyst leads this stage. Use the `orqen:grilling` skill when available, or interview the analyst as described below. Obtain their explicit approval before advancing.

### 1. Read the context

- Read the request and the full conversation. Comments with `is_agent: true` come from previous rounds. If `previous_stages.SUPPORT` exists, support already looked at this request: start from its `escalation_summary` and `checked` instead of repeating the work. Look in `human_feedback` for customer answers or the rejection that started this round.
- Read tickets, comments, links, and similar requests read-only (an MCP for the ticket tool, or `orqen search '<query>'`). orqen handles ticket writes.
- Read the current specs using `openspec list --specs` and `openspec show <capability>`. Read the implementation where necessary. Ask the analyst only about information you cannot obtain from the repository or the ticket.

### 2. Interview the analyst

- Ask one question at a time, or up to three if inseparable. Include your recommended answer and reasoning so the analyst can confirm or correct it.
- Cover business goals, scope and exclusions, roles and permissions, current and desired behavior, edge cases, data and integrations, non-functional requirements, operational alternatives, and risks.
- Follow up on decisions that affect the design. Record assumptions explicitly.
- Put up to five questions only the customer can answer in `open_questions` and set `ready: false`. The request moves to `WAITING_CLIENT` until the customer responds.
- Record each decision in `decisions` as a question and answer.

### 3. Confirm the analysis and lane

Summarize the proposed work, out-of-scope items, risks, and observable acceptance criteria in the configured language. Use Dado/Cuando/Entonces for Spanish and Given/When/Then for English. Ask for explicit approval of the analysis, then propose a lane and ask the analyst to confirm it.

| Lane | When | Output |
| --- | --- | --- |
| Operational (`route: operational`) | A data correction, SQL script, restart, or configuration change | No branch or spec. A person approves and applies the steps, followed by verification |
| Direct (`direct`) | One component, roughly four hours or less, low risk, no contract change | An ordered plan and acceptance criteria |
| Lightweight (`light`) | One or two capabilities, roughly two days or less, no architectural decisions | A proposal, spec deltas, a short design, and tasks |
| Full (`full`) | Broader scope, migrations, integrations, security, billing, or architectural risk | A complete proposal, specs, design, and tasks |

When unsure, recommend the more rigorous lane and explain why. Once the analyst confirms, set `analyst_ok: true`.

### 4. Produce the output

- For `light` or `full`, run `orqen lane <KEY> <lane>` and write the OpenSpec artifacts with the analyst. orqen prepares the branch and commits the spec.
- Include `summary`, `type`, `acceptance_criteria`, `affected_capabilities`, `decisions`, `risks`, and `open_questions` as required by the JSON schema.
- Set `ready: true` and `analyst_ok: true` and provide `route`, `lane`, and `lane_rationale` once confirmed. For operational work, use `lane: "direct"`.
- For direct development, include the ordered `plan` and `estimated_hours`. For a spec change, include `spec` with its assigned `change`, `summary`, and `assumptions`.

`orqen complete` validates the JSON and any spec and task estimates, then creates and links the issue (if configured), records the analysis in `orqen/worqs/<KEY>/`, and advances the request. Leave `orqen/state/` and Git operations to orqen.
