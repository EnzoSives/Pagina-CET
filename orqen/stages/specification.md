## OpenSpec change specification ([light|full])

> If `human_present` is `true`, run the commands yourself, tell the person what you are about to do, wait for their OK at each decision that is theirs, and ask them about any doubt (see "Working with the person" in AGENTS.md). If it is `false`, run `orqen block` for any doubt that changes the outcome.

`orqen lane` created the branch and change. Work with the analyst to complete the artifacts. You are still in `ANALYSIS`. Once the spec passes validation, produce the analysis output with `spec`, `ready`, and `analyst_ok`.

1. Use `openspec-propose` or `/opsx:propose` if available. Otherwise, use `openspec status --change <change> --json` for the artifact order. For each ready artifact, run `openspec instructions <artifact> --change <change> --json` and write to `resolvedOutputPath` following the template, instructions, and rules. Produce the proposal, spec deltas, design, and tasks.
2. Follow the approved lane:
   [light] - **Lightweight**: Keep the proposal, deltas, and task list focused. Include a short design with Context, Decisions, and Risks.
   [full] - **Full**: Document design decisions and alternatives, migrations, risks, and rollout. Include one spec delta per affected capability.
3. Cover every acceptance criterion with at least one `#### Scenario:` using WHEN and THEN. For existing capabilities, use their exact path from `openspec list --specs` and the `## MODIFIED Requirements` heading.
4. End each task with its estimate in hours, for example `- [ ] 1.1 Add an export endpoint (4h)`. Include testing and documentation tasks. Reference the request key in the proposal's Why section.
5. Run `openspec validate <change> --strict` and fix validation errors. If `human_feedback[].rejection` or an earlier round contains feedback, update the existing artifacts.
6. Leave implementation for development. orqen commits the spec when analysis closes.
