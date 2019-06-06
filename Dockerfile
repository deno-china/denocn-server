#FROM hayd/deno:alpine-0.7.0
FROM maxmcd/deno
MAINTAINER manyuanrong "416828041@qq.com"

COPY ./ /data/
WORKDIR /data
ENV DENO_DIR /data/cache

EXPOSE 3000
ENTRYPOINT []

CMD [ "deno", "run", "--allow-all", "./server.ts" ]