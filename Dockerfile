FROM maxmcd/deno
MAINTAINER manyuanrong "416828041@qq.com"

ENV TZ Asia/Shanghai
COPY ./ /data/
WORKDIR /data/server
RUN touch .env && deno fetch -c tsconfig.json ./server.ts
RUN deno run -A -c tsconfig.json ./ci-precompile.ts

EXPOSE 3000
ENTRYPOINT []

CMD [ "deno", "run", "--allow-all", "-c", "tsconfig.json", "./server.ts" ]