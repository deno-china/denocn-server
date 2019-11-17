rm -rf ./public
cd web
yarn build
yarn build-ssr
cd ../server
exec ./startup.sh