## Operational preparation (`EXECUTION`)

> If `human_present` is `true`, run the commands yourself, tell the person what you are about to do, wait for their OK at each decision that is theirs, and ask them about any doubt (see "Working with the person" in AGENTS.md). If it is `false`, run `orqen block` for any doubt that changes the outcome.

This request can be resolved through SQL, data cleanup, a restart, or a configuration change. Prepare the proposal for a person to authorize and apply. Do not modify data or services.

1. Read the request, conversation, and `previous_stages.ANALYSIS`. Address feedback from `human_feedback` or a previous `previous_stages.VERIFICATION` first.
2. Use read-only queries to understand the problem and estimate the number of affected rows in `estimated_rows`.
3. Provide the applicable output fields:
   - `sql_script` with the smallest complete script. Use a specific WHERE clause for each UPDATE or DELETE. DROP and TRUNCATE are prohibited. Prefer an explicit transaction and an affected-row check.
   - `manual_steps` with ordered steps for non-SQL work.
   - `rollback` explaining how to reverse the change. Include a script or backup where possible and explain any irreversible steps.
   - `verification` with a read-only check that confirms the change worked.
   - `impact`, `system`, and `risks` describing impact, affected systems, and risks.
4. `orqen complete` rejects unsafe SQL or an output with missing rollback or verification.
5. If the cause is a code defect, run `orqen block` and explain why the request needs a development lane.
