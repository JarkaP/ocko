#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# create empty .nojekyll which tells GitHub Pages not to run the published files through Jekyll
touch .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:JarkaP/ocko.git master:gh-pages

cd -
