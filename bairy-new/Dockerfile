# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Кэш зависимостей
COPY package*.json ./
RUN npm install --legacy-peer-deps --save-dev terser

# Копируем все остальное и билдим
COPY .. .
RUN npm run build

# Stage 2: Nginx static server
FROM nginx:stable-alpine

# Удалим дефолтный конфиг и добавим наш
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы
COPY --from=builder ./client/dist /usr/share/nginx/html/client

EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]