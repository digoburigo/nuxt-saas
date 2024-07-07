FROM node:20 AS installer

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

# build application
FROM installer as builder

WORKDIR /app

COPY --from=installer /app/node_modules node_modules
COPY . .
RUN npm run zen:generate
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

COPY --from=builder /app/.output .

ENV NODE_ENV production
ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["server/index.mjs"]
