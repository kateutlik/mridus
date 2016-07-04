#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# check current branch
if [ 'master' != $TRAVIS_BRANCH ]; then
    echo "Deploy only on master branch. Current branch: '$branch'.";
    exit 0;
fi

# clear and re-create the dist directory
rm -rf dist || exit 0;

# run our compile script
npm install
npm install -g gulp
gulp

# go to the dist directory and create a *new* Git repo
cd dist

#create files for drploy on heroku with php
touch index.php
echo "<?php include_once(\"html\pages\pages.html\"); ?>" > index.php
touch composer.json
echo "{}" > composer.json


git init

#create remote to heroku
heroku git:remote -a mridus

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy to Heroku"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
echo "git push"
git push --force --quiet heroku master