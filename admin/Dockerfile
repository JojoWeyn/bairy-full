FROM node:20-build

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 5174
CMD ["npm", "run", "dev"]