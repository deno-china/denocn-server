rm -rf public
cd web
yarn
yarn build
cp -rf ./dist/ ../public
cd ../

deno fetch -c tsconfig.json --importmap importmap.json server/server.ts
