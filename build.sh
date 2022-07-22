env=$1 
[ -z $env ] && env='development'

rm -rf ./dist/*

npx pack src/popup/index.ts -o dist/popup.js --mode $env
npx pack src/content/index.ts -o dist/content.js --mode $env
npx pack src/options.ts -o dist/options.js --mode $env
npx pack src/background.ts -o dist/background.js --mode $env
cp src/*.html ./dist

# 编辑器资源
cp node_modules/ace-builds/src-min/mode-css.js ./dist
cp node_modules/ace-builds/src-min/mode-javascript.js ./dist
cp node_modules/ace-builds/src-min/theme-xcode.js ./dist
cp node_modules/ace-builds/src-min/theme-monokai.js ./dist

rm -rf ./package/package/*
mkdir -p ./package/package/
if [ "$env" = 'production' ]; then

  cp -r ./dist/ ./package/package/dist
  cp -r ./images/ ./package/package/images
  cp manifest.json ./package/package/

fi
