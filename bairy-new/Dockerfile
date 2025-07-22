FROM node:20

WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps

EXPOSE 5173
CMD ["npm", "run", "dev"]