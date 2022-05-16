FROM node:latest
WORKDIR /app
COPY . .
RUN npm install

EXPOSE 5656

ENTRYPOINT [ "node","deliveries.js" ]


