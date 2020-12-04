FROM node:12

COPY . /app/client
WORKDIR /app/client

RUN npm i && npm cache clear --force

RUN ls

EXPOSE 5000
