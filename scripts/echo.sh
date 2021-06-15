#!/bin/bash
script_directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
project_directory=$(cd "$script_directory/../" && pwd)
file=$project_directory/example.txt

user=
date=
hash=
fruits=
endpoint=

get_latest_git_log_information() {
  local git_log="$(git log -1 --pretty=format:'%an-%at-%h')"
  local regex="(.+)-(.+)-(.+)"

  if [[ $git_log =~ $regex ]]; then
    user="${BASH_REMATCH[1]}"
    date="${BASH_REMATCH[2]}"
    hash="${BASH_REMATCH[3]}"
  fi
}

get_user_enabled_fruits() {
  fruits="$(grep -E "^\w+" "$file" | sed "s/.*=\([a-z]*\)/\"\1\"/" | tr -s '\n' ',')"
  fruits="${fruits::-1}"
}

post_enabled_fruits() {
  local data="{\"user\":\"$user\",\"date\":$date,\"commit\":\"$hash\",\"fruits\":[$fruits]}"
  curl -X POST -H "Content-Type: application/json" -d "\"$data\"" $endpoint
}

get_latest_git_log_information
get_user_enabled_fruits
post_enabled_fruits
