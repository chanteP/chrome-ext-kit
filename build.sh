env=$1 
[ -z $env ] && env='development'

rm -rf ./dist/*

pack src/popup/index.ts -o dist/popup.js --sourcemap inline-cheap-source-map --mode $env
pack src/content/index.ts -o dist/content.js --sourcemap inline-cheap-source-map --mode $env
pack src/options/options.ts -o dist/options.js --sourcemap inline-cheap-source-map --mode $env
pack src/background/background.ts -o dist/background.js --sourcemap inline-cheap-source-map --mode $env
cp src/**/*.html ./dist

cp -r ./lib/ ./dist/lib

rm -rf ./package/release/*
rm -rf ./package/release.zip
mkdir -p ./package/release/
if [ "$env" = 'production' ]; then

  cp -r ./dist/ ./package/release/dist
  cp -r ./lib/ ./package/release/lib
  cp -r ./images/ ./package/release/images
  cp manifest.json ./package/release/

  zip -r ./package/release.zip ./package/release/*

fi
