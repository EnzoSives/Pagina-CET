---
name: grilling
description: Interview an analyst to reach a shared, testable understanding of a request. Read the repository and the ticket first. Use during /orqen:analyze or before specifying a plan or design.
---

# Interview the analyst

The analyst makes the decisions. Ask questions that uncover ambiguities affecting the design and produce testable acceptance criteria.

## Method

1. Before asking questions, read the request and comments, similar or linked requests, the relevant `openspec/specs`, and the existing implementation.
2. Ask one question at a time, or up to three if inseparable. Wait for an answer before proceeding.
3. Include your recommended answer, why you recommend it, and what changes if the analyst chooses differently.
4. Resolve follow-up questions before moving to the next topic. Cover:
   - Business goals and measurable outcomes.
   - Scope and explicit exclusions.
   - Users, permissions, and affected screens or processes.
   - Current and desired behavior, including contradictions with the repository.
   - Edge cases and errors such as empty input, duplicates, concurrency, old data, and amount or date limits.
   - Data, migrations, integrations, performance, auditing, and security.
   - Whether an operational change can resolve the issue, plus risks and rollback.
5. Record up to five design-blocking questions only the customer can answer. Do not invent answers.
6. Record decisions as question-and-answer pairs in `decisions` for `orqen/worqs/<KEY>/`.
7. Summarize the scope, exclusions, risks, assumptions, and Given/When/Then acceptance criteria. Ask for explicit approval before proposing a lane or creating the issue.

Write in clear, direct Spanish (what you record, such as decisions and assumptions, is always in Spanish) and use closed questions where possible. If the analyst delegates a decision, record the recommended answer as an assumption. Resolve open design decisions before proposing the lane.

After approval, use the table printed by `orqen analyze` to recommend a lane based on size, scope, and risk. Explain the choice and ask for confirmation. When unsure, recommend the more rigorous lane.
