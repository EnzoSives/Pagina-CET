---
description: Ask the requester a question on their ticket from any worq stage
argument-hint: <KEY> <question>
allowed-tools: Bash(orqen:*), AskUserQuestion
---

Use the request or linked issue key and the question in `$ARGUMENTS`. If either is missing, ask the person for it. Preserve their wording. If you draft or revise the question, show the exact text and get their approval before posting.

Run `orqen ask <KEY> "<question>"` from the repository root. Pass the question as a single, safely quoted literal argument. Report which request received it. The requester replies with an ordinary comment on that ticket. Run `orqen conversation <KEY>` to read replies and refresh the worq's conversation.json.

If orqen answers with a warning that the worq is waiting for the client's answers (`WAITING_CLIENT`), tell the person: the requester's next comment, also a reply to this question, will count as that answer and send the worq back to analysis. `conversation.json` keeps the requester's replies, so it stays out of git: never add or commit it.
