---
description: Set up or repair how this project starts and is verified (orqen/environment.yaml and its scripts), for any language, engine or technology
argument-hint: "[what is failing, or a KEY whose environment blocked]"
allowed-tools: Bash(orqen:*), Bash, Read, Grep, Glob, Write, Edit, AskUserQuestion
---

Get this project's environment working so that agents and people can start it for a Worq and TESTING can verify changes. Work from the repository root (or the Worq's worktree when the person is in one). `$ARGUMENTS` may describe what failed or name a request whose environment blocked.

**The goal is an environment that starts, not a report of why it cannot.** Finishing with "I could not start X because it needs Y" while the repository shows how Y is started is a failure of this command.

## Rules

- **Talk to the person in their system language** (`orqen lang`). Keep commands and paths as they are.
- **Say what you are doing as you go**, one short sentence before each step ("Leo cómo levanta el repo: deploy/docker-compose/compose.yaml…", "Pruebo el arranque…"), so the person can follow along. Never several silent commands in a row.
- **You may write `orqen/environment.yaml` and the scripts under `orqen/scripts/`.** Before writing, show the person what you will write and why (the evidence: the files you read) and wait for their OK. When nobody is there to answer (unattended run), write it and say so.
- Never invent a command you have not seen in the repository or run successfully.
- Nothing here is specific to a technology: the project may use any database, engine, queue, runtime or product. Do not decide from names; read the files the repository has and do what they do.
- Prefer `orqen env set <key> <value>` for single settings (it keeps comments and refuses invalid values); edit the file or the scripts directly for the rest.
- Never ask the person to open a terminal or start anything: run every command yourself.
- Do not install system-wide tools (JDK, Docker, a database server…) without asking: say exactly what is missing and offer the command that installs it.
- At most 3 attempts per problem. If it still fails, stop and explain what you tried, the end of the log and the one decision or access you need.

## Steps

1. **Diagnose.** Run `orqen env doctor --json`. Read `checks` (errors and warnings), `suggestions`, `detected.runtime`, `detected.tools`, `detected.ci` and `verification`.

2. **Map how the project really runs.** `detected.runtime` lists every file in the repository that describes it — compose files (also in `deploy/`, `infra/`, `docker/`…), Kubernetes manifests, Helm charts, Procfiles, dev containers, Tilt/Skaffold, Vagrant, Terraform, task runners, start/setup scripts, `.env` templates, READMEs — and the services and workloads they declare (image, what they are built from, ports, dependencies, `service` / `job` / `optional`). **Read those files and their READMEs**, plus the CI and build files. Then write down, for yourself, a table with one row per thing that runs:
   - **code of this repository** (`builds` points into the repo, or a component of the stack): the parts a change can touch;
   - **dependencies** it needs to work (a database, cache, queue, mail catcher, another app — whatever the engine or product);
   - **jobs** that must run once before (create databases, migrations, seed, bootstrap users) — usually declared as init containers, `restart: "no"` services, or setup scripts;
   - **optional** things (profiles, tools, monitoring) that the project does not need to start or be tested.
   Use the local description first (compose, Procfile, scripts, README "local" sections); use Kubernetes/Helm manifests to understand dependencies and variables when there is no local one.

3. **Decide the environment** (and tell the person in two or three lines):
   - Dependencies and jobs start **the way the repository already does it**: its compose file (`docker compose -f <file> --env-file <its env> up -d --wait <services>`), its scripts (`start.ps1`, `bin/setup`…), its Procfile. Start only what the code under change needs, not the whole production stack.
   - The **code a Worq changes runs from the worktree** (its `dev` command on the host, or the compose service that builds it from this folder), so the change is what gets tested — never a published image of it.
   - **Configuration the repository can produce, you produce**: if it has an init / setup / env script (e.g. one that turns `.env.example` into `.env` and generates passwords), run it; local-only secrets with no generator get random values. Point the variables of `environment.yaml` at the values that setup created (hosts, ports, database names, users). A variable left as `CONFIGURAR`/`changeme` is not done.
   - Only what is truly **external** (third-party API keys, a company server, a VPN) is asked of the person — with concrete options — while you still bring up everything else. Code paths that need it are noted, not a reason to stop.

4. **Verification first** (it is what unblocks TESTING): configure the strongest one that works, and run it:
   - suites → `orqen env set tests.unit "<command>"` (also `tests.integration`, `tests.e2e`);
   - otherwise the build → `orqen env set tests.build "<command>"`;
   - try it with `orqen env test unit` / `orqen env test build`. `orqen env doctor --apply` writes what detection found.
   - A test that fails because of the repository's content (not the environment) is reported, not fixed here.

5. **Dependencies of the code:** `prepare` (install), `migrate` and `seed` only with commands you saw in the repository.

6. **Start / stop scripts.** Write `orqen/scripts/start-dev.sh` and `stop-dev.sh` (or `.ps1` / `.js` when the team works only on Windows; a `.js` script runs everywhere) and point `dev.start` / `dev.stop` to them:
   - The start script prepares the configuration if missing (step 3), starts the dependencies, waits until they are healthy, runs the jobs, then starts the code of the repo. It may start things in the background and exit 0.
   - It receives `PORT`, `ORQEN_PORT_<NAME>` and the variables. Use `${port}` / `ORQEN_PORT_<NAME>` for what the Worq's code listens on, so several Worqs can run at once; shared dependencies (one database container for all Worqs) can keep the repository's fixed ports, but give each Worq its own compose project name (`COMPOSE_PROJECT_NAME` / `-p`) or its own database when they would collide.
   - Declare a readiness signal so orqen knows when it is up: `dev.port`/`dev.url` or `services` (one entry per thing the script starts, with its port or url).
   - The stop script stops only what its start launched (`docker compose -p <name> stop`, PID file, port).

7. **Prove it:** `orqen env up`, check `orqen env status --json` (and the urls respond), run the verification again with everything up, then `orqen env down`; `orqen env doctor` must end with no errors and no `runtime` warning. Read `orqen/state/logs/<name>.log` and the containers' logs when something fails and fix the cause.

8. **Report** briefly: what starts and how (the table of step 2, condensed), the evidence for each command, what you verified (with the result), and only then what is still missing and why — each missing thing with the concrete decision you need from the person. The files you changed go to the branch with the rest of the work (orqen commits them with the request; outside a request, tell the person they are uncommitted).

If this was called for a blocked request (`$ARGUMENTS` has a KEY), finish by telling the person the environment is ready and offer to continue that request (`/orqen:implement <KEY>`).
