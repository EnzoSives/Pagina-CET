---
description: Set up or repair how this project starts and is verified (orqen/environment.yaml and its scripts), for any language or technology
argument-hint: "[what is failing, or a KEY whose environment blocked]"
allowed-tools: Bash(orqen:*), Bash, Read, Grep, Glob, Write, Edit, AskUserQuestion
---

Get this project's environment working so that agents and people can start it and TESTING can verify changes. Work from the repository root (or the Worq's worktree when the person is in one). `$ARGUMENTS` may describe what failed or name a request whose environment blocked.

## Rules

- **Talk to the person in their system language** (`orqen lang`). Keep commands and paths as they are.
- **You may write `orqen/environment.yaml` and the scripts under `orqen/scripts/`.** Before writing, show the person what you will write and why (the evidence: CI, README, build files) and wait for their OK. Never invent a command you have not seen in the repository or run successfully.
- Prefer `orqen env set <key> <value>` for single settings (it keeps comments and refuses invalid values); edit the file or the scripts directly for the rest.
- Never ask the person to open a terminal or start anything: run every command yourself.
- Do not install system-wide tools (JDK, Ant, Node…) without asking: say exactly what is missing and offer the command that installs it.
- At most 3 attempts per problem. If it still fails, stop and explain what you tried, the end of the log and what decision or access you need.

## Steps

1. **Diagnose.** Run `orqen env doctor --json`. Read `checks` (errors first), `suggestions`, `detected.tools`, `detected.ci` and `verification`.
2. **Find how the project is really built, tested and started**, in this order, and keep the evidence:
   - the CI (`detected.ci`: GitHub Actions, GitLab, Azure, Bitbucket, Jenkins): the commands it runs and the versions it sets up;
   - build files: `build.xml` (Ant), `pom.xml`/`mvnw`, `build.gradle`/`gradlew`, `*.sln`/`*.csproj`, `package.json` scripts, `Makefile`, `Cargo.toml`, `go.mod`, `pyproject.toml`/`requirements.txt`, `composer.json`, `Gemfile`;
   - `README`, `docs/`, `CONTRIBUTING`, `.devcontainer/`, `Dockerfile`, `docker-compose.yml`, `.env.example`;
   - the server it runs on (Tomcat, IIS, JBoss, PHP-FPM…) and what it needs (database, queues).
   If something only the team knows is missing (a private database, credentials, a server path), ask the person with concrete options.
3. **Verification first** (it is what unblocks TESTING): configure the strongest one that works, and run it:
   - suites → `orqen env set tests.unit "<command>"` (also `tests.integration`, `tests.e2e`);
   - otherwise the build → `orqen env set tests.build "<command>"` (e.g. `ant -noinput -buildfile builder/build.xml`, `mvn -B -DskipTests package`, `dotnet build`, `make`);
   - try it with `orqen env test build` / `orqen env test unit`. `orqen env doctor --apply` writes what detection found.
4. **Dependencies:** `prepare` (install), `migrate` and `seed` only with commands you saw in the repository.
5. **Start / stop (when the project has something to run):** write `orqen/scripts/start-dev.sh` and `stop-dev.sh` (or `.ps1`/`.js` when the team works on Windows only). The start script receives `PORT`, `ORQEN_PORT_<NAME>` and the variables; it may start things in the background and exit 0. Declare a readiness signal so orqen knows when it is up: `orqen env set dev.port 8080` and a `url` with `${port}`, or `services` with one entry per thing the script starts. Use `${port}` / `ORQEN_PORT_<NAME>` instead of fixed ports: each Worq gets its own. The stop script must stop only what its start launched (by port, PID file or `docker compose stop`).
6. **Prove it:** `orqen env up`, check `orqen env status --json` (and the url), `orqen env down`; then `orqen env doctor` must have no errors. Read `orqen/state/logs/<name>.log` when something fails and fix the cause.
7. **Report** what you configured, the evidence for each command, what you verified, and anything still missing. The files you changed go to the branch with the rest of the work (orqen commits them with the request; outside a request, tell the person they are uncommitted).

If this was called for a blocked request (`$ARGUMENTS` has a KEY), finish by telling the person the environment is ready and offer to continue that request (`/orqen:implement <KEY>`).
