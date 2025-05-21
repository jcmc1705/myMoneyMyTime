#!/bin/sh

echo "Aguardando o banco ficar disponível..."

# Espera o MySQL iniciar na rede docker-compose
while ! nc -z db 3306; do
  sleep 1
done

echo "Banco disponível, rodando migrations..."

npx prisma migrate deploy --schema=./apps/api/prisma/schema.prisma

echo "Gerando Prisma Client..."
npx prisma generate --schema=./apps/api/prisma/schema.prisma

echo "Iniciando aplicação..."
node apps/api/main.js
