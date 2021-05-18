#!/bin/bash
set -e
# Find location of this script file
directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
project=$(cd "$directory/../" && pwd)

cat "$project/example.txt"

