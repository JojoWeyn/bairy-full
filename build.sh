#!/bin/bash

set -e

echo "📦 Сборка client (bairy-new)..."
docker build -t client-builder -f ./bairy-new/Dockerfile ./bairy-new

echo "📦 Сборка admin (admin)..."
docker build -t admin-builder -f ./admin/Dockerfile ./admin

echo "📦 Запуск бека"
docker build -t backend-builder -f ./backend/Dockerfile ./backend

echo "🧹 Очистка старых билдов..."
rm -rf ./reverse-proxy/client ./reverse-proxy/admin
mkdir -p ./reverse-proxy/client ./reverse-proxy/admin

echo "🚢 Извлекаем client билд..."
docker create --name tmp-client client-builder
docker cp tmp-client:/app/dist ./reverse-proxy/client
docker rm tmp-client

echo "🚢 Извлекаем admin билд..."
docker create --name tmp-admin admin-builder
docker cp tmp-admin:/app/dist ./reverse-proxy/admin
docker rm tmp-admin

echo "🚀 Запуск docker-compose..."
docker-compose -f ./docker-compose.yml up -d

echo "✅ Готово! Nginx поднят на http://<IP-сервера>"