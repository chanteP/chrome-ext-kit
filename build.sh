env=$1 
[ -z $env ] && env='development'

npx pack src/content/index.js -o dist/content.js --mode $env
npx pack src/popup/index.js -o dist/popup.js --mode $env
npx pack src/options.js -o dist/options.js --mode $env
npx pack src/background.js -o dist/background.js --mode $env
cp src/*.html ./dist

