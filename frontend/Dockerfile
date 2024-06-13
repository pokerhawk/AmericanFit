FROM node:latest

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
ENV VITE_BASE_URL="http://localhost:8080"
#ENV VITE_SOCKET_URL="http://localhost:8081"
ENV VITE_API_KEY="95c86f32-7cde-4200-a508-f5c23ba6ac9f"

WORKDIR /tmp/react

COPY . .

RUN rm -rf node_modules

RUN yarn

RUN yarn build

RUN mkdir -p /var/www/html

RUN mv dist/* /var/www/html

VOLUME /var/www/html

WORKDIR /

RUN rm -rf /tmp/react
