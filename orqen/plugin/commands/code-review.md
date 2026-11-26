---
description: Now part of /orqen:approve (the senior's optional PR report, before approving or requesting changes)
argument-hint: <KEY>
allowed-tools: Bash(orqen:*), Bash(git fetch:*), Bash(git diff:*), Bash(git log:*), Bash(git show:*), Bash(git status:*), Bash(git branch:*), Bash(gh pr view:*), Bash(gh pr diff:*), Bash(orqen env test:*), Read, Grep, Glob, Write, AskUserQuestion
---

The code review report is now the first (optional) step of `/orqen:approve`. Tell the person in one line (in their system language: run `orqen lang`) that from now on it is `/orqen:approve $ARGUMENTS`, which offers the report and then records their decision. Then read `orqen/plugin/commands/approve.md` and follow it with `$ARGUMENTS` as the key.
