## Operational verification (`VERIFICATION`)

> If `human_present` is `true`, run the commands yourself, tell the person what you are about to do, wait for their OK at each decision that is theirs, and ask them about any doubt (see "Working with the person" in AGENTS.md). If it is `false`, run `orqen block` for any doubt that changes the outcome.

A person applied the approved change. Their report is in `human_feedback`.

1. Run the read-only checks from `previous_stages.EXECUTION.verification`. Do not modify data or services.
2. Compare the results with the expected state and acceptance criteria in `previous_stages.ANALYSIS`.
3. Record concrete evidence in `evidence`, such as counts, rows, or service status.
4. Set `verified: true` only if the evidence confirms the fix. Provide a customer-facing `client_message` and clear `validation_steps`.
5. If the issue persists, set `verified: false` and explain the results. The request returns to `EXECUTION`. If you verify that a code defect will cause recurrence, also set `requires_development: true` so the analyst can reassess and open a new issue.
