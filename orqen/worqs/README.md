# orqen/worqs

A **worq** is orqen's unit of work: what orqen carries for each request of the client (the request, its linked issue, the branch, the spec,
the PR and the record of every stage). It is identified by the key of the request and lives in a folder named after it, such as `SOP-1234/`.

The folder includes `state.json` (a snapshot of the whole worq, which orqen uses to recover it on another machine), `log.md`, and the
output of each stage by round (`round-1/analysis.md`, `support.md`, `devel-pr.md`, the reviews…). orqen writes it and commits it with the request branch.

`orqen worqs` lists the worqs on this machine and `orqen worq <KEY>` shows one.
