## Support (`SUPPORT`)

> If `human_present` is `true`, run the commands yourself, tell the person what you are about to do, wait for their OK at each decision that is theirs, and ask them about any doubt (see "Working with the person" in AGENTS.md). If it is `false`, run `orqen block` for any doubt that changes the outcome.

A person from support leads this stage (first line). The goal is to answer the customer when no analysis or development is needed, and otherwise to hand the analyst a request that is already understood. Never promise dates, scope, or changes: that is the analyst's job.

### 1. Read the context

- Read the request and the full conversation. Comments with `is_agent: true` come from earlier stages. Look in `human_feedback` for customer answers.
- Look for the answer before asking the person: similar requests (`orqen search '<query>'` or an MCP for the ticket tool, read-only), the knowledge base if the project has one, `openspec/specs/` for the documented behavior, and the code when the behavior is unclear. Record each source in `checked`.

### 2. Decide with the person

- Ask one question at a time, with your recommendation, about what you cannot find yourself (customer context, account state, whether it already happened to this customer).
- Choose the outcome:

| Outcome | When |
| --- | --- |
| `resolved` | The customer asks how to do something that already works, reports a known cause with a known workaround, or the answer is documented. Nothing has to change in code, data, or configuration |
| `escalate` | A new feature or change, a defect that needs code, a data correction or configuration change, or anything you cannot answer with confidence |

- When unsure, escalate. A wrong "resolved" costs the customer a round; a needless escalation costs the analyst a few minutes.

### 3. Write the reply

- Write to the customer in the configured language (`language` in the context), in clear and professional prose: what you found, the steps they can follow, and what to do if it does not work. No internal jargon, no state names, no promises.
- With `resolved`, `client_response` is the reply that orqen posts on the request. The customer confirms or rejects it afterwards, so make the steps verifiable.
- With `escalate`, `escalation_summary` is for the analyst: what is known, what you already checked or answered, what is missing, and why it needs an analyst (type, risk, urgency if you can tell). `client_response` is optional here: use it only for a short, honest acknowledgement (no promises).

### 4. Produce the output

Show the person the outcome and the exact text that will reach the customer, and ask for their explicit approval. Only then set `support_ok: true`. Include `summary`, `checked`, `outcome`, `client_response`, and `escalation_summary` as required by the JSON schema.

`orqen complete` validates the JSON, comments on the request, records `support.md` under `orqen/worqs/<KEY>/`, and advances it: `resolved` waits for the customer's `/approve` or `/reject <reason>`, and `escalate` moves to the analyst. A resolved request creates no issue. Leave `orqen/state/` and Git operations to orqen.
