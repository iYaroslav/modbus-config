#!/bin/bash -e

if [[ -z "$(git status --untracked-files=no --porcelain)" ]]; then
  version=$(yarn version --patch | awk '/New version:/ {print $4}')
  echo "Version incremented to ${version}"
  git push --follow-tags
  echo "Successfully pushed"
else
  echo 'Commit changes before deploy!'
fi
