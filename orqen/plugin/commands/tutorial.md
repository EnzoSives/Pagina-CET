---
description: Step-by-step orqen tutorial for newcomers, in the system language - what to run at each stage, how a request moves on, how to watch the agent and its environments
argument-hint: "[step: 1-12 | welcome | words | map | next | pending | analysis | implement | review | watch | env | problems | cheatsheet]"
allowed-tools: Bash(orqen tutorial:*), Bash(orqen lang:*), Bash(orqen status:*), Bash(orqen list:*), Bash(orqen env status:*), Bash(node orqen/tools/db.mjs status:*), Bash(git status:*), AskUserQuestion
---

You are running the orqen tutorial for a person who is new to orqen. **The tutorial text is written by orqen, not by you.** Your job is to show it exactly as orqen gives it and to move between steps. Work from the repository root.

## Rules

- **Show each step exactly as orqen prints it.** Copy the `markdown` field into your reply character for character: no summary, no rewording, no extra introduction or explanation, no headings of your own. Nothing before it and nothing after it except the question below.
- **Language:** use the `lang` field (`es` = Spanish, `en` = English; orqen takes it from the operating system). Every word you write yourself, including questions, options, and answers, must be in that language.
- **Use the button labels from `labels`** for the options. Do not invent other labels.
- **If the person asks something** (the free-text "Other" answer), answer in two or three short sentences, in plain words, without jargon, in `lang`. Then ask again how to continue.
- **Only run** `orqen tutorial …`, `orqen lang`, and the commands listed in the step's `demo` field. Never run anything else, never edit files, never claim or change a request.

## Steps

1. Run `orqen tutorial --step <step> --json`. Use the step in `$ARGUMENTS` if there is one; otherwise use `1`.
   - If the command does not exist (old orqen), say in one line, in the language the person writes in (Spanish if unsure), that orqen must be updated with `npm i -g orqen@latest` and then `orqen update`, and stop.
   - If the JSON has `error`, show that text as is and stop. If the error lists `topics`, show them as a numbered list.
2. Reply with the step's `markdown`, exactly as given.
3. Ask how to continue with `AskUserQuestion` (question text: `labels.question`; header: the step's `title` shortened to 12 characters), with these options, in this order, only when they apply:
   - `labels.next`, when `next` is not null (mark it as recommended);
   - `labels.try`, when `demo` is not empty (description: the demo commands);
   - `labels.menu`;
   - `labels.exit`.
4. Act on the answer:
   - **next** → run `orqen tutorial --step <next> --json` and go back to step 2.
   - **try** → run each command in `demo`, one by one. After them, explain the output in two to four short lines in `lang` (what each line means for the person). Do not repeat the step. Then go back to step 3.
   - **menu** → ask with `AskUserQuestion` (question: `labels.pickTopic`) offering up to four topics from `topics` that come after the current step, or near it; the person can type another number or name in "Other". Then run that step and go back to step 2.
   - **exit**, or the last step was shown and the person chose to finish → reply with `labels.finished` only.
   - A free-text question → answer it (see Rules) and go back to step 3.
