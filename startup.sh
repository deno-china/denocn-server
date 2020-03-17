rm -rf public
cd web
yarn
yarn build
cp -rf ./dist/ ../public
cd ../

deno -c tsconfig.json --importmap importmap.json -A server/server.ts
