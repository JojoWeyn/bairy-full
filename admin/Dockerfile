# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Копируем проект и билдим
COPY . .
RUN npm run build

# Stage 2: Nginx для отдачи статики
FROM nginx:stable-alpine

# Удаляем дефолтный конфиг и копируем свой (если нужно)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем билд из первого этапа
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]