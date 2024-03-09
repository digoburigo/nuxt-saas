FROM debian:11.6-slim as base

WORKDIR /app

RUN apt update
RUN apt install curl unzip -y

RUN curl https://bun.sh/install | bash

# install deps
FROM base as installer

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN /root/.bun/bin/bun install --frozen-lockfile

# build application
FROM base as builder

WORKDIR /app

COPY --from=installer /app/node_modules node_modules
COPY . .

ENV NODE_ENV production

RUN /root/.bun/bin/bun --bun run build

# runtime
FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=base /root/.bun/bin/bun bun
COPY --from=builder /app/.output .

ENV NODE_ENV production
ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["./bun", "server/index.mjs"]

