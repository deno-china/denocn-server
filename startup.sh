rm -rf public
cd web
npm install
npm run build
cp -rf ./dist/ ../public
cd ../

deno -c tsconfig.json --importmap importmap.json -A server/server.ts
