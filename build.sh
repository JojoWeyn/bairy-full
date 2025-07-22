#!/bin/bash

echo "📦 Сборка client..."
cd ./bairy-new
docker build -t client-builder -f client/Dockerfile ./client
cd ..

echo "📦 Сборка admin..."
cd ./admin
docker build -t admin-builder -f admin/Dockerfile ./admin
cd ..

echo "🚢 Создаем контейнеры без запуска"
#
docker create --name tmp-client client-builder
docker cp tmp-client:/app/dist ./nginx/client
docker rm tmp-client

docker create --name tmp-admin admin-builder
docker cp tmp-admin:/app/dist ./nginx/admin
docker rm tmp-admin

echo "🚢 Старт Docker Compose..."
docker build -t my-nginx -f nginx/Dockerfile ./nginx
docker run -d -p 80:80 my-nginx