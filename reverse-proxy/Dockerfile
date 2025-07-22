FROM nginx:stable-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY ./client /usr/share/nginx/html/
COPY ./admin /usr/share/nginx/html/admin/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]