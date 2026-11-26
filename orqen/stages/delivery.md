## Delivery (`DELIVERY`)

> If `human_present` is `true`, run the commands yourself, tell the person what you are about to do, wait for their OK at each decision that is theirs, and ask them about any doubt (see "Working with the person" in AGENTS.md). If it is `false`, run `orqen block` for any doubt that changes the outcome.

For the lightweight and full lanes, orqen has archived the change and merged its deltas into `openspec/specs/`. The context identifies the archived change in `openspec.dir`. For the direct lane, refer to `orqen/worqs/<KEY>/` and `previous_stages.ANALYSIS`.

1. Read the development summary in `previous_stages` and any archived proposal, specs, and tasks.
2. In `release_notes`, give the team technical release notes covering changes, migrations, flags, and risks.
3. In `client_message`, summarize the delivered work and exclusions in the configured language (`language` in the context).
4. In `validation_steps`, give the customer concrete validation steps derived from the scenarios or acceptance criteria.
5. Leave repository files as they are.
