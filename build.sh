#!/bin/bash

set -e

echo "📦 Сборка client (bairy-new)..."
docker build -t client-builder -f ./bairy-new/Dockerfile ./bairy-new

echo "📦 Сборка admin (admin)..."
docker build -t admin-builder -f ./admin/Dockerfile ./admin

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

echo "📂 Обновление статики Nginx..."
# Удаляем старые файлы
rm -rf /usr/share/nginx/html/*
rm -rf /usr/share/nginx/html/admin || true

# Копируем client
cp -r ./reverse-proxy/client/dist/* /usr/share/nginx/html/

# Копируем admin
mkdir -p /usr/share/nginx/html/admin
cp -r ./reverse-proxy/admin/dist/* /usr/share/nginx/html/admin/

echo "✅ Готово! Backend запущен, фронт обновлён, Nginx обслуживает свежую версию."