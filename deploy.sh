npm run build
git add .
git commit -m 'Make build'
git push
git checkout master
git merge dev
git push master
git checkout dev
