#!/bin/bash
set -e

directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
project=$(cd "$directory/../" && pwd)
file=$project/example.txt

git log -1 --pretty=format:'%an %at'

grep -E "^\w+" "$file" | sed "s/.*=\([a-z]\)/\1/"
