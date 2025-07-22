#!/bin/bash

echo "📦 Сборка client..."
cd ./bairy-new
npm install
npm run build
cd ..

echo "📦 Сборка admin..."
cd ./admin
npm install
npm run build
cd ..

echo "🚢 Старт Docker Compose..."
docker compose up --build