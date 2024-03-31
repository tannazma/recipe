# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npx", "tsx", "server.ts"]
EXPOSE 3001
