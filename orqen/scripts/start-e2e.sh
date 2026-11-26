#!/bin/sh
# Starts the e2e environment.
# orqen runs this script from the root of the repository (`orqen env up`, and by itself in the development and testing stages).
# Write here what the project needs: database, backend, frontend...
# orqen passes the variables of environment.yaml, PORT and ORQEN_PORT_E2E (declare `port`, `url` or `ready_when` under e2e so orqen knows when it is up).
# If the script starts things in the background and finishes, orqen takes the environment as started. A non-zero exit code means it failed.
echo "orqen: write how to start the e2e environment in this script" >&2
