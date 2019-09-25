FROM maxmcd/deno
MAINTAINER manyuanrong "416828041@qq.com"

ENV TZ Asia/Shanghai
COPY ./ /data/
WORKDIR /data
RUN deno fetch -c tsconfig.json ./server.ts

EXPOSE 3000
ENTRYPOINT []

CMD [ "deno", "run", "--allow-all", "-c", "tsconfig.json", "./server.ts" ]