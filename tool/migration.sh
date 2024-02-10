#!/bin/bash

set -e

# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Set the execute permission on the script
chmod +x "$SCRIPT_DIR/migration.sh"

PG_CONTAINER_NAME="nozomi-postgress-1"
SQL_FILE="/db_scripts/nozomi.sql"

docker exec -it "$PG_CONTAINER_NAME" psql -U postgres -d nozomi -f "$SQL_FILE"
