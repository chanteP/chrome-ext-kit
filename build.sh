env=$1 
[ -z $env ] && env='development'

rm -rf ./dist/*

npx pack src/popup/index.ts -o dist/popup.js --sourcemap inline-cheap-source-map --mode $env
npx pack src/content/index.ts -o dist/content.js --sourcemap inline-cheap-source-map --mode $env
npx pack src/options/options.ts -o dist/options.js --sourcemap inline-cheap-source-map --mode $env
npx pack src/background/background.ts -o dist/background.js --sourcemap inline-cheap-source-map --mode $env
cp src/**/*.html ./dist

cp -r ./lib/ ./dist/lib

rm -rf ./package/package/*
mkdir -p ./package/package/
if [ "$env" = 'production' ]; then

  cp -r ./dist/ ./package/package/dist
  cp -r ./lib/ ./package/package/lib
  cp -r ./images/ ./package/package/images
  cp manifest.json ./package/package/

fi
