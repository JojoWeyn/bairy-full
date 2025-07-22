#!/bin/bash

set -e  # Остановиться при ошибке

echo "🧹 Очистка старых сборок..."
rm -rf ./reverse-proxy/client ./reverse-proxy/admin
mkdir -p ./reverse-proxy/client ./reverse-proxy/admin

echo "📦 Сборка client..."
docker build -t client-builder -f ./bairy-new/client/Dockerfile ./bairy-new/client

echo "📦 Сборка admin..."
docker build -t admin-builder -f ./bairy-new/admin/Dockerfile ./bairy-new/admin

echo "🚢 Извлекаем билды из контейнеров..."
docker create --name tmp-client client-builder
docker cp tmp-client:/app/dist ./reverse-proxy/client
docker rm tmp-client

docker create --name tmp-admin admin-builder
docker cp tmp-admin:/app/dist ./reverse-proxy/admin
docker rm tmp-admin

echo "🚢 Сборка и запуск Nginx..."
docker build -t my-nginx -f ./reverse-proxy/Dockerfile ./nginx
docker run -d -p 80:80 --name nginx-server my-nginx

echo "✅ Готово: http://localhost"