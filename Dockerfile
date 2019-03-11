FROM hayd/deno:alpine-0.3.2
MAINTAINER manyuanrong "416828041@qq.com"

COPY ./ /data/
WORKDIR /data
ENV DENO_DIR=/data/cache

CMD [ "deno", "./server.ts", "--allow-all" ]