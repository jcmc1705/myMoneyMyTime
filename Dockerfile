FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json

RUN npm install

COPY tsconfig.base.json ./
COPY apps ./apps

RUN npm install -g nx
RUN npx nx build api

FROM node:18-alpine

WORKDIR /app

COPY apps/api/startup.sh ./startup.sh
RUN chmod +x startup.sh

COPY --from=builder /app/apps/api/dist ./apps/api/dist

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

RUN npm install --omit=dev

RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma

EXPOSE 8080

CMD ["sh", "startup.sh"]
