# Stage 1 — Build

FROM node:8.12-alpine AS builder

WORKDIR /home/api-naffiq-com/
COPY . .
RUN yarn install && yarn build

# Stage 2 — Run

FROM node:8.12-alpine
ENV NODE_ENV=production
ENV SERVER_PORT=3000
WORKDIR /home/api-naffiq-com/

COPY ./package.json ./

COPY --from=builder /home/api-naffiq-com/node_modules ./node_modules
COPY --from=builder /home/api-naffiq-com/build ./build

EXPOSE 3000

CMD yarn launch