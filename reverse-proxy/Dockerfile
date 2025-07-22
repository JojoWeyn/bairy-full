FROM nginx:stable-alpine

# Копируем статические билды
COPY ../client/dist /usr/share/nginx/html/
COPY ../admin/dist /usr/share/nginx/html/admin

# Копируем готовый конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]