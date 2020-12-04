FROM node:12

COPY . /app/server
WORKDIR /app/server
RUN npm i && npm cache clear --force
RUN ls

EXPOSE 3000
