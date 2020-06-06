#!/usr/bin/env bash

if [ "${CIRCLE_BRANCH}" != "master" ]; then
  echo "Branch different from master" "$CIRCLE_BRANCH"
  exit 0
fi

mv .next /tmp
echo "Compiled folder has been moved"
git checkout server_branch
echo "Now in checkout branch"
rm -rf .next
echo "Local .next folder removed"
mv /tmp/.next .
echo "New .next folder in place"

git checkout master -- pages components hooks info_site lib public styles docker-compose.yml Dockerfile .circleci package.json

if [[ `git status --porcelain` ]]; then
  git config --global user.email job@circleci.com
  git config --global user.name CircleCI
  git add .
  git commit -m "deploy #$CIRCLE_BUILD_NUM"
  git push origin server_branch
else
  echo "No changes to deploy!"
fi