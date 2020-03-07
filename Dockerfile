FROM maxmcd/deno
MAINTAINER manyuanrong "416828041@qq.com"

ENV TZ Asia/Shanghai
COPY ./ /data/
WORKDIR /data/
RUN touch .env && deno fetch -c tsconfig.json --importmap importmap.json ./server/server.ts
RUN deno run -A -c tsconfig.json --importmap importmap.json ./server/ci-precompile.ts

EXPOSE 3000
ENTRYPOINT []

CMD [ "deno", "run", "--allow-all", "-c", "tsconfig.json", "--importmap", "importmap.json", "./server/server.ts" ]